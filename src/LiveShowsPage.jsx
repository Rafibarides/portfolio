import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from './components/SEO';
import './styles/LiveShowsPage.css';

const EVENT_DATA = {
  title: "Off The Record",
  subtitle: "Bug Juice, Rafi Barides, Izzy Gilden",
  venue: "Salon on Kingston",
  address: "105 Kingston Ave, Brooklyn, NY",
  date: "Sunday, May 24, 2026",
  time: "6:30 PM - 10 PM",
  ticketLink: "https://www.eventbrite.com/e/off-the-record-bug-juice-rafi-barides-izzy-gilden-live-music-showcase-tickets-1988177159404?aff=oddtdtcreator",
  image: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1182965872%2F345103861489%2F1%2Foriginal.20260424-142520?w=1880&auto=format%2Ccompress&q=75&sharp=10&s=57689d406721fa676fa053a80b03aff1",
  description: "Intimate acoustic folk/pop night in Crown Heights, Brooklyn. Expect acoustic, folk, indie, and stripped-back performances in a close, personal setting designed for storytelling, connection, and live musical experience."
};

const PLAYLIST_LINKS = {
  spotify: "https://open.spotify.com/playlist/6A8EeL62USKRDxRHJ6TLaL?si=IKR-lWNNQk2eQo6_ewcHYg",
  apple: "https://music.apple.com/us/playlist/off-the-record-salon-on-kingston/pl.u-b3b88DNfyLX0ep5",
  youtube: "https://youtube.com/playlist?list=PL-hlJHqy1BFr_pCQtYv9CW3cBlexx6fwI&si=MoasfBVwWHtsF_IH"
};

const SETLIST = [
  {
    id: 1,
    title: "Outer Space",
    audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Show/Rafi%20Barides%20%26%20Shira%20Neshama%20-%20Outer%20Space.mp3"
  },
  {
    id: 2,
    title: "Somebody Else",
    audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Show/2.%20SOMEBODY%20ELSE.wav"
  },
  {
    id: 3,
    title: "Remind Me",
    audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Show/Rafi%20Barides%20-%20Remind%20Me.mp3"
  },
  {
    id: 4,
    title: "This Too Shall Pass",
    audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Show/3.%20THIS%20TOO%20SHALL%20PASS.wav"
  },
  {
    id: 5,
    title: "And the Fire",
    audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Show/AND%20THE%20FIRE%20(1).mp3"
  },
  {
    id: 6,
    title: "Me and the Truth",
    audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Show/4.%20ME%20AND%20THE%20TRUTH.wav"
  },
  {
    id: 7,
    title: "Friends in Private",
    audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Show/Rafi%20Barides%20-%20Friends%20In%20Private.mp3"
  }
];

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function SongRow({ song, isPlaying, isCurrentSong, onPlay, onPause, currentTime, duration, audioRef }) {
  const progressRef = useRef(null);

  const handleProgressClick = (e) => {
    if (!isCurrentSong || !audioRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audioRef.current.currentTime = percentage * duration;
  };

  const progress = isCurrentSong && duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`setlist-row ${isCurrentSong ? 'active' : ''}`}>
      <div className="setlist-number">{song.id}</div>
      <div className="setlist-title">{song.title}</div>
      <div className="setlist-controls">
        {isCurrentSong && (
          <div className="mini-progress-container">
            <div 
              className="mini-progress" 
              ref={progressRef}
              onClick={handleProgressClick}
            >
              <div 
                className="mini-progress-bar" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="mini-time">{formatTime(currentTime)}</span>
          </div>
        )}
        <button 
          className={`setlist-play-btn ${isCurrentSong && isPlaying ? 'playing' : ''}`}
          onClick={() => isCurrentSong && isPlaying ? onPause() : onPlay(song)}
          aria-label={isCurrentSong && isPlaying ? 'Pause' : 'Play'}
        >
          {isCurrentSong && isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default function LiveShowsPage() {
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (currentSong) {
        const currentIndex = SETLIST.findIndex(s => s.id === currentSong.id);
        if (currentIndex < SETLIST.length - 1) {
          handlePlay(SETLIST[currentIndex + 1]);
        } else {
          setIsPlaying(false);
        }
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSong]);

  const handlePlay = (song) => {
    if (currentSong?.id !== song.id) {
      setCurrentSong(song);
      setCurrentTime(0);
      if (audioRef.current) {
        audioRef.current.src = song.audioUrl;
        audioRef.current.load();
      }
    }
    setTimeout(() => {
      audioRef.current?.play();
      setIsPlaying(true);
    }, 100);
  };

  const handlePause = () => {
    audioRef.current?.pause();
    setIsPlaying(false);
  };

  return (
    <div className="live-shows-page">
      <SEO
        title="Live Shows - Rafi Barides"
        description="Upcoming live performances by Rafi Barides. Get tickets and learn the setlist before the show."
        canonical="https://rafi-barides.com/live-shows"
        image={EVENT_DATA.image}
        type="website"
      />

      <audio ref={audioRef} preload="metadata" />

      <Link to="/" className="back-link">← Portfolio</Link>

      <div className="live-shows-container">
        {/* Event Header */}
        <header className="event-header">
          <div className="event-image-container">
            <img 
              src={EVENT_DATA.image} 
              alt={`${EVENT_DATA.title} - Live Music Showcase`}
              className="event-image"
            />
          </div>
          <div className="event-info">
            <span className="event-label">Upcoming Show</span>
            <h1>{EVENT_DATA.title}</h1>
            <p className="event-artists">{EVENT_DATA.subtitle}</p>
            <div className="event-details">
              <div className="event-detail">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
                </svg>
                <span>{EVENT_DATA.date}</span>
              </div>
              <div className="event-detail">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                <span>{EVENT_DATA.time}</span>
              </div>
              <div className="event-detail">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span>{EVENT_DATA.venue}, {EVENT_DATA.address}</span>
              </div>
            </div>
            <p className="event-description">{EVENT_DATA.description}</p>
            <a 
              href={EVENT_DATA.ticketLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ticket-button"
            >
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.46c-1.19.69-2 1.99-2 3.46s.81 2.77 2 3.46V18H4v-2.54c1.19-.69 2-1.99 2-3.46 0-1.48-.8-2.77-1.99-3.46L4 6h16v2.54z"/>
              </svg>
              Get Tickets
            </a>
          </div>
        </header>

        {/* Playlist Section */}
        <section className="playlist-section">
          <h2>Learn the Songs</h2>
          <p className="playlist-intro">
            Want to have more fun at the show? Get ahead by listening to this playlist so you'll know the songs and can sing along or just enjoy the performance even more.
          </p>
          <div className="streaming-links">
            <a href={PLAYLIST_LINKS.spotify} target="_blank" rel="noopener noreferrer" className="streaming-link spotify">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Spotify
            </a>
            <a href={PLAYLIST_LINKS.apple} target="_blank" rel="noopener noreferrer" className="streaming-link apple">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple Music
            </a>
            <a href={PLAYLIST_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="streaming-link youtube">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube
            </a>
          </div>
        </section>

        {/* Setlist */}
        <section className="setlist-section">
          <h2>Setlist Preview</h2>
          <div className="setlist-container">
            {SETLIST.map((song) => (
              <SongRow
                key={song.id}
                song={song}
                isPlaying={isPlaying}
                isCurrentSong={currentSong?.id === song.id}
                onPlay={handlePlay}
                onPause={handlePause}
                currentTime={currentSong?.id === song.id ? currentTime : 0}
                duration={currentSong?.id === song.id ? duration : 0}
                audioRef={audioRef}
              />
            ))}
          </div>
        </section>

        <footer className="live-shows-footer">
          <p>© 2026 Rafi Barides. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
