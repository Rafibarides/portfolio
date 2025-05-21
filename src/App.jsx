import { useEffect } from 'react'
import Portfolio from './Portfolio'
import './App.css'
import { ModalProvider } from './context/ModalContext'

function App() {
  return (
    <ModalProvider>
      <div className="app-container">
        <Portfolio />
      </div>
    </ModalProvider>
  )
}

export default App
