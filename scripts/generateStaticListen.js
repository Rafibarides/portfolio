import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL
const BASE_URL = 'https://rafi-barides.com';

// Album data (keep in sync with ListenPage.jsx)
const ALBUM_DATA = {
  title: "Storm Before the Storm",
  artist: "Rafi Barides",
  year: "2025",
  albumArt: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Listen/album-art.png",
  artistPhoto: "https://media.licdn.com/dms/image/v2/D4E03AQEIYnWFI8SldQ/profile-displayphoto-scale_400_400/B4EZltaOy4KoAg-/0/1758477217452?e=2147483647&v=beta&t=BK4xQVSQH9izZ6kPsFqMFTouMh0duFLnUpBClRxw8Qk",
  quote: "...ugh come on, get a grip, cut it out and stop being dramatic",
  quoteAttribution: "My mother, after begrudgingly listening to the album",
  songs: [
    {
      id: 1,
      title: "In Again",
      lyricsFile: "In Again.txt",
      essay: "I am a serial talker. When it comes to dating and romance, I sometimes run into a problem where it feels like I say too much too soon. In this song, I am expressing how when I am real with my love interest, I am letting them in. But letting them in usually pushes them out."
    },
    {
      id: 2,
      title: "Somebody Else",
      lyricsFile: "Love You Less.txt",
      essay: "Earlier this year, I made a decision to end a romantic entanglement. Not because it wasn't great, but because we were misaligned and he didn't want the future that I did."
    },
    {
      id: 3,
      title: "This Too Shall Pass",
      lyricsFile: "This Too Shall Pass.txt",
      essay: "Growing up in an Orthodox Jewish home, we'd often hear the phrase \"gam zeh ya'avor,\" which translates to \"this too shall pass.\" This has been a really hard year for me."
    },
    {
      id: 4,
      title: "Me and the Truth",
      lyricsFile: "Me And The Truth.txt",
      essay: "While journaling, I accepted that I have a pattern of getting into romantic entanglements that consume me because of my purposelessness."
    },
    {
      id: 5,
      title: "The Proof",
      lyricsFile: "The Proof.txt",
      essay: "This song is the most unabashed intersection of romance and purpose on the album. It is probably my most honest."
    },
    {
      id: 6,
      title: "The Earth Is Flat",
      lyricsFile: "The Earth Is Flat.txt",
      essay: "This is the most lighthearted song musically, but it comes from deep pain and jadedness. It is a bitterly sarcastic song about dating."
    },
    {
      id: 7,
      title: "Good Enough",
      lyricsFile: "Good Enough.txt",
      essay: "Growing up, I related deeply to a story about a character who felt inherently not good enough. I later learned this was an inferiority complex."
    },
    {
      id: 8,
      title: "Chernobyl (Appendix)",
      lyricsFile: "Chernobyl (Appendix).txt",
      essay: "This song was written later than the rest of the album. I feel radioactive, like something about me repels people."
    }
  ]
};

// Read lyrics from file
function readLyrics(filename) {
  try {
    const lyricsPath = path.join(__dirname, '../public/lyrics', filename);
    return fs.readFileSync(lyricsPath, 'utf-8');
  } catch (error) {
    console.warn(`Warning: Could not read lyrics file ${filename}`);
    return '';
  }
}

// Generate structured data for the album
function generateStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    "name": ALBUM_DATA.title,
    "byArtist": {
      "@type": "Person",
      "name": ALBUM_DATA.artist,
      "url": BASE_URL,
      "sameAs": [
        "https://github.com/rafibarides",
        "https://www.linkedin.com/in/rafibarides"
      ]
    },
    "datePublished": "2025",
    "image": ALBUM_DATA.albumArt,
    "numTracks": ALBUM_DATA.songs.length,
    "track": ALBUM_DATA.songs.map((song, index) => ({
      "@type": "MusicRecording",
      "name": song.title,
      "position": index + 1,
      "byArtist": {
        "@type": "Person",
        "name": ALBUM_DATA.artist
      },
      "description": song.essay
    })),
    "description": "Storm Before the Storm is a deeply personal album by Rafi Barides exploring themes of love, identity, purpose, and vulnerability through 8 original songs.",
    "genre": ["Singer-Songwriter", "Indie", "Pop"],
    "url": `${BASE_URL}/listen`
  };
}

// Generate song cards HTML
function generateSongCardsHtml() {
  return ALBUM_DATA.songs.map(song => {
    const lyrics = readLyrics(song.lyricsFile);
    const lyricsHtml = lyrics ? `<pre class="song-lyrics-text">${lyrics.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>` : '';
    
    return `
    <article class="song-card" itemscope itemtype="https://schema.org/MusicRecording">
      <meta itemprop="name" content="${song.title}">
      <meta itemprop="byArtist" content="${ALBUM_DATA.artist}">
      <meta itemprop="inAlbum" content="${ALBUM_DATA.title}">
      
      <div class="song-header">
        <div class="song-number">${song.id}</div>
        <div class="song-info">
          <h2 class="song-title" itemprop="name">${song.title}</h2>
        </div>
      </div>
      
      <div class="song-essay" itemprop="description">
        <h3>About this song</h3>
        <p>${song.essay}</p>
      </div>
      
      ${lyrics ? `
      <div class="song-lyrics" itemprop="lyrics">
        <h3>Lyrics</h3>
        ${lyricsHtml}
      </div>
      ` : ''}
    </article>`;
  }).join('\n');
}

// Generate the static HTML page
function generateListenPageHtml() {
  const canonical = `${BASE_URL}/listen`;
  const structuredData = generateStructuredData();
  const songCards = generateSongCardsHtml();
  
  const keywords = [
    "Rafi Barides",
    "Storm Before the Storm",
    "indie music",
    "singer songwriter",
    "original music",
    "album stream",
    "In Again lyrics",
    "Somebody Else lyrics",
    "This Too Shall Pass lyrics",
    "Me and the Truth lyrics",
    "The Proof lyrics",
    "The Earth Is Flat lyrics",
    "Good Enough lyrics",
    "Chernobyl Appendix lyrics",
    "Jewish artist",
    "LGBT musician",
    "queer music"
  ].join(', ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Listen - Storm Before the Storm | Rafi Barides</title>
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="Stream Storm Before the Storm, the debut album by Rafi Barides. 8 deeply personal songs exploring love, identity, purpose, and vulnerability. Listen now with lyrics and stories behind each track.">
  <meta name="keywords" content="${keywords}">
  <meta name="author" content="${ALBUM_DATA.artist}">
  <link rel="canonical" href="${canonical}">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="music.album">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="Listen - Storm Before the Storm | Rafi Barides">
  <meta property="og:description" content="Stream Storm Before the Storm, the debut album by Rafi Barides. 8 deeply personal songs exploring love, identity, purpose, and vulnerability.">
  <meta property="og:image" content="${ALBUM_DATA.albumArt}">
  <meta property="music:musician" content="${BASE_URL}">
  <meta property="music:release_date" content="2025">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="${canonical}">
  <meta property="twitter:title" content="Listen - Storm Before the Storm | Rafi Barides">
  <meta property="twitter:description" content="Stream Storm Before the Storm, the debut album by Rafi Barides. 8 deeply personal songs with lyrics.">
  <meta property="twitter:image" content="${ALBUM_DATA.albumArt}">
  
  <!-- Structured Data (JSON-LD) -->
  <script type="application/ld+json">
${JSON.stringify(structuredData, null, 2)}
  </script>
  
  <!-- Styles -->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      min-height: 100vh;
      background: #070709;
      background-image: 
        radial-gradient(ellipse at 20% 0%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 100%, rgba(236, 72, 153, 0.06) 0%, transparent 50%);
      color: #e8e8ed;
      padding: 2rem 1rem 6rem;
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      line-height: 1.6;
    }
    
    .container {
      max-width: 900px;
      margin: 0 auto;
    }
    
    .back-link {
      position: fixed;
      bottom: 2rem;
      left: 2rem;
      background: rgba(255, 255, 255, 0.06);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      color: #ffffff;
      text-decoration: none;
      font-weight: 500;
      font-size: 0.875rem;
      padding: 0.75rem 1.5rem;
      border-radius: 100px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
      z-index: 1000;
    }
    
    .back-link:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.25);
    }
    
    .album-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 2rem;
      margin-bottom: 4rem;
      padding-top: 2rem;
    }
    
    @media (min-width: 768px) {
      .album-header {
        flex-direction: row;
        text-align: left;
        gap: 3rem;
      }
    }
    
    .album-art-container {
      width: 100%;
      max-width: 320px;
    }
    
    .album-art {
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: cover;
      border-radius: 12px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
    }
    
    .album-label {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: rgba(139, 92, 246, 0.9);
      background: rgba(139, 92, 246, 0.1);
      padding: 0.35rem 0.9rem;
      border-radius: 100px;
      margin-bottom: 1rem;
    }
    
    h1 {
      font-family: 'Syne', sans-serif;
      font-size: clamp(2.5rem, 6vw, 4rem);
      font-weight: 800;
      line-height: 1.05;
      margin: 0 0 0.5rem;
      color: #ffffff;
      letter-spacing: -0.03em;
    }
    
    .album-artist {
      font-size: 1.25rem;
      color: #b8b8c0;
      margin: 0 0 0.5rem;
      font-weight: 500;
    }
    
    .album-meta {
      font-size: 0.9rem;
      color: #6b6b78;
      margin: 0 0 1.5rem;
    }
    
    .album-quote-section {
      max-width: 500px;
      margin: 0 auto 2rem;
    }
    
    .album-quote {
      font-style: italic;
      color: #b8b8c0;
      font-size: 1.05rem;
      line-height: 1.7;
      margin: 0 0 1rem;
      padding: 0;
    }
    
    .quote-attribution {
      font-size: 0.85rem;
      color: #6b6b78;
      font-style: normal;
      margin: 0;
    }
    
    .quote-attribution::before {
      content: '— ';
    }
    
    .written-by-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }
    
    .written-by-label {
      font-size: 0.7rem;
      color: #5a5a65;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    
    .written-by-author {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .author-photo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid rgba(139, 92, 246, 0.4);
    }
    
    .author-name {
      font-size: 0.95rem;
      font-weight: 500;
      color: #e8e8ed;
    }
    
    @media (min-width: 768px) {
      .album-quote-section {
        margin: 0 0 2rem;
      }
      
      .written-by-section {
        align-items: flex-start;
      }
    }
    
    .songs-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
    }
    
    .song-card {
      background: rgba(255, 255, 255, 0.025);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 16px;
      padding: 1.5rem 2rem;
    }
    
    .song-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1.5rem;
    }
    
    .song-number {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Syne', sans-serif;
      font-size: 0.85rem;
      font-weight: 600;
      color: #5a5a65;
    }
    
    .song-title {
      font-family: 'Syne', sans-serif;
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0;
      color: #ffffff;
    }
    
    .song-essay {
      margin-bottom: 1.5rem;
      padding-bottom: 1.5rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    
    .song-essay h3,
    .song-lyrics h3 {
      font-size: 0.9rem;
      color: #8a8a95;
      font-weight: 500;
      margin-bottom: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    
    .song-essay p {
      color: #a0a0ab;
      font-size: 0.95rem;
      line-height: 1.8;
    }
    
    .song-lyrics {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 12px;
      padding: 1.5rem;
    }
    
    .song-lyrics-text {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.9rem;
      line-height: 1.9;
      color: #b8b8c0;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    
    .listen-footer {
      margin-top: 4rem;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      text-align: center;
      color: #5a5a65;
      font-size: 0.9rem;
    }
    
    .listen-footer p {
      margin: 0.25rem 0;
    }
    
    .footer-copyright {
      margin-top: 1rem !important;
      font-size: 0.8rem !important;
      color: #3a3a45 !important;
    }
    
    @media (max-width: 480px) {
      body {
        padding: 1rem 0.75rem 7rem;
      }
      
      .back-link {
        bottom: 1rem;
        left: 1rem;
        font-size: 0.8rem;
        padding: 0.6rem 1.2rem;
      }
      
      .album-art-container {
        max-width: 280px;
      }
      
      .song-card {
        padding: 1rem 1.25rem;
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
    <header class="album-header" itemscope itemtype="https://schema.org/MusicAlbum">
      <div class="album-art-container">
        <img 
          src="${ALBUM_DATA.albumArt}" 
          alt="${ALBUM_DATA.title} album cover by ${ALBUM_DATA.artist}"
          class="album-art"
          itemprop="image"
        >
      </div>
      <div class="album-info">
        <span class="album-label">Album</span>
        <h1 itemprop="name">${ALBUM_DATA.title}</h1>
        <p class="album-artist" itemprop="byArtist">${ALBUM_DATA.artist}</p>
        <p class="album-meta">${ALBUM_DATA.year} • ${ALBUM_DATA.songs.length} songs</p>
        <div class="album-quote-section">
          <blockquote class="album-quote">
            "${ALBUM_DATA.quote}"
          </blockquote>
          <p class="quote-attribution">${ALBUM_DATA.quoteAttribution}</p>
        </div>
        <div class="written-by-section">
          <span class="written-by-label">Written by</span>
          <div class="written-by-author">
            <img 
              src="${ALBUM_DATA.artistPhoto}" 
              alt="${ALBUM_DATA.artist}"
              class="author-photo"
            >
            <span class="author-name">${ALBUM_DATA.artist}</span>
          </div>
        </div>
      </div>
    </header>
    
    <main class="songs-list">
      ${songCards}
    </main>
    
    <footer class="listen-footer">
      <p>Written, produced, and performed by Rafi Barides</p>
      <p class="footer-copyright">© ${ALBUM_DATA.year} Rafi Barides. All rights reserved.</p>
    </footer>
  </div>
  
  <!-- React will mount here -->
  <div id="root"></div>
</body>
</html>`;
}

// Main function
console.log('Generating static listen page...');

// Create dist/listen directory
const listenDistDir = path.join(__dirname, '../dist/listen');
if (!fs.existsSync(listenDistDir)) {
  fs.mkdirSync(listenDistDir, { recursive: true });
}

// Generate and write the HTML
const listenHtml = generateListenPageHtml();
fs.writeFileSync(path.join(listenDistDir, 'index.html'), listenHtml);
console.log('✓ Generated /listen/index.html');

console.log('\nStatic listen page generated successfully!');
