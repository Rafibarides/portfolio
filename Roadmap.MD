# 📸 Rafi Barides Portfolio Site Spec (React + Vite)

## 🔧 Tech Stack & Conventions

* We will use **React** and **JSX** — *no TypeScript*.
* Styling will be **inline only** — *no Tailwind or external CSS*.
* We are using **Vite** for the build system and bundler.
* We will use **`fetch` only**, *never Axios*.
* We will create a `colors.js` file that exports a **global constant object** called `palette`.

### 🎨 `colors.js` Spec

```js
export const palette = {
  background: '#000000', // black
  medium: '#333333',
  text: '#FFFFFF', // white
  accent: '#FF4081',
  light: '#F5F5F5',
};
```

> 🔁 Use **only this palette** across the entire site for color values to maintain consistency and support dynamic theming.

---

## 📄 Page Structure

The site is one long vertical scrollable page built inside a single parent component: `Portfolio.jsx`. Each section is its own component and renders in order.

We use a **stable left-hand navigation** (not top nav). This menu stays **locked in place** even while scrolling.

### 📚 Sections (in order)

1. **SoftwareSection.jsx**
2. **PhotographySection.jsx**
3. **ArtSection.jsx**
4. **MusicPerformance.jsx**
5. **Audio.jsx**
6. **Video.jsx**
7. **ContentProduction.jsx**

Each section has an **anchor/bookmark** so that clicking the left-hand menu scrolls the user to that exact section.

---

## 🧠 Data Architecture

All content is powered by **JSON files**, making the content dynamic and easily replaceable. Each section pulls from its corresponding array.

---

## 💻 Software Section

### ✅ Layout

* 2 cards per row on desktop
* 1 card per row on mobile

### ✅ Features

* Each card displays:

  * Embed preview (if available)
  * Fallback to screenshot if no embed
  * Title
  * Pills for technologies used
  * 3-line truncated description with a **"Read More"** toggle
* Buttons/icons (conditionally rendered):

  * **GitHub** (logo that links to repo)
  * **App Store** (if available)
  * **Demo** (opens full display)
  * **Presentation** (opens slide deck view)

### ✅ Filter Feature

* Projects are **filterable by technologies**

### 📦 Data Format

```js
[
  {
    embedLink: "https://project-live-site.com",
    website: "https://project-site.com",
    screenshot: "https://image-url.com",
    title: "Project Name",
    technologies: ["React", "Firebase", "Figma"],
    description: "This is a short summary of the project...",
    githubRepoURL: "https://github.com/your-repo",
    presentation: "https://slides.com/embed-link",
    appStore: "https://apps.apple.com/project",
  }
]
```

---

## 📷 Photography Section

* Images are hosted on **Dropbox**.
* Files are already numbered and will display in that order.
* **2 images per row on desktop**, 1 per row on mobile.
* Data comes from a simple array of image URLs.

---

## 🎨 Art Section

* Same layout and behavior as Photography Section.
* Also uses Dropbox.
* Display order is determined by filename numbering.

---

## 🎤 Music Performance Section

* Layout: **1 video card per row** (same for desktop and mobile)
* Each card contains:

  * YouTube embed
  * Title
  * Description (small text)

### 📦 Data Format

```js
[
  {
    youtubeLink: "https://youtube.com/embed/link",
    title: "Live Performance Title",
    description: "Short description of the piece or context.",
  }
]
```

---

## 🎧 Audio Section

* Layout: **2 cards per row on desktop**, 1 per row on mobile
* Each card has:

  * Play button (or inline audio player)
  * Title
  * Contribution tags (pills)

### 📦 Data Format

```js
[
  {
    title: "Track Name",
    audioFileURL: "https://dropbox.com/audiofile.mp3",
    contributions: ["Production", "Mixing", "Mastering"]
  }
]
```

### 🎵 Streaming Playlists

At the bottom of the Audio section, include 3 large cards linking to:

* Apple Music Playlist
* Spotify Playlist
* YouTube Music Playlist

Label this subsection: **“Produced by Rafi Barides Playlist”**

---

## 🎥 Video Section

### 🎬 Layout

* **First**, display **vertical videos** from Dropbox (3 per row on desktop, 1 per row on mobile)
* **Then**, display **YouTube videos** (all one per row)

### 📦 Data Format

```js
{
  verticalVideos: ["https://dropbox.com/video1.mp4", ...],
  youtubeVideos: ["https://youtube.com/embed/link1", ...]
}
```

---

## 📱 Content Production Section

* Only vertical videos, all coming from Dropbox
* Layout: 3 videos per row on desktop, 1 per row on mobile
* Fully dynamic based on a dropbox-powered array

