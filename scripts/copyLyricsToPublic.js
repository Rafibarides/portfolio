import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create public/lyrics directory if it doesn't exist
const publicLyricsDir = path.join(__dirname, '../public/lyrics');
if (!fs.existsSync(publicLyricsDir)) {
  fs.mkdirSync(publicLyricsDir, { recursive: true });
}

// Copy lyricsMetadata.json
const metadataSource = path.join(__dirname, '../src/Lyrics/lyricsMetadata.json');
const metadataDest = path.join(publicLyricsDir, 'lyricsMetadata.json');
fs.copyFileSync(metadataSource, metadataDest);
console.log('✓ Copied lyricsMetadata.json to public/lyrics/');

// Copy all lyrics text files
const srcLyricsDir = path.join(__dirname, '../src/Lyrics');
const files = fs.readdirSync(srcLyricsDir);

for (const file of files) {
  if (file.endsWith('.txt')) {
    const source = path.join(srcLyricsDir, file);
    const dest = path.join(publicLyricsDir, file);
    fs.copyFileSync(source, dest);
    console.log(`✓ Copied ${file} to public/lyrics/`);
  }
}

console.log('\nLyrics files copied to public directory for development!');

