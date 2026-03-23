/**
 * ESLint plugin to ensure img and source tags have valid src/srcset attributes
 *
 * Rules:
 * - require-img-src: Requires img tags to have a non-empty src attribute
 * - require-source-src: Requires source tags to have a non-empty src or srcset attribute
 */

module.exports = {
  meta: {
    name: 'eslint-plugin-require-src',
    version: '1.0.0',
  },
  rules: {
    'require-img-src': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Require img tags to have a non-empty src attribute',
          category: 'Best Practices',
          recommended: true,
        },
        messages: {
          missingSrc: 'img tag must have a src attribute',
          emptySrc: 'img tag src attribute must not be empty',
        },
        schema: [],
      },
      create(context) {
        return {
          'HTMLElement[tagName="img"]': function (node) {
            const srcAttr = node.attributes?.find((attr) => attr.key?.value === 'src');

            // 检查 src 属性是否存在
            if (!srcAttr) {
              context.report({
                node,
                messageId: 'missingSrc',
              });
              return;
            }

            // 检查 src 值是否为空
            const srcValue = srcAttr.value?.value;
            if (srcValue === null || srcValue === undefined || String(srcValue).trim() === '') {
              context.report({
                node: srcAttr,
                messageId: 'emptySrc',
              });
            }
          },
        };
      },
    },
    'require-source-src': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Require source tags to have a non-empty src or srcset attribute',
          category: 'Best Practices',
          recommended: true,
        },
        messages: {
          missingSrc: 'source tag must have a src or srcset attribute',
          emptySrc: 'source tag src attribute must not be empty',
          emptySrcset: 'source tag srcset attribute must not be empty',
        },
        schema: [],
      },
      create(context) {
        return {
          'HTMLElement[tagName="source"]': function (node) {
            const srcAttr = node.attributes?.find((attr) => attr.key?.value === 'src');
            const srcsetAttr = node.attributes?.find((attr) => attr.key?.value === 'srcset');

            // 获取属性值
            const srcValue = srcAttr?.value?.value;
            const srcsetValue = srcsetAttr?.value?.value;

            // 检查是否有有效的 src 或 srcset
            // undefined 或 null 被视为属性不存在（不报错，如果另一个有效）
            // 空字符串被视为属性存在但为空（需要报错）
            const hasValidSrc = srcValue !== null && srcValue !== undefined && String(srcValue).trim() !== '';
            const hasValidSrcset =
              srcsetValue !== null && srcsetValue !== undefined && String(srcsetValue).trim() !== '';

            // 如果 src 属性存在且值为空字符串（不是 undefined），报告错误（即使 srcset 有效）
            if (
              srcAttr &&
              srcAttr.value !== undefined &&
              (srcValue === null || srcValue === '' || String(srcValue).trim() === '')
            ) {
              context.report({
                node: srcAttr,
                messageId: 'emptySrc',
              });
            }

            // 如果 srcset 属性存在且值为空字符串（不是 undefined），报告错误（即使 src 有效）
            if (
              srcsetAttr &&
              srcsetAttr.value !== undefined &&
              (srcsetValue === null || srcsetValue === '' || String(srcsetValue).trim() === '')
            ) {
              context.report({
                node: srcsetAttr,
                messageId: 'emptySrcset',
              });
            }

            // 如果两个属性都无效或都不存在，报告缺少属性
            if (!hasValidSrc && !hasValidSrcset) {
              if (!srcAttr && !srcsetAttr) {
                context.report({
                  node,
                  messageId: 'missingSrc',
                });
              }
            }
          },
        };
      },
    },
  },
};
