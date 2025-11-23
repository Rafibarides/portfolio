/**
 * Utility functions for blog functionality
 */

/**
 * Convert markdown to HTML (simple implementation)
 * For production, consider using a library like marked or remark
 */
export function markdownToHtml(markdown) {
  let html = markdown;
  
  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  
  // Bold
  html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
  
  // Links
  html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Paragraphs (split by double newlines)
  const paragraphs = html.split('\n\n');
  html = paragraphs.map(p => {
    // Don't wrap headers in paragraphs
    if (p.startsWith('<h') || p.trim() === '') {
      return p;
    }
    return `<p>${p.replace(/\n/g, ' ')}</p>`;
  }).join('\n');
  
  return html;
}

/**
 * Generate a slug from a title
 */
export function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Extract plain text from markdown (for descriptions)
 */
export function extractPlainText(markdown, maxLength = 160) {
  const text = markdown
    .replace(/#{1,6}\s/g, '')
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\n/g, ' ')
    .trim();
  
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Format date for display
 */
export function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

/**
 * Get full URL for a blog post
 */
export function getBlogUrl(slug) {
  const baseUrl = 'https://rafi-barides.com';
  return `${baseUrl}/blog/${slug}`;
}

