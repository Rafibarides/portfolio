import { Link } from 'react-router-dom';
import SEO from './components/SEO';
import './styles/DieForYouPage.css';

const SONG_DATA = {
  title: "Die For You",
  artist: "Rafi Barides",
  featuring: "Bug Juice",
  releaseDate: "May 20, 2025",
  coverArt: "https://i1.sndcdn.com/artworks-Cvy2FU78apPJJEVt-mTgtGA-t500x500.png",
  youtubeId: "0lwJBnsqn3s",
  links: {
    spotify: "https://open.spotify.com/album/3Je52TbruniQm1lUCXzP4d?si=3ac_3H1oRG-BPipVmX1wrg",
    apple: "https://music.apple.com/us/album/die-for-you-feat-bug-juice-single/6770856156",
    soundcloud: "https://soundcloud.com/user-778485137/die-for-you-mv1-24bit?si=a651c599602e4a4ea373b59a34c9a319&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
  }
};

export default function DieForYouPage() {
  return (
    <div className="die-for-you-page">
      <SEO
        title="Die For You (feat. Bug Juice) - Rafi Barides"
        description="New single 'Die For You' featuring Bug Juice. Out now. Watch the music video and stream everywhere."
        canonical="https://rafi-barides.com/die-for-you"
        image={SONG_DATA.coverArt}
        type="music.song"
      />

      <Link to="/" className="back-link">← Portfolio</Link>

      <div className="die-for-you-container">
        {/* Hero Section */}
        <header className="song-hero">
          <div className="release-badge">Out Now</div>
          <h1>{SONG_DATA.title}</h1>
          <p className="song-credits">
            {SONG_DATA.artist} <span className="feat">feat.</span> {SONG_DATA.featuring}
          </p>
        </header>

        {/* Music Video */}
        <section className="video-section">
          <div className="video-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${SONG_DATA.youtubeId}?rel=0&modestbranding=1`}
              title="Die For You - Music Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        {/* Stream Links */}
        <section className="stream-section">
          <h2>Stream Now</h2>
          <div className="stream-links">
            <a 
              href={SONG_DATA.links.spotify} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="stream-card spotify"
            >
              <div className="stream-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
              <span className="stream-name">Spotify</span>
              <span className="stream-action">Play</span>
            </a>

            <a 
              href={SONG_DATA.links.apple} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="stream-card apple"
            >
              <div className="stream-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <span className="stream-name">Apple Music</span>
              <span className="stream-action">Listen</span>
            </a>

            <a 
              href={SONG_DATA.links.soundcloud} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="stream-card soundcloud"
            >
              <div className="stream-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.052-.1-.084-.1zm-.899 1.02c-.051 0-.09.037-.099.085L0 15.21l.178 1.97c.01.048.048.085.099.085.051 0 .09-.037.099-.085l.219-1.97-.219-1.88c-.009-.048-.048-.085-.099-.085zm1.83-1.18c-.063 0-.114.052-.122.116l-.203 2.3.203 2.248c.008.064.059.116.122.116.063 0 .114-.052.122-.116l.227-2.248-.227-2.3c-.008-.064-.059-.116-.122-.116zm.928-.247c-.073 0-.133.06-.141.134l-.175 2.548.175 2.47c.008.074.068.134.141.134.073 0 .133-.06.141-.134l.197-2.47-.197-2.548c-.008-.074-.068-.134-.141-.134zm.951-.186c-.084 0-.152.069-.16.152l-.148 2.734.148 2.617c.008.084.076.152.16.152.083 0 .152-.068.16-.152l.168-2.617-.168-2.734c-.008-.083-.077-.152-.16-.152zm.976-.165c-.094 0-.17.077-.178.17l-.12 2.9.12 2.736c.008.094.084.17.178.17.093 0 .17-.076.178-.17l.135-2.736-.135-2.9c-.008-.093-.085-.17-.178-.17zm.983-.12c-.104 0-.189.085-.197.189l-.093 3.02.093 2.82c.008.104.093.189.197.189.104 0 .189-.085.197-.189l.105-2.82-.105-3.02c-.008-.104-.093-.189-.197-.189zm1.022-.073c-.115 0-.208.094-.215.208l-.066 3.093.066 2.876c.007.115.1.208.215.208.115 0 .208-.093.216-.208l.074-2.876-.074-3.093c-.008-.114-.101-.208-.216-.208zm1.044-.038c-.125 0-.227.102-.233.227l-.04 3.131.04 2.906c.006.125.108.227.233.227.126 0 .227-.102.234-.227l.044-2.906-.044-3.131c-.007-.125-.108-.227-.234-.227zm1.07-.013c-.135 0-.245.11-.25.245l-.013 3.144.013 2.918c.005.136.115.246.25.246.136 0 .245-.11.251-.246l.014-2.918-.014-3.144c-.006-.135-.115-.245-.251-.245zm1.088.011c-.146 0-.264.118-.27.264l.014 3.133-.014 2.918c.006.146.124.264.27.264.145 0 .263-.118.269-.264l.016-2.918-.016-3.133c-.006-.146-.124-.264-.269-.264zm1.12.053c-.156 0-.282.127-.287.283l.04 3.08-.04 2.896c.005.156.131.283.287.283.156 0 .282-.127.288-.283l.044-2.896-.044-3.08c-.006-.156-.132-.283-.288-.283zm3.593.224c-.27 0-.527.053-.762.148-.156-1.752-1.64-3.12-3.456-3.12-.466 0-.916.096-1.328.268-.155.065-.196.132-.198.262v6.16c.002.134.106.244.238.256h5.506c1.109 0 2.008-.9 2.008-2.009 0-1.108-.899-2.008-2.008-2.008z"/>
                </svg>
              </div>
              <span className="stream-name">SoundCloud</span>
              <span className="stream-action">Stream</span>
            </a>
          </div>
        </section>

        {/* Cover Art */}
        <section className="cover-section">
          <img 
            src={SONG_DATA.coverArt} 
            alt="Die For You - Cover Art"
            className="cover-art"
          />
        </section>

        {/* Artists Section */}
        <section className="artists-section">
          <h2>The Artists</h2>
          
          <div className="artist-card">
            <h3>Bug Juice</h3>
            <p>
              Bug Juice is a Brooklyn-based singer-songwriter, producer, pianist, and guitarist. After returning from a ten-year stint abroad and with a degree in musicology, she came back to Brooklyn, taught herself music production, and spent the last two years writing and self-producing her debut EP, <em>MOVING DAY</em>. Expect stripped-back originals, emotional storytelling, and deeply personal artistry.
            </p>
          </div>

          <div className="artist-card">
            <h3>Rafi Barides</h3>
            <p>
              Rafi Barides is an acoustic indie artist blending raw songwriting with intimate, stripped-back arrangements. His music pulls from indie folk, emotional storytelling, and cinematic acoustic textures. His latest original 8-track album, <em>Storm Before The Storm</em>, was released on February 1st. Expect an intimate, honest, and emotionally raw performance.
            </p>
          </div>
        </section>

        {/* Live Show CTA */}
        <section className="live-show-cta">
          <div className="cta-content">
            <span className="cta-label">Upcoming</span>
            <h3>See Us Live</h3>
            <p>Catch Rafi Barides and Bug Juice performing together at <strong>Off The Record</strong> — an intimate acoustic showcase at Salon on Kingston in Brooklyn.</p>
            <p className="cta-date">Sunday, May 24, 2026</p>
            <Link to="/live-shows" className="cta-button">
              Get Tickets & Learn the Songs
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </Link>
          </div>
        </section>

        <footer className="song-footer">
          <p>© 2025 Rafi Barides. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
