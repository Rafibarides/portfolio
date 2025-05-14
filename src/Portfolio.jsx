import { useState } from 'react';
import { motion } from 'framer-motion';
import { palette } from './utils/colors';
import SoftwareSection from './sections/SoftwareSection';
import PhotographySection from './sections/PhotographySection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCode, 
  faPaintBrush, 
  faCamera,
  faMusic, 
  faHeadphones, 
  faVideo, 
  faPodcast,
} from '@fortawesome/free-solid-svg-icons';

const Portfolio = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  // Navigation items with their icons
  const navItems = [
    { name: 'Software', icon: faCode, section: 'software' },
    { name: 'Photography', icon: faCamera, section: 'photography' },
    { name: 'Art', icon: faPaintBrush, section: 'art' },
    { name: 'Music\nPerformance', icon: faMusic, section: 'music-performance' },
    { name: 'Audio', icon: faHeadphones, section: 'audio' },
    { name: 'Video', icon: faVideo, section: 'video' },
    { name: 'Content\nProduction', icon: faPodcast, section: 'content-production' },
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
    }
  };

  // Function to handle smooth scrolling to sections
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated Sidebar */}
      <motion.nav
        initial={{ width: '70px' }}
        animate={{ width: isExpanded ? '200px' : '70px' }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
        style={{
          backgroundColor: '#000000',
          position: 'fixed',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderTopRightRadius: '15px',
          borderBottomRightRadius: '15px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
          zIndex: 100,
        }}
      >
        {/* Space for logo */}
        <div style={styles.logoSpace}></div>
        
        {/* Navigation items */}
        {navItems.map((item, index) => (
          <motion.a
            key={index}
            style={styles.navLink}
            onClick={() => scrollToSection(item.section)}
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

      {/* Main Content */}
      <main style={styles.content}>
        <SoftwareSection />
        <PhotographySection />
        {/* Other sections will be added here */}
      </main>
    </div>
  );
};

export default Portfolio;
