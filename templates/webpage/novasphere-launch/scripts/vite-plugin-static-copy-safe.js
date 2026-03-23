// vite-plugin-static-copy-safe.js
// 包装 vite-plugin-static-copy，捕获并忽略 chmod 相关的 EPERM 错误
// 用于在权限受限环境（如只读文件系统）中安全地复制静态文件

import { viteStaticCopy } from 'vite-plugin-static-copy';
import fs from 'fs';

// ============================================
// 关键修复：在底层拦截所有 chmod 相关方法
// 包括 fs.chmod, fs.chmodSync, fs.promises.chmod
// 以及 utimes（时间戳设置）等可能触发权限错误的操作
// 防止 chmod 错误中断整个拷贝流程
// ============================================
const originalChmod = fs.chmod;
const originalChmodSync = fs.chmodSync;
const originalUtimes = fs.utimes;
const originalUtimesSync = fs.utimesSync;
let originalPromisesChmod = null;
let originalPromisesUtimes = null;
let chmodIntercepted = false;

function interceptChmod() {
  if (chmodIntercepted) return;
  chmodIntercepted = true;

  // 保存 fs.promises 的原始方法
  if (fs.promises) {
    originalPromisesChmod = fs.promises.chmod;
    originalPromisesUtimes = fs.promises.utimes;
  }

  // 拦截异步 chmod (callback-based)
  fs.chmod = function patchedChmod(path, mode, callback) {
    originalChmod.call(fs, path, mode, (err) => {
      if (err && (err.code === 'EPERM' || err.code === 'EACCES')) {
        // 忽略权限错误，静默成功
        if (callback) callback(null);
        return;
      }
      if (callback) callback(err);
    });
  };

  // 拦截同步 chmod
  fs.chmodSync = function patchedChmodSync(path, mode) {
    try {
      return originalChmodSync.call(fs, path, mode);
    } catch (err) {
      if (err.code === 'EPERM' || err.code === 'EACCES') {
        // 忽略权限错误，静默返回
        return;
      }
      throw err;
    }
  };

  // 拦截异步 utimes (callback-based)
  fs.utimes = function patchedUtimes(path, atime, mtime, callback) {
    originalUtimes.call(fs, path, atime, mtime, (err) => {
      if (err && (err.code === 'EPERM' || err.code === 'EACCES')) {
        if (callback) callback(null);
        return;
      }
      if (callback) callback(err);
    });
  };

  // 拦截同步 utimes
  fs.utimesSync = function patchedUtimesSync(path, atime, mtime) {
    try {
      return originalUtimesSync.call(fs, path, atime, mtime);
    } catch (err) {
      if (err.code === 'EPERM' || err.code === 'EACCES') {
        return;
      }
      throw err;
    }
  };

  // 关键：拦截 fs.promises.chmod (Promise-based)
  if (fs.promises && originalPromisesChmod) {
    fs.promises.chmod = async function patchedPromisesChmod(path, mode) {
      try {
        return await originalPromisesChmod.call(fs.promises, path, mode);
      } catch (err) {
        if (err.code === 'EPERM' || err.code === 'EACCES') {
          // 忽略权限错误，静默返回
          return;
        }
        throw err;
      }
    };
  }

  // 关键：拦截 fs.promises.utimes (Promise-based)
  if (fs.promises && originalPromisesUtimes) {
    fs.promises.utimes = async function patchedPromisesUtimes(path, atime, mtime) {
      try {
        return await originalPromisesUtimes.call(fs.promises, path, atime, mtime);
      } catch (err) {
        if (err.code === 'EPERM' || err.code === 'EACCES') {
          return;
        }
        throw err;
      }
    };
  }
}

function restoreChmod() {
  if (chmodIntercepted) {
    fs.chmod = originalChmod;
    fs.chmodSync = originalChmodSync;
    fs.utimes = originalUtimes;
    fs.utimesSync = originalUtimesSync;
    if (fs.promises && originalPromisesChmod) {
      fs.promises.chmod = originalPromisesChmod;
    }
    if (fs.promises && originalPromisesUtimes) {
      fs.promises.utimes = originalPromisesUtimes;
    }
    chmodIntercepted = false;
  }
}

/**
 * 判断是否为 chmod 相关的权限错误
 * @param {Error} error - 错误对象
 * @returns {boolean} 是否为 chmod 权限错误
 */
function isChmodPermissionError(error) {
  if (!error) return false;

  const errorMessage = error.message || '';
  const errorCode = error.code || '';
  const errorString = String(error).toLowerCase();
  const errorLower = errorMessage.toLowerCase();

  // 检查错误代码
  if (errorCode === 'EPERM' || errorCode === 'EACCES') {
    // 如果错误消息中包含 chmod 或 operation not permitted，则认为是 chmod 权限错误
    if (
      errorLower.includes('chmod') ||
      errorLower.includes('operation not permitted') ||
      errorString.includes('chmod')
    ) {
      return true;
    }
  }

  // 检查错误消息中是否同时包含 chmod 和 permission 相关关键词
  const hasChmod = errorLower.includes('chmod') || errorString.includes('chmod');
  const hasPermission =
    errorLower.includes('permission') ||
    errorLower.includes('eperm') ||
    errorLower.includes('eacces') ||
    errorLower.includes('operation not permitted') ||
    errorString.includes('eperm') ||
    errorString.includes('operation not permitted');

  return hasChmod && hasPermission;
}

/**
 * 包装 vite-plugin-static-copy，捕获并忽略 chmod 相关的 EPERM 错误
 * @param {object} options - vite-plugin-static-copy 的配置选项
 * @returns {object} Vite 插件对象
 */
export default function viteStaticCopySafe(options = {}) {
  // 确保 preserveTimestamps 为 false，避免权限问题
  const safeOptions = {
    ...options,
    preserveTimestamps: false,
  };

  // 拦截 console.error 和未处理的 Promise rejection 来捕获错误
  const originalConsoleError = console.error;
  let isIntercepting = false;
  let unhandledRejectionHandler = null;

  const interceptErrors = () => {
    if (isIntercepting) return;
    isIntercepting = true;

    // 拦截 console.error
    console.error = function handleError(...args) {
      const message = args.join(' ');
      // 检查是否是 chmod 相关的 EPERM 错误
      if (
        message.includes('vite-plugin-static-copy') &&
        (message.includes('EPERM') || message.includes('EACCES')) &&
        (message.includes('chmod') || message.includes('operation not permitted'))
      ) {
        // 转换为警告而不是错误
        console.warn(`[vite-plugin-static-copy-safe] Ignored chmod permission error: ${message}`);
        return;
      }
      // 其他错误正常输出
      originalConsoleError.apply(console, args);
    };

    // 拦截未处理的 Promise rejection（作为最后一道防线）
    unhandledRejectionHandler = (reason) => {
      if (isChmodPermissionError(reason)) {
        console.warn(
          `[vite-plugin-static-copy-safe] Ignored unhandled chmod permission error: ${
            reason?.message || reason
          }`
        );
        // 注意：这里无法真正阻止 Node.js 的默认行为，但可以记录警告
        // 实际的错误应该通过 wrapHook 中的 Promise.catch 来捕获
      }
    };

    process.on('unhandledRejection', unhandledRejectionHandler);
  };

  const restoreErrors = () => {
    if (isIntercepting) {
      console.error = originalConsoleError;
      if (unhandledRejectionHandler) {
        process.off('unhandledRejection', unhandledRejectionHandler);
        unhandledRejectionHandler = null;
      }
      isIntercepting = false;
    }
  };

  // 获取原始插件（返回的是数组，包含 serve 和 build 两个插件）
  const originalPlugins = viteStaticCopy(safeOptions);

  // 包装单个插件
  const wrapPlugin = (originalPlugin) => {
    // 包装所有插件钩子，捕获错误
    const wrapHook = (hookName) => {
      const originalHook = originalPlugin[hookName];
      if (!originalHook) return undefined;

      return function wrappedHook(...args) {
        const result = originalHook.apply(this, args);
        // 如果是 Promise，捕获其错误
        if (result && typeof result.catch === 'function') {
          return result.catch((error) => {
            if (isChmodPermissionError(error)) {
              console.warn(
                `[vite-plugin-static-copy-safe] Ignored chmod permission error in ${hookName}: ${
                  error.message || error
                }`
              );
              return Promise.resolve();
            }
            throw error;
          });
        }
        return result;
      };
    };

    // 创建包装后的插件
    const wrappedPlugin = {
      ...originalPlugin,
      name:
        originalPlugin.name?.replace('vite-plugin-static-copy', 'vite-plugin-static-copy-safe') ||
        'vite-plugin-static-copy-safe',
    };

    // 包装所有常见的插件钩子（除了需要特殊处理的 buildStart 和 closeBundle）
    const hookNames = [
      'buildEnd',
      'generateBundle',
      'writeBundle',
      'renderStart',
      'renderChunk',
      'transform',
      'resolveId',
      'load',
    ];

    for (const hookName of hookNames) {
      if (originalPlugin[hookName]) {
        wrappedPlugin[hookName] = wrapHook(hookName);
      }
    }

    // 特殊处理 buildStart：在构建开始时拦截错误和 chmod
    if (originalPlugin.buildStart) {
      const originalBuildStart = originalPlugin.buildStart;
      wrappedPlugin.buildStart = function buildStartHook(...args) {
        interceptErrors();
        interceptChmod(); // 关键：拦截 fs.chmod
        const result = originalBuildStart.apply(this, args);
        // 如果返回 Promise，捕获错误
        if (result && typeof result.catch === 'function') {
          return result.catch((error) => {
            if (isChmodPermissionError(error)) {
              console.warn(
                `[vite-plugin-static-copy-safe] Ignored chmod permission error in buildStart: ${
                  error.message || error
                }`
              );
              return Promise.resolve();
            }
            throw error;
          });
        }
        return result;
      };
    } else {
      wrappedPlugin.buildStart = function buildStartHook() {
        interceptErrors();
        interceptChmod(); // 关键：拦截 fs.chmod
      };
    }

    // 特殊处理 closeBundle：在构建结束时恢复错误处理和 chmod
    if (originalPlugin.closeBundle) {
      const originalCloseBundle = originalPlugin.closeBundle;
      wrappedPlugin.closeBundle = function closeBundleHook(...args) {
        const result = originalCloseBundle.apply(this, args);
        // 如果返回 Promise，确保捕获错误并在完成后恢复
        if (result && typeof result.catch === 'function') {
          return result
            .catch((error) => {
              if (isChmodPermissionError(error)) {
                console.warn(
                  `[vite-plugin-static-copy-safe] Ignored chmod permission error in closeBundle: ${
                    error.message || error
                  }`
                );
                return Promise.resolve();
              }
              throw error;
            })
            .finally(() => {
              restoreErrors();
              restoreChmod(); // 恢复 fs.chmod
            });
        }
        // 同步执行完成，恢复
        restoreErrors();
        restoreChmod(); // 恢复 fs.chmod
        return result;
      };
    } else {
      wrappedPlugin.closeBundle = function closeBundleHook() {
        restoreErrors();
        restoreChmod(); // 恢复 fs.chmod
      };
    }

    return wrappedPlugin;
  };

  // 包装所有插件并返回数组
  return originalPlugins.map(wrapPlugin);
}
