import { useEffect } from 'react'
import Portfolio from './Portfolio'
import './App.css'

function App() {
  useEffect(() => {
    // Load Three.js and Vanta.js scripts dynamically
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    // Load scripts in sequence (Three.js must load before Vanta)
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js')
      .then(() => loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.fog.min.js'))
      .then(() => {
        console.log('Vanta scripts loaded successfully');
        // The scripts are now loaded, but we'll let the SoftwareSection component initialize the effect
      })
      .catch(err => console.error('Error loading Vanta scripts:', err));
      
    // Clean up
    return () => {
      // Optional: remove scripts when component unmounts
      const scripts = document.querySelectorAll('script[src*="three"], script[src*="vanta"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <div className="app-container">
      <Portfolio />
    </div>
  )
}

export default App
