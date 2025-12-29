import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SEO from './components/SEO';
import './styles/LyricsPost.css';

/**
 * Individual song lyrics page
 * Optimized for Google indexing and crawling with structured data
 */
export default function LyricsPost() {
  const { slug } = useParams();
  const [song, setSong] = useState(null);
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Load lyrics metadata
    fetch('/lyrics/lyricsMetadata.json')
      .then(response => response.json())
      .then(songs => {
        const foundSong = songs.find(s => s.slug === slug);
        
        if (!foundSong) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setSong(foundSong);

        // Load lyrics content
        return fetch(`/lyrics/${encodeURIComponent(foundSong.filename)}`);
      })
      .then(response => {
        if (response) {
          return response.text();
        }
      })
      .then(text => {
        if (text) {
          setLyrics(text);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error loading lyrics:', err);
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  if (notFound) {
    return <Navigate to="/lyrics" replace />;
  }

  if (loading) {
    return (
      <div className="lyrics-post-page">
        <div className="lyrics-post-container">
          <div className="lyrics-loading">Loading...</div>
        </div>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicComposition",
    "name": song.title,
    "composer": {
      "@type": "Person",
      "name": song.writer,
      "url": "https://rafi-barides.com",
      "sameAs": [
        "https://github.com/rafibarides",
        "https://www.linkedin.com/in/rafibarides"
      ]
    },
    "dateCreated": `${song.year}-01-01`,
    "copyrightYear": song.year,
    "url": `https://rafi-barides.com/lyrics/${song.slug}`,
    "description": `Complete lyrics for "${song.title}" written by ${song.writer} in ${song.year}. Original song lyrics by Rafi Barides.`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://rafi-barides.com/lyrics/${song.slug}`
    },
    "inLanguage": "en-US",
    "keywords": `${song.title}, Rafi Barides lyrics, song lyrics, ${song.writer}, ${song.year}`
  };

  return (
    <div className="lyrics-post-page">
      <SEO
        title={`${song.title} - Lyrics by Rafi Barides | ${song.year}`}
        description={`Complete lyrics for "${song.title}" written by ${song.writer} in ${song.year}. Original song lyrics by Rafi Barides.`}
        canonical={`https://rafi-barides.com/lyrics/${song.slug}`}
        type="article"
        author={song.writer}
        publishedTime={`${song.year}-01-01`}
        keywords={[song.title, "Rafi Barides lyrics", "song lyrics", song.writer, song.year]}
        structuredData={structuredData}
      />
      
      <Link to="/lyrics" className="back-link">← Lyrics</Link>
      
      <div className="lyrics-post-container">
        <article className="lyrics-post">
          <header className="lyrics-post-header">
            <h1>{song.title}</h1>
            <div className="lyrics-post-meta">
              <span className="lyrics-post-writer">
                <strong>Writer:</strong> {song.writer}
              </span>
              <span className="lyrics-divider">•</span>
              <time dateTime={`${song.year}-01-01`}>
                <strong>Year:</strong> {song.year}
              </time>
            </div>
          </header>

          <div className="lyrics-post-content">
            <pre className="lyrics-text">{lyrics}</pre>
          </div>
        </article>
      </div>
    </div>
  );
}

