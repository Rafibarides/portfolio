import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { palette } from '../utils/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ShortVideoDisplayModal = ({ video, onClose }) => {
  const modalRef = useRef(null);
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [onClose]);

  // Handle video loading
  const handleVideoLoadedData = () => {
    console.log('Video loaded data');
    setIsLoading(false);
    setIsVideoReady(true);
  };

  const handleVideoCanPlay = () => {
    console.log('Video can play');
    setIsLoading(false);
    setIsVideoReady(true);
    // Auto-play when ready
    if (videoRef.current) {
      videoRef.current.play().catch(console.warn);
    }
  };

  const handleVideoError = (error) => {
    console.error('Video failed to load in modal:', error);
    setIsLoading(false);
    setHasError(true);
  };

  const handleVideoLoadStart = () => {
    console.log('Video load started');
    setIsLoading(true);
    setHasError(false);
  };

  // Reset states when video changes
  useEffect(() => {
    console.log('Video changed, resetting states:', video?.url);
    setIsLoading(true);
    setHasError(false);
    setIsVideoReady(false);
    
    // Force reload video when it changes
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [video?.url]);

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.90)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999999,
      backdropFilter: 'blur(8px)',
    },
    modal: {
      position: 'relative',
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000000,
    },
    videoContainer: {
      width: '100%',
      height: '500px',
      aspectRatio: '9/16',
      position: 'relative',
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px',
      backgroundColor: 'rgba(20, 20, 20, 0.8)',
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px',
      display: 'block',
    },
    loadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(20, 20, 20, 0.9)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px',
    },
    errorOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(40, 20, 20, 0.9)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
      color: 'rgba(255, 255, 255, 0.7)',
      textAlign: 'center',
      padding: '20px',
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px',
    },
    loadingSpinner: {
      width: '40px',
      height: '40px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderTop: '3px solid rgba(255, 255, 255, 0.8)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginBottom: '16px',
    },
    loadingText: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: '14px',
      fontFamily: "'Poppins', sans-serif",
    },
    content: {
      padding: '20px',
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      zIndex: 1000001,
      border: 'none',
      fontSize: '16px',
      transition: 'background-color 0.2s ease',
    },
    skillsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '15px',
    },
    skillPill: {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.8rem',
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      color: palette.text,
      border: `1px solid rgba(255, 255, 255, 0.3)`,
      display: 'inline-block',
      transition: 'all 0.2s ease',
      fontWeight: '500',
    },
  };

  // First, ensure we're properly capitalizing the skills for display
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Simplified skills processing with guaranteed unique keys
  const getValidSkills = () => {
    if (!video?.skills || !Array.isArray(video.skills)) return [];
    
    return video.skills
      .filter(skill => skill && skill.trim()) // Remove empty skills
      .map((skill, index) => ({
        skill: skill.trim(),
        id: `skill-${video.name || 'unknown'}-${index}-${Date.now()}`
      }));
  };

  const validSkills = getValidSkills();

  // Create a unique key for this modal instance
  const modalKey = `modal-${video?.name || 'unknown'}-${video?.url ? video.url.split('/').pop() : 'no-url'}`;

  const modalContent = (
    <AnimatePresence key={modalKey}>
      <motion.div
        key={modalKey}
        style={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          style={styles.modal}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            style={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          
          <div style={styles.videoContainer}>
            <video
              ref={videoRef}
              style={{
                ...styles.video,
                visibility: isVideoReady ? 'visible' : 'hidden',
                opacity: isVideoReady ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
              src={video?.url}
              controls
              playsInline
              loop
              preload="auto"
              onLoadStart={handleVideoLoadStart}
              onLoadedData={handleVideoLoadedData}
              onCanPlay={handleVideoCanPlay}
              onError={handleVideoError}
            />
            
            {/* Loading overlay */}
            {isLoading && !hasError && (
              <div style={styles.loadingOverlay}>
                <div style={styles.loadingSpinner}></div>
                <div style={styles.loadingText}>Loading video...</div>
                {video?.url && (
                  <div style={{ ...styles.loadingText, fontSize: '12px', marginTop: '8px', opacity: 0.6 }}>
                    {video.name || 'Video'}
                  </div>
                )}
              </div>
            )}
            
            {/* Error overlay */}
            {hasError && (
              <div style={styles.errorOverlay}>
                <span style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</span>
                <span style={{ fontSize: '14px' }}>Video failed to load</span>
                <small style={{ opacity: 0.6, marginTop: '4px' }}>
                  {video?.url ? 'Please check your connection' : 'No video URL provided'}
                </small>
              </div>
            )}
          </div>
          
          <div style={styles.content}>
            {validSkills.length > 0 && (
              <div style={styles.skillsContainer}>
                {validSkills.map(({ skill, id }) => (
                  <span
                    key={id}
                    style={styles.skillPill}
                  >
                    {capitalizeFirstLetter(skill)}
                  </span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
      
      {/* Add CSS for loading animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </AnimatePresence>
  );

  // Use React Portal to render modal at body level
  return createPortal(modalContent, document.body);
};

export default ShortVideoDisplayModal;
