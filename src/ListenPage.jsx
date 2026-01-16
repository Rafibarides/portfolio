import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from './components/SEO';
import './styles/ListenPage.css';

// Album data
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
      audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Listen/1.%20IN%20AGAIN%20.wav",
      lyricsFile: "In Again.txt",
      essay: "I am a serial talker. When it comes to dating and romance, I sometimes run into a problem where it feels like I say too much too soon. In this song, I am expressing how when I am real with my love interest, I am letting them in. But letting them in usually pushes them out. The bridge is where I say it out loud and glue the song together. I sardonically take \"accountability\" for this mistake. The punchline is this:\n\n\"I need you to know\nWhat you mean to me\nEven if it makes you go\nI couldn't leave it unsaid\""
    },
    {
      id: 2,
      title: "Somebody Else",
      audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Listen/2.%20SOMEBODY%20ELSE.wav",
      lyricsFile: "Love You Less.txt",
      essay: "Earlier this year, I made a decision to end a romantic entanglement. Not because it wasn't great, but because we were misaligned and he didn't want the future that I did. It was supposed to be chill fun, friends with benefits, etc., but I totally caught feelings and asked about exclusivity. But he was not in that chapter. I remember that we used to have such special moments, but one time he showed up with hickeys that I did not put there, and it really broke me. I am not the jealous type, but he was bi and I knew we'd never be together. I could not get the image out of my head of some girl chomping on his neck. I tried to see past it and to appreciate the good moments, but I got super sad.\n\nIn my song, I am being a little dramatic with \"when you said you loved me you were talking about somebody else,\" because we never got to the \"I love you\" stage, but I mean it as a metaphor, because we did have really special moments and an amazing connection that had a deep impact on me.\n\nOne of the things we used to do together was get haircuts. We'd go to the barber and he would ask me to tell the barber what to do. He really liked the fade and style I suggested. Finally, we went to get haircuts one morning and I couldn't be present. I was totally anxious and started to feel resentful toward this person who I loved so much, and then I knew I had to call it off. I told him to come back that night, and he stayed over. I thought I'd wait until the morning, but he could just tell. The minute he got into bed and saw my face, he said, \"what is it?\" And I explained that we needed to draw a line in the sand.\n\nWe slept, and the following morning we went to the station together. I knew I wouldn't see him again, maybe ever. As the train approached, I totally broke down. In the moment, I felt, \"this is the price I pay for not pushing myself onto you and ending things on a good note instead.\" And that became the spine of the song.\n\nI am not Russian, but in Russian there is a phrase \"khoroshovo ponemnozhku.\" It means something like \"good things in small doses.\" To me, the principle means \"get out on a high.\" Don't squeeze every last drop of everything. I knew I could have gotten a few more months of good times with him, but it likely would have ended bitterly. So instead, I embraced the high we were on when we ended things. I took the responsibility onto myself to try and love him less, somehow."
    },
    {
      id: 3,
      title: "This Too Shall Pass",
      audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Listen/3.%20THIS%20TOO%20SHALL%20PASS.wav",
      lyricsFile: "This Too Shall Pass.txt",
      essay: "Growing up in an Orthodox Jewish home, we'd often hear the phrase \"gam zeh ya'avor,\" which translates to \"this too shall pass.\" This has been a really hard year for me. On one hand, I feel like I have truly been growing into myself, but on the other hand, I felt like I reached rock bottom in the process. Meaninglessness and lack of purpose are big themes on the whole album, but this song is its most literal expression.\n\nI applied to hundreds of jobs and had to contend with my lack of resources. I was rejected from aerospace engineering school and was totally crushed. I thought, I want a job so bad, but the job is me. I need to learn and study. I am not there yet. That inspired the start of this song.\n\nI often work in a local community café in Midwood. I met an aerospace student with NASA stickers on her laptop. When I told her I'd been rejected, she asked if I'd done extracurriculars as a kid. That's when it hit me. I was sent to fake school. I learned nothing secular in comparison to the average American student. I spent my days learning Talmud, which I know very well, but that doesn't matter to UND's aviation program. I had no chance.\n\nViktor Frankl talks about \"unemployment neurosis,\" and during this period I started to feel very negatively about my upbringing. I tried not to blame my parents, but being rejected for lack of education made me really upset. I was not set up to succeed.\n\nI hit my lowest low. I kept thinking \"gam zeh ya'avor,\" and then twisted it into \"this too shall pass away.\" That wordplay became the first verse. Then my appendix burst, and I spent rock bottom in a hospital bed. That became the second verse.\n\nThis song is extremely real. I cannot understand how I can pour my heart into music and my family has no curiosity about it. They do not acknowledge my dating life or my homosexuality as valid. They do not listen to my songs. The pre-chorus came from the thought, \"you want to know what's going on, but you don't even listen to my songs.\" I feel comfortable publishing this honesty because I know they will not take the time to hear it."
    },
    {
      id: 4,
      title: "Me and the Truth",
      audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Listen/4.%20ME%20AND%20THE%20TRUTH.wav",
      lyricsFile: "Me And The Truth.txt",
      essay: "While journaling, I accepted that I have a pattern of getting into romantic entanglements that consume me because of my purposelessness. When I feel disoriented, love interests become the most important thing in my life, and that can be a turn-off.\n\nIn one case, I realized I worshipped this person. That inspired a chorus that sounds like church worship. By the time I wrote the verses, I had ended things. With clarity, I let the verses honestly tell the experience from my end. My goal was not to talk shit. This person means a lot to me. My goal was to express how it felt to me."
    },
    {
      id: 5,
      title: "The Proof",
      audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Listen/5.%20THE%20PROOF.wav",
      lyricsFile: "The Proof.txt",
      essay: "This song is the most unabashed intersection of romance and purpose on the album. It is probably my most honest. I wrote it fully admitting that I need someone else to make me feel okay. I am not saying it's good or healthy. I am just saying how it is.\n\nThe chorus asks a lover to be the proof that life is worth staying for. The line \"this life isn't living me\" later became \"this life isn't leaving me,\" and I left it ambiguous.\n\nThe bridge is the punchline of the album: \"If you let me down again, please do it into the ground, and say here lies a man who wanted you more than life.\" It is accusatory, irrational, unfair, and completely real."
    },
    {
      id: 6,
      title: "The Earth Is Flat",
      audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Listen/6.%20THE%20EARTH%20IS%20FLAT.wav",
      lyricsFile: "The Earth Is Flat.txt",
      essay: "This is the most lighthearted song musically, but it comes from deep pain and jadedness. It is a bitterly sarcastic song about dating as a gay, Israeli, Jewish, right-leaning person with an Orthodox background living in NYC.\n\nI've been rejected by trendy twinks for my political moderateness and Zionism, and by closeted ex-yeshivah guys intimidated by my openness. I struggle to date people whose politics feel rooted in ignorance or trendiness. I am attracted to people I respect, and I respect people who think critically.\n\nIn the song, I take responsibility. I admit I'm judgmental. I joke that I want to date myself. But the question remains: how do I date when the pool feels so misaligned with my values?\n\nIronically, I've dated Palestinian people with deep understanding of the region, and those conversations were meaningful. I've been broken up with by white people for Zionism, but never once by an Arab. It helps to not be a flat earther.\n\nI know I'm bitching. I know it's not a daily listen. I published it because it is honest, and I'm glad I did."
    },
    {
      id: 7,
      title: "Good Enough",
      audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Listen/7.%20GOOD%20ENOUGH.wav",
      lyricsFile: "Good Enough.txt",
      essay: "Growing up, I related deeply to a story about a character who felt inherently not good enough. I later learned this was an inferiority complex. I assumed people wouldn't want me and overachieved to justify my existence.\n\nAs I grew, I developed self-worth, but in romance the inferiority complex persisted. When I meet someone good, I hear, how could I ever be good enough for you? That inspired the line about looking in the mirror again.\n\nBecause I need reassurance, I often trigger avoidant behavior in partners. I get anxious, they pull away, I need more reassurance, and the gap grows. That anxious-avoidant swing is the bridge of the song, ending with \"every swing we take is proof I won't be good enough.\""
    },
    {
      id: 8,
      title: "Chernobyl (Appendix)",
      audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Listen/8.%20CHERNOBYL%20(APPENDIX).wav",
      lyricsFile: "Chernobyl (Appendix).txt",
      essay: "This song was written later than the rest of the album. I once saw an animation about a porcupine whose spikes repel everyone. After watching the HBO series Chernobyl, I learned about the reactor disaster and saw it as a metaphor for dating. I feel radioactive, like something about me repels people.\n\nAfter two painful romantic endings, I felt like I was wearing love repellent. Then my appendix burst. I immediately connected the reactor explosion to my appendix exploding. I already felt radioactive before this.\n\nThat is the song. I tagged it as (Appendix) because it comes last and was written later."
    }
  ]
};

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function SongCard({ song, isPlaying, isCurrentSong, onPlay, onPause, currentTime, duration, audioRef }) {
  const [lyrics, setLyrics] = useState('');
  const [lyricsLoading, setLyricsLoading] = useState(false);
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
    <article className="song-card" itemScope itemType="https://schema.org/MusicRecording">
      <meta itemProp="name" content={song.title} />
      <meta itemProp="byArtist" content="Rafi Barides" />
      <meta itemProp="inAlbum" content="Storm Before the Storm" />
      
      <div className="song-header">
        <div className="song-number">{song.id}</div>
        <div className="song-info">
          <h2 className="song-title" itemProp="name">{song.title}</h2>
          <div className="song-controls">
            <button 
              className={`play-btn ${isCurrentSong && isPlaying ? 'playing' : ''}`}
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
      </div>

      {isCurrentSong && (
        <div className="song-progress-container">
          <div 
            className="song-progress" 
            ref={progressRef}
            onClick={handleProgressClick}
          >
            <div 
              className="song-progress-bar" 
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="song-time">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      )}

      <div className="song-expandable-sections">
        <details className="song-details">
          <summary className="expand-btn">
            <span>About this song</span>
            <svg viewBox="0 0 24 24" fill="currentColor" className="chevron">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </summary>
          <div className="song-essay" itemProp="description">
            {song.essay.split('\n\n').map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </details>

        <details className="song-details" onToggle={(e) => {
          if (e.target.open && !lyrics) {
            setLyricsLoading(true);
            fetch(`/lyrics/${song.lyricsFile}`)
              .then(res => res.text())
              .then(text => {
                setLyrics(text);
                setLyricsLoading(false);
              })
              .catch(err => {
                console.error('Error loading lyrics:', err);
                setLyricsLoading(false);
              });
          }
        }}>
          <summary className="expand-btn">
            <span>Lyrics</span>
            <svg viewBox="0 0 24 24" fill="currentColor" className="chevron">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </summary>
          <div className="song-lyrics" itemProp="lyrics">
            {lyricsLoading ? (
              <p className="loading">Loading lyrics...</p>
            ) : (
              <pre>{lyrics}</pre>
            )}
          </div>
        </details>
      </div>
    </article>
  );
}

export default function ListenPage() {
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
      // Play next song
      if (currentSong) {
        const currentIndex = ALBUM_DATA.songs.findIndex(s => s.id === currentSong.id);
        if (currentIndex < ALBUM_DATA.songs.length - 1) {
          handlePlay(ALBUM_DATA.songs[currentIndex + 1]);
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    "name": ALBUM_DATA.title,
    "byArtist": {
      "@type": "Person",
      "name": ALBUM_DATA.artist,
      "url": "https://rafi-barides.com"
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
      }
    })),
    "description": "Storm Before the Storm is a deeply personal album by Rafi Barides exploring themes of love, identity, purpose, and vulnerability through 8 original songs.",
    "genre": ["Singer-Songwriter", "Indie", "Pop"],
    "url": "https://rafi-barides.com/listen"
  };

  return (
    <div className="listen-page">
      <SEO
        title="Listen - Storm Before the Storm | Rafi Barides"
        description="Stream Storm Before the Storm, the debut album by Rafi Barides. 8 deeply personal songs exploring love, identity, purpose, and vulnerability. Listen now with lyrics and stories behind each track."
        canonical="https://rafi-barides.com/listen"
        image={ALBUM_DATA.albumArt}
        type="music.album"
        keywords={[
          "Rafi Barides",
          "Storm Before the Storm",
          "indie music",
          "singer songwriter",
          "original music",
          "album stream",
          "In Again",
          "Somebody Else",
          "This Too Shall Pass",
          "Me and the Truth",
          "The Proof",
          "The Earth Is Flat",
          "Good Enough",
          "Chernobyl"
        ]}
        structuredData={structuredData}
      />

      <audio ref={audioRef} preload="metadata" />

      <Link to="/" className="back-link">← Portfolio</Link>

      <div className="listen-container">
        <header className="album-header">
          <div className="album-art-container">
            <img 
              src={ALBUM_DATA.albumArt} 
              alt={`${ALBUM_DATA.title} album cover by ${ALBUM_DATA.artist}`}
              className="album-art"
              itemProp="image"
            />
          </div>
          <div className="album-info">
            <span className="album-label">Album</span>
            <h1 itemProp="name">{ALBUM_DATA.title}</h1>
            <p className="album-artist" itemProp="byArtist">{ALBUM_DATA.artist}</p>
            <p className="album-meta">{ALBUM_DATA.year} • {ALBUM_DATA.songs.length} songs</p>
            <div className="album-quote-section">
              <blockquote className="album-quote">
                "{ALBUM_DATA.quote}"
              </blockquote>
              <p className="quote-attribution">{ALBUM_DATA.quoteAttribution}</p>
            </div>
            <div className="written-by-section">
              <span className="written-by-label">Written by</span>
              <div className="written-by-author">
                <img 
                  src={ALBUM_DATA.artistPhoto} 
                  alt={ALBUM_DATA.artist}
                  className="author-photo"
                />
                <span className="author-name">{ALBUM_DATA.artist}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="songs-list" itemScope itemType="https://schema.org/MusicAlbum">
          <meta itemProp="name" content={ALBUM_DATA.title} />
          <meta itemProp="byArtist" content={ALBUM_DATA.artist} />
          
          {ALBUM_DATA.songs.map(song => (
            <SongCard
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
        </main>

        <footer className="listen-footer">
          <p>Written, produced, and performed by Rafi Barides</p>
          <p className="footer-copyright">© {ALBUM_DATA.year} Rafi Barides. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
