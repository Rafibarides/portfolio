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

  useEffect(() => {
    // Load video data from JSON
    setShortVideos(shortVideosData);
    
    // Add default titles and skills if not present in the data
    const processedData = videoSectionData.map(video => ({
      ...video,
      title: video.title || "Video Project",
      skills: video.skills || []
    }));
    
    setVideos(processedData);
    
    // Handle responsive layout
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

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
    },
    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
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
    <section id="video" style={styles.section}>
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
              scale: 1.03,
              transition: { duration: 0.3 }
            }}
            onClick={() => openVideoModal(video)}
          >
            <video 
              style={styles.video}
              src={video.url}
              playsInline
              muted
              loop
              onMouseOver={(e) => e.target.play()}
              onMouseOut={(e) => e.target.pause()}
              poster={`${video.url.split('.').slice(0, -1).join('.')}.jpg`}
            />
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
                  style={styles.iframe}
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
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default VideoSection;
