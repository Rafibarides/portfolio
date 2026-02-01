import { Link } from 'react-router-dom';
import SEO from './components/SEO';
import streamData from './data/streamURL.json';
import './styles/LinksPage.css';

// Platform icon components
const PlatformIcon = ({ platform }) => {
  switch (platform) {
    case 'spotify':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      );
    case 'apple':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    case 'tidal':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.012 3.992L8.008 7.996 4.004 3.992 0 7.996 4.004 12l4.004-4.004L12.012 12l-4.004 4.004 4.004 4.004 4.004-4.004L12.012 12l4.004-4.004-4.004-4.004zm3.996 3.996l4.004 4.004 3.996-3.996-4.004-4.004-3.996 4.004z"/>
        </svg>
      );
    case 'deezer':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.81 4.16v3.03H24V4.16h-5.19zM6.27 8.38v3.027h5.189V8.38h-5.19zm12.54 0v3.027H24V8.38h-5.19zM6.27 12.594v3.027h5.189v-3.027h-5.19zm6.27 0v3.027h5.19v-3.027h-5.19zm6.27 0v3.027H24v-3.027h-5.19zM0 16.81v3.029h5.19v-3.03H0zm6.27 0v3.029h5.189v-3.03h-5.19zm6.27 0v3.029h5.19v-3.03h-5.19zm6.27 0v3.029H24v-3.03h-5.19z"/>
        </svg>
      );
    case 'audius':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 17.667c-1.725.975-3.865 1.258-6.12.684-2.026-.517-3.652-1.778-4.502-3.295-.303-.542-.123-1.228.402-1.531.525-.303 1.196-.123 1.498.402.565.998 1.648 1.864 3.087 2.23 1.541.392 3.002.204 4.17-.455.525-.296 1.196-.116 1.498.409.303.525.123 1.196-.402 1.498a.074.074 0 01-.031.017 5.005 5.005 0 01-.6.041zm.63-3.802c-1.11.702-2.535.981-4.073.702-1.382-.25-2.547-.99-3.215-1.955-.296-.427-.19-1.013.237-1.309.427-.296 1.013-.19 1.309.237.402.581 1.14 1.016 2.04 1.18.998.181 1.931.026 2.68-.435.435-.267 1.003-.134 1.27.301.267.435.134 1.003-.301 1.27-.001.002-.014.009-.017.009h.07zm.535-3.628c-.71.5-1.633.77-2.633.77-.286 0-.578-.024-.872-.073-.975-.164-1.823-.58-2.392-1.137-.32-.313-.326-.825-.013-1.145.313-.32.825-.326 1.145-.013.328.32.84.561 1.405.656.642.108 1.257.01 1.74-.274.38-.224.87-.099 1.094.281.224.38.099.87-.281 1.094-.059.033-.126.06-.193.084v-.243z"/>
        </svg>
      );
    case 'bandlab':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      );
    case 'arbiem':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          <path d="M12 2v20" strokeWidth="0" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'onsite':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
        </svg>
      );
    case 'pandora':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.5 16.5h-7v-9h7c1.657 0 3 1.343 3 3v3c0 1.657-1.343 3-3 3z"/>
        </svg>
      );
    case 'webamp':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h6v2H7v-2z"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      );
  }
};

export default function LinksPage() {
  const { releaseTitle, platforms } = streamData;

  return (
    <div className="links-page">
      <SEO
        title={`Stream: ${releaseTitle}`}
        description={`Listen to ${releaseTitle} by Rafi Barides on all streaming platforms.`}
        canonical="https://rafi-barides.com/links"
        type="music.album"
        keywords={[
          "Rafi Barides",
          releaseTitle,
          "stream",
          "spotify",
          "apple music",
          "youtube music",
          "listen"
        ]}
      />

      <Link to="/" className="back-link">← Portfolio</Link>

      <div className="links-container">
        <header className="links-header">
          <span className="links-label">Stream Now</span>
          <h1>{releaseTitle}</h1>
          <p className="links-artist">Rafi Barides</p>
        </header>

        <main className="platforms-list">
          {platforms.map((platform) => (
            <a
              key={platform.id}
              href={platform.url || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className={`platform-link ${!platform.url ? 'disabled' : ''}`}
              style={{ '--platform-color': platform.color }}
              onClick={(e) => !platform.url && e.preventDefault()}
            >
              <div className="platform-icon">
                <PlatformIcon platform={platform.icon} />
              </div>
              <span className="platform-name">{platform.name}</span>
              <svg className="platform-arrow" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </a>
          ))}
        </main>

        <footer className="links-footer">
          <p>© 2026 Rafi Barides. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
