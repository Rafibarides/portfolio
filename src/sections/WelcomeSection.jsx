import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { palette } from '../utils/colors';

const WelcomeSection = () => {
  const videoRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Array of phrases to cycle through
  const phrases = [
    "UI/UX DESIGN",
    "SOFTWARE DEVELOPMENT",
    "PHOTOGRAPHY",
    "AUDIO PRODUCTION",
  ];

  useEffect(() => {
    // Ensure video plays automatically when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Auto-play was prevented:', error);
        // We could add a play button here as fallback, but requirements specify no button
      });
    }
    
    // Set up interval to cycle through phrases
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % phrases.length);
    }, 3000); // Change phrase every 3 seconds
    
    return () => clearInterval(interval);
  }, [phrases.length]);

  // Function to format title with last word in Caveat font
  const formatName = () => {
    return (
      <>
        <span style={{ fontFamily: "'Poppins', sans-serif" }}>Rafi </span>
        <span style={{ fontFamily: "var(--font-accent)" }}>Barides</span>
      </>
    );
  };

  const styles = {
    section: {
      position: 'relative',
      width: '100%',
      height: '33.33vw', // 3:1 ratio (33.33% of viewport width)
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    videoBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: 0,
    },
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay with 70% opacity
      zIndex: 1,
    },
    textContainer: {
      position: 'relative',
      zIndex: 2,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
    },
    name: {
      color: '#FFFFFF',
      fontSize: 'clamp(1.2rem, 2vw, 2rem)', // Smaller size for name
      fontWeight: 400, // Lighter weight
      letterSpacing: '0.05em',
      margin: 0,
    },
    phrasesContainer: {
      height: 'clamp(3rem, 6vw, 6rem)', // Increased height to prevent clipping
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    phrase: {
      color: '#FFFFFF',
      fontSize: 'clamp(1rem, 3.5vw, 3.5rem)', // Reduced size to prevent clipping
      fontWeight: 600, // Bolder weight
      fontFamily: "'Poppins', sans-serif",
      letterSpacing: '0.1em',
      margin: 0,
      textTransform: 'uppercase',
      lineHeight: 1.1, // Tighter line height
    },
    divider: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '2px',
      backgroundColor: 'rgba(255, 255, 255, 0.3)', // Subtle white line with low opacity
      zIndex: 2,
    }
  };

  return (
    <section style={styles.section}>
      <video
        ref={videoRef}
        style={styles.videoBackground}
        src="/Main.m4v"
        autoPlay
        loop
        muted
        playsInline
      />
      <div style={styles.overlay}></div>
      <motion.div 
        style={styles.textContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 style={styles.name}>{formatName()}</h1>
        
        <div style={styles.phrasesContainer}>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIndex}
              style={styles.phrase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {phrases[activeIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </motion.div>
      
      {/* Divider line at the bottom of the section */}
      <div style={styles.divider}></div>
    </section>
  );
};

export default WelcomeSection;
