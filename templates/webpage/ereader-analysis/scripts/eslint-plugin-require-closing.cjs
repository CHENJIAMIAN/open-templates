/**
 * ESLint plugin to check closing tags for critical elements only
 *
 * Only checks: style, script (elements that cause serious issues if unclosed)
 * Ignores: SVG elements, void elements (meta, br, input, etc.)
 */

module.exports = {
  meta: {
    name: 'eslint-plugin-require-closing',
    version: '1.0.0',
  },
  rules: {
    'require-style-closing': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Require style tags to have closing tags',
          category: 'Possible Errors',
          recommended: true,
        },
        messages: {
          missingClosing: '<style> tag must have a closing </style> tag',
        },
        schema: [],
      },
      create(context) {
        return {
          'HTMLElement[tagName="style"]': function (node) {
            // Check if the node has a proper closing tag
            // In @html-eslint AST, self-closing or unclosed tags have selfClosing: true
            // or the close property might be missing/null
            if (node.selfClosing || !node.close) {
              context.report({
                node,
                messageId: 'missingClosing',
              });
            }
          },
        };
      },
    },
    'require-script-closing': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Require script tags to have closing tags',
          category: 'Possible Errors',
          recommended: true,
        },
        messages: {
          missingClosing: '<script> tag must have a closing </script> tag',
        },
        schema: [],
      },
      create(context) {
        return {
          'HTMLElement[tagName="script"]': function (node) {
            if (node.selfClosing || !node.close) {
              context.report({
                node,
                messageId: 'missingClosing',
              });
            }
          },
        };
      },
    },
  },
};
