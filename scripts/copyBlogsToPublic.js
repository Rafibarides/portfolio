import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create public/blogs directory if it doesn't exist
const publicBlogsDir = path.join(__dirname, '../public/blogs');
if (!fs.existsSync(publicBlogsDir)) {
  fs.mkdirSync(publicBlogsDir, { recursive: true });
}

// Copy blogMetadata.json
const metadataSource = path.join(__dirname, '../src/blogs/blogMetadata.json');
const metadataDest = path.join(publicBlogsDir, 'blogMetadata.json');
fs.copyFileSync(metadataSource, metadataDest);
console.log('✓ Copied blogMetadata.json to public/blogs/');

// Copy all markdown files
const srcBlogsDir = path.join(__dirname, '../src/blogs');
const files = fs.readdirSync(srcBlogsDir);

for (const file of files) {
  if (file.endsWith('.MD') || file.endsWith('.md')) {
    const source = path.join(srcBlogsDir, file);
    const dest = path.join(publicBlogsDir, file);
    fs.copyFileSync(source, dest);
    console.log(`✓ Copied ${file} to public/blogs/`);
  }
}

console.log('\nBlog files copied to public directory for development!');

