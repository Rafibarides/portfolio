import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { palette } from '../utils/colors';
import ScrollFontTransition from '../components/ScrollFontTransition';
import musicPerformanceData from '../../Json/MusicPerformanceSection.json';
import Title from '../components/Title';
import LazyYouTubeEmbed from '../components/LazyYouTubeEmbed';

const MusicPerformanceSection = () => {
  const [performances, setPerformances] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [loadedVideos, setLoadedVideos] = useState({});

  useEffect(() => {
    // Add default titles and skills if not present in the data
    const processedData = musicPerformanceData.map(performance => ({
      ...performance,
      title: performance.title || "Music Performance",
      skills: performance.skills || []
    }));
    
    setPerformances(processedData);
    
    // Handle responsive layout
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      padding: '80px 30px',
      minHeight: '100vh',
      position: 'relative',
      color: palette.text,
      fontFamily: "'Poppins', sans-serif",
      borderTop: '2px solid rgba(255, 255, 255, 0.2)',
      background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0) 50%)',
    },
    header: {
      fontSize: window.innerWidth <= 768 ? '1rem' : '3.5rem',
      marginBottom: '50px',
      textAlign: 'center',
      fontFamily: "'Poppins', sans-serif",
    },
    videoContainer: {
      maxWidth: '900px',
      margin: '50px auto',
      marginBottom: '100px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      borderRadius: '8px',
      overflow: 'hidden',
      backgroundColor: 'rgba(20, 20, 20, 0.7)',
    },
    videoWrapper: {
      position: 'relative',
      paddingBottom: '56.25%', // 16:9 aspect ratio
      height: 0,
      overflow: 'hidden',
      backgroundColor: 'rgba(0, 0, 0, 0.2)', // Placeholder background
    },
    iframe: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 'none',
      zIndex: 2,
    },
    contentContainer: {
      padding: '20px',
    },
    title: {
      margin: '0 0 15px 0',
      fontSize: '1.4rem',
      fontWeight: 600,
      color: palette.text,
    },
    skillsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '10px',
    },
    skillPill: {
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '0.6rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: palette.text,
      border: `0.5px solid ${palette.text}`,
      display: 'inline-block',
      transition: 'all 0.2s ease',
    },
    customHeader: {
      display: 'inline-block',
      textAlign: 'center',
    },
    musicText: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
    },
    performanceText: {
      fontFamily: "'Caveat', cursive",
      fontWeight: 600,
      fontSize: '2.7rem',
      marginLeft: '10px',
    },
  };

  // Updated animation variants - removing staggering effect
  const skillsContainerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  // Simplified skill item animation - no y movement to avoid flickering
  const skillItemAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="music-performance" style={styles.section}>
      <Title text="Music Performance" />
      
      {performances.map((performance, index) => {
        const videoId = getYoutubeVideoId(performance.url);
        
        return (
          <motion.div 
            key={index}
            style={styles.videoContainer}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 1.02 }}
          >
            <div style={styles.videoWrapper}>
              <LazyYouTubeEmbed
                videoId={videoId}
                title={performance.title || `Music Performance ${index + 1}`}
                style={styles.iframe}
              />
            </div>
            
            <div style={styles.contentContainer}>
              <h3 style={styles.title}>{performance.title}</h3>
              
              {performance.text && (
                <p style={{ margin: '0 0 15px 0', opacity: 0.8 }}>
                  {performance.text}
                </p>
              )}
              
              {performance.skills && performance.skills.length > 0 && (
                <motion.div 
                  style={styles.skillsContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-50px" }}
                  variants={skillsContainerAnimation}
                >
                  {performance.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      style={styles.skillPill}
                      variants={skillItemAnimation}
                      whileHover={{ 
                        scale: 1.05, 
                        backgroundColor: 'rgba(255, 255, 255, 0.2)'
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </section>
  );
};

export default MusicPerformanceSection;
