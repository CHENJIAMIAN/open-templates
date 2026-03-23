// vite-plugin-asset-check.js
// 检查源文件（包括 JSX/TSX）和构建后的 dist 目录中 HTML、CSS、JS 文件中的资源引用，确保所有本地资源文件都存在

import fs from 'fs';
import path from 'path';
import process from 'process';

// 支持通过环境变量禁用插件（用于沙箱环境）
const SKIP_ASSET_CHECK = process.env.SKIP_ASSET_CHECK === '1' || process.env.SKIP_ASSET_CHECK === 'true';

// 资源文件扩展名
const ASSET_EXTENSIONS = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif',
  '.svg',
  '.webp',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot',
  // 视频格式
  '.mp4',
  '.webm',
  '.ogg',
  '.ogv',
  '.avi',
  '.mov',
  '.wmv',
  '.flv',
  '.mkv',
  // 音频格式
  '.mp3',
  '.wav',
  '.ogg',
  '.oga',
  '.aac',
  '.m4a',
  '.flac',
  '.wma',
  '.pdf',
  '.json',
  '.txt',
];

// 获取文本中指定索引位置的行号（优化版本：使用字符计数而非正则）
function getLineNumber(text, index) {
  let line = 1;
  for (let i = 0; i < index && i < text.length; i++) {
    if (text[i] === '\n') {
      line++;
    }
  }
  return line;
}

export default function assetCheckPlugin(options = {}) {
  // 如果禁用，返回空插件
  if (SKIP_ASSET_CHECK) {
    return {
      name: 'asset-check',
      enforce: 'pre',
    };
  }

  const {
    checkCSS = true,
    checkJS = true,
    checkJSX = true, // 新增：是否检查 JSX/TSX 文件
    ignorePatterns = ['data:', 'blob:', 'http', 'https', '//'],
    distDir = 'dist',
    srcDir = 'src', // 新增：源文件目录
  } = options;

  const projectRoot = process.cwd();
  const errors = [];
  const preBuildErrors = []; // 构建前检查的错误
  let distPath = null; // 将在 closeBundle 中设置
  // 缓存已检查的文件路径，避免重复的文件系统调用
  const fileExistenceCache = new Map();
  // public 目录路径（Vite 会将 public 目录的内容复制到 dist 根目录）
  const publicDir = path.resolve(projectRoot, 'public');

  // 判断是否应该忽略该资源路径
  function shouldIgnoreAsset(src) {
    // 1. 空字符串
    if (!src || src.trim() === '') return true;

    // 2. 忽略已知的模式（外部资源、数据 URI 等）
    // 对于以 ':' 结尾的模式（如 'blob:', 'data:'），必须完整匹配，避免误匹配变量名
    if (ignorePatterns.some((p) => (p.endsWith(':') ? src.startsWith(p) : src.startsWith(p)))) {
      return true;
    }

    // 2.5. 动态路径模板字符串（如 `/assets/${e.coverImage}` 或 `${baseUrl}/logo.png`）
    // 这些包含运行时变量，无法静态分析，应跳过检查
    if (src.includes('${')) return true;

    // 3. SVG 片段引用（如 url(#gradient-id) 或 url(%23grid)）
    if (src.startsWith('#') || src.startsWith('%23')) {
      try {
        const decoded = src.startsWith('%23') ? decodeURIComponent(src) : src;
        if (decoded.startsWith('#')) {
          const hasPathSeparator = decoded.includes('/') || decoded.includes('\\');
          const hasFileExtension =
            /\.(jpg|jpeg|png|gif|svg|webp|ico|woff|woff2|ttf|eot|mp4|webm|ogg|ogv|avi|mov|wmv|flv|mkv|mp3|wav|oga|aac|m4a|flac|wma|pdf|json|txt)$/i.test(
              decoded
            );
          if (!hasPathSeparator && !hasFileExtension) return true;
        }
      } catch (e) {
        // 解码失败，忽略
      }
    }

    // 4. JavaScript 标识符（变量名，如 blob、reportBlob、downloadUrl）
    if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(src)) return true;

    return false;
  }

  // 判断是否为有效的资源路径
  function isValidAssetPath(src) {
    const hasPathSeparator = src.includes('/') || src.includes('\\');
    const fileExt = path.extname(src).toLowerCase();
    const hasFileExtension = fileExt !== '' && ASSET_EXTENSIONS.includes(fileExt);
    const isAbsolutePath = src.startsWith('/');
    const hasRelativePathPrefix = src.startsWith('./') || src.startsWith('../');

    return hasPathSeparator || hasFileExtension || isAbsolutePath || hasRelativePathPrefix;
  }

  // 检查资源文件是否存在
  function checkAsset(filePath, src, type, file, line, isPreBuild = false) {
    if (shouldIgnoreAsset(src)) return;
    if (!isValidAssetPath(src)) return;

    const errorList = isPreBuild ? preBuildErrors : errors;

    // 检查资源路径是否在 dist 目录内（仅构建后检查）
    if (distPath && !isPreBuild) {
      const resolvedDistPath = path.resolve(distPath);
      const resolvedAssetPath = path.resolve(filePath);
      if (!resolvedAssetPath.startsWith(resolvedDistPath)) {
        errorList.push({
          type,
          src,
          path: filePath,
          file: path.relative(projectRoot, file),
          line,
          isOutside: true,
        });
        return;
      }
    }

    // 检查文件是否存在（使用缓存避免重复检查）
    let exists = fileExistenceCache.get(filePath);
    if (exists === undefined) {
      exists = fs.existsSync(filePath);
      fileExistenceCache.set(filePath, exists);
    }

    // 如果文件不存在且是绝对路径（以 / 开头），在构建前额外检查 public 目录
    // 构建后不需要检查，因为 public 目录的内容已经被复制到 dist 根目录了
    if (!exists && src.startsWith('/') && isPreBuild) {
      const publicPath = path.resolve(publicDir, src.slice(1));
      if (publicPath !== filePath) {
        const publicExists = fileExistenceCache.get(publicPath);
        if (publicExists === undefined) {
          const existsInPublic = fs.existsSync(publicPath);
          fileExistenceCache.set(publicPath, existsInPublic);
          if (existsInPublic) {
            exists = true;
            fileExistenceCache.set(filePath, true);
          }
        } else if (publicExists) {
          exists = true;
          fileExistenceCache.set(filePath, true);
        }
      }
    }

    if (!exists) {
      // 检测资源路径是否在 dist 目录内（可能被构建清空了）
      let isInDistDir = false;
      if (distPath && !isPreBuild) {
        const resolvedDistPath = path.resolve(distPath);
        const resolvedAssetPath = path.resolve(filePath);
        isInDistDir = resolvedAssetPath.startsWith(resolvedDistPath);
      }

      errorList.push({
        type,
        src,
        path: filePath,
        file: path.relative(projectRoot, file),
        line,
        isOutside: false,
        isInDistDir, // 标记是否在 dist 目录内
      });
    }
  }

  // 解析资源路径
  function resolveAssetPath(src, baseDir) {
    // 处理绝对路径（以 / 开头）
    if (src.startsWith('/')) {
      // 先按正常逻辑解析（相对于 baseDir）
      return path.resolve(baseDir, src.slice(1));
    }
    // 处理相对路径
    return path.resolve(baseDir, src);
  }

  // 递归遍历目录，收集所有需要检查的文件
  function collectFiles(dir, fileList = [], preBuild = false) {
    if (!fs.existsSync(dir)) return fileList;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        collectFiles(fullPath, fileList, preBuild);
      } else {
        const ext = path.extname(entry.name).toLowerCase();
        if (preBuild) {
          // 构建前检查：只收集 HTML 和 JSX/TSX 文件
          if (ext === '.html' || ext === '.jsx' || ext === '.tsx') {
            fileList.push(fullPath);
          }
        } else if (ext === '.html' || ext === '.css' || ext === '.js') {
          // 构建后检查：收集 HTML、CSS、JS 文件
          fileList.push(fullPath);
        }
      }
    }

    return fileList;
  }

  // 辅助函数：移除查询参数和 hash 片段，提取纯路径
  function cleanPath(pathToClean) {
    // 移除查询参数 (?xxx) 和 hash 片段 (#xxx)
    return pathToClean.split('?')[0].split('#')[0];
  }

  // 辅助函数：判断是否为 npm 包名（不应该检查）
  function isPossibleNpmPackage(modulePath) {
    // 1. 以 @ 开头的是 scoped package（如 @apaas-ai/example）
    if (modulePath.startsWith('@')) return true;
    // 2. 不以 ./、../、/ 开头，且不包含路径分隔符的，可能是包名（如 react, lodash）
    // 但如果有文件扩展名且是资源扩展名，可能是相对路径（如 image.png）
    // 所以需要更严格的判断：不以相对路径前缀开头，且第一个字符不是 /，且不包含路径分隔符
    if (!modulePath.startsWith('./') && !modulePath.startsWith('../') && !modulePath.startsWith('/')) {
      // 如果包含路径分隔符，可能是包内的资源（如 react/logo.png），应该跳过
      if (modulePath.includes('/') || modulePath.includes('\\')) {
        return true;
      }
      // 如果没有路径分隔符，可能是包名，但如果有资源扩展名，可能是文件（如 image.png）
      // 为了安全，如果看起来像包名（没有扩展名或扩展名不是资源类型），跳过
      const moduleExt = path.extname(modulePath).toLowerCase();
      if (moduleExt === '' || (!ASSET_EXTENSIONS.includes(moduleExt) && moduleExt !== '.css')) {
        return true;
      }
    }
    return false;
  }

  // 从文件中提取资源引用并检查
  function checkFileForAssets(filePath, isPreBuild = false) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileDir = path.dirname(filePath);
    // 构建后检查时，对于绝对路径，应该相对于 dist 根目录解析
    const getBaseDir = (src) => {
      if (src.startsWith('/') && !isPreBuild && distPath) {
        // 构建后：绝对路径相对于 dist 根目录
        return distPath;
      }
      // 构建前或相对路径：相对于文件所在目录
      return fileDir;
    };
    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.html') {
      // <script src="..."> (本地 JS 文件)
      const scriptRegex = /<script[^>]+src=["']([^"']+)["'][^>]*>/gi;
      let match;
      while ((match = scriptRegex.exec(content)) !== null) {
        const src = match[1].trim();
        // 跳过外部 URL（http/https///）
        if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('//')) {
          continue;
        }
        const assetPath = resolveAssetPath(src, getBaseDir(src));
        checkAsset(assetPath, src, 'script', filePath, getLineNumber(content, match.index), isPreBuild);
      }

      // <link href="..."> (本地 CSS 文件)
      const linkRegex = /<link[^>]+href=["']([^"']+)["'][^>]*>/gi;
      while ((match = linkRegex.exec(content)) !== null) {
        const href = match[1].trim();
        // 跳过外部 URL（http/https///）
        if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//')) {
          continue;
        }
        // 只检查 CSS 文件
        if (href.endsWith('.css')) {
          const assetPath = resolveAssetPath(href, getBaseDir(href));
          checkAsset(assetPath, href, 'link-css', filePath, getLineNumber(content, match.index), isPreBuild);
        }
      }

      // <img src="...">
      const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
      while ((match = imgRegex.exec(content)) !== null) {
        const src = match[1].trim();
        const assetPath = resolveAssetPath(src, getBaseDir(src));
        checkAsset(assetPath, src, 'img', filePath, getLineNumber(content, match.index), isPreBuild);
      }

      // <audio src="...">
      const audioRegex = /<audio[^>]+src=["']([^"']+)["']/gi;
      while ((match = audioRegex.exec(content)) !== null) {
        const src = match[1].trim();
        const assetPath = resolveAssetPath(src, getBaseDir(src));
        checkAsset(assetPath, src, 'audio', filePath, getLineNumber(content, match.index), isPreBuild);
      }

      // <video src="...">
      const videoRegex = /<video[^>]+src=["']([^"']+)["']/gi;
      while ((match = videoRegex.exec(content)) !== null) {
        const src = match[1].trim();
        const assetPath = resolveAssetPath(src, getBaseDir(src));
        checkAsset(assetPath, src, 'video', filePath, getLineNumber(content, match.index), isPreBuild);
      }

      // <source src="..."> (用于 audio 和 video 标签)
      const sourceRegex = /<source[^>]+src=["']([^"']+)["']/gi;
      while ((match = sourceRegex.exec(content)) !== null) {
        const src = match[1].trim();
        const assetPath = resolveAssetPath(src, getBaseDir(src));
        checkAsset(assetPath, src, 'source', filePath, getLineNumber(content, match.index), isPreBuild);
      }

      // HTML 内联 CSS 中的 url()（可能包含背景图片等）
      if (checkCSS) {
        // 匹配 url("...") 或 url('...') 或 url(...)
        // 使用负向后顾断言排除 JavaScript 的 URL 方法（如 createObjectURL, revokeObjectURL）
        // 无引号时也会匹配，但 shouldIgnoreAsset 会过滤掉变量名
        const urlRegex = /(?<![a-zA-Z])url\((["']?)([^"')]+)\1\)/g;
        while ((match = urlRegex.exec(content)) !== null) {
          const url = match[2].trim();
          if (url) {
            const resolvedPath = resolveAssetPath(url, getBaseDir(url));
            checkAsset(
              resolvedPath,
              url,
              'css-url',
              filePath,
              getLineNumber(content, match.index),
              isPreBuild
            );
          }
        }
      }
    }

    if (ext === '.css' && checkCSS) {
      // url() 引用（可能包含背景图片等）
      // 匹配 url("...") 或 url('...') 或 url(...)
      // 使用负向后顾断言排除 JavaScript 的 URL 方法（如 createObjectURL, revokeObjectURL）
      // 无引号时也会匹配，但 shouldIgnoreAsset 会过滤掉变量名
      const urlRegex = /(?<![a-zA-Z])url\((["']?)([^"')]+)\1\)/g;
      let match;
      while ((match = urlRegex.exec(content)) !== null) {
        const url = match[2].trim();
        if (url) {
          const resolvedPath = resolveAssetPath(url, fileDir);
          checkAsset(resolvedPath, url, 'css-url', filePath, getLineNumber(content, match.index), isPreBuild);
        }
      }
    }

    // 检查 JSX/TSX 文件（仅构建前检查，简化逻辑：只检查 import 和 <img src>）
    if ((ext === '.jsx' || ext === '.tsx') && checkJSX && isPreBuild) {
      // import 语句中的资源文件
      const importRegex = /import\s+(?:.*?\s+from\s+)?["']([^"']+)["']/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1].trim();
        // 跳过 npm 包名
        if (isPossibleNpmPackage(importPath)) continue;
        // 移除查询参数和 hash 片段
        const cleanImportPath = cleanPath(importPath);
        const importExt = path.extname(cleanImportPath).toLowerCase();
        if (ASSET_EXTENSIONS.includes(importExt)) {
          const resolvedPath = resolveAssetPath(cleanImportPath, getBaseDir(cleanImportPath));
          checkAsset(
            resolvedPath,
            cleanImportPath,
            'jsx-import',
            filePath,
            getLineNumber(content, match.index),
            isPreBuild
          );
        }
      }

      // JSX 中的 <img src="..."/> 或 <img src='...'/>
      const jsxImgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
      while ((match = jsxImgRegex.exec(content)) !== null) {
        const src = match[1].trim();
        const assetPath = resolveAssetPath(src, getBaseDir(src));
        checkAsset(assetPath, src, 'jsx-img', filePath, getLineNumber(content, match.index), isPreBuild);
      }

      // JSX 中的 <audio src="..."/> 或 <audio src='...'/>
      const jsxAudioRegex = /<audio[^>]+src=["']([^"']+)["'][^>]*>/g;
      while ((match = jsxAudioRegex.exec(content)) !== null) {
        const src = match[1].trim();
        const assetPath = resolveAssetPath(src, getBaseDir(src));
        checkAsset(assetPath, src, 'jsx-audio', filePath, getLineNumber(content, match.index), isPreBuild);
      }

      // JSX 中的 <video src="..."/> 或 <video src='...'/>
      const jsxVideoRegex = /<video[^>]+src=["']([^"']+)["'][^>]*>/g;
      while ((match = jsxVideoRegex.exec(content)) !== null) {
        const src = match[1].trim();
        const assetPath = resolveAssetPath(src, getBaseDir(src));
        checkAsset(assetPath, src, 'jsx-video', filePath, getLineNumber(content, match.index), isPreBuild);
      }

      // JSX 中的 <source src="..."/> (用于 audio 和 video 标签)
      const jsxSourceRegex = /<source[^>]+src=["']([^"']+)["'][^>]*>/g;
      while ((match = jsxSourceRegex.exec(content)) !== null) {
        const src = match[1].trim();
        const assetPath = resolveAssetPath(src, getBaseDir(src));
        checkAsset(assetPath, src, 'jsx-source', filePath, getLineNumber(content, match.index), isPreBuild);
      }
    }

    if ((ext === '.js' || ext === '.ts') && checkJS) {
      // import 语句中的资源文件
      const importRegex = /import\s+(?:.*?\s+from\s+)?["']([^"']+)["']/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1].trim();
        // 跳过 npm 包名
        if (isPossibleNpmPackage(importPath)) continue;
        // 移除查询参数和 hash 片段
        const cleanImportPath = cleanPath(importPath);
        const importExt = path.extname(cleanImportPath).toLowerCase();
        if (ASSET_EXTENSIONS.includes(importExt) || importExt === '.css') {
          const resolvedPath = resolveAssetPath(cleanImportPath, getBaseDir(cleanImportPath));
          checkAsset(
            resolvedPath,
            cleanImportPath,
            'js-import',
            filePath,
            getLineNumber(content, match.index),
            isPreBuild
          );
        }
      }

      // require() 中的资源文件
      const requireRegex = /require\(["']([^"']+)["']\)/g;
      while ((match = requireRegex.exec(content)) !== null) {
        const requirePath = match[1].trim();
        // 跳过 npm 包名
        if (isPossibleNpmPackage(requirePath)) continue;
        // 移除查询参数和 hash 片段
        const cleanRequirePath = cleanPath(requirePath);
        const requireExt = path.extname(cleanRequirePath).toLowerCase();
        if (ASSET_EXTENSIONS.includes(requireExt) || requireExt === '.css') {
          const resolvedPath = resolveAssetPath(cleanRequirePath, getBaseDir(cleanRequirePath));
          checkAsset(
            resolvedPath,
            cleanRequirePath,
            'js-require',
            filePath,
            getLineNumber(content, match.index),
            isPreBuild
          );
        }
      }

      // new Image() 或 createElement('img') 的 src 属性
      // 注意：只匹配 .src = "..." 或 new Image().src = "..."，避免匹配变量赋值
      const srcAssignmentRegex = /(?:new\s+Image\(\)|\.src)\s*=\s*["']([^"']+)["']/g;
      while ((match = srcAssignmentRegex.exec(content)) !== null) {
        const srcPath = match[1].trim();
        // 跳过空字符串和明显不是资源路径的字符串（如单个单词变量名）
        if (!srcPath || srcPath.trim() === '') continue;
        // 移除查询参数和 hash 片段
        const cleanSrcPath = cleanPath(srcPath);
        // 只检查有文件扩展名的路径，避免误匹配变量名
        const srcExt = path.extname(cleanSrcPath).toLowerCase();
        if (ASSET_EXTENSIONS.includes(srcExt)) {
          const resolvedPath = resolveAssetPath(cleanSrcPath, getBaseDir(cleanSrcPath));
          checkAsset(
            resolvedPath,
            cleanSrcPath,
            'js-image-src',
            filePath,
            getLineNumber(content, match.index),
            isPreBuild
          );
        }
      }

      // new Audio() 或 createElement('audio') 的 src 属性
      // 匹配 new Audio("...") 或 audioElement.src = "..." 或 createElement('audio').src = "..."
      const audioSrcRegex =
        /(?:new\s+Audio\(["']([^"']+)["']\)|(?:audio|Audio)Element?\.src\s*=\s*["']([^"']+)["'])/g;
      while ((match = audioSrcRegex.exec(content)) !== null) {
        const srcPath = (match[1] || match[2]).trim();
        if (!srcPath || srcPath.trim() === '') continue;
        const cleanSrcPath = cleanPath(srcPath);
        const srcExt = path.extname(cleanSrcPath).toLowerCase();
        if (ASSET_EXTENSIONS.includes(srcExt)) {
          const resolvedPath = resolveAssetPath(cleanSrcPath, getBaseDir(cleanSrcPath));
          checkAsset(
            resolvedPath,
            cleanSrcPath,
            'js-audio-src',
            filePath,
            getLineNumber(content, match.index),
            isPreBuild
          );
        }
      }

      // new Video() 或 createElement('video') 的 src 属性
      // 匹配 videoElement.src = "..." 或 createElement('video').src = "..."
      const videoSrcRegex = /(?:video|Video)Element?\.src\s*=\s*["']([^"']+)["']/g;
      while ((match = videoSrcRegex.exec(content)) !== null) {
        const srcPath = match[1].trim();
        if (!srcPath || srcPath.trim() === '') continue;
        const cleanSrcPath = cleanPath(srcPath);
        const srcExt = path.extname(cleanSrcPath).toLowerCase();
        if (ASSET_EXTENSIONS.includes(srcExt)) {
          const resolvedPath = resolveAssetPath(cleanSrcPath, getBaseDir(cleanSrcPath));
          checkAsset(
            resolvedPath,
            cleanSrcPath,
            'js-video-src',
            filePath,
            getLineNumber(content, match.index),
            isPreBuild
          );
        }
      }

      // fetch() 中的本地资源引用（如 JSON、CSV、XML 等数据文件）
      // 使用 \b 单词边界避免匹配 prefetch、refetch 等
      const fetchRegex = /\bfetch\(["'](\.[^"']+)["']\)/g;
      while ((match = fetchRegex.exec(content)) !== null) {
        const fetchPath = match[1].trim();
        // 只检查本地路径（以 ./ 开头），忽略外部 URL
        if (fetchPath.startsWith('./')) {
          const cleanFetchPath = cleanPath(fetchPath);
          const resolvedPath = resolveAssetPath(cleanFetchPath, getBaseDir(cleanFetchPath));
          checkAsset(
            resolvedPath,
            cleanFetchPath,
            'js-fetch',
            filePath,
            getLineNumber(content, match.index),
            isPreBuild
          );
        }
      }
    }
  }

  return {
    name: 'asset-check',
    enforce: 'pre',

    // 在构建开始前检查源文件（包括 JSX/TSX）
    buildStart() {
      // 清空之前的错误，避免多次构建时错误累积
      preBuildErrors.length = 0;

      if (!checkJSX) return;

      const srcPath = path.resolve(projectRoot, srcDir);
      if (!fs.existsSync(srcPath)) {
        // src 目录不存在，跳过检查
        return;
      }

      // 收集所有需要检查的源文件（只收集 HTML 和 JSX/TSX）
      const filesToCheck = collectFiles(srcPath, [], true);

      // 检查每个文件中的资源引用
      for (const file of filesToCheck) {
        try {
          checkFileForAssets(file, true);
        } catch (error) {
          // 如果读取文件失败，记录错误但继续检查其他文件
          console.warn(`Warning: Failed to check source file ${file}:`, error.message);
        }
      }

      // 报告构建前检查的错误（如果有错误，立即抛出，停止构建）
      if (preBuildErrors.length > 0) {
        const missingErrors = preBuildErrors.filter((err) => !err.isOutside);

        let message = '';
        if (missingErrors.length > 0) {
          message += `\n❌ Missing ${missingErrors.length} asset(s) in source files:\n\n`;
          message += missingErrors
            .map((err) => {
              const fileInfo = err.file ? `\n     File: ${err.file}` : '';
              const lineInfo = err.line ? `\n     Line: ${err.line}` : '';
              const relativePath = path.relative(projectRoot, err.path);
              return `  ❌ [Missing Asset] ${err.type}: "${err.src}"${fileInfo}${lineInfo}\n     Expected at: ${relativePath}`;
            })
            .join('\n\n');
          message += '\n\n💡 Tip: 确保源文件中的资源文件存在于项目中。\n';
        }

        // 立即抛出错误，停止构建，不会继续执行到 closeBundle
        throw new Error(`\n🔍 Pre-build Asset Check Failed:\n${message}`);
      }
    },

    // 在构建完成后检查 dist 目录
    closeBundle() {
      // 清空之前的错误和缓存，避免多次构建时错误累积
      errors.length = 0;
      fileExistenceCache.clear();

      distPath = path.resolve(projectRoot, distDir);

      if (!fs.existsSync(distPath)) {
        // dist 目录不存在，跳过检查
        return;
      }

      // 收集所有需要检查的文件（HTML、CSS、JS）
      const filesToCheck = collectFiles(distPath, [], false);

      // 检查每个文件中的资源引用
      for (const file of filesToCheck) {
        try {
          checkFileForAssets(file, false);
        } catch (error) {
          // 如果读取文件失败，记录错误但继续检查其他文件
          console.warn(`Warning: Failed to check file ${file}:`, error.message);
        }
      }

      // 报告错误
      if (errors.length > 0) {
        const outsideErrors = errors.filter((err) => err.isOutside);
        const missingErrors = errors.filter((err) => !err.isOutside);

        let message = '';

        if (outsideErrors.length > 0) {
          message += `\n❌ Found ${outsideErrors.length} asset reference(s) outside dist directory:\n\n`;
          message += outsideErrors
            .map((err) => {
              const fileInfo = err.file ? `\n     File: ${err.file}` : '';
              const lineInfo = err.line ? `\n     Line: ${err.line}` : '';
              return `  ❌ [Outside Dist] ${err.type}: "${err.src}"${fileInfo}${lineInfo}\n     Resolved to: ${err.path}`;
            })
            .join('\n\n');
          message += '\n\n💡 Tip: 构建后的资源引用应该指向 dist 目录内的文件。请检查资源路径是否正确。\n';
        }

        if (missingErrors.length > 0) {
          if (message) message += '\n';
          message += `\n❌ Missing ${missingErrors.length} asset(s) in dist directory:\n\n`;

          // 检查是否有资源在 dist 目录内但不存在（可能被清空了）
          const distDirErrors = missingErrors.filter((err) => err.isInDistDir);
          const otherErrors = missingErrors.filter((err) => !err.isInDistDir);

          // 先显示 dist 目录相关的错误（方案2：针对性提示）
          if (distDirErrors.length > 0) {
            message += distDirErrors
              .map((err) => {
                const fileInfo = err.file ? `\n     File: ${err.file}` : '';
                const lineInfo = err.line ? `\n     Line: ${err.line}` : '';
                const relativePath = path.relative(projectRoot, err.path);
                return `  ❌ [Missing Asset] ${err.type}: "${err.src}"${fileInfo}${lineInfo}\n     Expected at: ${relativePath}`;
              })
              .join('\n\n');

            if (otherErrors.length > 0) {
              message += '\n\n';
            }
          }

          // 显示其他错误
          if (otherErrors.length > 0) {
            if (distDirErrors.length > 0) {
              message += otherErrors
                .map((err) => {
                  const fileInfo = err.file ? `\n     File: ${err.file}` : '';
                  const lineInfo = err.line ? `\n     Line: ${err.line}` : '';
                  const relativePath = path.relative(projectRoot, err.path);
                  return `  ❌ [Missing Asset] ${err.type}: "${err.src}"${fileInfo}${lineInfo}\n     Expected at: ${relativePath}`;
                })
                .join('\n\n');
            } else {
              message += missingErrors
                .map((err) => {
                  const fileInfo = err.file ? `\n     File: ${err.file}` : '';
                  const lineInfo = err.line ? `\n     Line: ${err.line}` : '';
                  const relativePath = path.relative(projectRoot, err.path);
                  return `  ❌ [Missing Asset] ${err.type}: "${err.src}"${fileInfo}${lineInfo}\n     Expected at: ${relativePath}`;
                })
                .join('\n\n');
            }
          }

          // 方案1 + 方案2：增强错误提示
          message += '\n\n💡 资源文件缺失的原因和解决方法：\n\n';

          if (distDirErrors.length > 0) {
            message += '⚠️  检测到资源引用指向了 dist 目录内的文件，但这些文件不存在。\n';
            message += '   这可能是因为资源文件被直接放在了 dist 目录中，而 dist 目录在构建时会被清空。\n\n';
          }

          message += '1. **不要直接将资源复制到 dist 目录**\n';
          message += '   - dist 目录在构建时会被清空，直接放在这里的资源会丢失\n\n';

          message += '2. **正确的做法：**\n';
          message += '   - 将资源文件放在项目根目录的 `assets/` 目录，或\n';
          message += '   - 将资源文件放在 `src/assets/` 目录\n';
          message += '   - 构建工具会自动将这些资源复制到 `dist/assets/`\n';
          message += '   - 对于需要通过绝对路径引用的文件（如 `/favicon.ico`），放在 `public/` 目录\n';
          message += '   - `public/` 目录中的文件会被复制到 `dist/` 根目录\n\n';

          message += '3. **操作步骤：**\n';
          if (distDirErrors.length > 0) {
            message += '   - 如果资源在 dist 目录，请将其移动到 `assets/` 或 `src/assets/`\n';
          }
          message +=
            '   - 确保在代码中引用资源时使用相对路径，如：`./assets/logo.png` 或 `assets/logo.png`\n';
          message += '   - 重新构建项目\n\n';

          message += '4. **示例：**\n';
          message += '   - ❌ 错误：将 logo.png 放在 dist/assets/logo.png\n';
          message += '   - ✅ 正确：将 logo.png 放在 assets/logo.png 或 src/assets/logo.png\n';
        }

        throw new Error(`\n🔍 Asset Check Failed:\n${message}`);
      }
    },
  };
}
