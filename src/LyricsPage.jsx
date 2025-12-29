import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SEO from './components/SEO';
import './styles/LyricsPage.css';

/**
 * Lyrics listing page - shows all songs
 * Optimized for Google indexing and crawling
 */
export default function LyricsPage() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load lyrics metadata
    fetch('/lyrics/lyricsMetadata.json')
      .then(response => response.json())
      .then(data => {
        setSongs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading lyrics metadata:', err);
        setLoading(false);
      });
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Lyrics - Rafi Barides",
    "description": "Complete collection of song lyrics written by Rafi Barides. Original songs from 2025 including This Too Shall Pass, The Proof, The Earth Is Flat, Me And The Truth, Love You Less, In Again, and Chernobyl (Appendix).",
    "url": "https://rafi-barides.com/lyrics",
    "author": {
      "@type": "Person",
      "name": "Rafi Barides",
      "url": "https://rafi-barides.com",
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
            "url": "https://rafi-barides.com"
          },
          "dateCreated": `${song.year}-01-01`,
          "copyrightYear": song.year,
          "url": `https://rafi-barides.com/lyrics/${song.slug}`
        }
      }))
    }
  };

  return (
    <div className="lyrics-page">
      <SEO
        title="Lyrics - Rafi Barides | Original Songs 2025"
        description="Complete collection of song lyrics written by Rafi Barides. Original songs from 2025 including This Too Shall Pass, The Proof, The Earth Is Flat, Me And The Truth, Love You Less, In Again, and Chernobyl (Appendix)."
        canonical="https://rafi-barides.com/lyrics"
        type="website"
        structuredData={structuredData}
        keywords={["Rafi Barides lyrics", "song lyrics", "original songs", "Rafi Barides music", "2025 songs", "songwriting"]}
      />
      
      <Link to="/" className="back-link">← Portfolio</Link>
      
      <div className="lyrics-container">
        <header className="lyrics-header">
          <h1>Lyrics</h1>
          <p className="lyrics-subtitle">Original songs by Rafi Barides</p>
        </header>

        {loading ? (
          <div className="lyrics-loading">Loading songs...</div>
        ) : (
          <div className="lyrics-grid">
            {songs.map((song) => (
              <Link 
                to={`/lyrics/${song.slug}`} 
                key={song.slug} 
                className="lyrics-card"
              >
                <div className="lyrics-card-content">
                  <h2>{song.title}</h2>
                  <div className="lyrics-card-meta">
                    <span className="lyrics-writer">Written by {song.writer}</span>
                    <span className="lyrics-divider">•</span>
                    <span className="lyrics-year">{song.year}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

