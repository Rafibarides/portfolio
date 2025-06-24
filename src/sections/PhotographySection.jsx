import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { palette } from '../utils/colors';
import photographyData from '../../Json/PhotographySection.json';
import Title from '../components/Title';

const PhotographySection = () => {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [imageErrors, setImageErrors] = useState(new Set());
  const [loadedImages, setLoadedImages] = useState(new Set());

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

  // Handle image loading errors
  const handleImageError = useCallback((index) => {
    setImageErrors(prev => new Set(prev).add(index));
  }, []);

  // Handle successful image loads
  const handleImageLoad = useCallback((index) => {
    setLoadedImages(prev => new Set(prev).add(index));
  }, []);

  // Check if image has error
  const hasImageError = useCallback((index) => {
    return imageErrors.has(index);
  }, [imageErrors]);

  // Check if image is loaded
  const isImageLoaded = useCallback((index) => {
    return loadedImages.has(index);
  }, [loadedImages]);

  // Simple modal functions - no context needed
  const openPhotoModal = useCallback((photoUrl, index) => {
    console.log('Opening modal for photo:', index); // Debug log
    setSelectedPhoto(photoUrl);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  }, []);

  const closePhotoModal = useCallback(() => {
    console.log('Closing modal'); // Debug log
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
      // Explicitly disable any hover effects
      pointerEvents: 'auto',
    },
    photo: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      // Prevent any image interactions that could cause flickering
      userSelect: 'none',
      draggable: false,
    },
    imageContainer: {
      position: 'relative',
      width: '100%',
      height: '100%',
      // Prevent hover effects
      pointerEvents: 'none',
    },
    loadingPlaceholder: {
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
      padding: '5px',
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
    },
    prevButton: {
      left: '20px',
    },
    nextButton: {
      right: '20px',
    },
    errorPlaceholder: {
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(40, 40, 40, 0.8)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: '14px',
      textAlign: 'center',
      padding: '20px',
    },
  };

  // Ultra-simple image component with no hover effects
  const SimplePhotoImage = ({ src, alt, index }) => {
    const isLoaded = isImageLoaded(index);
    const hasError = hasImageError(index);
    
    if (hasError) {
      return (
        <div style={styles.errorPlaceholder}>
          <span>⚠️</span>
          <span>Image failed to load</span>
          <small>{`Photo ${index + 1}`}</small>
        </div>
      );
    }
    
    return (
      <div style={styles.imageContainer}>
        {!isLoaded && (
          <div style={styles.loadingPlaceholder}>
            Loading...
          </div>
        )}
        <img
          src={src}
          alt={alt}
          style={{
            ...styles.photo,
            visibility: isLoaded ? 'visible' : 'hidden',
          }}
          onLoad={() => handleImageLoad(index)}
          onError={() => handleImageError(index)}
          loading="lazy"
        />
      </div>
    );
  };

  // Simple click handler
  const handlePhotoClick = useCallback((photo, index) => {
    console.log('Photo clicked:', index, !hasImageError(index)); // Debug log
    if (!hasImageError(index)) {
      openPhotoModal(photo, index);
    }
  }, [hasImageError, openPhotoModal]);

  return (
    <section id="photography" style={styles.section}>
      <Title text="Photography" />
      
      <div style={styles.photoGrid}>
        {photos.map((photo, index) => (
          <div 
            key={`photo-${index}`}
            style={styles.photoContainer}
            onClick={() => handlePhotoClick(photo, index)}
          >
            <SimplePhotoImage
              src={photo}
              alt={`Photography ${index + 1}`}
              index={index}
            />
          </div>
        ))}
      </div>
      
      {/* Direct modal rendering - no portal or context */}
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