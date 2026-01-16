import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://rafi-barides.com';

// Read blog metadata
const blogMetadataPath = path.join(__dirname, '../src/blogs/blogMetadata.json');
const blogs = JSON.parse(fs.readFileSync(blogMetadataPath, 'utf-8'));

// Read lyrics metadata
const lyricsMetadataPath = path.join(__dirname, '../src/Lyrics/lyricsMetadata.json');
const lyrics = JSON.parse(fs.readFileSync(lyricsMetadataPath, 'utf-8'));

// Define all static pages
const staticPages = [
  { url: '', priority: '1.0', changefreq: 'weekly' }, // homepage
  { url: '/software', priority: '0.8', changefreq: 'monthly' },
  { url: '/photography', priority: '0.8', changefreq: 'monthly' },
  { url: '/art', priority: '0.8', changefreq: 'monthly' },
  { url: '/product', priority: '0.8', changefreq: 'monthly' },
  { url: '/rafi', priority: '0.8', changefreq: 'monthly' },
  { url: '/blog', priority: '0.9', changefreq: 'weekly' },
  { url: '/lyrics', priority: '0.9', changefreq: 'monthly' },
  { url: '/listen', priority: '1.0', changefreq: 'monthly' }
];

// Add blog posts to the sitemap
const blogPages = blogs.map(blog => ({
  url: `/blog/${blog.slug}`,
  priority: '0.9',
  changefreq: 'monthly',
  lastmod: blog.date
}));

// Add lyrics pages to the sitemap
const lyricsPages = lyrics.map(song => ({
  url: `/lyrics/${song.slug}`,
  priority: '0.9',
  changefreq: 'monthly',
  lastmod: `${song.year}-01-01`
}));

const allPages = [...staticPages, ...blogPages, ...lyricsPages];

// Generate sitemap XML
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${allPages.map(page => `  <url>
    <loc>${BASE_URL}${page.url}</loc>${page.lastmod ? `
    <lastmod>${page.lastmod}</lastmod>` : ''}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Write sitemap to dist folder
const sitemapPath = path.join(__dirname, '../dist/sitemap.xml');
fs.writeFileSync(sitemapPath, sitemap);
console.log('✓ Generated sitemap.xml');

// Also update in public folder for reference
const publicSitemapPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(publicSitemapPath, sitemap);
console.log('✓ Updated public/sitemap.xml');

console.log(`\nSitemap generated with ${allPages.length} URLs`);

