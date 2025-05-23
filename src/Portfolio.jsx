import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { palette } from './utils/colors';
import WelcomeSection from './sections/WelcomeSection';
import SoftwareSection from './sections/SoftwareSection';
import PhotographySection from './sections/PhotographySection';
import ArtSection from './sections/ArtSection';
import MusicPerformanceSection from './sections/MusicPerformanceSection';
import AudioSection from './sections/AudioSection';
import VideoSection from './sections/VideoSection';
import ContentProductionSection from './sections/ContentProductionSection';
import AboutMeModal from './AboutMeModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode, 
  faPaintBrush, 
  faCamera,
  faMusic, 
  faHeadphones, 
  faVideo, 
  faPodcast,
  faUser,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import ContactSection from './sections/ContactSection';
import { useModal } from './context/ModalContext';

const Portfolio = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  // Add cursor states
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isOverSidebar, setIsOverSidebar] = useState(false);
  // Add new state for scroll tracking
  const [hasScrolled, setHasScrolled] = useState(false);
  
  // Add the modal context
  const { isModalOpen } = useModal();
  
  // Navigation items with their icons
  const navItems = [
    { name: 'Software/\nDesign', icon: faCode, section: 'software' },
    { name: 'Photography', icon: faCamera, section: 'photography' },
    { name: 'Art', icon: faPaintBrush, section: 'art' },
    { name: 'Music\nPerformance', icon: faMusic, section: 'music-performance' },
    { name: 'Audio', icon: faHeadphones, section: 'audio' },
    { name: 'Video', icon: faVideo, section: 'video' },
    { name: 'Content\nProduction', icon: faPodcast, section: 'content-production' },
    { name: 'About\nMe', icon: faUser, section: 'about', isModal: true },
  ];

  // Track mouse position for custom cursor
  useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', updateCursorPosition);
    return () => window.removeEventListener('mousemove', updateCursorPosition);
  }, []);

  // Add scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10 && !hasScrolled) {
        setHasScrolled(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);

  // Styles
  const styles = {
    container: {
      display: 'flex',
      backgroundColor: palette.background,
      color: palette.text,
      minHeight: '100vh',
    },
    content: {
      marginLeft: isExpanded ? '200px' : '70px',
      width: isExpanded ? 'calc(100% - 200px)' : 'calc(100% - 70px)',
      transition: 'margin-left 0.3s ease, width 0.3s ease',
    },
    logoSpace: {
      height: '80px', // Space for logo
      width: '100%',
    },
    navLink: {
      padding: '15px 20px',
      color: palette.text,
      textDecoration: 'none',
      fontSize: '1rem',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      minHeight: '24px',
      opacity: 0.7, // Default opacity
      position: 'relative',
    },
    icon: {
      width: '24px',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '15px', // Consistent spacing
      flexShrink: 0, // Prevent icon from shrinking
    },
    textContainer: {
      whiteSpace: 'pre-line', // Allow line breaks
      lineHeight: '1.2',
    },
    // Mobile styles
    '@media (max-width: 768px)': {
      container: {
        flexDirection: 'column',
      },
      navigation: {
        width: '100%',
        height: 'auto',
        position: 'static',
        flexDirection: 'row',
        overflowX: 'auto',
        padding: '10px',
      },
      content: {
        marginLeft: 0,
        width: '100%',
      },
      hamburgerButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      mobileNavOverlay: {
        display: isMobileMenuOpen ? 'block' : 'none',
      },
    },
    hamburgerButton: {
      position: 'fixed',
      top: '15px',
      left: '15px',
      zIndex: 1000,
      backgroundColor: 'rgba(28, 28, 28, 0.8)',
      color: palette.text,
      border: 'none',
      borderRadius: '5px',
      padding: '10px',
      display: 'none', 
      cursor: 'pointer',
    },
    mobileNavOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      zIndex: 998,
      display: 'none', // Hidden by default, shown via media query
    },
    mobileNav: {
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      width: '250px',
      backgroundColor: palette.sidebar,
      zIndex: 999,
      transform: 'translateX(-100%)',
      transition: 'transform 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      padding: '60px 0 20px',
    },
    mobileNavOpen: {
      transform: 'translateX(0)',
    },
    fadeOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: palette.background,
      zIndex: 999,
      pointerEvents: 'none',
    },
    // Custom cursor styles
    customCursor: {
      position: 'fixed',
      width: '15px',
      height: '15px',
      backgroundColor: 'white',
      borderRadius: '0',
      transform: 'translate(-50%, -50%) rotate(45deg)', // Properly center and rotate for diamond shape
      pointerEvents: 'none',
      zIndex: 9999,
      opacity: isOverSidebar ? 1 : 0,
      transition: 'opacity 0.3s ease, transform 0.2s ease, width 0.2s ease, height 0.2s ease',
      mixBlendMode: 'normal',
      boxShadow: '0 0 15px 2px rgba(255, 255, 255, 0.7), 0 0 5px 1px rgba(255, 255, 255, 1)',
      left: cursorPosition.x, // Use exact position - transform will handle centering
      top: cursorPosition.y,  // Use exact position - transform will handle centering
    },
    navbar: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '80px',
      backgroundColor: palette.sidebar,
      display: 'flex',
      alignItems: 'center',
      zIndex: 1000,
      x: isModalOpen ? -100 : 0,
      opacity: isModalOpen ? 0 : 1,
      transition: 'x 0.3s ease, opacity 0.3s ease',
    },
  };

  // Add resize listener to detect mobile
  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth <= 768;
      setIsMobile(newIsMobile);
      
      // If switching from mobile to desktop, ensure menu state is reset
      if (!newIsMobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  // Function to handle navigation item click
  const handleNavItemClick = (item, index) => {
    if (item.isModal) {
      setShowAboutModal(true);
    } else {
      // Start the navigation transition
      setIsNavigating(true);
      setActiveSection(item.section);
      
      // After a short delay, scroll to the section and end the transition
      setTimeout(() => {
        const element = document.getElementById(item.section);
        if (element) {
          // Scroll to element without smooth behavior to avoid double animation
          element.scrollIntoView({ behavior: 'auto' });
          
          // End the navigation transition after the fade completes
          setTimeout(() => {
            setIsNavigating(false);
          }, 300);
        }
      }, 300);
    }
  };

  // Function to handle smooth scrolling to sections (for natural scrolling)
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Toggle mobile menu function
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div style={styles.container}>
      {/* Custom cursor */}
      <motion.div 
        style={styles.customCursor}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ 
          scale: isOverSidebar ? (hoveredIndex !== null ? 1.3 : 1) : 0.5,
          opacity: isOverSidebar ? 1 : 0,
          rotate: 45,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Fade transition overlay */}
      <AnimatePresence>
        {isNavigating && (
          <motion.div
            style={styles.fadeOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>

      {/* Desktop Sidebar - Only show when NOT on mobile */}
      {!isMobile && (
        <motion.nav
          initial={{ width: '70px' }}
          animate={{ 
            width: isExpanded ? '200px' : '70px',
            x: isModalOpen ? -100 : 0,
            opacity: isModalOpen ? 0 : 1
          }}
          transition={{ 
            duration: 0.3, 
            ease: "easeInOut" 
          }}
          onHoverStart={() => {
            if (!isModalOpen) {
              setIsExpanded(true);
              setIsOverSidebar(true);
            }
          }}
          onHoverEnd={() => {
            if (!isModalOpen) {
              setIsExpanded(false);
              setIsOverSidebar(false);
            }
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100vh',
            backgroundColor: palette.sidebar,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 10,
            transition: 'width 0.3s ease, transform 0.3s ease, opacity 0.3s ease',
            cursor: 'none', // Hide default cursor when over sidebar
          }}
        >
          {/* Logo space */}
          <div style={styles.logoSpace}></div>
          
          {/* Navigation items */}
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              style={{
                ...styles.navLink,
                cursor: 'none', // Hide default cursor on nav items
              }}
              onClick={() => handleNavItemClick(item, index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{
                opacity: hoveredIndex === index ? 1 : hoveredIndex === null ? 0.7 : 0.5,
                y: hoveredIndex === index ? 0 : 
                   hoveredIndex !== null ? 
                   (index < hoveredIndex ? -3 : 3) : 0,
                scale: hoveredIndex === index ? 1.05 : 0.98,
                paddingLeft: hoveredIndex === index ? '25px' : '20px',
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 0.8,
              }}
            >
              <motion.span 
                style={styles.icon}
                initial={{ opacity: 1 }}
                animate={{ 
                  opacity: isExpanded ? 0 : 1,
                  scale: isExpanded ? 0.8 : 1,
                  x: isExpanded ? -10 : 0
                }}
                transition={{ 
                  duration: 0.2, 
                  ease: "easeOut" 
                }}
              >
                <FontAwesomeIcon icon={item.icon} />
              </motion.span>
              
              <motion.span
                initial={{ opacity: 0, width: 0, x: -20 }}
                animate={{ 
                  opacity: isExpanded ? (hoveredIndex === index ? 1 : hoveredIndex === null ? 0.7 : 0.5) : 0,
                  width: isExpanded ? 'auto' : 0,
                  x: isExpanded ? 0 : -20
                }}
                transition={{ 
                  duration: 0.3,
                  ease: "easeOut",
                  delay: isExpanded ? 0.1 : 0
                }}
                style={styles.textContainer}
              >
                {item.name}
              </motion.span>
            </motion.a>
          ))}
        </motion.nav>
      )}

      {/* Main Content - Adjust margin only for desktop */}
      <main style={{
        ...styles.content,
        marginLeft: isMobile ? 0 : (isExpanded ? '200px' : '70px'),
        width: isMobile ? '100%' : (isExpanded ? 'calc(100% - 200px)' : 'calc(100% - 70px)'),
      }}>
        <WelcomeSection />
        <SoftwareSection hasScrolled={hasScrolled} />
        <PhotographySection />
        <ArtSection />
        <MusicPerformanceSection />
        <AudioSection />
        <VideoSection />
        <ContentProductionSection />
        <ContactSection />
      </main>

      {/* About Me Modal */}
      {showAboutModal && <AboutMeModal onClose={() => setShowAboutModal(false)} />}

      {/* Mobile-only hamburger button - FIXED VERSION */}
      {isMobile && (
        <motion.button
          className="hamburger-button"
          style={{
            position: 'fixed',
            top: '15px',
            right: '15px',
            zIndex: 9999,
            backgroundColor: 'rgba(28, 28, 28, 0.9)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '12px',
            cursor: 'pointer',
          }}
          animate={{
            opacity: isModalOpen ? 0 : 1,
            x: isModalOpen ? 100 : 0,
            pointerEvents: isModalOpen ? 'none' : 'auto'
          }}
          transition={{ duration: 0.3 }}
          onClick={toggleMobileMenu}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="lg" />
        </motion.button>
      )}
      
      {/* Mobile-only overlay - already correctly conditional */}
      {isMobile && (
        <div 
          style={{
            ...styles.mobileNavOverlay,
            display: isMobileMenuOpen ? 'block' : 'none',
          }}
          onClick={toggleMobileMenu}
        />
      )}
      
      {/* Mobile-only navigation - already correctly conditional */}
      {isMobile && (
        <div 
          style={{
            ...styles.mobileNav,
            transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          }}
        >
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                opacity: 1 
              }}
              style={styles.navLink}
              onClick={() => {
                handleNavItemClick(item, index);
                setIsMobileMenuOpen(false); // Close menu after click
              }}
            >
              <span style={styles.icon}>
                <FontAwesomeIcon icon={item.icon} />
              </span>
              <span style={styles.textContainer}>{item.name}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Smoke background effect with mask */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '250px', // Slightly taller than the blur for better effect
          backgroundImage: 'url(src/assets/bottomSmoke.gif)',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)',
          mixBlendMode: 'screen',
          opacity: 0.07, // Reduce opacity for subtlety
          pointerEvents: 'none',
          zIndex: 9998, // Just below the blur effect
        }}
      />

      {/* Glassmorphism blur effect with true fade */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '150px',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />

      {/* Top gradient fade effect */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '400px', // Shorter than the bottom effect
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.02) 80%, rgba(0,0,0,0) 100%)',
          pointerEvents: 'none', // Ensures clicks pass through
          zIndex: 990, // High, but below the navigation
        }}
      />
    </div>
  );
};

export default Portfolio;
