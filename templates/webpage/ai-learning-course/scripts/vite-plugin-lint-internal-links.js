/**
 * Vite plugin to lint HTML <a> tags with target="_blank" for internal links
 * This complements the ESLint plugin which checks JavaScript code
 */

function isInternalLink(url) {
  if (!url || typeof url !== 'string') {
    return false;
  }
  
  url = url.trim();
  
  // Empty or hash-only links are internal
  if (url === '' || url.startsWith('#')) {
    return true;
  }
  
  // Protocol-relative URLs (//example.com) are external - 必须在 / 检查之前
  if (url.startsWith('//')) {
    return false;
  }
  
  // Absolute URLs with http/https are external
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return false;
  }
  
  // Relative paths are internal
  if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../')) {
    return true;
  }
  
  // Everything else is considered internal
  return true;
}

function getLineNumber(html, index) {
  return html.substring(0, index).split('\n').length;
}

export default function lintInternalLinksPlugin() {
  return {
    name: 'lint-internal-links',
    enforce: 'pre',
    
    transformIndexHtml(html, ctx) {
      const filename = ctx.filename || 'index.html';
      const errors = [];
      
      // Match <a> tags with target="_blank" or target="_new"
      // Pattern: <a ... href="..." target="_blank" ...> or <a ... target="_blank" ... href="...">
      const anchorRegex = /<a\s+[^>]*>/gi;
      let match;
      
      while ((match = anchorRegex.exec(html)) !== null) {
        const tagContent = match[0];
        
        // Extract href and target attributes
        const hrefMatch = tagContent.match(/href\s*=\s*["']([^"']+)["']/i);
        const targetMatch = tagContent.match(/target\s*=\s*["']([^"']+)["']/i);
        
        if (targetMatch) {
          const targetValue = targetMatch[1].trim().toLowerCase();
          
          // Check if target is _blank or _new
          if (targetValue === '_blank' || targetValue === '_new') {
            if (hrefMatch) {
              const hrefValue = hrefMatch[1].trim();
              
              if (isInternalLink(hrefValue)) {
                const lineNumber = getLineNumber(html, match.index);
                errors.push({
                  line: lineNumber,
                  column: match.index,
                  message: `Do not use target="_blank" for internal links. Remove the target attribute or use regular navigation.`,
                  href: hrefValue,
                });
              }
            } else {
              // No href attribute, but has target="_blank" - warn anyway
              const lineNumber = getLineNumber(html, match.index);
              errors.push({
                line: lineNumber,
                column: match.index,
                message: `Be careful when using target="_blank" without an href attribute.`,
              });
            }
          }
        }
      }
      
      // Report errors
      if (errors.length > 0) {
        console.error(`\n❌ Linting errors in ${filename}:`);
        errors.forEach(error => {
          console.error(`  Line ${error.line}: ${error.message}`);
          if (error.href) {
            console.error(`    href: ${error.href}`);
          }
        });
        console.error('');
        
        // In development, we can choose to throw or just warn
        // For now, we'll throw to fail the build
        throw new Error(`Found ${errors.length} linting error(s) in ${filename}`);
      }
      
      return html;
    },
  };
}

