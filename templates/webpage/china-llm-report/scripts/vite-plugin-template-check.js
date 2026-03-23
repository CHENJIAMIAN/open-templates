// vite-plugin-template-check.js
// 检查模板残留问题：未替换的占位符、未更新的模板文件等

import fs from 'fs';
import path from 'path';

// 支持通过环境变量禁用插件
const SKIP_TEMPLATE_CHECK = process.env.SKIP_TEMPLATE_CHECK === '1' || process.env.SKIP_TEMPLATE_CHECK === 'true';

export default function templateCheckPlugin(options = {}) {
  if (SKIP_TEMPLATE_CHECK) {
    return {
      name: 'template-check',
      enforce: 'pre',
    };
  }

  const {
    // 模板残留文件检查（如果存在且内容未修改，报错）
    templateFiles = ['TEMPLATE_META.md'],
    // HTML 占位符模式
    placeholderPatterns = [
      /\[.*?标题\]/g,           // [xxx标题]
      /\[占位符\]/g,            // [占位符]
      /\[TODO\]/gi,             // [TODO]
      /\[PLACEHOLDER\]/gi,      // [PLACEHOLDER]
      /\{\{.*?\}\}/g,           // {{xxx}} Mustache 风格
    ],
    // Markdown 引用格式（不应出现在 HTML 中）
    referencePatterns = [
      /\[\[\d+\]\]/g,           // [[31]] 格式
      /\[\d+\]/g,               // [31] 格式（需要排除 JS 数组访问）
    ],
  } = options;

  const projectRoot = process.cwd();
  const errors = [];

  // 获取文本中指定索引位置的行号
  function getLineNumber(text, index) {
    let line = 1;
    for (let i = 0; i < index && i < text.length; i++) {
      if (text[i] === '\n') {
        line++;
      }
    }
    return line;
  }

  return {
    name: 'template-check',
    enforce: 'pre',

    buildStart() {
      errors.length = 0;

      // 1. 检查模板残留文件
      for (const templateFile of templateFiles) {
        const filePath = path.resolve(projectRoot, templateFile);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8');

          // 检查是否包含明显的模板标识
          const templateIndicators = [
            /^#\s*(Stock Analysis|中国.*报告|Template|模板)/im,
            /项目结构.*\n.*├──/s,
            /区域说明.*\n.*\|.*\|.*\|/s,
          ];

          const isTemplateContent = templateIndicators.some(pattern => pattern.test(content));

          if (isTemplateContent) {
            errors.push({
              type: 'template-file',
              file: templateFile,
              message: `模板文件 "${templateFile}" 未更新或删除，仍包含模板原始内容`,
            });
          }
        }
      }

      // 2. 检查 index.html 中的占位符
      const indexHtmlPath = path.resolve(projectRoot, 'index.html');
      if (fs.existsSync(indexHtmlPath)) {
        const htmlContent = fs.readFileSync(indexHtmlPath, 'utf-8');

        for (const pattern of placeholderPatterns) {
          // 重置正则的 lastIndex
          pattern.lastIndex = 0;
          let match;
          while ((match = pattern.exec(htmlContent)) !== null) {
            const placeholder = match[0];
            const line = getLineNumber(htmlContent, match.index);

            // 跳过 JavaScript 代码中的正则表达式（避免误报）
            const lineContent = htmlContent.split('\n')[line - 1] || '';
            if (lineContent.includes('RegExp') || lineContent.includes('/.*?/')) {
              continue;
            }

            errors.push({
              type: 'placeholder',
              file: 'index.html',
              line,
              placeholder,
              message: `未替换的占位符: "${placeholder}"`,
            });
          }
        }

        // 3. 检查 Markdown 引用格式（不应出现在 HTML 正文中）
        for (const pattern of referencePatterns) {
          pattern.lastIndex = 0;
          let match;
          while ((match = pattern.exec(htmlContent)) !== null) {
            const reference = match[0];
            const line = getLineNumber(htmlContent, match.index);
            const lineContent = htmlContent.split('\n')[line - 1] || '';

            // 跳过 JavaScript 代码中的数组访问（如 arr[0]、data[1]）
            // 检查前面是否有标识符字符
            const beforeMatch = htmlContent.substring(Math.max(0, match.index - 20), match.index);
            if (/[a-zA-Z_$]\s*$/.test(beforeMatch)) {
              continue;
            }

            // 跳过 script 标签内的内容（避免误报 JS 数组）
            const beforeContent = htmlContent.substring(0, match.index);
            const lastScriptOpen = beforeContent.lastIndexOf('<script');
            const lastScriptClose = beforeContent.lastIndexOf('</script');
            if (lastScriptOpen > lastScriptClose) {
              continue;
            }

            // 跳过 CSS 中的属性选择器（如 [type="text"]）
            const lastStyleOpen = beforeContent.lastIndexOf('<style');
            const lastStyleClose = beforeContent.lastIndexOf('</style');
            if (lastStyleOpen > lastStyleClose) {
              continue;
            }

            errors.push({
              type: 'reference',
              file: 'index.html',
              line,
              reference,
              message: `Markdown 引用格式未清理: "${reference}"`,
            });
          }
        }
      }

      // 报告警告（不阻断构建）
      if (errors.length > 0) {
        let message = '\n⚠️  Template Check Warning:\n\n';

        const templateFileErrors = errors.filter(e => e.type === 'template-file');
        const placeholderErrors = errors.filter(e => e.type === 'placeholder');
        const referenceErrors = errors.filter(e => e.type === 'reference');

        if (templateFileErrors.length > 0) {
          message += '📄 模板残留文件:\n';
          templateFileErrors.forEach(err => {
            message += `   ⚠️  ${err.message}\n`;
          });
          message += '\n   💡 建议: 删除该文件，或将内容更新为当前项目的实际说明\n\n';
        }

        if (placeholderErrors.length > 0) {
          message += '📝 未替换的占位符:\n';
          placeholderErrors.forEach(err => {
            message += `   ⚠️  ${err.file}:${err.line} - ${err.placeholder}\n`;
          });
          message += '\n   💡 建议: 将占位符替换为实际内容\n\n';
        }

        if (referenceErrors.length > 0) {
          message += '🔗 Markdown 引用格式残留:\n';
          referenceErrors.forEach(err => {
            message += `   ⚠️  ${err.file}:${err.line} - ${err.reference}\n`;
          });
          message += '\n   💡 建议: 将 [[31]] 或 [31] 格式转换为 HTML 链接，或删除引用标记\n';
        }

        // 输出警告，不抛出错误
        console.warn(message);
      }
    },
  };
}
