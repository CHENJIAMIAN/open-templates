// vite-plugin-basename-check.js
// 检测并修复 index.html 中的 basename 相关逻辑
// 如果这段逻辑被删除，会在构建时自动加回
// 此版本用于 static-html 模板

export default function basenameCheckPlugin() {
  // static-html 模板的 basename 脚本
  const BASENAME_SCRIPT = `    <script>
      // DO NOT REMOVE THIS SCRIPT
      // 运行时动态计算 basename
      (function() {
        var pathname = window.location.pathname;
        pathname = pathname.replace(/\\/index\\.html?$/, '');
        var basename = pathname || '/';
        if (basename !== '/' && basename.endsWith('/')) {
          basename = basename.slice(0, -1);
        }
        window.__APP_BASENAME__ = basename;
        
        // 设置 <base> 标签，让所有相对路径资源正确解析
        var base = document.createElement('base');
        base.href = basename + '/';
        document.head.appendChild(base);
      })();
    </script>`;

  return {
    name: 'basename-check',
    enforce: 'pre',

    transformIndexHtml(html) {
      // 检查是否包含 basename 脚本的关键标识
      const hasBasenameScript = 
        html.includes('DO NOT REMOVE THIS SCRIPT') &&
        html.includes('window.__APP_BASENAME__') &&
        html.includes('运行时动态计算 basename');

      if (!hasBasenameScript) {
        console.warn('⚠️  [basename-check] Basename script not found in index.html, auto-inserting...');
        
        // 查找 <head> 标签的位置
        const headMatch = html.match(/<head[^>]*>/i);
        if (!headMatch) {
          console.error('❌ [basename-check] Cannot find <head> tag in index.html');
          return html;
        }

        const headStartIndex = headMatch.index + headMatch[0].length;
        
        // 查找 </head> 标签的位置
        const headEndMatch = html.indexOf('</head>', headStartIndex);
        if (headEndMatch === -1) {
          console.error('❌ [basename-check] Cannot find </head> tag in index.html');
          return html;
        }

        // 在 <head> 开始后，查找第一个非空白字符的位置
        // 通常我们希望脚本在 meta 标签之后，title 之前或之后
        // 为了安全，我们直接插入到 <head> 标签之后
        const insertPosition = headStartIndex;
        
        // 插入 basename 脚本
        const newHtml = 
          html.slice(0, insertPosition) + 
          '\n' + BASENAME_SCRIPT + '\n' +
          html.slice(insertPosition);

        console.log('✅ [basename-check] Basename script inserted successfully');
        return newHtml;
      }

      return html;
    },
  };
}

