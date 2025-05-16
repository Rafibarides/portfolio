import React, { useState, useEffect, useCallback } from 'react';
import { palette } from '../utils/colors';
import ScrollFontTransition from '../components/ScrollFontTransition';
import photographyData from '../../Json/PhotographySection.json';
import { motion } from 'framer-motion';

const PhotographySection = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    setPhotos(photographyData);
    
    // Handle responsive layout
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openPhotoModal = (photoUrl, index) => {
    setSelectedPhoto(photoUrl);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
    setSelectedIndex(null);
    document.body.style.overflow = 'auto';
  };

  const navigatePhoto = useCallback((direction) => {
    if (selectedIndex === null) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (selectedIndex + 1) % photos.length;
    } else {
      newIndex = (selectedIndex - 1 + photos.length) % photos.length;
    }
    
    setSelectedPhoto(photos[newIndex]);
    setSelectedIndex(newIndex);
  }, [selectedIndex, photos]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedPhoto) return;
      
      if (e.key === 'ArrowRight') {
        navigatePhoto('next');
      } else if (e.key === 'ArrowLeft') {
        navigatePhoto('prev');
      } else if (e.key === 'Escape') {
        closePhotoModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, navigatePhoto]);

  const styles = {
    section: {
      padding: '40px 20px',
      minHeight: '100vh',
      position: 'relative',
      color: palette.text,
      fontFamily: "'Poppins', sans-serif",
      background: 'linear-gradient(to right, rgba(30, 30, 30, 0.3) 0%, rgba(0, 0, 0, 1) 30%)',
      borderTop: '2px solid rgba(255, 255, 255, 0.2)',
    },
    header: {
      fontSize: window.innerWidth <= 768 ? '1rem' : '3.5rem',
      marginBottom: '50px',
      textAlign: 'center',
      fontFamily: "'Poppins', sans-serif",
    },
    photoGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '60px',
      padding: '60px',
      maxWidth: '1000px',
      margin: '0 auto',
    },
    photoContainer: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '5px',
      cursor: 'pointer',
      aspectRatio: '5/7',
      backgroundColor: 'rgba(20, 20, 20, 0.5)',
      transition: 'transform 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    photo: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease',
    },
    photoOverlay: {
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
    },
    modalImage: {
      maxWidth: '100%',
      maxHeight: '90vh',
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
    photoItem: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '5px',
      cursor: 'pointer',
      aspectRatio: '5/7',
      backgroundColor: 'rgba(20, 20, 20, 0.5)',
      transition: 'transform 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
  };

  const getGridColumn = (index, isMobile) => {
    if (isMobile) return 'span 1';
    return index % 2 === 0 ? 'span 1' : 'span 2';
  };

  const getGridRow = (index, isMobile) => {
    if (isMobile) return 'span 1';
    return index < 2 ? 'span 1' : 'span 2';
  };

  return (
    <section id="photography" style={styles.section}>
      <h2 style={styles.header}>
        <ScrollFontTransition 
          text="Photography"
          startFont="'Caveat', cursive"
          endFont="'Poppins', sans-serif"
          fontWeight={600}
          threshold={0.2}
          duration={0.3}
        />
      </h2>
      
      <div style={styles.photoGrid}>
        {photos.map((photo, index) => (
          <motion.div 
            key={index}
            style={styles.photoContainer}
            onClick={() => openPhotoModal(photo, index)}
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
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={photo}
              alt={`Photography ${index + 1}`}
              style={styles.photo}
              loading="lazy"
            />
            <div style={styles.photoOverlay}></div>
          </motion.div>
        ))}
      </div>
      
      {selectedPhoto && (
        <div 
          style={styles.modalOverlay}
          onClick={closePhotoModal}
        >
          <button 
            style={{...styles.navButton, ...styles.prevButton}}
            onClick={(e) => {
              e.stopPropagation();
              navigatePhoto('prev');
            }}
          >
            &#10094;
          </button>
          
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={closePhotoModal}>×</button>
            <img 
              src={selectedPhoto} 
              alt={`Photography ${selectedIndex + 1}`} 
              style={styles.modalImage}
            />
          </div>
          
          <button 
            style={{...styles.navButton, ...styles.nextButton}}
            onClick={(e) => {
              e.stopPropagation();
              navigatePhoto('next');
            }}
          >
            &#10095;
          </button>
        </div>
      )}
    </section>
  );
};

export default PhotographySection;
