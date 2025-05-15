import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { palette } from '../utils/colors';
import ScrollFontTransition from '../components/ScrollFontTransition';
import contentProductionData from '../../Json/ContentProductionSection.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const ContentProductionSection = () => {
  const [videos, setVideos] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    // Load video data from JSON
    const orderedIndices = [16, 9, 7, 15, 6, 18, 17, 12, 14, 10, 3, 2, 5, 4, 11, 1, 8, 13];
    
    // Adjust indices to be 0-based (if they aren't already)
    const zeroBasedIndices = orderedIndices.map(index => index - 1);
    
    // Create ordered array based on the specified sequence
    const orderedVideos = zeroBasedIndices.map(index => contentProductionData[index]);
    
    setVideos(orderedVideos);
    
    // Handle responsive layout
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Open modal with selected video
  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeVideoModal = () => {
    setShowModal(false);
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  };

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeVideoModal();
      }
    };
    
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        closeVideoModal();
      }
    };
    
    if (showModal) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [showModal]);

  const styles = {
    section: {
      padding: '50px 50px',
      margin: '0 auto',
      backgroundColor: palette.background,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderTop: '2px solid rgba(255, 255, 255, 0.2)',
      background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 50%)',
    },
    header: {
      fontSize: isMobile ? '2.5rem' : '3.5rem',
      marginBottom: '50px',
      textAlign: 'center',
      fontFamily: "'Poppins', sans-serif",
    },
    videosContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '40px',
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '0',
    },
    videoCard: {
      position: 'relative',
      borderRadius: '2px',
      overflow: 'hidden',
      aspectRatio: '9/16', // Vertical aspect ratio
      cursor: 'pointer',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      backgroundColor: 'rgba(30, 30, 40, 0.7)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    // Modal styles
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(8px)',
    },
    modal: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      width: '400px',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      border: '0.5px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
    },
    modalVideoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      maxHeight: '80vh',
    },
    modalVideo: {
      width: '100%',
      height: '100%',
      objectFit: 'contain',
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
    customHeader: {
      display: 'inline-block',
      textAlign: 'center',
    },
    contentText: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      marginRight: '10px', // Explicit space between words
    },
    productionText: {
      fontFamily: "'Caveat', cursive",
      fontWeight: 600,
      fontSize: '2.7rem', // Slightly larger for Caveat
    },
  };

  return (
    <section id="content-production" style={styles.section}>
      {/* Title with ScrollFontTransition */}
      <h2 style={styles.header}>
        <div style={styles.customHeader}>
          <span style={styles.contentText}>Content</span>
          <span style={styles.productionText}>Production</span>
        </div>
      </h2>
      
      {/* Videos Grid */}
      <div style={styles.videosContainer}>
        {videos.map((video, index) => (
          <motion.div 
            key={index}
            style={styles.videoCard}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index % 3 * 0.1 }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            onClick={() => openVideoModal(video)}
            onHoverStart={() => setHoveredVideo(index)}
            onHoverEnd={() => setHoveredVideo(null)}
          >
            <video 
              style={styles.video}
              src={video.url}
              playsInline
              muted={false} // Enable audio
              loop
              onMouseOver={(e) => e.target.play()}
              onMouseOut={(e) => e.target.pause()}
            />
          </motion.div>
        ))}
      </div>
      
      {/* Fullscreen Video Modal */}
      <AnimatePresence>
        {showModal && selectedVideo && (
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
                onClick={closeVideoModal}
                aria-label="Close"
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
              
              <div style={styles.modalVideoContainer}>
                <video
                  style={styles.modalVideo}
                  src={selectedVideo.url}
                  controls
                  autoPlay
                  playsInline
                  loop
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ContentProductionSection;
