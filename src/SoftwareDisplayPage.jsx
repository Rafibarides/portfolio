import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { palette } from './utils/colors';
import softwareData from '../Json/SoftwareSection.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useModal } from './context/ModalContext';
import ReactDOM from 'react-dom';

const SoftwareDisplayPage = ({ projectTitle, onClose }) => {
  const [project, setProject] = useState(null);
  const [isDemoExpanded, setIsDemoExpanded] = useState(false);
  const [isPresentationExpanded, setIsPresentationExpanded] = useState(false);
  const [isCaseStudyExpanded, setIsCaseStudyExpanded] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});
  const { openModal, closeModal } = useModal();

  // Create a DOM element for the portal if it doesn't exist - MOVED UP HERE to maintain hook order
  useEffect(() => {
    let modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = 'modal-root';
      document.body.appendChild(modalRoot);
    }
    
    // Add a global style to ensure modal root has highest z-index
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      #modal-root {
        position: relative;
        z-index: 999999;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      if (styleElement.parentNode) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  // Find project useEffect - order maintained
  useEffect(() => {
    // Find the project with the matching title
    const foundProject = softwareData.find(
      p => p.Title.toLowerCase() === decodeURIComponent(projectTitle).toLowerCase()
    );
    setProject(foundProject);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    openModal(); // Notify context that modal is open
    
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
      closeModal(); // Notify context that modal is closed
    };
  }, [projectTitle, openModal, closeModal]);

  // Intersection observer useEffect - order maintained
  useEffect(() => {
    if (isCaseStudyExpanded && project?.CaseStudy) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setVisibleSections(prev => ({
                ...prev,
                [entry.target.dataset.section]: true
              }));
            }
          });
        },
        { threshold: 0.2 } // Trigger when 20% of the element is visible
      );

      // Observe all section refs
      Object.keys(sectionRefs.current).forEach(key => {
        if (sectionRefs.current[key]) {
          observer.observe(sectionRefs.current[key]);
        }
      });

      return () => {
        // Cleanup observer
        Object.keys(sectionRefs.current).forEach(key => {
          if (sectionRefs.current[key]) {
            observer.unobserve(sectionRefs.current[key]);
          }
        });
      };
    }
  }, [isCaseStudyExpanded, project]);

  // Add animation variants
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

  // Add fade-in animation variants
  const fadeInVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Function to parse HTML content from strings
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  if (!project) {
    return null;
  }
  
  // Function to format title with last word in Caveat font
  const formatTitle = (title) => {
    const words = title.split(' ');
    if (words.length <= 1) {
      return <span style={{ fontFamily: "'Poppins', sans-serif" }}>{title}</span>;
    }
    
    const lastWord = words.pop();
    const firstPart = words.join(' ');
    
    return (
      <>
        <span style={{ fontFamily: "'Poppins', sans-serif" }}>{firstPart} </span>
        <span style={{ fontFamily: "var(--font-accent)", fontWeight: 600 }}>{lastWord}</span>
      </>
    );
  };

  // Extract YouTube video ID from URL if present
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11)
      ? `https://www.youtube.com/embed/${match[2]}`
      : null;
  };

  // Check if project has YouTube demo links
  const youtubeUrl = project.Title === "Weather Now" 
    ? "https://www.youtube.com/watch?v=hZ2lzOpSDF0" 
    : project.Title === "Communitree"
    ? "https://www.youtube.com/watch?v=KoLg2kjyanE"
    : null;
  
  const youtubeEmbedUrl = getYoutubeEmbedUrl(youtubeUrl);

  // Styles for the Google Slide presentation embed
  const presentationEmbedStyles = {
    width: '90%',
    maxWidth: '800px',
    margin: '0 auto 50px auto',
    borderRadius: '8px',
    overflow: 'hidden',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    position: 'relative',
    height: '450px',
  };

  const styles = {
    overlay: {
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
    },
    modal: {
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
    },
    closeButton: {
      position: 'absolute',
      top: '15px',
      right: '15px',
      background: 'none',
      border: 'none',
      color: palette.text,
      fontSize: '24px',
      cursor: 'pointer',
      zIndex: 10,
    },
    content: {
      padding: '40px 80px',
      color: palette.text,
      overflow: 'visible',
      width: '100%',
      boxSizing: 'border-box',
    },
    header: {
      fontSize: '2.5rem',
      marginBottom: '40px',
      textAlign: 'center',
    },
    previewContainer: {
      width: '100%',
      height: '500px',
      marginBottom: '50px',
      overflow: 'hidden',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
    },
    iframe: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    screenshot: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      marginTop: '50px',
      marginBottom: '20px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      paddingBottom: '10px',
    },
    description: {
      lineHeight: '1.6',
      fontSize: '1.1rem',
      marginBottom: '50px',
    },
    techList: {
      listStyle: 'none',
      padding: 0,
      margin: '0 0 50px 0',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
    },
    techItem: {
      padding: '6px 12px',
      borderRadius: '15px',
      backgroundColor: 'rgba(30, 30, 30, 0.6)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      fontSize: '0.85rem',
      opacity: 0.6,
      transition: 'opacity 0.2s ease',
      cursor: 'default',
    },
    linksContainer: {
      display: 'flex',
      gap: '15px',
      flexWrap: 'wrap',
      marginTop: '50px',
    },
    linkButton: {
      padding: '10px 20px',
      borderRadius: '5px',
      backgroundColor: palette.accent,
      color: palette.text,
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'transform 0.3s ease, background-color 0.3s ease',
    },
    embedContainer: {
      width: '90%',
      maxWidth: '800px',
      margin: '0 auto 50px auto',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
      height: '450px',
    },
    collapsibleStyles: {
      sectionHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        padding: '5px 0',
      },
      chevron: {
        marginLeft: '10px',
        transition: 'transform 0.3s ease',
      },
      collapsibleContent: {
        overflow: 'hidden',
        transition: 'height 0.3s ease',
      }
    },
    caseStudy: {
      marginBottom: '30px',
    },
    caseStudySection: {
      marginBottom: '25px',
    },
    caseStudySectionTitle: {
      fontSize: '1.4rem',
      fontWeight: '600',
      marginBottom: '10px',
      color: '#fff',
    },
    caseStudyContent: {
      fontSize: '0.95rem',
      fontWeight: '300',
      lineHeight: '1.6',
    },
    caseStudyList: {
      listStyleType: 'none',
      paddingLeft: '1.5rem',
    },
    caseStudyListItem: {
      position: 'relative',
      marginBottom: '8px',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: '-1.2rem',
        top: '0.5rem',
        width: '6px',
        height: '6px',
        backgroundColor: palette.accent,
        borderRadius: '50%',
      }
    },
    colorPalette: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
      marginTop: '15px',
    },
    colorSwatchContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '5px',
    },
    colorSwatch: {
      width: '60px',
      height: '60px',
      borderRadius: '8px',
      position: 'relative',
    },
    colorHex: {
      fontSize: '0.6rem',
      color: '#fff',
      fontFamily: 'monospace',
      textAlign: 'center',
    },
    assetsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '20px',
      marginTop: '20px',
      position: 'relative',
      padding: '20px',
      borderRadius: '12px',
      background: 'radial-gradient(circle at center, rgba(30, 30, 30, 0.5) 0%, rgba(30, 30, 30, 0.2) 60%, rgba(30, 30, 30, 0) 100%)',
      '@media (max-width: 768px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      '@media (max-width: 480px)': {
        gridTemplateColumns: '1fr',
      },
    },
    assetContainer: {
      overflow: 'hidden',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
      },
    },
    verticalAsset: {
      width: '100%',
      height: 'auto',
      display: 'block',
      objectFit: 'cover',
      transition: 'transform 0.5s ease',
      '&:hover': {
        transform: 'scale(1.03)',
      },
    },
    horizontalAssetsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      marginTop: '20px',
      position: 'relative',
      padding: '20px',
      borderRadius: '12px',
      background: 'radial-gradient(circle at center, rgba(30, 30, 30, 0.5) 0%, rgba(30, 30, 30, 0.2) 60%, rgba(30, 30, 30, 0) 100%)',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
      },
    },
    horizontalAssetContainer: {
      overflow: 'hidden',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
      },
    },
    horizontalAsset: {
      width: '100%',
      height: 'auto',
      display: 'block',
      objectFit: 'cover',
      transition: 'transform 0.5s ease',
      '&:hover': {
        transform: 'scale(1.03)',
      },
    },
  };

  // Update the caseStudyStyles to style blockquotes
  const caseStudyStyles = `
    .case-study-content ul,
    .case-study-content ol {
      list-style-type: none;
      padding-left: 1.5rem;
      margin-top: 1rem; /* Add spacing before lists */
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
    
    /* Asset grid styles */
    .assets-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
      margin-top: 20px;
      position: relative;
      padding: 20px;
      border-radius: 12px;
      background: radial-gradient(circle at center, rgba(30, 30, 30, 0.5) 0%, rgba(30, 30, 30, 0.2) 60%, rgba(30, 30, 30, 0) 100%);
    }
    
    .horizontal-assets-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin-top: 20px;
      position: relative;
      padding: 20px;
      border-radius: 12px;
      background: radial-gradient(circle at center, rgba(30, 30, 30, 0.5) 0%, rgba(30, 30, 30, 0.2) 60%, rgba(30, 30, 30, 0) 100%);
    }
    
    .asset-container {
      overflow: hidden;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .asset-container:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
    }
    
    .vertical-asset, .horizontal-asset {
      width: 100%;
      height: auto;
      display: block;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    .vertical-asset:hover, .horizontal-asset:hover {
      transform: scale(1.03);
    }
    
    @media (max-width: 768px) {
      .assets-grid {
        grid-template-columns: repeat(2, 1fr);
      }
      
      .horizontal-assets-grid {
        grid-template-columns: 1fr;
      }
    }
    
    @media (max-width: 480px) {
      .assets-grid {
        grid-template-columns: 1fr;
      }
    }
  `;

  // Add additional CSS to ensure consistent containment
  const containerStyles = `
    .embed-container, .presentation-container {
      position: relative;
      overflow: hidden;
    }
    
    .embed-container iframe, .presentation-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
    }
    
    @media (max-width: 768px) {
      .embed-container, .presentation-container {
        height: 300px;
      }
    }
  `;

  const renderCaseStudyContent = (content, parentKey) => {
    if (typeof content === 'object' && content !== null) {
      return Object.entries(content).map(([key, value]) => {
        // Special handling for Color Palette
        if (key === "Color Palette" && Array.isArray(value)) {
          const sectionKey = key;
          return (
            <motion.div 
              key={sectionKey} 
              style={styles.caseStudySection}
              ref={el => sectionRefs.current[sectionKey] = el}
              data-section={sectionKey}
              initial="hidden"
              animate={visibleSections[sectionKey] ? "visible" : "hidden"}
              variants={fadeInVariants}
            >
              <h3 style={styles.caseStudySectionTitle}>{sectionKey}</h3>
              <div style={styles.colorPalette}>
                {value.map((color, index) => (
                  <div key={index} style={styles.colorSwatchContainer}>
                    <div 
                      style={{
                        ...styles.colorSwatch,
                        backgroundColor: color,
                      }}
                    />
                    <div style={styles.colorHex}>{color}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        }
        // Special handling for Assets
        else if (key === "Assets" && typeof value === 'object') {
          const sectionKey = key;
          return (
            <motion.div 
              key={sectionKey} 
              style={styles.caseStudySection}
              ref={el => sectionRefs.current[sectionKey] = el}
              data-section={sectionKey}
              initial="hidden"
              animate={visibleSections[sectionKey] ? "visible" : "hidden"}
              variants={fadeInVariants}
            >
              {/* Vertical assets */}
              {value.Vertical && value.Vertical.length > 0 && (
                <div className="assets-grid">
                  {value.Vertical.map((asset, index) => (
                    <div key={`vertical-${index}`} className="asset-container">
                      <img 
                        src={asset} 
                        alt={`Project asset ${index + 1}`} 
                        className="vertical-asset"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* Horizontal assets */}
              {value.Horizontal && value.Horizontal.length > 0 && (
                <div className="horizontal-assets-grid">
                  {value.Horizontal.map((asset, index) => (
                    <div key={`horizontal-${index}`} className="asset-container">
                      <img 
                        src={asset} 
                        alt={`Project asset ${index + 1}`} 
                        className="horizontal-asset"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        }
        // Regular sections
        else {
          const sectionKey = key;
          return (
            <motion.div 
              key={sectionKey} 
              style={styles.caseStudySection}
              ref={el => sectionRefs.current[sectionKey] = el}
              data-section={sectionKey}
              initial="hidden"
              animate={visibleSections[sectionKey] ? "visible" : "hidden"}
              variants={fadeInVariants}
            >
              <h3 style={styles.caseStudySectionTitle}>{sectionKey}</h3>
              {typeof value === 'string' ? (
                <div 
                  className="case-study-content"
                  style={styles.caseStudyContent} 
                  dangerouslySetInnerHTML={createMarkup(value)} 
                />
              ) : (
                renderCaseStudyContent(value, key)
              )}
            </motion.div>
          );
        }
      });
    }
    return null;
  };

  // Add a media query for smaller screens
  const mediaQueryStyles = `
    @media (max-width: 768px) {
      .software-modal-content {
        padding: 30px 20px !important;
      }
      
      .embed-container, .presentation-container {
        width: 100% !important;
        margin: 0 auto 30px auto !important;
      }
    }
  `;

  // Update the forceTopLayerStyles to include the fixed close button
  const forceTopLayerStyles = `
    #modal-root {
      position: relative;
      z-index: 999999;
    }
    
    .software-display-modal-overlay {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      z-index: 999999 !important;
      isolation: isolate !important;
    }
    
    .software-display-modal {
      z-index: 1000000 !important;
      isolation: isolate !important;
    }
    
    .modal-fixed-close-button {
      z-index: 1000001 !important;
    }
  `;

  // The modal content JSX
  const modalContent = project && (
    <motion.div 
      className="software-display-modal-overlay"
      style={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Fixed close button that stays in top right corner */}
      <motion.button 
        className="modal-fixed-close-button"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '28px',
          cursor: 'pointer',
          zIndex: 1000001,
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
        className="software-display-modal"
        style={styles.modal}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={styles.content} className="software-modal-content">
          <h1 style={styles.header}>{formatTitle(project.Title)}</h1>
          
          {/* Preview (Embed or Screenshot) */}
          <div style={styles.previewContainer}>
            {!project.useScreenshot && project["Embed link"] ? (
              <iframe 
                src={project["Embed link"]} 
                style={styles.iframe}
                title={project.Title}
              />
            ) : project.Screenshot ? (
              <img 
                src={project.Screenshot} 
                alt={project.Title} 
                style={styles.screenshot}
              />
            ) : (
              <div style={{
                ...styles.screenshot,
                backgroundColor: palette.medium,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>No Preview Available</div>
            )}
          </div>
          
          {/* Description */}
          <h2 style={styles.sectionTitle}>Description</h2>
          <p style={styles.description}>{project.Description}</p>
          
          {/* Technologies */}
          <h2 style={styles.sectionTitle}>Technologies</h2>
          <div style={styles.techList}>
            {project.Technologies.map((tech, index) => (
              <div 
                key={index} 
                style={styles.techItem}
                onMouseEnter={(e) => e.target.style.opacity = 1}
                onMouseLeave={(e) => e.target.style.opacity = 0.6}
              >
                {tech}
              </div>
            ))}
          </div>
          
          {/* Case Study Section - Add after Technologies section */}
          {project.CaseStudy && (
            <>
              <h2 
                style={{...styles.sectionTitle, ...styles.collapsibleStyles.sectionHeader}} 
                onClick={() => setIsCaseStudyExpanded(!isCaseStudyExpanded)}
              >
                Case Study
                <FontAwesomeIcon 
                  icon={isCaseStudyExpanded ? faChevronUp : faChevronDown} 
                  style={{
                    ...styles.collapsibleStyles.chevron,
                    transform: isCaseStudyExpanded ? 'rotate(0deg)' : 'rotate(0deg)',
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
                    <div style={styles.caseStudy}>
                      {renderCaseStudyContent(project.CaseStudy, null)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
          
          {/* YouTube Demo if available */}
          {youtubeEmbedUrl && (
            <>
              <h2 
                style={{...styles.sectionTitle, ...styles.collapsibleStyles.sectionHeader}} 
                onClick={() => setIsDemoExpanded(!isDemoExpanded)}
              >
                Demo Video
                <FontAwesomeIcon 
                  icon={isDemoExpanded ? faChevronUp : faChevronDown} 
                  style={{
                    ...styles.collapsibleStyles.chevron,
                    transform: isDemoExpanded ? 'rotate(0deg)' : 'rotate(0deg)',
                    opacity: 0.6,
                    transition: 'opacity 0.2s ease, transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = 1}
                  onMouseLeave={(e) => e.target.style.opacity = 0.6}
                />
              </h2>
              <AnimatePresence initial={false}>
                {isDemoExpanded && (
                  <motion.div
                    key="demo-content"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={collapsibleVariants}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={styles.embedContainer} className="embed-container">
                      <iframe
                        src={youtubeEmbedUrl}
                        style={styles.iframe}
                        title={`${project.Title} Demo`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
          
          {/* Presentation if available */}
          {project.Presentation && project.Presentation.includes('docs.google.com') && (
            <>
              <h2 
                style={{...styles.sectionTitle, ...styles.collapsibleStyles.sectionHeader}} 
                onClick={() => setIsPresentationExpanded(!isPresentationExpanded)}
              >
                Presentation
                <FontAwesomeIcon 
                  icon={isPresentationExpanded ? faChevronUp : faChevronDown} 
                  style={{
                    ...styles.collapsibleStyles.chevron,
                    transform: isPresentationExpanded ? 'rotate(0deg)' : 'rotate(0deg)',
                    opacity: 0.6,
                    transition: 'opacity 0.2s ease, transform 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = 1}
                  onMouseLeave={(e) => e.target.style.opacity = 0.6}
                />
              </h2>
              <AnimatePresence initial={false}>
                {isPresentationExpanded && (
                  <motion.div
                    key="presentation-content"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={collapsibleVariants}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={presentationEmbedStyles} className="presentation-container">
                      <iframe
                        src={project.Presentation}
                        style={styles.iframe}
                        title={`${project.Title} Presentation`}
                        allowFullScreen
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
          
          {/* Links */}
          <div style={styles.linksContainer}>
            {project.GithubRepoURL && (
              <a 
                href={project.GithubRepoURL} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.linkButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1e554c';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = palette.accent;
                  e.target.style.transform = 'scale(1)';
                }}
              >
                GitHub Repository
              </a>
            )}
            
            {project.Website && (
              <a 
                href={project.Website} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.linkButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1e554c';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = palette.accent;
                  e.target.style.transform = 'scale(1)';
                }}
              >
                Visit Website
              </a>
            )}
            
            {project.AppStore && (
              <a 
                href={project.AppStore} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.linkButton}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1e554c';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = palette.accent;
                  e.target.style.transform = 'scale(1)';
                }}
              >
                App Store
              </a>
            )}
          </div>
        </div>
        <style>{caseStudyStyles}</style>
        <style>{mediaQueryStyles}</style>
        <style>{containerStyles}</style>
        <style>{forceTopLayerStyles}</style>
      </motion.div>
    </motion.div>
  );

  // Use createPortal to render the modal directly to the body
  return project ? ReactDOM.createPortal(
    modalContent,
    document.getElementById('modal-root') || document.body
  ) : null;
};

export default SoftwareDisplayPage;
