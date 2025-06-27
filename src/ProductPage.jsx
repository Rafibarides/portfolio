import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faApple, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faHeadphones, faGlobe, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import ContactSection from './sections/ContactSection';
import AboutMeModal from './AboutMeModal';
import { ModalProvider } from './context/ModalContext';
import { palette } from './utils/colors';
import softwareData from '../Json/SoftwareSection.json';

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
      onClick={() => onOpenCaseStudy(product)}
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
              objectFit: 'cover',
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

        {/* CTA Button */}
        <motion.button
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: palette.accent,
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: 'pointer',
          }}
          whileHover={{ 
            backgroundColor: '#029688',
            scale: 1.02,
          }}
          whileTap={{ scale: 0.98 }}
        >
          View Case Study →
        </motion.button>
      </div>
    </motion.div>
  );
};



// Case Study Modal Component
const CaseStudyModal = ({ product, onClose }) => {
  const [isCaseStudyExpanded, setIsCaseStudyExpanded] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});

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
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '20px',
                  marginTop: '20px',
                  position: 'relative',
                  padding: '20px',
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
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
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
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: '20px',
                  marginTop: '20px',
                  position: 'relative',
                  padding: '20px',
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
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
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
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 999999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        isolation: 'isolate',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        style={{
          backgroundColor: 'rgba(15, 15, 15, 0.95)',
          borderRadius: '12px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
          width: '90%',
          maxWidth: '1000px',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          fontFamily: "'Poppins', sans-serif",
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000000,
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '24px',
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{
          padding: '40px 40px 30px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          background: `linear-gradient(135deg, rgba(3, 166, 150, 0.1), rgba(3, 166, 150, 0.05))`,
        }}>
          <h1 style={{
            fontSize: '3rem',
            margin: '0 0 15px 0',
            color: palette.text,
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
          }}>
            {product.Title}
          </h1>
          
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '1.1rem',
            margin: '0 0 20px 0',
            maxWidth: '600px',
          }}>
            {product.Description}
          </p>

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
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            {product.AppStore && (
              <a
                href={product.AppStore}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: '10px 20px',
                  backgroundColor: palette.accent,
                  color: '#fff',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <FontAwesomeIcon icon={faApple} />
                App Store
              </a>
            )}
            {product.Website && (
              <a
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
              >
                <FontAwesomeIcon icon={faGlobe} />
                Website
              </a>
            )}
            {product.GithubRepoURL && (
              <a
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
              >
                <FontAwesomeIcon icon={faGithub} />
                GitHub
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div style={{ 
          padding: '40px 80px',
          color: palette.text,
          overflow: 'visible',
          width: '100%',
          boxSizing: 'border-box',
        }}>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '40px',
            textAlign: 'center',
            color: palette.text,
            fontFamily: "'Poppins', sans-serif",
          }}>
            {product.Title}
          </h1>
          
          {/* Preview (Screenshot) */}
          <div style={{
            width: '100%',
            height: '500px',
            marginBottom: '50px',
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
                objectFit: 'cover',
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
            marginTop: '50px',
          }}>
            {product.GithubRepoURL && (
              <a 
                href={product.GithubRepoURL} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  padding: '10px 20px',
                  borderRadius: '5px',
                  backgroundColor: palette.accent,
                  color: palette.text,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'transform 0.3s ease, background-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1e554c';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = palette.accent;
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <FontAwesomeIcon icon={faGithub} />
                GitHub Repository
              </a>
            )}
            
            {product.Website && (
              <a 
                href={product.Website} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  padding: '10px 20px',
                  borderRadius: '5px',
                  backgroundColor: palette.accent,
                  color: palette.text,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'transform 0.3s ease, background-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1e554c';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = palette.accent;
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <FontAwesomeIcon icon={faGlobe} />
                Visit Website
              </a>
            )}
            
            {product.AppStore && (
              <a 
                href={product.AppStore} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  padding: '10px 20px',
                  borderRadius: '5px',
                  backgroundColor: palette.accent,
                  color: palette.text,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'transform 0.3s ease, background-color 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1e554c';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = palette.accent;
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <FontAwesomeIcon icon={faApple} />
                App Store
              </a>
            )}
          </div>
        </div>
        
        {/* Case Study Content Styles */}
        <style>{`
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
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '30px',
      padding: '60px 30px',
      maxWidth: '1400px',
      margin: '0 auto',
    },
    sectionTitle: {
      fontSize: '2.5rem',
      textAlign: 'center',
      margin: '60px 0 30px',
      color: palette.text,
      fontFamily: "'Poppins', sans-serif",
    },
    subtitle: {
      fontSize: '1.2rem',
      textAlign: 'center',
      margin: '0 auto 60px',
      color: 'rgba(255, 255, 255, 0.7)',
      maxWidth: '600px',
      lineHeight: 1.5,
    },
  };

  return (
    <ModalProvider>
      <div style={styles.container}>
        <div>
          <ProductWelcomeSection />
          
          {/* Intro Section */}
          <div style={{ padding: '60px 20px 0' }}>
            <h2 style={styles.sectionTitle}>
              Product Design & Development
            </h2>
            <p style={styles.subtitle}>
              From user research to shipped products. These projects showcase 
              end-to-end product thinking, UI/UX design, and technical execution.
            </p>
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
            padding: '80px 20px 60px',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
                         <h2 style={{
               fontSize: '2.5rem',
               textAlign: 'center',
               margin: '0 0 20px',
               color: palette.text,
               fontFamily: "'Poppins', sans-serif",
             }}>
               Product Journey
             </h2>
             <p style={{
               fontSize: '1.1rem',
               textAlign: 'center',
               margin: '0 auto 60px',
               color: 'rgba(255, 255, 255, 0.7)',
               maxWidth: '500px',
               lineHeight: 1.5,
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
                left: '25px',
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
                  padding: '25px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  marginLeft: '50px',
                  width: 'calc(100% - 50px)',
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
                    My first collaborative project during The Marcy Lab School, where I learned the fundamentals of team development and React.
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
                    My first iOS app built with React Native, teaching me mobile development and the intricacies of cross-platform design.
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
                    My first cross-platform application that shipped to the App Store, marking my transition into full-stack product development.
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
                    Explored C++ and JUCE framework to create professional audio plugins, expanding into lower-level programming and DSP.
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
                    My latest desktop application built with Electron, combining web technologies with native functionality for content creators.
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