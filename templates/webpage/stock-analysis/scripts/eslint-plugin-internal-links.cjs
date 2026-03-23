/**
 * ESLint plugin to prevent using window.open() or target="_blank" for internal links
 *
 * Rules:
 * - no-window-open-internal: Prevents window.open() with internal links
 * - no-internal-link-target-blank: Prevents target="_blank" on internal links in JSX
 * - no-iframe-internal-src: Prevents iframe with internal src paths (static-runtime doesn't support multi-page)
 */

module.exports = {
  meta: {
    name: 'eslint-plugin-internal-links',
    version: '1.0.0',
  },
  rules: {
    'no-window-open-internal': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow window.open() with internal links',
          category: 'Best Practices',
          recommended: true,
        },
        messages: {
          absolutePath:
            'Avoid using window.open() for internal links (starts with /). Use regular navigation (e.g., window.location.href or router) instead.',
          relativePath:
            'Avoid using window.open() for internal links (starts with ./). Use regular navigation (e.g., window.location.href or router) instead.',
          parentRelativePath:
            'Avoid using window.open() for internal links (starts with ../). Use regular navigation (e.g., window.location.href or router) instead.',
          anchorLink:
            'Avoid using window.open() for anchor links (starts with #). Use regular navigation instead.',
        },
        schema: [],
      },
      create(context) {
        return {
          CallExpression(node) {
            // Check if it's window.open()
            if (
              node.callee.type === 'MemberExpression' &&
              node.callee.object &&
              node.callee.object.name === 'window' &&
              node.callee.property &&
              node.callee.property.name === 'open' &&
              node.arguments.length > 0 &&
              node.arguments[0].type === 'Literal' &&
              typeof node.arguments[0].value === 'string'
            ) {
              const url = node.arguments[0].value;

              if (url.startsWith('/')) {
                context.report({
                  node: node.arguments[0],
                  messageId: 'absolutePath',
                });
              } else if (url.startsWith('./')) {
                context.report({
                  node: node.arguments[0],
                  messageId: 'relativePath',
                });
              } else if (url.startsWith('../')) {
                context.report({
                  node: node.arguments[0],
                  messageId: 'parentRelativePath',
                });
              } else if (url.startsWith('#')) {
                context.report({
                  node: node.arguments[0],
                  messageId: 'anchorLink',
                });
              }
            }
          },
        };
      },
    },
    'no-internal-link-target-blank': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow target="_blank" on internal links in JSX',
          category: 'Best Practices',
          recommended: true,
        },
        messages: {
          absolutePath:
            'Do not use target="_blank" for internal links (href starts with /). Use regular navigation instead.',
          relativePath:
            'Do not use target="_blank" for internal links (href starts with ./). Use regular navigation instead.',
          parentRelativePath:
            'Do not use target="_blank" for internal links (href starts with ../). Use regular navigation instead.',
          anchorLink:
            'Do not use target="_blank" for anchor links (href starts with #). Use regular navigation instead.',
        },
        schema: [],
      },
      create(context) {
        return {
          JSXOpeningElement(node) {
            // Check if it's an <a> tag
            if (node.name && node.name.type === 'JSXIdentifier' && node.name.name === 'a') {
              let hrefValue = null;
              let hasTargetBlank = false;

              // Find href and target attributes
              for (const attr of node.attributes) {
                if (attr.type === 'JSXAttribute') {
                  if (attr.name && attr.name.name === 'href') {
                    if (attr.value && attr.value.type === 'Literal') {
                      hrefValue = attr.value.value;
                    } else if (attr.value && attr.value.type === 'JSXExpressionContainer') {
                      // Skip if href is a JSX expression (dynamic)
                      return;
                    }
                  } else if (attr.name && attr.name.name === 'target') {
                    if (
                      attr.value &&
                      attr.value.type === 'Literal' &&
                      (attr.value.value === '_blank' || attr.value.value === '_new')
                    ) {
                      hasTargetBlank = true;
                    }
                  }
                }
              }

              // Report error if internal link with target="_blank"
              if (hasTargetBlank && typeof hrefValue === 'string') {
                // Find the target attribute node for reporting
                let targetAttr = null;
                for (const attr of node.attributes) {
                  if (attr.type === 'JSXAttribute' && attr.name && attr.name.name === 'target') {
                    targetAttr = attr;
                    break;
                  }
                }

                if (hrefValue.startsWith('/')) {
                  context.report({
                    node: targetAttr || node,
                    messageId: 'absolutePath',
                  });
                } else if (hrefValue.startsWith('./')) {
                  context.report({
                    node: targetAttr || node,
                    messageId: 'relativePath',
                  });
                } else if (hrefValue.startsWith('../')) {
                  context.report({
                    node: targetAttr || node,
                    messageId: 'parentRelativePath',
                  });
                } else if (hrefValue.startsWith('#')) {
                  context.report({
                    node: targetAttr || node,
                    messageId: 'anchorLink',
                  });
                }
              }
            }
          },
        };
      },
    },
    // 检测 iframe 引用内部路径
    'no-iframe-internal-src': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Disallow iframe with internal src paths',
          recommended: true,
        },
        messages: {
          internalSrc:
            'iframe 不能引用内部 HTML 文件 ({{src}})。构建后只保留 index.html，其他 HTML 文件会丢失。',
        },
        schema: [],
      },
      create(context) {
        return {
          'HTMLElement[tagName="iframe"]': function (node) {
            const srcAttr = node.attributes?.find((attr) => attr.key?.value === 'src');
            const srcValue = srcAttr?.value?.value;

            if (typeof srcValue === 'string') {
              // 检测内部路径: ./ ../ /
              if (
                srcValue.startsWith('./') ||
                srcValue.startsWith('../') ||
                srcValue.startsWith('/')
              ) {
                context.report({
                  node: srcAttr || node,
                  messageId: 'internalSrc',
                  data: { src: srcValue },
                });
              }
            }
          },
        };
      },
    },
  },
};
