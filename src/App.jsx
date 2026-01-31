import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Portfolio from './Portfolio'
import SoftwarePage from './SoftwarePage'
import PhotographyPage from './PhotographyPage'
import ArtPage from './ArtPage'
import ProductPage from './ProductPage'
import Rafibarides from './Rafibarides'
import BlogPage from './BlogPage'
import BlogPost from './BlogPost'
import LyricsPage from './LyricsPage'
import LyricsPost from './LyricsPost'
import ListenPage from './ListenPage'
import LinksPage from './LinksPage'
import './App.css'
import { ModalProvider } from './context/ModalContext'

function App() {
  return (
    <ModalProvider>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/software" element={<SoftwarePage />} />
            <Route path="/photography" element={<PhotographyPage />} />
            <Route path="/art" element={<ArtPage />} />
            <Route path="/product" element={<ProductPage />} />
            <Route path="/rafi" element={<Rafibarides />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/lyrics" element={<LyricsPage />} />
            <Route path="/lyrics/:slug" element={<LyricsPost />} />
            <Route path="/listen" element={<ListenPage />} />
            <Route path="/links" element={<LinksPage />} />
          </Routes>
        </div>
      </Router>
    </ModalProvider>
  )
}

export default App
