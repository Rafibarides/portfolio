import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { palette } from '../utils/colors';
import RetroTextEffect from '../components/RetroTextEffect';
import Visualizer from '../components/Visualizer';
import audioData from '../../Json/AudioSection.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import Title from '../components/Title';

const AudioSection = () => {
  const [audioTracks, setAudioTracks] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [isLoading, setIsLoading] = useState({});
  const [progress, setProgress] = useState({});
  const [duration, setDuration] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const audioRefs = useRef({});
  const progressIntervals = useRef({});

  useEffect(() => {
    // Load audio data from JSON
    setAudioTracks(audioData);
    
    // Handle responsive layout
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Clean up on unmount
    return () => {
      // Stop any playing audio
      if (currentlyPlaying !== null && audioRefs.current[currentlyPlaying]) {
        audioRefs.current[currentlyPlaying].pause();
      }
      
      // Clear all progress tracking intervals
      Object.values(progressIntervals.current).forEach(interval => {
        clearInterval(interval);
      });
      
      window.removeEventListener('resize', handleResize);
    };
  }, [currentlyPlaying]);

  // Handle audio playback
  const togglePlay = (index) => {
    const audio = audioRefs.current[index];
    
    if (!audio) {
      console.error(`Audio element at index ${index} not found`);
      return;
    }
    
    // Stop any currently playing audio and clear its progress interval
    if (currentlyPlaying !== null && currentlyPlaying !== index) {
      if (audioRefs.current[currentlyPlaying]) {
        audioRefs.current[currentlyPlaying].pause();
      }
      
      if (progressIntervals.current[currentlyPlaying]) {
        clearInterval(progressIntervals.current[currentlyPlaying]);
      }
    }
    
    // Toggle play/pause for the selected audio
    if (audio.paused) {
      setIsLoading(prev => ({ ...prev, [index]: true }));
      
      // Add event listeners for better state management
      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setCurrentlyPlaying(index);
            setIsLoading(prev => ({ ...prev, [index]: false }));
            
            // Start tracking progress
            progressIntervals.current[index] = setInterval(() => {
              setProgress(prev => ({
                ...prev,
                [index]: audio.currentTime
              }));
            }, 100);
          })
          .catch(error => {
            console.error("Audio playback failed:", error);
            setIsLoading(prev => ({ ...prev, [index]: false }));
          });
      }
    } else {
      audio.pause();
      setCurrentlyPlaying(null);
      
      // Clear progress interval
      if (progressIntervals.current[index]) {
        clearInterval(progressIntervals.current[index]);
      }
    }
  };

  // Handle audio metadata loaded
  const handleMetadataLoaded = (index, e) => {
    const audio = e.target;
    setDuration(prev => ({
      ...prev,
      [index]: audio.duration
    }));
  };

  // Handle audio loading
  const handleAudioLoaded = (index) => {
    console.log(`Audio ${index} loaded successfully`);
  };

  // Handle audio errors
  const handleAudioError = (index, error) => {
    console.error(`Error with audio ${index}:`, error);
    setIsLoading(prev => ({ ...prev, [index]: false }));
  };

  // Handle audio ended
  const handleAudioEnded = (index) => {
    setCurrentlyPlaying(null);
    if (progressIntervals.current[index]) {
      clearInterval(progressIntervals.current[index]);
    }
  };

  // Format time in MM:SS
  const formatTime = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const styles = {
    section: {
      padding: '60px 30px',
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
    audioText: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
    },
    productionText: {
      fontFamily: "'Caveat', cursive",
      fontWeight: 600,
      fontSize: '2.7rem',
      marginLeft: '10px',
    },
    cardsContainer: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
      gap: '40px',
      width: '100%',
      maxWidth: '1200px',
    },
    card: {
      backgroundColor: 'rgba(30, 30, 40, 0.7)',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      flexDirection: 'column',
      height: '230px', // Fixed height for consistency
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    cardContent: {
      padding: '20px',
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    audioTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      marginBottom: '9px',
      color: palette.text,
    },
    playButton: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      color: palette.text,
      fontSize: '1.2rem',
    },
    skillsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
    },
    skillPill: {
      padding: '5px 10px',
      borderRadius: '20px',
      fontSize: '0.5rem',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: palette.text,
      border: `0.5px solid ${palette.text}`,
      display: 'inline-block',
      transition: 'all 0.2s ease',
    },
    playlistSection: {
      marginTop: '80px',
      width: '100%',
      maxWidth: '1200px',
      textAlign: 'center',
    },
    playlistTitle: {
      fontSize: '2rem',
      marginBottom: '30px',
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
      color: palette.text,
    },
    streamingContainer: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '30px',
    },
    streamingCard: {
      backgroundColor: 'rgba(30, 30, 40, 0.7)',
      borderRadius: '12px',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: isMobile ? '100%' : '200px',
      textDecoration: 'none',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
    },
    streamingLogo: {
      width: '60px',
      height: '60px',
      marginBottom: '15px',
    },
    streamingText: {
      color: palette.text,
      fontSize: '1.2rem',
      fontWeight: 500,
    },
    loadingIndicator: {
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderTopColor: palette.text,
      animation: 'spin 1s linear infinite',
    },
    formatBadge: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      padding: '4px 8px',
      borderRadius: '4px',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      color: palette.text,
      fontSize: '0.7rem',
      textTransform: 'uppercase',
    },
    audioInfo: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '0.8rem',
      color: 'rgba(255, 255, 255, 0.7)',
      marginTop: '5px',
    },
    topRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
    },
    titleContainer: {
      flex: 1,
    },
  };

  return (
    <section id="audio" style={styles.section}>
      <Title text="Audio" />
      
      <div style={styles.cardsContainer}>
        {audioTracks.map((track, index) => (
          <motion.div 
            key={index}
            style={{...styles.card, position: 'relative'}}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index % 2 * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
          >
            <AnimatePresence>
              {hoveredCard === index && track.format && (
                <motion.div 
                  style={styles.formatBadge}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {track.format}
                </motion.div>
              )}
            </AnimatePresence>
            
            <audio
              ref={el => audioRefs.current[index] = el}
              src={track.url}
              preload="metadata"
              onLoadedMetadata={(e) => handleMetadataLoaded(index, e)}
              onLoadedData={() => handleAudioLoaded(index)}
              onError={(e) => handleAudioError(index, e)}
              onEnded={() => handleAudioEnded(index)}
              crossOrigin="anonymous"
            />
            
            <div style={styles.cardContent}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                  <motion.div
                    style={styles.playButton}
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => togglePlay(index)}
                  >
                    {isLoading[index] ? (
                      <div style={styles.loadingIndicator} />
                    ) : (
                      <FontAwesomeIcon icon={currentlyPlaying === index ? faPause : faPlay} />
                    )}
                  </motion.div>
                  
                  {/* Always show the visualizer, not just when playing */}
                  <Visualizer 
                    audioElement={audioRefs.current[index]} 
                    isPlaying={currentlyPlaying === index}
                    style={{ marginLeft: '15px' }}
                  />
                </div>
                
                <h3 style={{...styles.audioTitle, marginTop: '5px'}}>{track.title}</h3>
              </div>
              
              <div>
                {track.skills && track.skills.length > 0 && (
                  <div style={styles.skillsContainer}>
                    {track.skills.map((skill, skillIndex) => (
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
            </div>
          </motion.div>
        ))}
      </div>
      
      <div style={styles.playlistSection}>
        <h2 style={styles.playlistTitle}>Produced by Rafi Barides Playlist</h2>
        <div style={styles.streamingContainer}>
          <motion.a
            href="https://music.apple.com/us/playlist/produced-by-rafi-barides/pl.u-PDb44ZBtLk3JWbP"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.streamingCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)' }}
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/5f/Apple_Music_icon.svg" 
              alt="Apple Music" 
              style={styles.streamingLogo} 
            />
            <p style={styles.streamingText}>Apple Music</p>
          </motion.a>
          
          <motion.a
            href="https://open.spotify.com/playlist/3hZcLNraAEURVVy8Wu1cZl"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.streamingCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)' }}
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg" 
              alt="Spotify" 
              style={styles.streamingLogo} 
            />
            <p style={styles.streamingText}>Spotify</p>
          </motion.a>
          
          <motion.a
            href="https://www.youtube.com/playlist?list=PL-hlJHqy1BFptzGhVzXRtvg_KluTamG3p"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.streamingCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -5, boxShadow: '0 15px 30px rgba(0, 0, 0, 0.3)' }}
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/6/6a/Youtube_Music_icon.svg" 
              alt="YouTube Music" 
              style={styles.streamingLogo} 
            />
            <p style={styles.streamingText}>YouTube Music</p>
          </motion.a>
        </div>
      </div>
      
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

export default AudioSection;
