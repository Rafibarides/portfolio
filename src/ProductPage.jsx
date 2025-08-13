import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faHeadphones, faGlobe, faChevronDown, faChevronUp, faTimes } from '@fortawesome/free-solid-svg-icons';
import ContactSection from './sections/ContactSection';
import AboutMeModal from './AboutMeModal';
import { ModalProvider } from './context/ModalContext';
import { palette } from './utils/colors';
import softwareData from '../Json/SoftwareSection.json';

// Typewriter effect component
const TypewriterText = ({ text, delay = 50, startDelay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay, started]);

  return (
    <span>
      {displayText}
      {currentIndex < text.length && (
        <motion.span
          style={{
            borderRight: '2px solid rgba(255, 255, 255, 0.7)',
            marginLeft: '2px',
          }}
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          
        </motion.span>
      )}
    </span>
  );
};

// Modified WelcomeSection for product page
const ProductWelcomeSection = () => {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '33.33vw',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <video
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
        src="/Main.m4v"
        autoPlay
        loop
        muted
        playsInline
      />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 1,
      }}></div>
      <motion.div 
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h1 style={{
          color: '#FFFFFF',
          fontSize: 'clamp(1.2rem, 2vw, 2rem)',
          fontWeight: 400,
          letterSpacing: '0.05em',
          margin: 0,
        }}>
          <span style={{ fontFamily: "'Poppins', sans-serif" }}>Rafi </span>
          <span style={{ fontFamily: "var(--font-accent)" }}>Barides</span>
        </h1>
        
        <div style={{
          height: 'clamp(3rem, 6vw, 6rem)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <p style={{
            color: '#FFFFFF',
            fontSize: 'clamp(1rem, 3.5vw, 3.5rem)',
            fontWeight: 600,
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: '0.1em',
            margin: 0,
            textTransform: 'uppercase',
            lineHeight: 1.1,
          }}>
            PRODUCT & UI/UX
          </p>
        </div>
      </motion.div>
      
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        zIndex: 2,
      }}></div>
    </section>
  );
};

// Product Card Component
const ProductCard = ({ product, index, onOpenCaseStudy }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getTags = (product) => {
    const tags = [];
    if (product.AppStore) tags.push('App Store');
    if (product.Technologies.includes('JUCE')) tags.push('VST Plugin');
    if (product.Technologies.includes('React')) tags.push('React');
    if (product.Technologies.includes('React Native')) tags.push('Mobile');
    if (product.Technologies.includes('Electron')) tags.push('Desktop');
    if (product.Technologies.includes('C++')) tags.push('C++');
    return tags.slice(0, 4); // Limit to 4 tags
  };

  const getShortDescriptor = (product) => {
    const descriptors = {
      'Worldly': 'Social geography game – shipped on iOS',
      'Weather Now': 'Weather app with glassmorphism UI',
      'Shabbat Zman': 'Jewish zmanim app – React Native',
      'Media Downloader': '4K video tool for editors – Electron app',
      'Arcade': 'Spatial saturation plugin – JUCE/C++',
      'RevSat': 'Vintage reverb plugin – JUCE/C++'
    };
    return descriptors[product.Title] || product.Description.substring(0, 60) + '...';
  };

  return (
    <motion.div
      style={{
        background: 'rgba(20, 20, 20, 0.8)',
        backdropFilter: 'blur(15px)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
        borderColor: 'rgba(255, 255, 255, 0.2)'
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => {
        setIsLoading(true);
        setTimeout(() => {
          onOpenCaseStudy(product);
          setIsLoading(false);
        }, 300);
      }}
    >
      {/* Thumbnail */}
      <div style={{
        width: '100%',
        height: '200px',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'rgba(40, 40, 40, 0.5)',
      }}>
        {/* Always use screenshots for consistent card layout */}
        {product.Screenshot ? (
          <motion.img
            src={product.Screenshot}
            alt={product.Title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.9rem',
          }}>
            No preview available
          </div>
        )}
        
        {/* Overlay with app store badges */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          display: 'flex',
          gap: '8px',
        }}>
          {product.AppStore && (
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.7rem',
              fontWeight: 600,
            }}>
              <FontAwesomeIcon icon={faApple} style={{ marginRight: '4px' }} />
              App Store
            </div>
          )}
          {product.Technologies.includes('JUCE') && (
            <div style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '0.7rem',
              fontWeight: 600,
            }}>
              <FontAwesomeIcon icon={faHeadphones} style={{ marginRight: '4px' }} />
              VST
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px' }}>
        <h3 style={{
          fontSize: '1.4rem',
          margin: '0 0 8px 0',
          color: palette.text,
          fontWeight: 600,
        }}>
          {product.Title}
        </h3>
        
        <p style={{
          fontSize: '0.9rem',
          color: 'rgba(255, 255, 255, 0.7)',
          margin: '0 0 15px 0',
          lineHeight: 1.4,
        }}>
          {getShortDescriptor(product)}
        </p>

        {/* Tags */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '15px',
        }}>
          {getTags(product).map((tag, i) => (
            <span
              key={i}
              style={{
                padding: '3px 8px',
                backgroundColor: 'rgba(3, 166, 150, 0.2)',
                color: palette.accent,
                borderRadius: '12px',
                fontSize: '0.7rem',
                border: '1px solid rgba(3, 166, 150, 0.3)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {        /* CTA Button */}
        <motion.button
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: palette.accent,
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
            background: `linear-gradient(135deg, ${palette.accent}, #029688)`,
            position: 'relative',
            overflow: 'hidden',
          }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 8px 25px rgba(3, 166, 150, 0.3)',
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            }}
            animate={isHovered ? { left: '100%' } : { left: '-100%' }}
            transition={{ duration: 0.5 }}
          />
          <span style={{ position: 'relative', zIndex: 1 }}>
            {isLoading ? (
              <motion.div
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid #fff',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }}
                />
                Loading...
              </motion.div>
            ) : (
              'View Case Study →'
            )}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};



// Case Study Modal Component
const CaseStudyModal = ({ product, onClose }) => {
  const [isCaseStudyExpanded, setIsCaseStudyExpanded] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const sectionRefs = useRef({});

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!product || !product.CaseStudy) return null;

  const caseStudy = product.CaseStudy;
  
  // Get all sections - some are nested under a title key, others are direct properties
  const allSections = {};
  
  // First, get any nested sections (like "Project Overview" under a title key)
  Object.keys(caseStudy).forEach(key => {
    if (typeof caseStudy[key] === 'object' && !Array.isArray(caseStudy[key])) {
      // This is a nested object (like the title key), merge its contents
      Object.assign(allSections, caseStudy[key]);
    } else if (typeof caseStudy[key] === 'string') {
      // This is a direct string property
      allSections[key] = caseStudy[key];
    } else if (Array.isArray(caseStudy[key])) {
      // This is an array (like Color Palette or Assets)
      allSections[key] = caseStudy[key];
    }
  });
  
  const sections = allSections;

  // Animation variants for collapsible sections
  const collapsibleVariants = {
    hidden: { 
      height: 0,
      opacity: 0,
      transition: { 
        height: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.2 }
      }
    },
    visible: { 
      height: "auto",
      opacity: 1,
      transition: { 
        height: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.3, delay: 0.1 }
      }
    }
  };

  // Function to parse HTML content from strings
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  // Define the order of sections for the process timeline
  const processOrder = [
    'Project Overview',
    'Problem', 
    'My Solution',
    'Target Personas',
    'Key Features',
    'Iterative Design',
    'Results',
    'Why It Matters'
  ];

  // Get sections that exist in the process order
  const processSections = processOrder.filter(sectionName => sections && sections[sectionName]);

  // Function to render case study content with proper asset handling
  const renderCaseStudyContent = (content, parentKey) => {
    if (typeof content === 'object' && content !== null) {
      return Object.entries(content).map(([key, value]) => {
        // Special handling for Color Palette
        if (key === "Color Palette" && Array.isArray(value)) {
          const sectionKey = key;
          return (
            <div key={sectionKey} style={{ marginBottom: '25px' }}>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '600',
                marginBottom: '10px',
                color: palette.accent,
              }}>
                {sectionKey}
              </h3>
              <div style={{ 
                display: 'flex', 
                gap: '20px', 
                flexWrap: 'wrap',
                marginTop: '15px',
              }}>
                {value.map((color, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '5px',
                  }}>
                    <div 
                      style={{
                        width: '60px',
                        height: '60px',
                        backgroundColor: color,
                        borderRadius: '8px',
                        position: 'relative',
                        transition: 'transform 0.2s ease',
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                    <div style={{
                      fontSize: '0.6rem',
                      color: '#fff',
                      fontFamily: 'monospace',
                      textAlign: 'center',
                    }}>
                      {color}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
        // Special handling for Assets
        else if (key === "Assets" && typeof value === 'object') {
          const sectionKey = key;
          return (
            <div key={sectionKey} style={{ marginBottom: '25px' }}>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '600',
                marginBottom: '10px',
                color: palette.accent,
              }}>
                {sectionKey}
              </h3>
              
              {/* Vertical assets */}
              {value.Vertical && value.Vertical.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                  gap: isMobile ? '15px' : '20px',
                  marginTop: '20px',
                  position: 'relative',
                  padding: isMobile ? '15px' : '20px',
                  borderRadius: '12px',
                  background: 'radial-gradient(circle at center, rgba(30, 30, 30, 0.5) 0%, rgba(30, 30, 30, 0.2) 60%, rgba(30, 30, 30, 0) 100%)',
                }}>
                  {value.Vertical.map((asset, index) => (
                    <div key={`vertical-${index}`} style={{
                      overflow: 'hidden',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    }}
                    >
                      <img 
                        src={asset} 
                        alt={`Project asset ${index + 1}`} 
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          objectFit: 'contain',
                          transition: 'transform 0.5s ease',
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        }}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* Horizontal assets */}
              {value.Horizontal && value.Horizontal.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                  gap: isMobile ? '15px' : '20px',
                  marginTop: '20px',
                  position: 'relative',
                  padding: isMobile ? '15px' : '20px',
                  borderRadius: '12px',
                  background: 'radial-gradient(circle at center, rgba(30, 30, 30, 0.5) 0%, rgba(30, 30, 30, 0.2) 60%, rgba(30, 30, 30, 0) 100%)',
                }}>
                  {value.Horizontal.map((asset, index) => (
                    <div key={`horizontal-${index}`} style={{
                      overflow: 'hidden',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    }}
                    >
                      <img 
                        src={asset} 
                        alt={`Project asset ${index + 1}`} 
                        style={{
                          width: '100%',
                          height: 'auto',
                          display: 'block',
                          objectFit: 'contain',
                          transition: 'transform 0.5s ease',
                          backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        }}
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }
        // Regular sections
        else {
          const sectionKey = key;
          return (
            <div key={sectionKey} style={{ marginBottom: '25px' }}>
              <h3 style={{
                fontSize: '1.4rem',
                fontWeight: '600',
                marginBottom: '10px',
                color: palette.accent,
              }}>
                {sectionKey}
              </h3>
              {typeof value === 'string' ? (
                <div 
                  className="case-study-content"
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: '300',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.9)',
                  }}
                  dangerouslySetInnerHTML={createMarkup(value)} 
                />
              ) : (
                renderCaseStudyContent(value, key)
              )}
            </div>
          );
        }
      });
    }
    return null;
  };

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: isMobile ? '#000000' : 'rgba(0, 0, 0, 0.85)',
        backdropFilter: isMobile ? 'none' : 'blur(8px)',
        zIndex: 999999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: isMobile ? 'flex-start' : 'center',
        padding: isMobile ? '0' : '20px',
        isolation: 'isolate',
        overflowY: 'auto',
      }}
      initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={isMobile ? { opacity: 1 } : { opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={isMobile ? 'mobile-modal-content' : ''}
        style={{
          backgroundColor: isMobile ? '#000000' : 'rgba(15, 15, 15, 0.95)',
          background: isMobile ? '#000000' : 'rgba(15, 15, 15, 0.95)',
          borderRadius: isMobile ? '0' : '12px',
          boxShadow: isMobile ? 'none' : '0 10px 30px rgba(0, 0, 0, 0.5)',
          width: isMobile ? '100vw' : '90%',
          maxWidth: isMobile ? 'none' : '1000px',
          minHeight: isMobile ? 'auto' : 'auto',
          maxHeight: isMobile ? 'auto' : '90vh',
          overflow: 'auto',
          position: isMobile ? 'fixed' : 'relative',
          top: isMobile ? '0' : 'auto',
          left: isMobile ? '0' : 'auto',
          border: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
          fontFamily: "'Poppins', sans-serif",
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000000,
        }}
        initial={isMobile ? { opacity: 1, y: 0 } : { scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={isMobile ? { opacity: 1, y: 0 } : { scale: 0.8, opacity: 0, y: 50 }}
        transition={isMobile ? { duration: 0 } : { 
          type: "spring", 
          damping: 25,
          stiffness: 300,
          duration: 0.4
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: isMobile ? '20px' : '15px',
            right: isMobile ? '20px' : '15px',
            background: isMobile ? 'rgba(0, 0, 0, 0.8)' : 'none',
            border: 'none',
            color: '#fff',
            fontSize: isMobile ? '28px' : '24px',
            cursor: 'pointer',
            zIndex: 10,
            width: isMobile ? '44px' : 'auto',
            height: isMobile ? '44px' : 'auto',
            borderRadius: isMobile ? '50%' : '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: isMobile ? 'blur(10px)' : 'none',
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {/* Header */}
        <div style={{
          padding: isMobile ? '60px 20px 30px' : '40px 40px 30px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: isMobile ? '#000000' : `linear-gradient(135deg, rgba(3, 166, 150, 0.1), rgba(3, 166, 150, 0.05))`,
          backgroundColor: isMobile ? '#000000' : 'transparent',
        }}>
          <h1 style={{
            fontSize: isMobile ? '2rem' : '3rem',
            margin: '0 0 15px 0',
            color: palette.text,
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
          }}>
            {product.Title}
          </h1>

          {/* Technology Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {product.Technologies.map((tech, i) => (
              <span
                key={i}
                style={{
                  padding: '4px 10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                }}
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Links */}
          <div style={{ 
            display: 'flex', 
            gap: '15px', 
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'center' : 'flex-start',
          }}>
            {product.AppStore && (
              <motion.a
                href={product.AppStore}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: isMobile ? '12px 24px' : '10px 20px',
                  backgroundColor: palette.accent,
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: isMobile ? '1rem' : '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  minHeight: '44px',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faApple} />
                Download on App Store
              </motion.a>
            )}
            {!isMobile && product.Website && (
              <motion.a
                href={product.Website}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faGlobe} />
                Website
              </motion.a>
            )}
            {!isMobile && product.GithubRepoURL && (
              <motion.a
                href={product.GithubRepoURL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faGithub} />
                GitHub
              </motion.a>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ 
          padding: isMobile ? '20px' : '40px 80px',
          color: palette.text,
          overflow: 'visible',
          width: '100%',
          boxSizing: 'border-box',
          backgroundColor: isMobile ? '#000000' : 'transparent',
        }}>
          {/* Preview (Screenshot) */}
          <div style={{
            width: '100%',
            height: isMobile ? '250px' : '500px',
            marginBottom: isMobile ? '30px' : '50px',
            overflow: 'hidden',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            position: 'relative',
          }}>
            <img 
              src={product.Screenshot} 
              alt={product.Title} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              }}
            />
          </div>
          
          {/* Description */}
          <h2 style={{
            fontSize: '1.5rem',
            marginTop: '50px',
            marginBottom: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '10px',
          }}>
            Description
          </h2>
          <p style={{
            lineHeight: '1.6',
            fontSize: '1.1rem',
            marginBottom: '50px',
          }}>
            {product.Description}
          </p>
          
          {/* Technologies */}
          <h2 style={{
            fontSize: '1.5rem',
            marginTop: '50px',
            marginBottom: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '10px',
          }}>
            Technologies
          </h2>
          <div style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 0 50px 0',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
          }}>
            {product.Technologies.map((tech, index) => (
              <div 
                key={index} 
                style={{
                  padding: '6px 12px',
                  borderRadius: '15px',
                  backgroundColor: 'rgba(30, 30, 30, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '0.85rem',
                  opacity: 0.6,
                  transition: 'opacity 0.2s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => e.target.style.opacity = 1}
                onMouseLeave={(e) => e.target.style.opacity = 0.6}
              >
                {tech}
              </div>
            ))}
          </div>
          
          {/* Case Study Section */}
          {product.CaseStudy && (
            <>
              <h2 
                style={{
                  fontSize: '1.5rem',
                  marginTop: '50px',
                  marginBottom: '20px',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  paddingBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }} 
                onClick={() => setIsCaseStudyExpanded(!isCaseStudyExpanded)}
              >
                Product & Design Journey
                                 <FontAwesomeIcon 
                   icon={isCaseStudyExpanded ? faChevronUp : faChevronDown} 
                   style={{
                     marginLeft: '10px',
                     opacity: 0.6,
                     transition: 'opacity 0.2s ease, transform 0.3s ease'
                   }}
                  onMouseEnter={(e) => e.target.style.opacity = 1}
                  onMouseLeave={(e) => e.target.style.opacity = 0.6}
                />
              </h2>
              <AnimatePresence initial={false}>
                {isCaseStudyExpanded && (
                  <motion.div
                    key="case-study-content"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={collapsibleVariants}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ marginBottom: '30px' }}>
                      {renderCaseStudyContent(product.CaseStudy, null)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}



          {/* Links */}
          <div style={{
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap',
            marginTop: isMobile ? '30px' : '50px',
            justifyContent: isMobile ? 'center' : 'flex-start',
          }}>
            {product.AppStore && (
              <motion.a 
                href={product.AppStore} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  padding: isMobile ? '12px 24px' : '10px 20px',
                  borderRadius: '8px',
                  backgroundColor: palette.accent,
                  color: palette.text,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: isMobile ? '1rem' : '0.9rem',
                  fontWeight: 600,
                  minHeight: '44px',
                }}
                whileHover={{ scale: 1.05, backgroundColor: '#1e554c' }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faApple} />
                Download on App Store
              </motion.a>
            )}
            
            {!isMobile && product.GithubRepoURL && (
              <motion.a 
                href={product.GithubRepoURL} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  backgroundColor: palette.accent,
                  color: palette.text,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
                whileHover={{ scale: 1.05, backgroundColor: '#1e554c' }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faGithub} />
                GitHub Repository
              </motion.a>
            )}
            
            {!isMobile && product.Website && (
              <motion.a 
                href={product.Website} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  backgroundColor: palette.accent,
                  color: palette.text,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                }}
                whileHover={{ scale: 1.05, backgroundColor: '#1e554c' }}
                whileTap={{ scale: 0.95 }}
              >
                <FontAwesomeIcon icon={faGlobe} />
                Visit Website
              </motion.a>
            )}
          </div>
        </div>
        
        {/* Case Study Content Styles */}
        <style>{`
          .mobile-modal-content {
            background-color: #000000 !important;
            background: #000000 !important;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch !important;
            height: 100vh !important;
            max-height: 100vh !important;
          }
          
          .mobile-modal-content * {
            background-color: transparent !important;
          }
          
          .case-study-content ul,
          .case-study-content ol {
            list-style-type: none;
            padding-left: 1.5rem;
            margin-top: 1rem;
          }
          
          .case-study-content li {
            position: relative;
            margin-bottom: 8px;
          }
          
          .case-study-content li::before {
            content: "";
            position: absolute;
            left: -1.2rem;
            top: 0.5rem;
            width: 6px;
            height: 6px;
            background-color: ${palette.accent};
            border-radius: 50%;
          }
          
          .case-study-content blockquote {
            font-style: italic;
            opacity: 0.9;
            border-left: 3px solid ${palette.accent};
            padding-left: 1rem;
            margin-left: 0;
            margin-right: 0;
            margin-top: 1rem;
            margin-bottom: 1rem;
          }
          
          .case-study-content strong {
            color: ${palette.accent};
            font-weight: 600;
          }
          
          .case-study-content em {
            color: rgba(255, 255, 255, 0.8);
            font-style: italic;
          }
          
          @media (max-width: 768px) {
            .case-study-content {
              font-size: 0.9rem;
            }
          }
        `}</style>
      </motion.div>
    </motion.div>
  );
};

const ProductPage = () => {
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Add CSS animations for pulse rings
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse-ring-1 {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(1);
          opacity: 0;
        }
      }

      @keyframes pulse-ring-2 {
        0% {
          transform: scale(0);
          opacity: 1;
        }
        100% {
          transform: scale(1);
          opacity: 0;
        }
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    // Filter only products where isProduct === true
    const productData = softwareData.filter(item => item.isProduct === true);
    setProducts(productData);
    
    // Check breakpoints
    const checkBreakpoints = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };
    
    checkBreakpoints();
    window.addEventListener('resize', checkBreakpoints);
    
    return () => {
      window.removeEventListener('resize', checkBreakpoints);
    };
  }, []);

  const styles = {
    container: {
      backgroundColor: '#000',
      color: '#fff',
      minHeight: '100vh',
      width: '100%',
    },
    banner: {
      width: '100%',
      padding: '40px 0',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },
    bannerLink: {
      color: '#fff',
      textDecoration: 'underline',
      fontSize: '1.1rem',
      fontFamily: "'Poppins', sans-serif",
      cursor: 'pointer',
      transition: 'opacity 0.3s ease',
    },
    productGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
      gap: isMobile ? '20px' : isTablet ? '30px' : '40px',
      padding: isMobile ? '40px 15px' : isTablet ? '60px 30px' : '60px 40px',
      maxWidth: '1400px',
      margin: '0 auto',
    },
    sectionTitle: {
      fontSize: isMobile ? '2rem' : isTablet ? '2.25rem' : '2.5rem',
      textAlign: 'center',
      margin: isMobile ? '40px 0 20px' : isTablet ? '50px 0 25px' : '60px 0 30px',
      color: palette.text,
      fontFamily: "'Poppins', sans-serif",
      padding: isMobile ? '0 15px' : '0',
    },
    subtitle: {
      fontSize: isMobile ? '1rem' : isTablet ? '1.1rem' : '1.2rem',
      textAlign: 'center',
      margin: isMobile ? '0 auto 40px' : isTablet ? '0 auto 50px' : '0 auto 60px',
      color: 'rgba(255, 255, 255, 0.7)',
      maxWidth: '600px',
      lineHeight: 1.5,
      padding: isMobile ? '0 20px' : '0',
    },
  };

  return (
    <ModalProvider>
      <div style={styles.container}>
        <div>
          <ProductWelcomeSection />
          
          {/* Intro Section */}
          <div style={{ padding: '60px 20px 0' }}>
            <motion.h2 
              style={styles.sectionTitle}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Product Design & Development
            </motion.h2>
            <motion.p 
              style={styles.subtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <TypewriterText 
                text="From user research to shipped products. These projects showcase end-to-end product thinking, UI/UX design, and technical execution."
                delay={30}
                startDelay={1500}
              />
            </motion.p>
          </div>

          {/* Product Grid */}
          <div style={styles.productGrid}>
            {products.map((product, index) => (
              <ProductCard
                key={product.Title}
                product={product}
                index={index}
                onOpenCaseStudy={setSelectedProduct}
              />
            ))}
          </div>

          {/* Development Journey Timeline */}
          <div style={{ 
            padding: isMobile ? '60px 15px 40px' : isTablet ? '70px 25px 50px' : '80px 20px 60px',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
                         <h2 style={{
               fontSize: isMobile ? '2rem' : '2.5rem',
               textAlign: 'center',
               margin: '0 0 20px',
               color: palette.text,
               fontFamily: "'Poppins', sans-serif",
             }}>
               Product Journey
             </h2>
             <p style={{
               fontSize: isMobile ? '1rem' : '1.1rem',
               textAlign: 'center',
               margin: isMobile ? '0 auto 40px' : '0 auto 60px',
               color: 'rgba(255, 255, 255, 0.7)',
               maxWidth: '500px',
               lineHeight: 1.5,
               padding: isMobile ? '0 10px' : '0',
             }}>
               Evolution of my product thinking, from user research to shipped experiences
             </p>
            
            <div style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
            }}>
              {/* Timeline line */}
              <div style={{
                position: 'absolute',
                left: isMobile ? '20px' : '25px',
                top: '0',
                bottom: '0',
                width: '3px',
                background: `linear-gradient(to bottom, ${palette.accent}, rgba(3, 166, 150, 0.3))`,
              }} />
              
                             {/* Timeline Items */}
               <motion.div
                 style={{
                   display: 'flex',
                   alignItems: 'flex-start',
                   position: 'relative',
                 }}
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0 * 0.1 }}
                 viewport={{ once: true }}
               >
                 <div style={{
                   position: 'absolute',
                   left: '15px',
                   top: '8px',
                   zIndex: 2,
                 }}>
                   {/* Emitter rings */}
                   <div style={{
                     position: 'absolute',
                     left: '-12px',
                     top: '-12px',
                     width: '40px',
                     height: '40px',
                     borderRadius: '50%',
                     border: `2px solid ${palette.accent}`,
                     animation: 'pulse-ring-1 2s infinite ease-out',
                     opacity: 0,
                   }} />
                   <div style={{
                     position: 'absolute',
                     left: '-20px',
                     top: '-20px',
                     width: '56px',
                     height: '56px',
                     borderRadius: '50%',
                     border: `1px solid ${palette.accent}`,
                     animation: 'pulse-ring-2 2s infinite ease-out',
                     animationDelay: '0.5s',
                     opacity: 0,
                   }} />
                   {/* Main bullet */}
                   <div style={{
                     width: '16px',
                     height: '16px',
                     borderRadius: '50%',
                     backgroundColor: palette.accent,
                     border: '4px solid #000',
                     position: 'relative',
                     boxShadow: `0 0 20px ${palette.accent}40`,
                   }} />
                 </div>
                
                <div style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  padding: isMobile ? '20px' : '25px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  marginLeft: isMobile ? '45px' : '50px',
                  width: isMobile ? 'calc(100% - 45px)' : 'calc(100% - 50px)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                    <h3 style={{
                      color: palette.accent,
                      margin: '0',
                      fontSize: '1.3rem',
                      fontFamily: "'Poppins', sans-serif",
                    }}>
                      Weather Now
                    </h3>
                    <span style={{
                      padding: '4px 12px',
                      backgroundColor: 'rgba(3, 166, 150, 0.2)',
                      color: palette.accent,
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}>
                      2023
                    </span>
                  </div>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.6,
                    fontSize: '1rem',
                    margin: 0,
                  }}>
                    First cross-functional application built on a team during my time at Marcy Lab. I worked defining user stories and roadmap priorities. Learned to balance user needs with technical constraints in an agile environment.
                  </p>
                </div>
              </motion.div>

              <motion.div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  position: 'relative',
                }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 * 0.1 }}
                viewport={{ once: true }}
              >
                <div style={{
                  position: 'absolute',
                  left: '15px',
                  top: '8px',
                  zIndex: 2,
                }}>
                  {/* Emitter rings */}
                  <div style={{
                    position: 'absolute',
                    left: '-12px',
                    top: '-12px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: `2px solid ${palette.accent}`,
                    animation: 'pulse-ring-1 2s infinite ease-out',
                    animationDelay: '0.2s',
                    opacity: 0,
                  }} />
                  <div style={{
                    position: 'absolute',
                    left: '-20px',
                    top: '-20px',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    border: `1px solid ${palette.accent}`,
                    animation: 'pulse-ring-2 2s infinite ease-out',
                    animationDelay: '0.7s',
                    opacity: 0,
                  }} />
                  {/* Main bullet */}
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: palette.accent,
                    border: '4px solid #000',
                    position: 'relative',
                    boxShadow: `0 0 20px ${palette.accent}40`,
                  }} />
                </div>
                
                <motion.div 
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    padding: '25px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    marginLeft: '50px',
                    width: 'calc(100% - 50px)',
                    cursor: 'pointer',
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                    <h3 style={{
                      color: palette.accent,
                      margin: '0',
                      fontSize: '1.3rem',
                      fontFamily: "'Poppins', sans-serif",
                    }}>
                      Shabbat Zman
                    </h3>
                    <span style={{
                      padding: '4px 12px',
                      backgroundColor: 'rgba(3, 166, 150, 0.2)',
                      color: palette.accent,
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}>
                      2024
                    </span>
                  </div>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.6,
                    fontSize: '1rem',
                    margin: 0,
                  }}>
                    Scaled to mobile-first product strategy. Conducted user research to define target personas, prioritized accessibility features, and shipped responsive design systems for iOS.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  position: 'relative',
                }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 2 * 0.1 }}
                viewport={{ once: true }}
              >
                <div style={{
                  position: 'absolute',
                  left: '15px',
                  top: '8px',
                  zIndex: 2,
                }}>
                  {/* Emitter rings */}
                  <div style={{
                    position: 'absolute',
                    left: '-12px',
                    top: '-12px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: `2px solid ${palette.accent}`,
                    animation: 'pulse-ring-1 2s infinite ease-out',
                    animationDelay: '0.4s',
                    opacity: 0,
                  }} />
                  <div style={{
                    position: 'absolute',
                    left: '-20px',
                    top: '-20px',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    border: `1px solid ${palette.accent}`,
                    animation: 'pulse-ring-2 2s infinite ease-out',
                    animationDelay: '0.9s',
                    opacity: 0,
                  }} />
                  {/* Main bullet */}
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: palette.accent,
                    border: '4px solid #000',
                    position: 'relative',
                    boxShadow: `0 0 20px ${palette.accent}40`,
                  }} />
                </div>
                
                <motion.div 
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    padding: '25px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    marginLeft: '50px',
                    width: 'calc(100% - 50px)',
                    cursor: 'pointer',
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                    <h3 style={{
                      color: palette.accent,
                      margin: '0',
                      fontSize: '1.3rem',
                      fontFamily: "'Poppins', sans-serif",
                    }}>
                      Worldly
                    </h3>
                    <span style={{
                      padding: '4px 12px',
                      backgroundColor: 'rgba(3, 166, 150, 0.2)',
                      color: palette.accent,
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}>
                      2024
                    </span>
                  </div>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.6,
                    fontSize: '1rem',
                    margin: 0,
                  }}>
                    Developed go-to-market strategy for App Store launch. Owned product roadmap from wireframes to high-fidelity prototypes, tracking KPIs and iterating based on user feedback metrics.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  position: 'relative',
                }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 3 * 0.1 }}
                viewport={{ once: true }}
              >
                <div style={{
                  position: 'absolute',
                  left: '15px',
                  top: '8px',
                  zIndex: 2,
                }}>
                  {/* Emitter rings */}
                  <div style={{
                    position: 'absolute',
                    left: '-12px',
                    top: '-12px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: `2px solid ${palette.accent}`,
                    animation: 'pulse-ring-1 2s infinite ease-out',
                    animationDelay: '0.6s',
                    opacity: 0,
                  }} />
                  <div style={{
                    position: 'absolute',
                    left: '-20px',
                    top: '-20px',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    border: `1px solid ${palette.accent}`,
                    animation: 'pulse-ring-2 2s infinite ease-out',
                    animationDelay: '1.1s',
                    opacity: 0,
                  }} />
                  {/* Main bullet */}
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: palette.accent,
                    border: '4px solid #000',
                    position: 'relative',
                    boxShadow: `0 0 20px ${palette.accent}40`,
                  }} />
                </div>
                
                <motion.div 
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    padding: '25px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    marginLeft: '50px',
                    width: 'calc(100% - 50px)',
                    cursor: 'pointer',
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                    <h3 style={{
                      color: palette.accent,
                      margin: '0',
                      fontSize: '1.3rem',
                      fontFamily: "'Poppins', sans-serif",
                    }}>
                      Audio Plugins
                    </h3>
                    <span style={{
                      padding: '4px 12px',
                      backgroundColor: 'rgba(3, 166, 150, 0.2)',
                      color: palette.accent,
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}>
                      2024
                    </span>
                  </div>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.6,
                    fontSize: '1rem',
                    margin: 0,
                  }}>
                    Identified market gap through user research and analysis. Designed interaction patterns for professional audio workflows, balancing user-centered design with technical feasibility.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  position: 'relative',
                }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 4 * 0.1 }}
                viewport={{ once: true }}
              >
                <div style={{
                  position: 'absolute',
                  left: '15px',
                  top: '8px',
                  zIndex: 2,
                }}>
                  {/* Emitter rings */}
                  <div style={{
                    position: 'absolute',
                    left: '-12px',
                    top: '-12px',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: `2px solid ${palette.accent}`,
                    animation: 'pulse-ring-1 2s infinite ease-out',
                    animationDelay: '0.8s',
                    opacity: 0,
                  }} />
                  <div style={{
                    position: 'absolute',
                    left: '-20px',
                    top: '-20px',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    border: `1px solid ${palette.accent}`,
                    animation: 'pulse-ring-2 2s infinite ease-out',
                    animationDelay: '1.3s',
                    opacity: 0,
                  }} />
                  {/* Main bullet */}
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    backgroundColor: palette.accent,
                    border: '4px solid #000',
                    position: 'relative',
                    boxShadow: `0 0 20px ${palette.accent}40`,
                  }} />
                </div>
                
                <motion.div 
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    padding: '25px',
                    borderRadius: '12px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    marginLeft: '50px',
                    width: 'calc(100% - 50px)',
                    cursor: 'pointer',
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                    <h3 style={{
                      color: palette.accent,
                      margin: '0',
                      fontSize: '1.3rem',
                      fontFamily: "'Poppins', sans-serif",
                    }}>
                      Media Downloader
                    </h3>
                    <span style={{
                      padding: '4px 12px',
                      backgroundColor: 'rgba(3, 166, 150, 0.2)',
                      color: palette.accent,
                      borderRadius: '12px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}>
                      2025
                    </span>
                  </div>
                  <p style={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.6,
                    fontSize: '1rem',
                    margin: 0,
                  }}>
                    Led end-to-end product strategy for professional creators. Conducted journey mapping and usability testing, prioritizing feature roadmap based on market research.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Banner */}
          <motion.div 
            style={styles.banner}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.span
              style={styles.bannerLink}
              onClick={() => setShowAboutModal(true)}
              whileHover={{ opacity: 0.7 }}
              whileTap={{ scale: 0.98 }}
            >
              more about me
            </motion.span>
          </motion.div>
          
          <ContactSection />
        </div>

        {/* Modals */}
        {showAboutModal && <AboutMeModal onClose={() => setShowAboutModal(false)} />}
        
        <AnimatePresence>
          {selectedProduct && (
            <CaseStudyModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </AnimatePresence>

        {/* Bottom effects */}
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '250px',
            backgroundImage: 'url(src/assets/bottomSmoke.gif)',
            backgroundPosition: 'bottom center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 80%, rgba(0,0,0,0) 100%)',
            mixBlendMode: 'screen',
            opacity: 0.07,
            pointerEvents: 'none',
            zIndex: 9998,
          }}
        />

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

        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '400px',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 20%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.02) 80%, rgba(0,0,0,0) 100%)',
            pointerEvents: 'none',
            zIndex: 990,
          }}
        />
      </div>
    </ModalProvider>
  );
};

export default ProductPage; 