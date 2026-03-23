import { defineConfig } from 'vite';
import assetCheckPlugin from './scripts/vite-plugin-asset-check.js';
import basenameCheckPlugin from './scripts/vite-plugin-basename-check.js';
import lintInternalLinksPlugin from './scripts/vite-plugin-lint-internal-links.js';
import templateCheckPlugin from './scripts/vite-plugin-template-check.js';
import viteStaticCopySafe from './scripts/vite-plugin-static-copy-safe.js';
import path from 'path';
import fs from 'fs';

// Import vite-plugin-singlefile - use named export viteSingleFile
import { viteSingleFile as singlefile } from 'vite-plugin-singlefile';

// 支持通过环境变量禁用 singlefile 插件（用于沙箱环境）
const SKIP_SINGLEFILE = process.env.SKIP_SINGLEFILE === '1' || process.env.SKIP_SINGLEFILE === 'true';

// 始终不内联图片等静态资源
const possibleAssetsDirs = [path.resolve(__dirname, 'assets'), path.resolve(__dirname, 'src/assets')];

export default defineConfig({
  // base 设为空字符串，生成相对路径资源，适配任意部署目录
  base: '',
  plugins: [
    basenameCheckPlugin(),
    assetCheckPlugin({ checkCSS: true }),
    lintInternalLinksPlugin(),
    templateCheckPlugin(),
    {
      name: 'fix-inline-script-type',
      enforce: 'pre',
      load(id) {
        if (id.endsWith('index.html')) {
          const htmlPath = path.resolve(process.cwd(), 'index.html');
          if (fs.existsSync(htmlPath)) {
            let html = fs.readFileSync(htmlPath, 'utf-8');
            html = html.replace(
              /<script\s+src="((?!https?:\/\/)[^"]+\.js)"(?![^>]*type=module)[^>]*><\/script>/g,
              '<script type="module" src="$1"></script>'
            );
            return html;
          }
        }
        return null;
      },
    },
    // 内联 CSS/JS 到 HTML，但保留图片为外部文件
    // 可通过 SKIP_SINGLEFILE=1 禁用（用于沙箱环境）
    ...(SKIP_SINGLEFILE ? [] : [singlefile({ useRecommendedBuildConfig: false })]),
    ...viteStaticCopySafe({
      // 使用安全包装插件，自动处理 chmod 相关的 EPERM 错误
      // 在权限受限环境（如只读文件系统）中安全地复制静态文件
      preserveTimestamps: false,
      targets: possibleAssetsDirs
        .filter((dir) => {
          if (!fs.existsSync(dir)) return false;
          try {
            const files = fs.readdirSync(dir);
            return files.length > 0;
          } catch {
            return false;
          }
        })
        .map((dir) => ({
          src: `${dir}/*`,
          dest: 'assets',
        })),
    }),
  ],
  build: {
    target: 'es2018',
    // 禁止将二进制资源转为 data URL（图片、字体不内联）
    assetsInlineLimit: 0,
    // 让 CSS 能够被插件收集并注入到 HTML
    cssCodeSplit: false,
    // 优化构建性能：禁用压缩大小报告可加快构建速度
    reportCompressedSize: false,
    // 禁用 sourcemap 以加快构建
    sourcemap: false,
    // 优化 chunk 大小警告阈值
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: 'index.html',
      // Three.js 通过 importmap 从 CDN 加载，标记为外部依赖
      external: ['three', /^three\/addons\//],
      output: {
        // 配合 singlefile，避免额外代码分割
        manualChunks: undefined,
      },
    },
  },
  // 优化依赖预构建
  optimizeDeps: {
    entries: ['index.html'],
    exclude: [],
  },
});
