import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { palette } from '../utils/colors';
import ScrollFontTransition from '../components/ScrollFontTransition';
import artData from '../../Json/ArtSection.json';

const ArtSection = () => {
  const [artworks, setArtworks] = useState([]);
  const [selectedArt, setSelectedArt] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const sectionRef = useRef(null);

  useEffect(() => {
    setArtworks(artData);
    
    // Handle responsive layout
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openArtModal = (artwork, index) => {
    setSelectedArt(artwork);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeArtModal = () => {
    setSelectedArt(null);
    setSelectedIndex(null);
    document.body.style.overflow = 'auto';
  };

  const navigateArt = useCallback((direction) => {
    if (selectedIndex === null) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (selectedIndex + 1) % artworks.length;
    } else {
      newIndex = (selectedIndex - 1 + artworks.length) % artworks.length;
    }
    
    setSelectedArt(artworks[newIndex]);
    setSelectedIndex(newIndex);
  }, [selectedIndex, artworks]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedArt) return;
      
      if (e.key === 'ArrowRight') {
        navigateArt('next');
      } else if (e.key === 'ArrowLeft') {
        navigateArt('prev');
      } else if (e.key === 'Escape') {
        closeArtModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArt, navigateArt]);

  // Separate artworks with text (featured) from those without
  const featuredArtworks = artworks.filter(art => art.text);
  const regularArtworks = artworks.filter(art => !art.text);

  // Create a combined array for navigation
  const allArtworksInOrder = [...regularArtworks, ...featuredArtworks];

  const styles = {
    section: {
      padding: '40px 20px',
      minHeight: '100vh',
      position: 'relative',
      color: palette.text,
      fontFamily: "'Poppins', sans-serif",
      borderTop: '2px solid rgba(255, 255, 255, 0.2)',
      zIndex: 0,
      overflow: 'hidden', // Ensure the gradient animation stays contained
    },
    gradientBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      background: 'linear-gradient(135deg, #000000, #222222, #111111, #1a1a1a)',
      backgroundSize: '400% 400%',
    },
    header: {
      fontSize: '2.5rem',
      margin: '50px',
      textAlign: 'center',
      fontFamily: "'Poppins', sans-serif",
    },
    artGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '30px',
      padding: '30px',
      maxWidth: '1400px',
      margin: '0 auto',
    },
    artContainer: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '5px',
      cursor: 'pointer',
      aspectRatio: '1',
      backgroundColor: 'rgba(20, 20, 20, 0.5)',
      transition: 'transform 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    art: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease',
    },
    artOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.01)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    featuredSection: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '30px',
      padding: '30px',
      maxWidth: '1400px',
      margin: '30px auto',
      alignItems: 'center',
    },
    featuredArt: {
      width: '100%',
      maxHeight: '600px',
      objectFit: 'contain',
      borderRadius: '5px',
      cursor: 'pointer',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backgroundColor: 'rgba(20, 20, 20, 0.5)',
    },
    featuredText: {
      padding: '20px',
      fontSize: '1rem',
      lineHeight: '1.6',
      color: palette.text,
      whiteSpace: 'pre-wrap',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    },
    modalContent: {
      position: 'relative',
      maxWidth: '90%',
      maxHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    modalImage: {
      maxWidth: '100%',
      maxHeight: '80vh',
      objectFit: 'contain',
      borderRadius: '4px',
    },
    closeButton: {
      position: 'absolute',
      top: '-40px',
      right: '0',
      backgroundColor: 'transparent',
      border: 'none',
      color: palette.text,
      fontSize: '30px',
      cursor: 'pointer',
      outline: 'none',
    },
    sectionTitle: {
      fontSize: '1.8rem',
      margin: '30px 0 10px',
      textAlign: 'center',
      fontFamily: "'Poppins', sans-serif",
    },
    navButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      color: palette.text,
      border: 'none',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      outline: 'none',
      zIndex: 1001,
    },
    prevButton: {
      left: '20px',
    },
    nextButton: {
      right: '20px',
    },
  };

  // Animation variants for the gradient background
  const gradientAnimation = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: 15,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  return (
    <section id="art" style={styles.section} ref={sectionRef}>
      <motion.div 
        style={styles.gradientBackground}
        animate="animate"
        variants={gradientAnimation}
      />
      
      <h2 style={styles.header}>
        <ScrollFontTransition 
          text="Artwork"
          startFont="'Caveat', cursive"
          endFont="'Poppins', sans-serif"
          fontWeight={600}
          threshold={0.2}
          duration={0.3}
        />
      </h2>
      
      {/* Regular Artworks Grid */}
      {regularArtworks.length > 0 && (
        <div style={styles.artGrid}>
          {regularArtworks.map((artwork, index) => (
            <motion.div 
              key={index} 
              style={styles.artContainer}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 * (index % 3) }}
              onClick={() => openArtModal(artwork, index)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.querySelector('img').style.transform = 'scale(1.1)';
                e.currentTarget.querySelector('div').style.opacity = 1;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                e.currentTarget.querySelector('div').style.opacity = 0;
              }}
            >
              <img 
                src={artwork.url} 
                alt={`Artwork ${index + 1}`} 
                style={styles.art}
                loading="lazy"
              />
              <div style={styles.artOverlay}></div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Featured Artworks with Text (at the end) */}
      {featuredArtworks.length > 0 && (
        <>
          {featuredArtworks.map((artwork, index) => (
            <motion.div 
              key={index} 
              style={styles.featuredSection}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src={artwork.url} 
                alt={`Featured Artwork ${index + 1}`} 
                style={styles.featuredArt}
                onClick={() => openArtModal(artwork, regularArtworks.length + index)}
              />
              <div style={styles.featuredText}>
                {artwork.text.split('\n\n').map((paragraph, i) => (
                  <motion.p 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: i === 0 ? 0.8 : 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.7, 
                      delay: 0.1 + (i * 0.1),
                      ease: "easeOut"
                    }}
                    style={{ 
                      margin: i === 0 ? '0 0 15px 0' : '10px 0',
                      fontWeight: i === 0 ? 200 : 400,
                    }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          ))}
        </>
      )}
      
      {/* Modal for viewing artwork */}
      {selectedArt && (
        <div 
          style={styles.modalOverlay}
          onClick={closeArtModal}
        >
          <button 
            style={{...styles.navButton, ...styles.prevButton}}
            onClick={(e) => {
              e.stopPropagation();
              navigateArt('prev');
            }}
          >
            &#10094;
          </button>
          
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={closeArtModal}>×</button>
            <img 
              src={selectedArt.url} 
              alt={`Artwork ${selectedIndex + 1}`} 
              style={styles.modalImage}
            />
          </div>
          
          <button 
            style={{...styles.navButton, ...styles.nextButton}}
            onClick={(e) => {
              e.stopPropagation();
              navigateArt('next');
            }}
          >
            &#10095;
          </button>
        </div>
      )}
    </section>
  );
};

export default ArtSection;
