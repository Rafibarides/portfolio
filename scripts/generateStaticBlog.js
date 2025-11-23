import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read blog metadata
const blogMetadataPath = path.join(__dirname, '../src/blogs/blogMetadata.json');
const blogs = JSON.parse(fs.readFileSync(blogMetadataPath, 'utf-8'));

// Base URL
const BASE_URL = 'https://rafi-barides.com';

// Create dist/blog directory if it doesn't exist
const blogDistDir = path.join(__dirname, '../dist/blog');
if (!fs.existsSync(blogDistDir)) {
  fs.mkdirSync(blogDistDir, { recursive: true });
}

// Function to convert markdown to simple HTML
function markdownToHtml(markdown) {
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
  
  // Paragraphs
  const lines = html.split('\n');
  let inParagraph = false;
  const processed = [];
  
  for (let line of lines) {
    const trimmed = line.trim();
    
    if (trimmed === '') {
      if (inParagraph) {
        processed.push('</p>');
        inParagraph = false;
      }
    } else if (trimmed.startsWith('<h')) {
      if (inParagraph) {
        processed.push('</p>');
        inParagraph = false;
      }
      processed.push(trimmed);
    } else {
      if (!inParagraph) {
        processed.push('<p>');
        inParagraph = true;
      } else {
        processed.push(' ');
      }
      processed.push(trimmed);
    }
  }
  
  if (inParagraph) {
    processed.push('</p>');
  }
  
  return processed.join('');
}

// Function to format date
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Generate HTML template for blog post
function generateBlogPostHtml(blog, content) {
  const htmlContent = markdownToHtml(content);
  const canonical = `${BASE_URL}/blog/${blog.slug}`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.description,
    "image": blog.image,
    "datePublished": blog.date,
    "dateModified": blog.date,
    "author": {
      "@type": "Person",
      "name": blog.author,
      "url": BASE_URL,
      "sameAs": [
        "https://github.com/rafibarides",
        "https://www.linkedin.com/in/rafibarides"
      ]
    },
    "publisher": {
      "@type": "Person",
      "name": "Rafi Barides"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonical
    },
    "keywords": blog.keywords.join(', ')
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${blog.title} - Rafi Barides</title>
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="${blog.description}">
  <meta name="keywords" content="${blog.keywords.join(', ')}">
  <meta name="author" content="${blog.author}">
  <link rel="canonical" href="${canonical}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${blog.title}">
  <meta property="og:description" content="${blog.description}">
  <meta property="og:image" content="${blog.image}">
  <meta property="article:published_time" content="${blog.date}">
  <meta property="article:author" content="${blog.author}">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${canonical}">
  <meta property="twitter:title" content="${blog.title}">
  <meta property="twitter:description" content="${blog.description}">
  <meta property="twitter:image" content="${blog.image}">
  
  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
${JSON.stringify(structuredData, null, 2)}
  </script>
  
  <!-- Styles -->
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      line-height: 1.8;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
      color: #d0d0d0;
      padding: 2rem 1rem 8rem 1rem;
      min-height: 100vh;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
    }
    
    .back-link {
      position: fixed;
      bottom: 2rem;
      left: 2rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      color: #ffffff;
      text-decoration: none;
      font-weight: 400;
      font-size: 0.875rem;
      padding: 0.75rem 1.25rem;
      border-radius: 50px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
    
    .back-link:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }
    
    article {
      background: rgba(255, 255, 255, 0.03);
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .article-header {
      padding: 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .article-image {
      width: 100%;
      height: 400px;
      overflow: hidden;
      border-radius: 12px;
      margin-bottom: 2rem;
    }
    
    .article-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1rem;
      color: #ffffff;
      font-family: 'Poppins', sans-serif;
      letter-spacing: 0.01em;
    }
    
    .subtitle {
      font-size: 1.5rem;
      color: #b0b0b0;
      margin-bottom: 1.5rem;
      font-style: italic;
      font-weight: 400;
    }
    
    .meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.95rem;
      color: #888;
      flex-wrap: wrap;
    }
    
    .author {
      font-weight: 500;
      color: #a0a0a0;
    }
    
    .divider {
      color: #555;
    }
    
    .content {
      padding: 2.5rem 2rem;
      font-size: 1.1rem;
    }
    
    .content h1 {
      font-size: 2rem;
      margin: 2.5rem 0 1rem 0;
      color: #ffffff;
    }
    
    .content h2 {
      font-size: 1.75rem;
      margin: 2rem 0 1rem 0;
      color: #ffffff;
    }
    
    .content h3 {
      font-size: 1.5rem;
      margin: 1.75rem 0 0.75rem 0;
      color: #e0e0e0;
    }
    
    .content p {
      margin-bottom: 1.5rem;
    }
    
    .content strong {
      color: #ffffff;
      font-weight: 600;
    }
    
    .content em {
      font-style: italic;
      color: #c0c0c0;
    }
    
    .content a {
      color: #ffffff;
      text-decoration: none;
      border-bottom: 1px solid rgba(255, 255, 255, 0.4);
      transition: border-color 0.3s ease;
    }
    
    .content a:hover {
      border-bottom-color: #ffffff;
    }
    
    .article-footer {
      padding: 2rem;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      display: none;
    }
    
      @media (max-width: 768px) {
      body {
        padding: 1rem 0.5rem 8rem 0.5rem;
      }
      
      h1 {
        font-size: 2rem;
      }
      
      .subtitle {
        font-size: 1.25rem;
      }
      
      .content {
        padding: 2rem 1.5rem;
        font-size: 1rem;
      }
      
      .article-image {
        height: 300px;
      }
      
      .back-link {
        bottom: 1rem;
        left: 1rem;
        font-size: 0.8rem;
        padding: 0.6rem 1rem;
      }
    }
    
    /* React app will load over this */
    #root {
      display: none;
    }
  </style>
  
  <!-- React App will hydrate over this content -->
  <script type="module" crossorigin src="/assets/index.js"></script>
  <link rel="stylesheet" href="/assets/index.css">
</head>
<body>
  <a href="/blog" class="back-link">← Blog</a>
  <div class="container">
    
    <article>
      <header class="article-header">
        ${blog.image ? `
        <div class="article-image">
          <img src="${blog.image}" alt="${blog.title}">
        </div>
        ` : ''}
        <h1>${blog.title}</h1>
        ${blog.subtitle ? `<div class="subtitle">${blog.subtitle}</div>` : ''}
        <div class="meta">
          <span class="author">By ${blog.author}</span>
          <span class="divider">•</span>
          <time datetime="${blog.date}">${formatDate(blog.date)}</time>
          <span class="divider">•</span>
          <span class="read-time">${blog.readTime}</span>
        </div>
      </header>
      
      <div class="content">
        ${htmlContent}
      </div>
    </article>
  </div>
  
  <!-- React will mount here -->
  <div id="root"></div>
</body>
</html>`;
}

// Generate blog listing page
function generateBlogListingHtml(blogs) {
  const canonical = `${BASE_URL}/blog`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Rafi Barides Blog",
    "description": "Personal blog by Rafi Barides covering music, technology, life experiences, and creative journey",
    "url": canonical,
    "author": {
      "@type": "Person",
      "name": "Rafi Barides",
      "url": BASE_URL,
      "sameAs": [
        "https://github.com/rafibarides",
        "https://www.linkedin.com/in/rafibarides"
      ]
    },
    "blogPost": blogs.map(blog => ({
      "@type": "BlogPosting",
      "headline": blog.title,
      "url": `${BASE_URL}/blog/${blog.slug}`,
      "datePublished": blog.date,
      "author": {
        "@type": "Person",
        "name": blog.author
      },
      "image": blog.image
    }))
  };

  const blogCards = blogs.map(blog => `
    <a href="/blog/${blog.slug}" class="blog-card">
      ${blog.image ? `
      <div class="blog-card-image">
        <img src="${blog.image}" alt="${blog.title}" loading="lazy">
      </div>
      ` : ''}
      <div class="blog-card-content">
        <h2>${blog.title}</h2>
        ${blog.subtitle ? `<p class="blog-card-subtitle">${blog.subtitle}</p>` : ''}
        <div class="blog-card-meta">
          <span class="blog-date">${formatDate(blog.date)}</span>
          <span class="blog-divider">•</span>
          <span class="blog-read-time">${blog.readTime}</span>
        </div>
        ${blog.description ? `<p class="blog-card-description">${blog.description}</p>` : ''}
      </div>
    </a>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog - Rafi Barides</title>
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="Personal blog by Rafi Barides covering music, singing, technology, personal growth, and creative journey. Read about vocal transformation, music production, and life experiences.">
  <meta name="keywords" content="Rafi Barides blog, music blog, vocal training blog, personal growth, music production">
  <link rel="canonical" href="${canonical}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="Blog - Rafi Barides">
  <meta property="og:description" content="Personal blog by Rafi Barides covering music, technology, and life experiences">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary">
  <meta property="twitter:url" content="${canonical}">
  <meta property="twitter:title" content="Blog - Rafi Barides">
  <meta property="twitter:description" content="Personal blog by Rafi Barides covering music, technology, and life experiences">
  
  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
${JSON.stringify(structuredData, null, 2)}
  </script>
  
  <!-- Styles -->
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
      background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
      color: #ffffff;
      padding: 2rem 1rem 8rem 1rem;
      min-height: 100vh;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .header {
      text-align: center;
      margin-bottom: 4rem;
      padding: 2rem 0;
    }
    
    .back-link {
      position: fixed;
      bottom: 2rem;
      left: 2rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      color: #ffffff;
      text-decoration: none;
      font-weight: 400;
      font-size: 0.875rem;
      padding: 0.75rem 1.25rem;
      border-radius: 50px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: all 0.3s ease;
      z-index: 1000;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
    
    .back-link:hover {
      background: rgba(255, 255, 255, 0.2);
      border-color: rgba(255, 255, 255, 0.4);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
    }
    
    h1 {
      font-size: 3.5rem;
      font-weight: 700;
      margin: 1rem 0;
      color: #ffffff;
      font-family: 'Poppins', sans-serif;
      letter-spacing: 0.02em;
    }
    
    .subtitle {
      font-size: 1.25rem;
      color: #a0a0a0;
      margin-top: 0.5rem;
    }
    
    .blog-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
      padding: 1rem 0;
    }
    
    .blog-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      overflow: hidden;
      text-decoration: none;
      color: inherit;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: block;
    }
    
    .blog-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }
    
    .blog-card-image {
      width: 100%;
      height: 250px;
      overflow: hidden;
      background: rgba(0, 0, 0, 0.3);
    }
    
    .blog-card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .blog-card:hover .blog-card-image img {
      transform: scale(1.05);
    }
    
    .blog-card-content {
      padding: 1.5rem;
    }
    
    .blog-card h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #ffffff;
      line-height: 1.3;
    }
    
    .blog-card-subtitle {
      font-size: 1rem;
      color: #b0b0b0;
      margin-bottom: 1rem;
      font-style: italic;
    }
    
    .blog-card-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: #888;
      margin-bottom: 1rem;
    }
    
    .blog-divider {
      color: #555;
    }
    
    .blog-card-description {
      font-size: 0.95rem;
      color: #a0a0a0;
      line-height: 1.6;
      margin-top: 1rem;
    }
    
    @media (max-width: 768px) {
      body {
        padding: 1rem 0.5rem 8rem 0.5rem;
      }
      
      h1 {
        font-size: 2.5rem;
      }
      
      .blog-grid {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }
      
      .back-link {
        bottom: 1rem;
        left: 1rem;
        font-size: 0.8rem;
        padding: 0.6rem 1rem;
      }
    }
    
    /* React app will load over this */
    #root {
      display: none;
    }
  </style>
  
  <!-- React App will hydrate over this content -->
  <script type="module" crossorigin src="/assets/index.js"></script>
  <link rel="stylesheet" href="/assets/index.css">
</head>
<body>
  <a href="/" class="back-link">← Portfolio</a>
  <div class="container">
    <header class="header">
      <h1>Blog</h1>
      <p class="subtitle">Thoughts on music, technology, and life</p>
    </header>
    
    <div class="blog-grid">
      ${blogCards}
    </div>
  </div>
  
  <!-- React will mount here -->
  <div id="root"></div>
</body>
</html>`;
}

// Main function to generate all static pages
console.log('Generating static blog pages...');

// Create dist/blogs directory for markdown files and metadata
const blogsDataDir = path.join(__dirname, '../dist/blogs');
if (!fs.existsSync(blogsDataDir)) {
  fs.mkdirSync(blogsDataDir, { recursive: true });
}

// Copy blog metadata to dist/blogs
const metadataSourcePath = path.join(__dirname, '../src/blogs/blogMetadata.json');
const metadataDestPath = path.join(blogsDataDir, 'blogMetadata.json');
fs.copyFileSync(metadataSourcePath, metadataDestPath);
console.log('✓ Copied blogMetadata.json to dist/blogs/');

// Generate blog listing page
const listingHtml = generateBlogListingHtml(blogs);
fs.writeFileSync(path.join(blogDistDir, 'index.html'), listingHtml);
console.log('✓ Generated /blog/index.html');

// Generate individual blog post pages and copy markdown files
for (const blog of blogs) {
  const markdownPath = path.join(__dirname, '../src/blogs', blog.markdownFile);
  const markdown = fs.readFileSync(markdownPath, 'utf-8');
  
  // Copy markdown file to dist/blogs
  const markdownDestPath = path.join(blogsDataDir, blog.markdownFile);
  fs.copyFileSync(markdownPath, markdownDestPath);
  console.log(`✓ Copied ${blog.markdownFile} to dist/blogs/`);
  
  const postDir = path.join(blogDistDir, blog.slug);
  if (!fs.existsSync(postDir)) {
    fs.mkdirSync(postDir, { recursive: true });
  }
  
  const postHtml = generateBlogPostHtml(blog, markdown);
  fs.writeFileSync(path.join(postDir, 'index.html'), postHtml);
  console.log(`✓ Generated /blog/${blog.slug}/index.html`);
}

console.log('\nStatic blog pages generated successfully!');

