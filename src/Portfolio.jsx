import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { palette } from './utils/colors';
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

const Portfolio = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navigation items with their icons
  const navItems = [
    { name: 'Software', icon: faCode, section: 'software' },
    { name: 'Photography', icon: faCamera, section: 'photography' },
    { name: 'Art', icon: faPaintBrush, section: 'art' },
    { name: 'Music\nPerformance', icon: faMusic, section: 'music-performance' },
    { name: 'Audio', icon: faHeadphones, section: 'audio' },
    { name: 'Video', icon: faVideo, section: 'video' },
    { name: 'Content\nProduction', icon: faPodcast, section: 'content-production' },
    { name: 'About\nMe', icon: faUser, section: 'about', isModal: true },
  ];

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
      display: 'none', // Hidden by default, shown via media query
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
      scrollToSection(item.section);
    }
  };

  // Function to handle smooth scrolling to sections
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
      {/* Desktop Sidebar - Only show when NOT on mobile */}
      {!isMobile && (
        <motion.nav
          initial={{ width: '70px' }}
          animate={{ width: isExpanded ? '200px' : '70px' }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onHoverStart={() => setIsExpanded(true)}
          onHoverEnd={() => setIsExpanded(false)}
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
            transition: 'width 0.3s ease',
          }}
        >
          {/* Logo space */}
          <div style={styles.logoSpace}></div>
          
          {/* Navigation items */}
          {navItems.map((item, index) => (
            <motion.a
              key={index}
              style={styles.navLink}
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
        <SoftwareSection />
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
    </div>
  );
};

export default Portfolio;
