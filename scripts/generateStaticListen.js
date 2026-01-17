import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL
const BASE_URL = 'https://rafi-barides.com';

// Get the actual built asset filenames from dist/assets
function getBuiltAssets() {
  const assetsDir = path.join(__dirname, '../dist/assets');
  const files = fs.readdirSync(assetsDir);
  
  // Find the main index.js and index.css files (they have hashes)
  const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));
  const cssFile = files.find(f => f.startsWith('index-') && f.endsWith('.css'));
  
  return {
    js: jsFile ? `/assets/${jsFile}` : '/assets/index.js',
    css: cssFile ? `/assets/${cssFile}` : '/assets/index.css'
  };
}

// Album data (keep in sync with ListenPage.jsx)
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
      lyricsFile: "In Again.txt",
      essay: "I am a serial talker. When it comes to dating and romance, I sometimes run into a problem where it feels like I say too much too soon. In this song, I am expressing how when I am real with my love interest, I am letting them in. But letting them in usually pushes them out. The bridge is where I say it out loud and glue the song together. I sardonically take 'accountability' for this mistake. The punchline is this: \"I need you to know / What you mean to me / Even if it makes you go / I couldn't leave it unsaid\""
    },
    {
      id: 2,
      title: "Somebody Else",
      lyricsFile: "Love You Less.txt",
      essay: "Earlier this year, I made a decision to end a romantic entanglement. Not because it wasn't great, but because we were misaligned and he didn't want the future that I did. It was supposed to be chill fun, friends with benefits, etc., but I totally caught feelings and asked about exclusivity. But he was not in that chapter. I remember that we used to have such special moments, but one time he showed up with hickeys that I did not put there, and it really broke me. I am not the jealous type, but he was bi and I knew we'd never be together. I could not get the image out of my head of some girl chomping on his neck. I tried to see past it and to appreciate the good moments, but I got super sad. In my song, I am being a little dramatic with \"when you said you loved me you were talking about somebody else,\" because we never got to the \"I love you\" stage, but I mean it as a metaphor, because we did have really special moments and an amazing connection that had a deep impact on me. One of the things we used to do together was get haircuts. We'd go to the barber and he would ask me to tell the barber what to do. He really liked the fade and style I suggested. Finally, we went to get haircuts one morning and I couldn't be present. I was totally anxious and started to feel resentful toward this person who I loved so much, and then I knew I had to call it off. I told him to come back that night, and he stayed over. I thought I'd wait until the morning, but he could just tell. The minute he got into bed and saw my face, he said, \"what is it?\" And I explained that we needed to draw a line in the sand. We slept, and the following morning we went to the station together. I knew I wouldn't see him again, maybe ever. As the train approached, I totally broke down. In the moment, I felt, \"this is the price I pay for not pushing myself onto you and ending things on a good note instead.\" And that became the spine of the song. I am not Russian, but in Russian there is a phrase \"khoroshovo ponemnozhku.\" It means something like \"good things in small doses.\" But it's a concept I take very literally and stretch to mean a bit more. To me, the principle means \"get out on a high\". Don't squeeze every last drop of everything. I knew I could have gotten a few more months of good times with him, but it likely would have ended bitterly. So instead, I embraced the high we were on when we ended things. I took the responsibility onto myself to try and love him less, somehow."
    },
    {
      id: 3,
      title: "This Too Shall Pass",
      lyricsFile: "This Too Shall Pass.txt",
      essay: "Growing up in an Orthodox Jewish home, we'd often hear the phrase \"gam zeh ya'avor,\" which translates to \"this too shall pass.\" This has been a really hard year for me. On one hand, I feel like I have truly been growing into myself, but on the other hand, I felt like I reached rock bottom in the process. Meaninglessness and lack of purpose are big themes on the whole album, but this song is its most literal expression. Specifically, I applied to hundreds of jobs and then had to contend with my lack of resources. More than anything, I was rejected from aerospace engineering school and was totally crushed by the brick wall in front of me. I thought to myself, I want a job so bad, but the job is me. I need to learn and study. I am not there yet. That inspired the start of this song. I often work in a local community café in Midwood. Recently, I bumped into a girl who had NASA stickers on her laptop. I was intrigued, and when I asked, she explained that she was an aerospace student. I got excited and started asking her how she got in, and was honest that I had been rejected but was super interested in learning. What she said really cut deep. \"When I was in elementary school, I joined the aviation club at my school. Did you do any extracurriculars?\" Right. The aviation program. Mir Yeshivah Ketana couldn't get a history teacher to make it through the year. That's when it hit me. My parents are amazing people who would do anything for their family. But this was a screw-up. They sent me to fake school. I learned nothing. Maybe I could have paid attention more. But that is no match for two hours a day of \"English\" (secular) studies compared to the eight hours of the average American student. I spent my day learning Talmud, and that I know very well. UND's aviation program doesn't seem to care about my comprehensive knowledge of Babylonian rabbinical debate. My teachers in high school were a few years older than me. Often they were bochurim who needed an afternoon side gig to help cover their dorming costs at the yeshivah. I had no chance. Viktor Frankl talks about \"unemployment neurosis,\" and during this particularly bad time in the job market, I started to feel very negatively about my parents' decision to send me to fake school. I tried not to cast the blame on them, but my lack of education being cited as the reason for my rejection from UND made me really upset. I was NOT set up to succeed. This period sent me down a spiraling depression, and I hit my lowest low ever. I started to question the point of moving on. Trying to comfort myself, the old theme of \"gam zeh ya'avor\" would always play in my head. During a particularly hard day, I thought to myself, \"this too shall pass, but with the way I feel right now, this too shall pass away.\" That wordplay excited me, and I quickly wrote the first verse. When I was sure that things couldn't get worse, my appendix burst. I was taken in for emergency surgery and got to spend my rock bottom in a hospital bed. That quickly became my second verse. This song is so real. Something I often think to myself about is that if I ever had a child of my own and he wrote a song, I would be dying to hear it. I would be so curious to get to know them in that way. The public is one thing, everyone wants fame and recognition. But I can't understand how I am pouring my heart out into these songs and expressing myself in clever, nuanced, and musical ways, and my family could not give a fuck. I cannot wrap my head around the fact that they have no curiosity about what I have to say. A few weeks ago, after facing a romantic rejection and several job rejections on the same day, I started to get emotional while driving with my mother and brother. They were kind and asked what was going on, but I knew that they would not understand. My family and community treat me like my dating is fake. They pretend like the romantic component of my life doesn't exist and do not engage. They will not acknowledge my homosexuality as being a valid form of human connection. I talk to certain members of my family about my dates, and they don't make eye contact and completely ignore me. And they don't listen to my songs. In my head, I dramatically thought, \"you want to know what's going on, but you don't even listen to my songs!!!\" That became my pre-chorus. I mention my family in this song and even go as far as what can be seen as criticism. But I feel comfortable publishing this level of honesty because I know with certainty that they will not take the time to listen to it."
    },
    {
      id: 4,
      title: "Me and the Truth",
      lyricsFile: "Me And The Truth.txt",
      essay: "While journaling, I came to accept a certain conclusion about myself. I have a pattern where I get into deep romantic entanglements that totally consume me because of my purposelessness problem. When I question the meaning of life and don't feel like I am oriented toward something, it's easy for my love interests to become the de facto \"most important thing in my life.\" The problem is that sometimes that can come across and be a turn-off. In one of these entanglements in particular, I realized that I worshipped this person. That inspired me to create a love song chorus with a church/worship-like sound. By the time I got around to writing the verses, I had already ended things with him. With my rose-colored glasses off, I felt like I could lean in and let the verses set up the context with an honest telling of the experience from my end. My goal was not to talk shit. This person means a lot to me. My goal was to express how it felt to me personally."
    },
    {
      id: 5,
      title: "The Proof",
      lyricsFile: "The Proof.txt",
      essay: "As you can probably see, the theme of this chapter of my life is screaming in the intersection between romance and purpose. \"The Proof\" is the most outright and unabashed about it on the album. In fact, this song is probably my most honest. I wrote this song doubling down on me needing someone else to make me feel okay. I didn't say that it's good, I didn't say it's healthy, I didn't say that it's what I want. I am just saying how it is. In this song, I completely let go and say the quiet part out loud. Unashamed, the chorus is me literally asking a lover to please be the proof that I should bother staying alive. In my original writing, the line was \"can you be the proof that this life isn't living me.\" I later changed it to \"can you be the proof that this life isn't leaving me,\" which is a bit more dark. Since they sound very similar, I decided to leave it ambiguous. It is both. The bridge of this song is the punchline of the entire album. \"If you let me down again, please do it into the ground, and say here lies a man who wanted you more than life.\" I am not subtle. I think it's beautifully accusatory. The implication of me not feeling okay alone, is that I can charge these love interests with the crime of being the cause of my suffering. This is totally irrational, unfair, and detached from logic. It's also so fucking real."
    },
    {
      id: 6,
      title: "The Earth Is Flat",
      lyricsFile: "The Earth Is Flat.txt",
      essay: "This is the most lighthearted record on the album. But under the hood, it comes from a place of deep pain and jadedness. This is a bitterly sarcastic song about my frustration in sex, love, and romance. People say dating is hard all the time. But have you tried being gay, Israeli Gen Z, Jewish, right-leaning, Orthodox background, living in NYC? I have been rejected dozens of times by the \"trendy\" FIT twinks for my political moderateness and Zionism, and also by closeted ex-yeshivah guys who are intimidated by my openness and have no plans of coming out of the closet. I know that we'll never agree 100% with everyone, and that shouldn't prevent people from dating. Sometimes I'll meet and date a cute, kind person whose Instagram is full of Palestinian propaganda. How am I supposed to date someone who hates my people? But the bigger offense than hating my people is the gross lack of understanding about it. Suddenly everyone is a historian. I can't help it, the virtue-signaling slop is a turn-off for me. In my view, these kinds of people refuse to see reality and insist on doubling down for political trendiness. They are flat earthers. I am attracted to people I respect, and I respect people who can think critically. But I am getting ahead of myself. In the song, I take the blame onto myself. I acknowledge that no one will ever be perfect. I acknowledge that it sounds like I kind of just want to date myself. But how am I supposed to date when it feels like the pool is so misaligned with my values? Some of the problem is me. I spent my childhood in yeshivah so far detached from PC culture. I get off on over-philosophizing and entertain myself with the theory of everything. I think that 12 years of Talmud study brings that out in a person. Unfortunately, it's not a trait I see outside of my community very often. I am judgmental. I cannot do it. I cannot date a flat earther. I would break up with a great guy who believed the Earth was flat. A flat Earth convention is a group of people who gather together to echo, celebrate, and marinate in a misguided idea. In that vein, how am I to date someone who goes to Free Palestine protests: a group of people who gather together to echo, celebrate, and marinate in a misguided idea? I am not attracted to dumb. Ironically, I have dated a handful of Palestinian people. While they are obviously colloquially \"pro-Palestine,\" they tend to be people who have an understanding of the Middle East. If anything, being able to talk about the conflict with them and bonding over our shared ancestry has been most rewarding. I have had dozens of white people break up with me for my Zionism, but never once an Arab. It helps to not be a flat earther! I know that I'm bitching. I know that this is not a song to listen to every day. But I decided to bring it to the finish line and publish it because it is an honest expression of my experience, and I am excited that I did."
    },
    {
      id: 7,
      title: "Good Enough",
      lyricsFile: "Good Enough.txt",
      essay: "These songs are so loaded. Growing up, I read a popular Jewish children's book series containing stories about real people (by a now disgraced author). In one such story, I remember reading about a character who felt worse than everyone else. She described how it always felt like good things couldn't possibly happen to her and that she was inherently not good enough. As a child, I related so much to the story and was shocked to read about it. I later learned that this is called an \"inferiority complex.\" I dealt with these feelings my entire life, assuming that people wouldn't want to be friends with me. I felt like I had to do the most so that people would tolerate me. I tried to overachieve to compensate and passively justify my existence to others. As I got older, I was able to grow into my self-worth, and many of my learned people-pleasing traits started to fade. But in the realm of romance, my childhood inferiority complex still persists. Whenever I meet someone good, what I hear in my head is, how could I ever be good enough for you with all of my flaws? No amount of reassurance could compete with the way that I see myself. That's how the line \"saying that you love me the same but I'm looking in the mirror again\" was born. Monster is such an ugly word, and I debated using it in the song. In the end, it was the best word I could find to describe the way I feel around people I'm attracted to. As a result of my constant need for reassurance in dating, I tend to bring out an avoidant side of my romantic interests. What happens is I get anxious, and then they pull away as I ask for reassurance. Then the distance makes me need even more reassurance. The cycle continues, but the gap also grows. That is the anxious-avoidant \"swing\" of the pendulum in the bridge of the song. This is followed by the line \"every swing we take is proof I won't be good enough,\" which is one of my favorite lines I've ever written."
    },
    {
      id: 8,
      title: "Chernobyl (Appendix)",
      lyricsFile: "Chernobyl (Appendix).txt",
      essay: "This song was written and recorded several months after most of the album. But more on that later. I once saw a cute animation about an adorable little porcupine who doesn't have any friends because his spikes repel everyone before they can get too close. After watching the HBO drama miniseries Chernobyl, I took an interest in learning more about the historic disaster. In the '80s, a Ukrainian nuclear reactor burst and spread nuclear radioactivity, killing or harming anyone who was too close. At the time, I thought of this as an analogy for my experience in dating, because I feel like I carry this inferiority that makes people avoid getting too close. After two really painful romantic entanglements fell apart in a short few-month period, I was feeling a particular kind of rejection. You'd think I was wearing some kind of love repellent. I felt radioactive. And then something actually burst inside me. Chernobyl was on my mind when my appendix exploded, and I immediately compared the bursting of the reactor with the bursting of my appendix. I thought to myself, \"damn, I already felt radioactive before this.\" And that's the song. I thought it would be clever to tag it as (Appendix) since it is the last song on the album and was written later than the others."
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
      
      <div class="song-expandable-sections">
        <details class="song-details">
          <summary class="expand-btn">
            <span>About this song</span>
            <svg viewBox="0 0 24 24" fill="currentColor" class="chevron">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </summary>
          <div class="song-essay" itemprop="description">
            <p>${song.essay}</p>
          </div>
        </details>
        
        ${lyrics ? `
        <details class="song-details">
          <summary class="expand-btn">
            <span>Lyrics</span>
            <svg viewBox="0 0 24 24" fill="currentColor" class="chevron">
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </summary>
          <div class="song-lyrics" itemprop="lyrics">
            ${lyricsHtml}
          </div>
        </details>
        ` : ''}
      </div>
    </article>`;
  }).join('\n');
}

// Generate the static HTML page
function generateListenPageHtml() {
  const canonical = `${BASE_URL}/listen`;
  const structuredData = generateStructuredData();
  const songCards = generateSongCardsHtml();
  const assets = getBuiltAssets();
  
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
  <link rel="icon" type="image/avif" href="/assets/favicon.avif">
  
  <!-- SEO Meta Tags -->
  <meta name="description" content="Stream Storm Before the Storm by Rafi Barides. 8 original songs with lyrics.">
  <meta name="keywords" content="${keywords}">
  <meta name="author" content="${ALBUM_DATA.artist}">
  <link rel="canonical" href="${canonical}">
  
  <!-- Open Graph / Facebook / WhatsApp -->
  <meta property="og:type" content="music.album">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="Stream: Storm Before the Storm">
  <meta property="og:description" content="New album by Rafi Barides. Listen now.">
  <meta property="og:image" content="https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Listen/prev.png">
  <meta property="og:image:width" content="1874">
  <meta property="og:image:height" content="1284">
  <meta property="og:site_name" content="Rafi Barides">
  <meta property="music:musician" content="${BASE_URL}">
  <meta property="music:release_date" content="2026-02-01">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${canonical}">
  <meta name="twitter:title" content="Stream: Storm Before the Storm">
  <meta name="twitter:description" content="New album by Rafi Barides. Listen now.">
  <meta name="twitter:image" content="https://pub-6b585af950464b7ca12da1ee87798b6d.r2.dev/Listen/prev.png">
  
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
      margin-top: 1rem;
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
    
    .author-info {
      display: flex;
      flex-direction: column;
      gap: 0.1rem;
    }
    
    .author-name {
      font-size: 0.95rem;
      font-weight: 500;
      color: #e8e8ed;
    }
    
    .author-date {
      font-size: 0.8rem;
      color: #6b6b78;
    }
    
    @media (min-width: 768px) {
      .album-quote-section {
        margin: 0 0 2rem;
      }
      
      .written-by-section {
        align-items: flex-start;
        align-self: flex-start;
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
      align-items: flex-start;
      gap: 1rem;
      padding-top: 0.25rem;
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
      line-height: 1.4;
      padding-bottom: 0.15em;
    }
    
    .song-expandable-sections {
      margin-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding-top: 0.75rem;
    }
    
    .song-details {
      border-bottom: 1px solid rgba(255, 255, 255, 0.03);
    }
    
    .song-details:last-child {
      border-bottom: none;
    }
    
    .expand-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.75rem 0;
      background: transparent;
      border: none;
      color: #8a8a95;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      list-style: none;
    }
    
    .expand-btn::-webkit-details-marker {
      display: none;
    }
    
    .expand-btn:hover {
      color: #b8b8c0;
    }
    
    .expand-btn .chevron {
      width: 20px;
      height: 20px;
      transition: transform 0.3s ease;
    }
    
    .song-details[open] .expand-btn .chevron {
      transform: rotate(180deg);
    }
    
    .song-essay {
      padding: 1rem 0 1.5rem;
      color: #a0a0ab;
      font-size: 0.95rem;
      line-height: 1.8;
    }
    
    .song-essay p {
      margin-bottom: 1rem;
    }
    
    .song-essay p:last-child {
      margin-bottom: 0;
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
    #root:empty {
      display: none;
    }
    
    #root:not(:empty) ~ .static-content,
    #root:not(:empty) ~ .static-back-link {
      display: none !important;
    }
  </style>
  
  <!-- React App will hydrate over this content -->
  <script type="module" crossorigin src="${assets.js}"></script>
  <link rel="stylesheet" href="${assets.css}">
</head>
<body>
  <!-- React will mount here and take over when loaded -->
  <div id="root"></div>
  
  <!-- Static content for SEO - hidden when React loads -->
  <a href="/" class="back-link static-back-link">← Portfolio</a>
  
  <div class="static-content">
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
          <p class="album-meta">${ALBUM_DATA.releaseDate} • ${ALBUM_DATA.songs.length} songs</p>
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
              <div class="author-info">
                <span class="author-name">${ALBUM_DATA.artist}</span>
                <span class="author-date">${ALBUM_DATA.writtenDate}</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main class="songs-list">
        ${songCards}
      </main>
      
      <footer class="listen-footer">
        <p>Written, produced, and performed by Rafi Barides</p>
        <p class="footer-copyright">© 2026 Rafi Barides. All rights reserved.</p>
      </footer>
    </div>
  </div>
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
