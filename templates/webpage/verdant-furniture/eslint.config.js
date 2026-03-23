import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import htmlPlugin from '@html-eslint/eslint-plugin';
import htmlParser from '@html-eslint/parser';
import eslintPluginHtml from 'eslint-plugin-html';
import globals from 'globals';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);

// 使用 createRequire 来加载 CommonJS 格式的插件
const internalLinksPlugin = require('./scripts/eslint-plugin-internal-links.cjs');
const requireSrcPlugin = require('./scripts/eslint-plugin-require-src.cjs');
const requireClosingPlugin = require('./scripts/eslint-plugin-require-closing.cjs');

// CDN 引入的全局变量
const cdnGlobals = {
  tailwind: 'readonly',
  echarts: 'readonly',
  ApexCharts: 'readonly',
  mermaid: 'readonly',
  QRCode: 'readonly',
  L: 'readonly',
  AOS: 'readonly',
  lucide: 'readonly',
  Plotly: 'readonly',
};

export default [
  // 全局忽略配置 - 必须是单独的对象，ESLint 会在遍历前跳过这些目录
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  // JS 文件配置
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...cdnGlobals,
      },
    },
    plugins: {
      'internal-links': internalLinksPlugin,
    },
    rules: {
      // 预防 Uncaught SyntaxError
      'no-undef': 'error',
      'no-redeclare': 'error',
      'no-dupe-keys': 'error',
      'no-dupe-args': 'error',
      'no-duplicate-case': 'error',
      'no-import-assign': 'error',
      'no-func-assign': 'error',
      'no-useless-catch': 'error',
      'no-useless-return': 'error',
      // 使用自定义插件检查内部链接
      'internal-links/no-window-open-internal': 'error',
    },
  },
  // HTML 文件 - inline script 检查 (eslint-plugin-html)
  {
    files: ['**/*.html'],
    plugins: {
      html: eslintPluginHtml,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...cdnGlobals,
      },
    },
    rules: {
      // 预防 Uncaught SyntaxError
      'no-undef': 'error',
      'no-redeclare': 'error',
      'no-dupe-keys': 'error',
      'no-dupe-args': 'error',
      'no-duplicate-case': 'error',
      'no-import-assign': 'error',
      'no-func-assign': 'error',
      'no-useless-catch': 'error',
      'no-useless-return': 'error',
    },
  },
  // HTML 文件 - 结构检查 (@html-eslint)
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: htmlParser,
    },
    plugins: {
      '@html-eslint': htmlPlugin,
      'internal-links': internalLinksPlugin,
      'require-src': requireSrcPlugin,
      'require-closing': requireClosingPlugin,
    },
    rules: {
      // 使用自定义插件检查内部链接
      'internal-links/no-window-open-internal': 'error',
      'internal-links/no-iframe-internal-src': 'error',
      // HTML 相关规则
      '@html-eslint/indent': 'off', // 让 Prettier 处理缩进
      '@html-eslint/no-duplicate-attrs': 'error',
      // 自定义规则：检测 img 和 source 标签的 src/srcset 属性
      'require-src/require-img-src': 'error',
      'require-src/require-source-src': 'error',
      // 自定义规则：只检查 style/script 闭合（不检查 SVG/void 元素）
      'require-closing/require-style-closing': 'error',
      'require-closing/require-script-closing': 'error',
    },
  },
];
