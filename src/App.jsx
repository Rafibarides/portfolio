import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Portfolio from './Portfolio'
import SoftwarePage from './SoftwarePage'
import PhotographyPage from './PhotographyPage'
import ArtPage from './ArtPage'
import ProductPage from './ProductPage'
import Rafibarides from './Rafibarides'
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
          </Routes>
        </div>
      </Router>
    </ModalProvider>
  )
}

export default App
