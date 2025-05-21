import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { palette } from './utils/colors';
import profilePic from '../public/assets/prof.avif';
import profileBlinkPic from '../public/assets/prof-blink.avif';
import textureGif from './assets/texture.gif';
import aboutData from '../Json/About.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './AboutMeModal.css'; // Import CSS for the glow animation

const AboutMeModal = ({ onClose }) => {
  const [bio, setBio] = useState('');
  const [scrollY, setScrollY] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const modalRef = useRef(null);
  const particlesRef = useRef([]);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const blinkTimeoutRef = useRef(null);

  // Generate random particles for background
  const generateParticles = (count) => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
    return particles;
  };

  // Initialize particles and animation
  useEffect(() => {
    particlesRef.current = generateParticles(100);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particlesRef.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        ctx.fill();
        
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup animation
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle scroll for parallax effect
  useEffect(() => {
    if (!modalRef.current) return;
    
    const handleScroll = () => {
      if (modalRef.current) {
        setScrollY(modalRef.current.scrollTop);
      }
    };
    
    modalRef.current.addEventListener('scroll', handleScroll);
    return () => {
      if (modalRef.current) {
        modalRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    // Load bio text
    if (aboutData && aboutData.bio) {
      setBio(aboutData.bio);
    }
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Add event listener for escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Set up blinking effect
  useEffect(() => {
    const setupBlinking = () => {
      // Random time between 2-4 seconds for natural blinking
      const nextBlinkTime = Math.random() * 2000 + 2000;
      
      blinkTimeoutRef.current = setTimeout(() => {
        setIsBlinking(true);
        
        // Blink duration (150-250ms)
        setTimeout(() => {
          setIsBlinking(false);
          setupBlinking(); // Schedule next blink
        }, Math.random() * 100 + 150);
      }, nextBlinkTime);
    };
    
    // Start the blinking cycle
    setupBlinking();
    
    // Clean up on unmount
    return () => {
      if (blinkTimeoutRef.current) {
        clearTimeout(blinkTimeoutRef.current);
      }
    };
  }, []);

  // Add a function to handle navigation to the contact section
  const handleContactClick = () => {
    onClose(); // Close the modal first
    
    // Use setTimeout to ensure the modal is closed before scrolling
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px',
      overflow: 'hidden',
    },
    canvas: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
    },
    gradientBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      opacity: 0.6,
      zIndex: 2,
      background: 'radial-gradient(circle at 20% 30%, rgba(41, 20, 64, 0.4) 0%, transparent 70%), radial-gradient(circle at 80% 70%, rgba(25, 55, 77, 0.4) 0%, transparent 70%)',
    },
    modal: {
      backgroundColor: 'rgba(15, 15, 20, 0.8)',
      borderRadius: '8px',
      width: '90%',
      maxWidth: '800px',
      maxHeight: '90vh',
      overflow: 'auto',
      position: 'relative',
      boxShadow: '0 5px 30px rgba(0, 0, 0, 0.5)',
      zIndex: 10,
      backdropFilter: 'blur(5px)',
    },
    closeButton: {
      position: 'absolute',
      top: '10px',
      right: '15px',
      background: 'none',
      border: 'none',
      color: palette.text,
      fontSize: '24px',
      cursor: 'pointer',
      zIndex: 11,
    },
    content: {
      padding: '40px 30px',
      color: palette.text,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10,
    },
    profileContainer: {
      marginBottom: '25px',
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
    },
    profileImage: {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
      zIndex: 2,
      position: 'relative',
      className: 'profile-glow', // Apply the glow animation class
    },
    greeting: {
      fontSize: '1rem',
      fontWeight: 300,
      marginBottom: '5px',
      fontFamily: "'Poppins', sans-serif",
      color: 'rgba(255, 255, 255, 0.8)',
      transform: `translateY(${scrollY * 0.1}px)`,
    },
    nameContainer: {
      marginBottom: '30px',
      fontSize: '2.8rem',
      fontWeight: 600,
      transform: `translateY(${scrollY * 0.15}px)`,
    },
    firstName: {
      fontFamily: "'Poppins', sans-serif",
      fontWeight: 600,
    },
    lastName: {
      fontFamily: "var(--font-accent)",
      fontWeight: 400,
      marginLeft: '8px',
    },
    bioContainer: {
      marginTop: '20px',
      maxWidth: '700px',
      margin: '20px auto',
    },
    bioParagraph: {
      margin: '0 0 30px 0',
      lineHeight: '1.6',
      fontSize: '1rem',
      textAlign: 'left',
      color: palette.text,
      opacity: 0.9,
    },
    socialLinks: {
      display: 'flex',
      gap: '20px',
      marginTop: '30px',
      justifyContent: 'center',
      transform: `translateY(${scrollY * -0.1}px)`,
    },
    socialButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: palette.text,
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      fontSize: '1.3rem',
      backdropFilter: 'blur(10px)',
    },
  };

  // Animation variants for gradient background
  const gradientVariants = {
    animate: {
      background: [
        'radial-gradient(circle at 20% 30%, rgba(41, 20, 64, 0.4) 0%, transparent 70%), radial-gradient(circle at 80% 70%, rgba(25, 55, 77, 0.4) 0%, transparent 70%)',
        'radial-gradient(circle at 30% 40%, rgba(41, 20, 64, 0.4) 0%, transparent 70%), radial-gradient(circle at 70% 60%, rgba(25, 55, 77, 0.4) 0%, transparent 70%)',
        'radial-gradient(circle at 40% 50%, rgba(41, 20, 64, 0.4) 0%, transparent 70%), radial-gradient(circle at 60% 50%, rgba(25, 55, 77, 0.4) 0%, transparent 70%)',
        'radial-gradient(circle at 30% 60%, rgba(41, 20, 64, 0.4) 0%, transparent 70%), radial-gradient(circle at 70% 40%, rgba(25, 55, 77, 0.4) 0%, transparent 70%)',
        'radial-gradient(circle at 20% 70%, rgba(41, 20, 64, 0.4) 0%, transparent 70%), radial-gradient(circle at 80% 30%, rgba(25, 55, 77, 0.4) 0%, transparent 70%)',
      ],
      transition: {
        duration: 20,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'linear',
      },
    },
  };

  // Calculate parallax effect for each paragraph
  const getParallaxStyle = (index) => {
    const parallaxFactor = 0.05 * (index + 1);
    return {
      transform: `translateY(${scrollY * parallaxFactor}px)`,
    };
  };

  // Split bio into paragraphs
  const paragraphs = bio.split('\n\n');

  // Text animation variants
  const nameTextVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  // Staggered children animation for the title
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const titleItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Profile texture animation
  const textureOpacityVariants = {
    animate: {
      opacity: [1, 0.1, 0.1, 1],
      transition: {
        times: [0, 0.25, 0.875, 1], // 0-25% fade to 10%, stay at 10% for 62.5%, then back to 100%
        duration: 8, // Total animation duration (8 seconds)
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      style={styles.overlay}
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <canvas ref={canvasRef} style={styles.canvas} />
      
      <motion.div 
        style={styles.gradientBackground}
        animate="animate"
        variants={gradientVariants}
      />
      
      {/* Fixed close button that stays in top right corner */}
      <motion.button 
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '28px',
          cursor: 'pointer',
          zIndex: 9999,
          padding: '8px',
          lineHeight: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={onClose}
        whileHover={{ 
          scale: 1.1,
          textShadow: '0 0 10px rgba(255, 255, 255, 0.5)' 
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        ×
      </motion.button>
      
      <motion.div
        ref={modalRef}
        style={styles.modal}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 30
        }}
      >
        <div style={styles.content}>
          <motion.div style={styles.profileContainer}>
            <motion.img 
              src={isBlinking ? profileBlinkPic : profilePic} 
              alt="Rafi Barides" 
              className="profile-glow"
              style={styles.profileImage}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <motion.img
              src={textureGif}
              alt=""
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                objectFit: 'cover',
                mixBlendMode: 'screen',
                zIndex: 3,
                border: '3px solid rgba(255, 255, 255, 0.3)', // Match the border of the profile image
              }}
              initial={{ opacity: 1 }}
              animate="animate"
              variants={textureOpacityVariants}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <p style={styles.greeting}>Hi, I'm</p>
            <div style={styles.nameContainer}>
              <motion.span 
                style={styles.firstName}
                initial="hidden"
                animate="visible"
                variants={nameTextVariants}
              >
                Rafi
              </motion.span>
              <motion.span 
                style={styles.lastName}
                initial="hidden"
                animate="visible"
                variants={nameTextVariants}
              >
                Barides
              </motion.span>
            </div>
          </motion.div>
          
          <div style={styles.bioContainer}>
            {paragraphs.map((paragraph, index) => (
              <motion.p 
                key={index}
                style={{
                  ...styles.bioParagraph, 
                  ...getParallaxStyle(index)
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
          
          <motion.div 
            style={styles.socialLinks}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.a 
              href="https://www.linkedin.com/in/rafibarides/" 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.socialButton}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="LinkedIn Profile"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </motion.a>
            
            <motion.a 
              href="https://github.com/Rafibarides" 
              target="_blank" 
              rel="noopener noreferrer"
              style={styles.socialButton}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="GitHub Profile"
            >
              <FontAwesomeIcon icon={faGithub} />
            </motion.a>
            
            {/* Add Contact Me button */}
            <motion.button 
              onClick={handleContactClick}
              style={styles.socialButton}
              whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Contact Me"
            >
              <FontAwesomeIcon icon={faEnvelope} />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AboutMeModal;
