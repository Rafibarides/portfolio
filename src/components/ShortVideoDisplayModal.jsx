import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { palette } from '../utils/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ShortVideoDisplayModal = ({ video, onClose }) => {
  const modalRef = useRef(null);
  
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

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.80)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(8px)',
    },
    modal: {
      position: 'relative',
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      border: '0.5px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
    },
    videoContainer: {
      width: '100%',
      height: '500px',
      aspectRatio: '9/16',
      position: 'relative',
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px',
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px',
    },
    content: {
      padding: '20px',
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: 'white',
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      zIndex: 10,
      border: 'none',
      fontSize: '16px',
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

  return (
    <AnimatePresence>
      <motion.div
        style={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          ref={modalRef}
          style={styles.modal}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <button 
            style={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          
          <div style={styles.videoContainer}>
            <video
              style={styles.video}
              src={video.url}
              controls
              autoPlay
              playsInline
              loop
            />
          </div>
          
          <div style={styles.content}>
            {video.skills && video.skills.length > 0 && (
              <div style={styles.skillsContainer}>
                {video.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    style={styles.skillPill}
                    whileHover={{ 
                      scale: 1.05, 
                      backgroundColor: 'rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {capitalizeFirstLetter(skill)}
                  </motion.span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShortVideoDisplayModal;
