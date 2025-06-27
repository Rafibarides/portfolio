import { useState } from 'react';
import { motion } from 'framer-motion';
import PhotographySection from './sections/PhotographySection';
import ContactSection from './sections/ContactSection';
import AboutMeModal from './AboutMeModal';
import { ModalProvider } from './context/ModalContext';

// Modified WelcomeSection for photography page
const PhotographyWelcomeSection = () => {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '33.33vw', // 3:1 ratio (33.33% of viewport width)
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <video
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
        src="/Main.m4v"
        autoPlay
        loop
        muted
        playsInline
      />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Dark overlay with 70% opacity
        zIndex: 1,
      }}></div>
      <motion.div 
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 style={{
          color: '#FFFFFF',
          fontSize: 'clamp(1.2rem, 2vw, 2rem)', // Smaller size for name
          fontWeight: 400, // Lighter weight
          letterSpacing: '0.05em',
          margin: 0,
        }}>
          <span style={{ fontFamily: "'Poppins', sans-serif" }}>Rafi </span>
          <span style={{ fontFamily: "var(--font-accent)" }}>Barides</span>
        </h1>
        
        <div style={{
          height: 'clamp(3rem, 6vw, 6rem)', // Increased height to prevent clipping
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <p style={{
            color: '#FFFFFF',
            fontSize: 'clamp(1rem, 3.5vw, 3.5rem)', // Reduced size to prevent clipping
            fontWeight: 600, // Bolder weight
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: '0.1em',
            margin: 0,
            textTransform: 'uppercase',
            lineHeight: 1.1, // Tighter line height
          }}>
            PHOTOGRAPHY
          </p>
        </div>
      </motion.div>
      
      {/* Divider line at the bottom of the section */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)', // Subtle white line with low opacity
        zIndex: 2,
      }}></div>
    </section>
  );
};

const PhotographyPage = () => {
  const [showAboutModal, setShowAboutModal] = useState(false);

  const styles = {
    container: {
      backgroundColor: '#000',
      color: '#fff',
      minHeight: '100vh',
      width: '100%',
    },
    banner: {
      width: '100%',
      padding: '40px 0',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    bannerLink: {
      color: '#fff',
      textDecoration: 'underline',
      fontSize: '1.1rem',
      fontFamily: "'Poppins', sans-serif",
      cursor: 'pointer',
      transition: 'opacity 0.3s ease',
    },
  };

  return (
    <ModalProvider>
      <div style={styles.container}>
        {/* Main content */}
        <div>
          <PhotographyWelcomeSection />
          <PhotographySection />
          
          {/* Black banner with "more about me" link - between sections */}
          <motion.div 
            style={styles.banner}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.span
              style={styles.bannerLink}
              onClick={() => setShowAboutModal(true)}
              whileHover={{ opacity: 0.7 }}
              whileTap={{ scale: 0.98 }}
            >
              more about me
            </motion.span>
          </motion.div>
          
          <ContactSection />
        </div>

        {/* About Me Modal */}
        {showAboutModal && <AboutMeModal onClose={() => setShowAboutModal(false)} />}

        {/* Bottom effects - similar to Portfolio.jsx */}
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '250px',
            backgroundImage: 'url(src/assets/bottomSmoke.gif)',
            backgroundPosition: 'bottom center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)',
            mixBlendMode: 'screen',
            opacity: 0.07,
            pointerEvents: 'none',
            zIndex: 9998,
          }}
        />

        {/* Glassmorphism blur effect */}
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '150px',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        />

        {/* Top gradient fade effect */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '400px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.02) 80%, rgba(0,0,0,0) 100%)',
            pointerEvents: 'none',
            zIndex: 990,
          }}
        />
      </div>
    </ModalProvider>
  );
};

export default PhotographyPage; 