import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { palette } from '../utils/colors';
import photographyData from '../../Json/PhotographySection.json';
import Title from '../components/Title';

// Memoized photo component to prevent unnecessary re-renders
const PhotoItem = memo(({ src, alt, index, onPhotoClick, styles }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div 
      style={styles.photoContainer}
      onClick={() => onPhotoClick(src, index)}
    >
      {/* Always render image - let browser handle loading */}
      <img
        src={src}
        alt={alt}
        style={{
          ...styles.image,
          opacity: loaded && !error ? 1 : 0,
        }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading="eager"
        decoding="auto"
      />
      
      {/* Show placeholder until loaded */}
      {(!loaded || error) && (
        <div style={styles.placeholder}>
          {error ? '⚠️ Failed to load' : 'Loading...'}
        </div>
      )}
    </div>
  );
});

PhotoItem.displayName = 'PhotoItem';

const PhotographySection = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Memoize the photos data to prevent unnecessary rerenders
  const memoizedPhotos = useMemo(() => {
    return photographyData;
  }, []);

  useEffect(() => {
    setPhotos(memoizedPhotos);
    
    // Handle responsive layout
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [memoizedPhotos]);

  // Simple modal functions
  const openPhotoModal = useCallback((photoUrl, index) => {
    setSelectedPhoto(photoUrl);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closePhotoModal = useCallback(() => {
    setSelectedPhoto(null);
    setSelectedIndex(null);
    document.body.style.overflow = 'auto';
  }, []);

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
  }, [selectedPhoto, navigatePhoto, closePhotoModal]);

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
      border: '1px solid rgba(255, 255, 255, 0.1)',
      WebkitTapHighlightColor: 'transparent',
      // Hardware acceleration for smooth rendering
      WebkitTransform: 'translate3d(0,0,0)',
      transform: 'translate3d(0,0,0)',
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      position: 'absolute',
      top: 0,
      left: 0,
      userSelect: 'none',
      WebkitUserSelect: 'none',
      WebkitTouchCallout: 'none',
      // Hardware acceleration to prevent flicker
      WebkitTransform: 'translate3d(0,0,0)',
      transform: 'translate3d(0,0,0)',
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
    },
    placeholder: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(30, 30, 30, 0.8)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: '14px',
      // Ensure smooth transitions
      WebkitTransform: 'translate3d(0,0,0)',
      transform: 'translate3d(0,0,0)',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      zIndex: 999999,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      WebkitTransform: 'translateZ(0)',
      transform: 'translateZ(0)',
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
      WebkitBackfaceVisibility: 'hidden',
      backfaceVisibility: 'hidden',
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
      padding: '5px',
      WebkitTapHighlightColor: 'transparent',
    },
    navButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
      outline: 'none',
      zIndex: 1000000,
      WebkitTapHighlightColor: 'transparent',
    },
    prevButton: {
      left: '20px',
    },
    nextButton: {
      right: '20px',
    },
  };

  return (
    <section id="photography" style={styles.section}>
      <Title text="Photography" />
      
      <div style={styles.photoGrid}>
        {photos.map((photo, index) => (
          <PhotoItem
            key={`photo-${index}`}
            src={photo}
            alt={`Photography ${index + 1}`}
            index={index}
            onPhotoClick={openPhotoModal}
            styles={styles}
          />
        ))}
      </div>
      
      {/* Modal */}
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
            &#8249;
          </button>
          
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={closePhotoModal}>
              ✕
            </button>
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
            &#8250;
          </button>
        </div>
      )}
    </section>
  );
};

export default PhotographySection;