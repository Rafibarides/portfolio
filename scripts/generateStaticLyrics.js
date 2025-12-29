import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read lyrics metadata
const lyricsMetadataPath = path.join(__dirname, '../src/Lyrics/lyricsMetadata.json');
const lyrics = JSON.parse(fs.readFileSync(lyricsMetadataPath, 'utf-8'));

// Base URL
const BASE_URL = 'https://rafi-barides.com';

// Create dist/lyrics directory if it doesn't exist
const lyricsDistDir = path.join(__dirname, '../dist/lyrics');
if (!fs.existsSync(lyricsDistDir)) {
  fs.mkdirSync(lyricsDistDir, { recursive: true });
}

// Function to format lyrics with proper line breaks
function formatLyrics(text) {
  // Preserve line breaks by converting to <br> tags
  return text.split('\n').map(line => {
    const trimmed = line.trim();
    if (trimmed === '') {
      return '<br>';
    }
    return trimmed;
  }).join('<br>');
}

// Generate HTML template for individual lyrics page
function generateLyricsPostHtml(song, lyricsContent) {
  const formattedLyrics = formatLyrics(lyricsContent);
  const canonical = `${BASE_URL}/lyrics/${song.slug}`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicComposition",
    "name": song.title,
    "composer": {
      "@type": "Person",
      "name": song.writer,
      "url": BASE_URL,
      "sameAs": [
        "https://github.com/rafibarides",
        "https://www.linkedin.com/in/rafibarides"
      ]
    },
    "dateCreated": `${song.year}-01-01`,
    "copyrightYear": song.year,
    "url": canonical,
    "description": `Complete lyrics for "${song.title}" written by ${song.writer} in ${song.year}. Original song lyrics by Rafi Barides.`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonical
    },
    "inLanguage": "en-US",
    "keywords": `${song.title}, Rafi Barides lyrics, song lyrics, ${song.writer}, ${song.year}`
  };

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${song.title} - Lyrics by Rafi Barides | ${song.year}</title>
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="Complete lyrics for &quot;${song.title}&quot; written by ${song.writer} in ${song.year}. Original song lyrics by Rafi Barides.">
  <meta name="keywords" content="${song.title}, Rafi Barides lyrics, song lyrics, ${song.writer}, ${song.year}">
  <meta name="author" content="${song.writer}">
  <link rel="canonical" href="${canonical}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${song.title} - Lyrics by Rafi Barides">
  <meta property="og:description" content="Complete lyrics for &quot;${song.title}&quot; written by ${song.writer} in ${song.year}.">
  <meta property="article:published_time" content="${song.year}-01-01">
  <meta property="article:author" content="${song.writer}">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary">
  <meta property="twitter:url" content="${canonical}">
  <meta property="twitter:title" content="${song.title} - Lyrics by Rafi Barides">
  <meta property="twitter:description" content="Complete lyrics for &quot;${song.title}&quot; written by ${song.writer} in ${song.year}.">
  
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
    
    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 1rem;
      color: #ffffff;
      font-family: 'Poppins', sans-serif;
      letter-spacing: 0.01em;
    }
    
    .meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.95rem;
      color: #888;
      flex-wrap: wrap;
    }
    
    .meta strong {
      color: #ffffff;
      font-weight: 600;
    }
    
    .writer {
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
    
    .lyrics-text {
      font-family: 'Poppins', sans-serif;
      font-size: 1.1rem;
      line-height: 1.8;
      color: #d0d0d0;
      white-space: pre-wrap;
      word-wrap: break-word;
      margin: 0;
      background: transparent;
      border: none;
      padding: 0;
    }
    
    @media (max-width: 768px) {
      body {
        padding: 1rem 0.5rem 8rem 0.5rem;
      }
      
      h1 {
        font-size: 2rem;
      }
      
      .content {
        padding: 2rem 1.5rem;
      }
      
      .lyrics-text {
        font-size: 1rem;
      }
    }
    
    @media (max-width: 480px) {
      .article-header {
        padding: 1.5rem;
      }
      
      h1 {
        font-size: 1.75rem;
      }
      
      .content {
        padding: 1.5rem 1rem;
      }
      
      .lyrics-text {
        font-size: 0.95rem;
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
  <a href="/lyrics" class="back-link">← Lyrics</a>
  <div class="container">
    
    <article>
      <header class="article-header">
        <h1>${song.title}</h1>
        <div class="meta">
          <span class="writer">
            <strong>Writer:</strong> ${song.writer}
          </span>
          <span class="divider">•</span>
          <time datetime="${song.year}-01-01">
            <strong>Year:</strong> ${song.year}
          </time>
        </div>
      </header>
      
      <div class="content">
        <pre class="lyrics-text">${lyricsContent}</pre>
      </div>
    </article>
  </div>
  
  <!-- React will mount here -->
  <div id="root"></div>
</body>
</html>`;
}

// Generate lyrics listing page
function generateLyricsListingHtml(songs) {
  const canonical = `${BASE_URL}/lyrics`;
  
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Lyrics - Rafi Barides",
    "description": "Complete collection of song lyrics written by Rafi Barides. Original songs from 2025 including This Too Shall Pass, The Proof, The Earth Is Flat, Me And The Truth, Love You Less, In Again, and Chernobyl (Appendix).",
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
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": songs.length,
      "itemListElement": songs.map((song, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "MusicComposition",
          "name": song.title,
          "composer": {
            "@type": "Person",
            "name": song.writer,
            "url": BASE_URL
          },
          "dateCreated": `${song.year}-01-01`,
          "copyrightYear": song.year,
          "url": `${BASE_URL}/lyrics/${song.slug}`
        }
      }))
    }
  };

  const songCards = songs.map(song => `
    <a href="/lyrics/${song.slug}" class="lyrics-card">
      <div class="lyrics-card-content">
        <h2>${song.title}</h2>
        <div class="lyrics-card-meta">
          <span class="lyrics-writer">Written by ${song.writer}</span>
          <span class="lyrics-divider">•</span>
          <span class="lyrics-year">${song.year}</span>
        </div>
      </div>
    </a>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lyrics - Rafi Barides | Original Songs 2025</title>
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="Complete collection of song lyrics written by Rafi Barides. Original songs from 2025 including This Too Shall Pass, The Proof, The Earth Is Flat, Me And The Truth, Love You Less, In Again, and Chernobyl (Appendix).">
  <meta name="keywords" content="Rafi Barides lyrics, song lyrics, original songs, Rafi Barides music, 2025 songs, songwriting">
  <link rel="canonical" href="${canonical}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="Lyrics - Rafi Barides">
  <meta property="og:description" content="Complete collection of song lyrics written by Rafi Barides. Original songs from 2025.">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary">
  <meta property="twitter:url" content="${canonical}">
  <meta property="twitter:title" content="Lyrics - Rafi Barides">
  <meta property="twitter:description" content="Complete collection of song lyrics written by Rafi Barides. Original songs from 2025.">
  
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
      font-weight: 300;
    }
    
    .lyrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
      padding: 1rem 0;
    }
    
    .lyrics-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      overflow: hidden;
      text-decoration: none;
      color: inherit;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: 1px solid rgba(255, 255, 255, 0.1);
      display: block;
    }
    
    .lyrics-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.2);
    }
    
    .lyrics-card-content {
      padding: 1.5rem;
    }
    
    .lyrics-card h2 {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: #ffffff;
      line-height: 1.3;
    }
    
    .lyrics-card-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: #888;
      margin-top: 1rem;
    }
    
    .lyrics-divider {
      color: #555;
    }
    
    .lyrics-writer {
      color: #a0a0a0;
    }
    
    .lyrics-year {
      color: #a0a0a0;
    }
    
    @media (max-width: 768px) {
      body {
        padding: 1rem 0.5rem 8rem 0.5rem;
      }
      
      h1 {
        font-size: 2.5rem;
      }
      
      .lyrics-grid {
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
    
    @media (max-width: 480px) {
      h1 {
        font-size: 2rem;
      }
      
      .subtitle {
        font-size: 1rem;
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
      <h1>Lyrics</h1>
      <p class="subtitle">Original songs by Rafi Barides</p>
    </header>
    
    <div class="lyrics-grid">
      ${songCards}
    </div>
  </div>
  
  <!-- React will mount here -->
  <div id="root"></div>
</body>
</html>`;
}

// Main function to generate all static pages
console.log('Generating static lyrics pages...');

// Create dist/lyrics directory for text files and metadata
const lyricsDataDir = path.join(__dirname, '../dist/lyrics');
if (!fs.existsSync(lyricsDataDir)) {
  fs.mkdirSync(lyricsDataDir, { recursive: true });
}

// Copy lyrics metadata to dist/lyrics
const metadataSourcePath = path.join(__dirname, '../src/Lyrics/lyricsMetadata.json');
const metadataDestPath = path.join(lyricsDataDir, 'lyricsMetadata.json');
fs.copyFileSync(metadataSourcePath, metadataDestPath);
console.log('✓ Copied lyricsMetadata.json to dist/lyrics/');

// Generate lyrics listing page
const listingHtml = generateLyricsListingHtml(lyrics);
fs.writeFileSync(path.join(lyricsDistDir, 'index.html'), listingHtml);
console.log('✓ Generated /lyrics/index.html');

// Generate individual lyrics pages and copy text files
for (const song of lyrics) {
  const lyricsPath = path.join(__dirname, '../src/Lyrics', song.filename);
  const lyricsContent = fs.readFileSync(lyricsPath, 'utf-8');
  
  // Copy lyrics file to dist/lyrics
  const lyricsDestPath = path.join(lyricsDataDir, song.filename);
  fs.copyFileSync(lyricsPath, lyricsDestPath);
  console.log(`✓ Copied ${song.filename} to dist/lyrics/`);
  
  const songDir = path.join(lyricsDistDir, song.slug);
  if (!fs.existsSync(songDir)) {
    fs.mkdirSync(songDir, { recursive: true });
  }
  
  const postHtml = generateLyricsPostHtml(song, lyricsContent);
  fs.writeFileSync(path.join(songDir, 'index.html'), postHtml);
  console.log(`✓ Generated /lyrics/${song.slug}/index.html`);
}

console.log('\nStatic lyrics pages generated successfully!');

