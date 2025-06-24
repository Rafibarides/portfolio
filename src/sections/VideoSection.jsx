import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { palette } from '../utils/colors';
import ScrollFontTransition from '../components/ScrollFontTransition';
import ShortVideoDisplayModal from '../components/ShortVideoDisplayModal';
import shortVideosData from '../../Json/ShortVideos.json';
import videoSectionData from '../../Json/VideoSection.json';
import Title from '../components/Title';

const VideoSection = () => {
  const [shortVideos, setShortVideos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState({});
  const [videoErrors, setVideoErrors] = useState(new Set());
  const [videoLoadingStates, setVideoLoadingStates] = useState({});

  useEffect(() => {
    // Use Promise.all to load data in parallel
    Promise.all([
      Promise.resolve(shortVideosData),
      Promise.resolve(videoSectionData)
    ]).then(([shortData, videoData]) => {
      setShortVideos(shortData);
      
      // Process video data
      const processedData = videoData.map(video => ({
        ...video,
        title: video.title || "Video Project",
        skills: video.skills || []
      }));
      
      setVideos(processedData);

      // Initialize loading states for short videos
      const initialLoadingStates = {};
      shortData.forEach((_, index) => {
        initialLoadingStates[index] = true;
      });
      setVideoLoadingStates(initialLoadingStates);
    });
    
    // Handle responsive layout
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle video loading success
  const handleVideoLoad = (index) => {
    setVideoLoadingStates(prev => ({
      ...prev,
      [index]: false
    }));
  };

  // Handle video loading errors
  const handleVideoError = (index, error) => {
    console.error(`Video ${index} failed to load:`, error);
    setVideoErrors(prev => new Set(prev).add(index));
    setVideoLoadingStates(prev => ({
      ...prev,
      [index]: false
    }));
  };

  // Check if video has error
  const hasVideoError = (index) => {
    return videoErrors.has(index);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedOpenVideoModal = debounce((video) => {
    const videoIndex = shortVideos.indexOf(video);
    if (!hasVideoError(videoIndex) && !videoLoadingStates[videoIndex]) {
      setSelectedVideo(video);
      setShowModal(true);
    } else if (videoLoadingStates[videoIndex]) {
      // If video is still loading, try again after a short delay
      setTimeout(() => {
        if (!hasVideoError(videoIndex) && !videoLoadingStates[videoIndex]) {
          setSelectedVideo(video);
          setShowModal(true);
        }
      }, 500);
    }
  }, 50);

  const closeVideoModal = () => {
    setShowModal(false);
  };
  
  // Function to extract YouTube video ID from URL
  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Mark a video as loaded
  const handleVideoLoaded = (index) => {
    setLoadedVideos(prev => ({
      ...prev,
      [index]: true
    }));
  };

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
      fontSize: window.innerWidth <= 768 ? '1rem' : '3.5rem',
      marginBottom: '50px',
      textAlign: 'center',
      fontFamily: "'Poppins', sans-serif",
    },
    customHeader: {
      display: 'inline-block',
      textAlign: 'center',
    },
    videoText: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
    },
    shortText: {
      fontFamily: "'Caveat', cursive",
      fontWeight: 600,
      fontSize: '2.7rem',
      marginLeft: '10px',
    },
    videosContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '20px',
      width: '100%',
      maxWidth: '1000px',
      marginBottom: '80px',
      margin: '0 auto',
      padding: '0',
    },
    videoCard: {
      position: 'relative',
      borderRadius: '2px',
      overflow: 'hidden',
      aspectRatio: '9/16',
      cursor: 'pointer',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      backgroundColor: 'rgba(30, 30, 40, 0.7)',
      width: isMobile ? '100%' : '260px',
      height: '330px',
      marginBottom: '50px',
      willChange: 'transform',
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    videoLoadingOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(30, 30, 40, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
    videoErrorOverlay: {
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
    },
    // YouTube video styles (exact match with MusicPerformanceSection)
    youtubeVideosContainer: {
      width: '100%',
      maxWidth: '1000px',
      display: 'flex',
      flexDirection: 'column',
      gap: '80px',
      marginTop: '50px',
      margin: '0 auto',
      padding: '0',
      alignItems: 'stretch',
    },
    youtubeVideoCard: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgba(20, 20, 30, 0.7)',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      width: '100%',
    },
    videoWrapper: {
      width: '100%',
      position: 'relative',
      paddingBottom: '56.25%', // 16:9 aspect ratio
      height: '0',
    },
    iframe: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 'none',
    },
    contentContainer: {
      padding: '30px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    title: {
      fontSize: '1.8rem',
      marginTop: 0,
      marginBottom: '15px',
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
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
    loadingPlaceholder: {
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(30, 30, 40, 0.7)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'rgba(255, 255, 255, 0.7)',
    },
    loadingSpinner: {
      width: '40px',
      height: '40px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderTop: '3px solid rgba(255, 255, 255, 0.8)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
  };

  return (
    <section id="video" style={styles.section} className="content-visibility-auto">
      <Title text="Video Production" />
      
      {/* Short Videos Grid */}
      <div style={styles.videosContainer}>
        {shortVideos.map((video, index) => (
          <motion.div 
            key={index}
            style={styles.videoCard}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index % 3 * 0.1 }}
            whileHover={{ 
              scale: hasVideoError(index) ? 1 : 1.03,
              transition: { duration: 0.3 }
            }}
            onClick={() => debouncedOpenVideoModal(video)}
          >
            <video 
              style={{
                ...styles.video,
                width: '100%',
                height: '100%',
                aspectRatio: '9/16',
              }}
              src={video.url}
              playsInline
              muted
              loop
              preload="auto"
              onLoadedData={() => handleVideoLoad(index)}
              onCanPlayThrough={() => handleVideoLoad(index)}
              onError={(e) => handleVideoError(index, e)}
              onMouseOver={(e) => {
                if (!hasVideoError(index)) {
                  e.target.play().catch(console.warn);
                }
              }}
              onMouseOut={(e) => {
                if (!hasVideoError(index)) {
                  e.target.pause();
                }
              }}
            />
            
            {/* Loading overlay */}
            {videoLoadingStates[index] && !hasVideoError(index) && (
              <div style={styles.videoLoadingOverlay}>
                <div style={styles.loadingSpinner}></div>
              </div>
            )}
            
            {/* Error overlay */}
            {hasVideoError(index) && (
              <div style={styles.videoErrorOverlay}>
                <span style={{ fontSize: '24px', marginBottom: '8px' }}>⚠️</span>
                <span style={{ fontSize: '14px' }}>Video failed to load</span>
                <small style={{ opacity: 0.6, marginTop: '4px' }}>
                  {video.name}
                </small>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      
      {/* YouTube Videos Section */}
      <div style={styles.youtubeVideosContainer}>
        {videos.map((video, index) => {
          const videoId = getYoutubeVideoId(video.url);
          if (!videoId) return null;
          
          return (
            <motion.div
              key={index}
              style={styles.youtubeVideoCard}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div style={styles.videoWrapper}>
                {!loadedVideos[index] && (
                  <div style={styles.loadingPlaceholder}>
                    <div style={styles.loadingSpinner}></div>
                  </div>
                )}
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                  title={video.title || `Video Project ${index + 1}`}
                  style={{
                    ...styles.iframe,
                    width: '100%',
                    height: '100%',
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  onLoad={() => handleVideoLoaded(index)}
                  loading="lazy"
                />
              </div>
              
              <div style={styles.contentContainer}>
                <h3 style={styles.title}>{video.title}</h3>
                
                {video.text && (
                  <p style={{ margin: '0 0 15px 0', opacity: 0.8 }}>
                    {video.text}
                  </p>
                )}
                
                {video.skills && video.skills.length > 0 && (
                  <div style={styles.skillsContainer}>
                    {video.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        style={styles.skillPill}
                        whileHover={{ 
                          scale: 1.05, 
                          backgroundColor: 'rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Modal for short videos */}
      {showModal && selectedVideo && (
        <ShortVideoDisplayModal 
          video={selectedVideo} 
          onClose={closeVideoModal} 
        />
      )}
      
      {/* Add CSS for loading animation */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .content-visibility-auto {
          content-visibility: auto;
          contain-intrinsic-size: 1px 5000px; /* Estimate of content size */
        }
      `}</style>
    </section>
  );
};

export default VideoSection;
