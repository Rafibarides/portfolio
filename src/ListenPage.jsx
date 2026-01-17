import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from './components/SEO';
import { StormBeforeTheStorm as albumCredits } from './utils/albumCredits';
import './styles/ListenPage.css';

// Album data
const ALBUM_DATA = {
  title: "Storm Before the Storm",
  artist: "Rafi Barides",
  releaseDate: "February 1st, 2026",
  writtenDate: "Jan 16, 2026",
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
      essay: "Earlier this year, I made a decision to end a romantic entanglement. Not because it wasn't great, but because we were misaligned and he didn't want the future that I did. It was supposed to be chill fun, friends with benefits, etc., but I totally caught feelings and asked about exclusivity. But he was not in that chapter. I remember that we used to have such special moments, but one time he showed up with hickeys that I did not put there, and it really broke me. I am not the jealous type, but he was bi and I knew we'd never be together. I could not get the image out of my head of some girl chomping on his neck. I tried to see past it and to appreciate the good moments, but I got super sad. In my song, I am being a little dramatic with \"when you said you loved me you were talking about somebody else,\" because we never got to the \"I love you\" stage, but I mean it as a metaphor, because we did have really special moments and an amazing connection that had a deep impact on me.\n\nOne of the things we used to do together was get haircuts. We'd go to the barber and he would ask me to tell the barber what to do. He really liked the fade and style I suggested. Finally, we went to get haircuts one morning and I couldn't be present. I was totally anxious and started to feel resentful toward this person who I loved so much, and then I knew I had to call it off. I told him to come back that night, and he stayed over. I thought I'd wait until the morning, but he could just tell. The minute he got into bed and saw my face, he said, \"what is it?\" And I explained that we needed to draw a line in the sand. We slept, and the following morning we went to the station together. I knew I wouldn't see him again, maybe ever. As the train approached, I totally broke down. In the moment, I felt, \"this is the price I pay for not pushing myself onto you and ending things on a good note instead.\" And that became the spine of the song.\n\nI am not Russian, but in Russian there is a phrase \"khoroshovo ponemnozhku.\" It means something like \"good things in small doses.\" But it's a concept I take very literally and stretch to mean a bit more. To me, the principle means \"get out on a high\". Don't squeeze every last drop of everything. I knew I could have gotten a few more months of good times with him, but it likely would have ended bitterly. So instead, I embraced the high we were on when we ended things. I took the responsibility onto myself to try and love him less, somehow."
    },
    {
      id: 3,
      title: "This Too Shall Pass",
      audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Listen/3.%20THIS%20TOO%20SHALL%20PASS.wav",
      lyricsFile: "This Too Shall Pass.txt",
      essay: "Growing up in an Orthodox Jewish home, we'd often hear the phrase \"gam zeh ya'avor,\" which translates to \"this too shall pass.\" This has been a really hard year for me. On one hand, I feel like I have truly been growing into myself, but on the other hand, I felt like I reached rock bottom in the process. Meaninglessness and lack of purpose are big themes on the whole album, but this song is its most literal expression.\n\nSpecifically, I applied to hundreds of jobs and then had to contend with my lack of resources. More than anything, I was rejected from aerospace engineering school and was totally crushed by the brick wall in front of me. I thought to myself, I want a job so bad, but the job is me. I need to learn and study. I am not there yet. That inspired the start of this song.\n\nI often work in a local community café in Midwood. Recently, I bumped into a girl who had NASA stickers on her laptop. I was intrigued, and when I asked, she explained that she was an aerospace student. I got excited and started asking her how she got in, and was honest that I had been rejected but was super interested in learning. What she said really cut deep. \"When I was in elementary school, I joined the aviation club at my school. Did you do any extracurriculars?\"\n\nRight. The aviation program. Mir Yeshivah Ketana couldn't get a history teacher to make it through the year. That's when it hit me. My parents are amazing people who would do anything for their family. But this was a screw-up. They sent me to fake school. I learned nothing.\n\nMaybe I could have paid attention more. But that is no match for two hours a day of \"English\" (secular) studies compared to the eight hours of the average American student. I spent my day learning Talmud, and that I know very well. UND's aviation program doesn't seem to care about my comprehensive knowledge of Babylonian rabbinical debate. My teachers in high school were a few years older than me. Often they were bochurim who needed an afternoon side gig to help cover their dorming costs at the yeshivah. I had no chance.\n\nViktor Frankl talks about \"unemployment neurosis,\" and during this particularly bad time in the job market, I started to feel very negatively about my parents' decision to send me to fake school. I tried not to cast the blame on them, but my lack of education being cited as the reason for my rejection from UND made me really upset. I was NOT set up to succeed.\n\nThis period sent me down a spiraling depression, and I hit my lowest low ever. I started to question the point of moving on. Trying to comfort myself, the old theme of \"gam zeh ya'avor\" would always play in my head. During a particularly hard day, I thought to myself, \"this too shall pass, but with the way I feel right now, this too shall pass away.\" That wordplay excited me, and I quickly wrote the first verse.\n\nWhen I was sure that things couldn't get worse, my appendix burst. I was taken in for emergency surgery and got to spend my rock bottom in a hospital bed. That quickly became my second verse.\n\nThis song is so real. Something I often think to myself about is that if I ever had a child of my own and he wrote a song, I would be dying to hear it. I would be so curious to get to know them in that way. The public is one thing, everyone wants fame and recognition. But I can't understand how I am pouring my heart out into these songs and expressing myself in clever, nuanced, and musical ways, and my family could not give a fuck. I cannot wrap my head around the fact that they have no curiosity about what I have to say.\n\nA few weeks ago, after facing a romantic rejection and several job rejections on the same day, I started to get emotional while driving with my mother and brother. They were kind and asked what was going on, but I knew that they would not understand. My family and community treat me like my dating is fake. They pretend like the romantic component of my life doesn't exist and do not engage. They will not acknowledge my homosexuality as being a valid form of human connection. I talk to certain members of my family about my dates, and they don't make eye contact and completely ignore me. And they don't listen to my songs. In my head, I dramatically thought, \"you want to know what's going on, but you don't even listen to my songs!!!\" That became my pre-chorus.\n\nI mention my family in this song and even go as far as what can be seen as criticism. But I feel comfortable publishing this level of honesty because I know with certainty that they will not take the time to listen to it."
    },
    {
      id: 4,
      title: "Me and the Truth",
      audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Listen/4.%20ME%20AND%20THE%20TRUTH.wav",
      lyricsFile: "Me And The Truth.txt",
      essay: "While journaling, I came to accept a certain conclusion about myself. I have a pattern where I get into deep romantic entanglements that totally consume me because of my purposelessness problem. When I question the meaning of life and don't feel like I am oriented toward something, it's easy for my love interests to become the de facto \"most important thing in my life.\" The problem is that sometimes that can come across and be a turn-off.\n\nIn one of these entanglements in particular, I realized that I worshipped this person. That inspired me to create a love song chorus with a church/worship-like sound.\n\nBy the time I got around to writing the verses, I had already ended things with him. With my rose-colored glasses off, I felt like I could lean in and let the verses set up the context with an honest telling of the experience from my end. My goal was not to talk shit. This person means a lot to me. My goal was to express how it felt to me personally."
    },
    {
      id: 5,
      title: "The Proof",
      audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Listen/5.%20THE%20PROOF.wav",
      lyricsFile: "The Proof.txt",
      essay: "As you can probably see, the theme of this chapter of my life is screaming in the intersection between romance and purpose. \"The Proof\" is the most outright and unabashed about it on the album. In fact, this song is probably my most honest. I wrote this song doubling down on me needing someone else to make me feel okay. I didn't say that it's good, I didn't say it's healthy, I didn't say that it's what I want. I am just saying how it is.\n\nIn this song, I completely let go and say the quiet part out loud. Unashamed, the chorus is me literally asking a lover to please be the proof that I should bother staying alive. In my original writing, the line was \"can you be the proof that this life isn't living me.\" I later changed it to \"can you be the proof that this life isn't leaving me,\" which is a bit more dark. Since they sound very similar, I decided to leave it ambiguous. It is both.\n\nThe bridge of this song is the punchline of the entire album. \"If you let me down again, please do it into the ground, and say here lies a man who wanted you more than life.\" I am not subtle. I think it's beautifully accusatory. The implication of me not feeling okay alone, is that I can charge these love interests with the crime of being the cause of my suffering. This is totally irrational, unfair, and detached from logic. It's also so fucking real."
    },
    {
      id: 6,
      title: "The Earth Is Flat",
      audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Listen/6.%20THE%20EARTH%20IS%20FLAT.wav",
      lyricsFile: "The Earth Is Flat.txt",
      essay: "This is the most lighthearted record on the album. But under the hood, it comes from a place of deep pain and jadedness. This is a bitterly sarcastic song about my frustration in sex, love, and romance.\n\nPeople say dating is hard all the time. But have you tried being gay, Israeli Gen Z, Jewish, right-leaning, Orthodox background, living in NYC? I have been rejected dozens of times by the \"trendy\" FIT twinks for my political moderateness and Zionism, and also by closeted ex-yeshivah guys who are intimidated by my openness and have no plans of coming out of the closet.\n\nI know that we'll never agree 100% with everyone, and that shouldn't prevent people from dating. Sometimes I'll meet and date a cute, kind person whose Instagram is full of Palestinian propaganda. How am I supposed to date someone who hates my people? But the bigger offense than hating my people is the gross lack of understanding about it. Suddenly everyone is a historian. I can't help it, the virtue-signaling slop is a turn-off for me. In my view, these kinds of people refuse to see reality and insist on doubling down for political trendiness. They are flat earthers.\n\nI am attracted to people I respect, and I respect people who can think critically. But I am getting ahead of myself.\n\nIn the song, I take the blame onto myself. I acknowledge that no one will ever be perfect. I acknowledge that it sounds like I kind of just want to date myself. But how am I supposed to date when it feels like the pool is so misaligned with my values?\n\nSome of the problem is me. I spent my childhood in yeshivah so far detached from PC culture. I get off on over-philosophizing and entertain myself with the theory of everything. I think that 12 years of Talmud study brings that out in a person. Unfortunately, it's not a trait I see outside of my community very often.\n\nI am judgmental. I cannot do it. I cannot date a flat earther. I would break up with a great guy who believed the Earth was flat. A flat Earth convention is a group of people who gather together to echo, celebrate, and marinate in a misguided idea. In that vein, how am I to date someone who goes to Free Palestine protests: a group of people who gather together to echo, celebrate, and marinate in a misguided idea? I am not attracted to dumb.\n\nIronically, I have dated a handful of Palestinian people. While they are obviously colloquially \"pro-Palestine,\" they tend to be people who have an understanding of the Middle East. If anything, being able to talk about the conflict with them and bonding over our shared ancestry has been most rewarding. I have had dozens of white people break up with me for my Zionism, but never once an Arab. It helps to not be a flat earther!\n\nI know that I'm bitching. I know that this is not a song to listen to every day. But I decided to bring it to the finish line and publish it because it is an honest expression of my experience, and I am excited that I did."
    },
    {
      id: 7,
      title: "Good Enough",
      audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Listen/7.%20GOOD%20ENOUGH.wav",
      lyricsFile: "Good Enough.txt",
      essay: "These songs are so loaded. Growing up, I read a popular Jewish children's book series containing stories about real people (by a now disgraced author). In one such story, I remember reading about a character who felt worse than everyone else. She described how it always felt like good things couldn't possibly happen to her and that she was inherently not good enough. As a child, I related so much to the story and was shocked to read about it. I later learned that this is called an \"inferiority complex.\"\n\nI dealt with these feelings my entire life, assuming that people wouldn't want to be friends with me. I felt like I had to do the most so that people would tolerate me. I tried to overachieve to compensate and passively justify my existence to others.\n\nAs I got older, I was able to grow into my self-worth, and many of my learned people-pleasing traits started to fade. But in the realm of romance, my childhood inferiority complex still persists. Whenever I meet someone good, what I hear in my head is, how could I ever be good enough for you with all of my flaws? No amount of reassurance could compete with the way that I see myself. That's how the line \"saying that you love me the same but I'm looking in the mirror again\" was born.\n\nMonster is such an ugly word, and I debated using it in the song. In the end, it was the best word I could find to describe the way I feel around people I'm attracted to.\n\nAs a result of my constant need for reassurance in dating, I tend to bring out an avoidant side of my romantic interests. What happens is I get anxious, and then they pull away as I ask for reassurance. Then the distance makes me need even more reassurance. The cycle continues, but the gap also grows. That is the anxious-avoidant \"swing\" of the pendulum in the bridge of the song. This is followed by the line \"every swing we take is proof I won't be good enough,\" which is one of my favorite lines I've ever written."
    },
    {
      id: 8,
      title: "Chernobyl (Appendix)",
      audioUrl: "https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Listen/8.%20CHERNOBYL%20(APPENDIX).wav",
      lyricsFile: "Chernobyl (Appendix).txt",
      essay: "This song was written and recorded several months after most of the album. But more on that later.\n\nI once saw a cute animation about an adorable little porcupine who doesn't have any friends because his spikes repel everyone before they can get too close.\n\nAfter watching the HBO drama miniseries Chernobyl, I took an interest in learning more about the historic disaster. In the '80s, a Ukrainian nuclear reactor burst and spread nuclear radioactivity, killing or harming anyone who was too close. At the time, I thought of this as an analogy for my experience in dating, because I feel like I carry this inferiority that makes people avoid getting too close.\n\nAfter two really painful romantic entanglements fell apart in a short few-month period, I was feeling a particular kind of rejection. You'd think I was wearing some kind of love repellent. I felt radioactive. And then something actually burst inside me.\n\nChernobyl was on my mind when my appendix exploded, and I immediately compared the bursting of the reactor with the bursting of my appendix. I thought to myself, \"damn, I already felt radioactive before this.\" And that's the song. I thought it would be clever to tag it as (Appendix) since it is the last song on the album and was written later than the others."
    }
  ]
};

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function SongCard({ song, isPlaying, isCurrentSong, onPlay, onPause, currentTime, duration, audioRef, credits }) {
  const [lyrics, setLyrics] = useState('');
  const [lyricsLoading, setLyricsLoading] = useState(false);
  const [showCredits, setShowCredits] = useState(false);
  const progressRef = useRef(null);
  const creditsRef = useRef(null);

  const handleProgressClick = (e) => {
    if (!isCurrentSong || !audioRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audioRef.current.currentTime = percentage * duration;
  };

  // Close credits popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (creditsRef.current && !creditsRef.current.contains(e.target)) {
        setShowCredits(false);
      }
    };
    if (showCredits) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCredits]);

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
            <div className="credits-menu" ref={creditsRef}>
              <button 
                className="credits-btn"
                onClick={() => setShowCredits(!showCredits)}
                aria-label="Show credits"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="19" cy="12" r="2" />
                </svg>
              </button>
              {showCredits && credits && (
                <div className="credits-popup">
                  <h4>Credits</h4>
                  <ul>
                    {credits.credits.piano && <li><span>Piano:</span> {credits.credits.piano}</li>}
                    {credits.credits.guitar && <li><span>Guitar:</span> {credits.credits.guitar}</li>}
                    <li><span>Mixing:</span> {credits.credits.mixing}</li>
                    {credits.credits.additionalMixing?.length > 0 && (
                      <li><span>Additional Mixing:</span> {credits.credits.additionalMixing.join(', ')}</li>
                    )}
                    <li><span>Mastering:</span> {credits.mastering}</li>
                    <li><span>Vocals Recorded:</span> {credits.vocalsRecordedAt}</li>
                  </ul>
                </div>
              )}
            </div>
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
  const [showArtworkInfo, setShowArtworkInfo] = useState(false);
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
    "datePublished": "2026-02-01",
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
        title="Stream: Storm Before the Storm"
        description="New album by Rafi Barides. Listen now."
        canonical="https://rafi-barides.com/listen"
        image="https://rafi-barides.com/StormBeforeTheStorm.png"
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
          <div 
            className="album-art-container"
            onDoubleClick={() => setShowArtworkInfo(true)}
          >
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
            <p className="album-meta">{ALBUM_DATA.releaseDate} • {ALBUM_DATA.songs.length} songs</p>
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
                <div className="author-info">
                  <span className="author-name">{ALBUM_DATA.artist}</span>
                  <span className="author-date">{ALBUM_DATA.writtenDate}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="songs-list" itemScope itemType="https://schema.org/MusicAlbum">
          <meta itemProp="name" content={ALBUM_DATA.title} />
          <meta itemProp="byArtist" content={ALBUM_DATA.artist} />
          
          {ALBUM_DATA.songs.map((song, index) => (
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
              credits={albumCredits[index]}
            />
          ))}
        </main>

        <footer className="listen-footer">
          <p>Written, produced, and performed by Rafi Barides</p>
          <p className="footer-copyright">© 2026 Rafi Barides. All rights reserved.</p>
        </footer>
      </div>

      {/* Artwork Info Popup */}
      {showArtworkInfo && (
        <div className="artwork-popup-overlay" onClick={() => setShowArtworkInfo(false)}>
          <div className="artwork-popup" onClick={(e) => e.stopPropagation()}>
            <button className="artwork-popup-close" onClick={() => setShowArtworkInfo(false)}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>
            <img 
              src={ALBUM_DATA.albumArt} 
              alt={`${ALBUM_DATA.title} album artwork`}
              className="artwork-popup-image"
            />
            <div className="artwork-popup-info">
              <h3>Storm Before the Storm</h3>
              <p>Album artwork photographed by <strong>Simcha Kaplan</strong> near the historic Green-Wood Cemetery</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
