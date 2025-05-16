import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { palette } from '../utils/colors';
import softwareData from '../../Json/SoftwareSection.json';
import SoftwareDisplayPage from '../SoftwareDisplayPage';
import TextClipMask from '../components/TextClipMask';
import texture2Gif from '../assets/texture2.gif';

const SoftwareSection = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const [allTechnologies, setAllTechnologies] = useState([]);
  const sectionRef = useRef(null);
  const vantaEffect = useRef(null);
  const pillsRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const titleRef = useRef(null);
  const isPillsInView = useInView(pillsRef, { once: false, amount: 0.3 });
  const isTitleInView = useInView(titleRef, { once: false, amount: 0.3 });
  const [hoveredPill, setHoveredPill] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Add animation variants
  const pillsAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const pillItemAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const titleAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.7 }
    }
  };

  // Add a function to normalize technology names
  const normalizeTechName = (tech) => {
    // Handle special cases
    if (tech.toLowerCase() === 'react.js' || tech.toLowerCase() === 'reactjs') return 'React';
    if (tech.toLowerCase() === 'node.js' || tech.toLowerCase() === 'nodejs') return 'Node.js';
    return tech;
  };

  // Function to handle pill hover effects
  const handlePillHover = (e, isEnter) => {
    const pill = e.currentTarget;
    
    if (isEnter) {
      // Add event listener for mousemove when hovering
      pill.addEventListener('mousemove', handlePillMouseMove);
      
      // Add scale transform only
      pill.style.transform = 'scale(1.05)';
    } else {
      // Remove event listener when not hovering
      pill.removeEventListener('mousemove', handlePillMouseMove);
      
      // Reset styles
      pill.style.transform = 'scale(1)';
    }
  };

  // Function to handle mouse movement over pill
  const handlePillMouseMove = (e) => {
    // We're keeping this function for the mousemove tracking
    // but not applying any visual effects
  };

  useEffect(() => {
    // Load projects from JSON
    setProjects(softwareData);
    setFilteredProjects(softwareData);

    // Extract all unique technologies for filter pills and normalize them
    const techSet = new Set();
    softwareData.forEach(project => {
      project.Technologies.forEach(tech => {
        techSet.add(normalizeTechName(tech));
      });
    });
    setAllTechnologies(Array.from(techSet).sort());
  }, []);

  // Initialize Vanta effect
  useEffect(() => {
    // Check if the section ref is available and if VANTA is loaded
    if (!sectionRef.current) return;
    
    // Function to initialize the effect
    const initVantaEffect = () => {
      if (vantaEffect.current) return; // Already initialized
      
      if (window.VANTA && window.VANTA.FOG) {
        console.log('Initializing Vanta FOG effect');
        vantaEffect.current = window.VANTA.FOG({
          el: sectionRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          highlightColor: 0x4f5052,
          midtoneColor: 0x1c1c1f,
          lowlightColor: 0x0,
          baseColor: 0x0,
          blurFactor: 0.58,
          speed: 0.5,
          zoom: 1.20
        });
      } else {
        // If VANTA is not available yet, try again in a moment
        console.log('VANTA not available yet, retrying...');
        setTimeout(initVantaEffect, 500);
      }
    };
    
    // Start the initialization process
    initVantaEffect();
    
    // Clean up effect on component unmount
    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
        vantaEffect.current = null;
      }
    };
  }, []);

  useEffect(() => {
    // Immediately set the correct initial value
    setIsMobile(window.innerWidth <= 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter projects based on selected technologies
  const filterProjects = (tech) => {
    let updatedSelectedTechs;
    
    if (selectedTechnologies.includes(tech)) {
      // Remove the technology if already selected
      updatedSelectedTechs = selectedTechnologies.filter(t => t !== tech);
    } else {
      // Add the technology if not already selected
      updatedSelectedTechs = [...selectedTechnologies, tech];
    }
    
    setSelectedTechnologies(updatedSelectedTechs);
    
    if (updatedSelectedTechs.length === 0) {
      // If no technologies selected, show all projects
      setFilteredProjects(projects);
    } else {
      // Filter projects that have ALL selected technologies
      const filtered = projects.filter(project => 
        updatedSelectedTechs.every(selectedTech => 
          project.Technologies.some(projectTech => 
            normalizeTechName(projectTech).toLowerCase() === selectedTech.toLowerCase()
          )
        )
      );
      setFilteredProjects(filtered);
    }
  };

  // Add this utility function near your other functions
  const shouldPreventModalOnMobile = () => {
    // Double check for mobile to be absolutely sure
    return isMobile || window.innerWidth <= 768;
  };

  // Then modify handleCardClick to use it
  const handleCardClick = (e, project) => {
    // Don't open modal if clicking on a link or button
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || 
        e.target.closest('a') || e.target.closest('button')) {
      return;
    }
    
    // PREVENT MODAL ON MOBILE - Desktop only feature
    if (shouldPreventModalOnMobile()) {
      return;
    }
    
    // Desktop only - open the modal
    setSelectedProject(project.Title);
  };
  
  // Add a function to close the modal
  const closeModal = () => {
    setSelectedProject(null);
  };

  // Styles
  const styles = {
    section: {
      padding: '40px 20px',
      backgroundColor: 'transparent',
      color: palette.text,
      position: 'relative',
      minHeight: '100vh',
      zIndex: 0,
      fontFamily: "'Poppins', sans-serif",
    },
    sectionTitle: {
      fontSize: window.innerWidth <= 768 ? '1rem' : '3.5rem',
      fontWeight: 'bold',
      marginBottom: '30px',
      textAlign: 'center',
      fontFamily: "'Poppins', sans-serif",
    },
    projectsText: {
      fontFamily: "'Caveat', cursive",
      fontWeight: 600,
    },
    filterContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '10px',
      marginBottom: '30px',
      width: '50%',
      maxWidth: '1000px',
      margin: '0 auto 30px auto',
    },
    filterPill: {
      padding: '5px 14px',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '0.8rem',
      backgroundColor: 'rgba(15, 15, 15, 0.7)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      display: 'inline-block',
      lineHeight: '1.2',
      transition: 'transform 0.3s ease-out, background-color 0.3s ease',
    },
    activePill: {
      backgroundColor: 'rgba(80, 80, 80, 0.7)',
      color: palette.text,
      border: '1px solid rgba(255, 255, 255, 0.15)',
    },
    inactivePill: {
      backgroundColor: 'rgba(20, 20, 20, 0.6)',
      color: palette.text,
      border: '1px solid rgba(255, 255, 255, 0.08)',
    },
    projectsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 500px), 1fr))',
      gap: '50px',
      justifyContent: 'center',
      padding: '30px',
    },
    card: {
      background: 'rgba(20, 20, 20, 0.45)',
      backdropFilter: 'blur(15px)',
      WebkitBackdropFilter: 'blur(15px)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      marginBottom: '40px',
    },
    previewContainer: {
      width: '100%',
      height: isMobile ? 'auto' : '305px',
      overflow: 'hidden',
      position: 'relative',
      ...(isMobile && {
        paddingBottom: '56.25%',
        height: 0,
      }),
    },
    iframe: {
      width: '100%',
      height: '100%',
      border: 'none',
    },
    screenshot: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    contentContainer: {
      padding: '20px',
      flex: '1',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
    },
    titleContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    },
    title: {
      fontSize: '1.3rem',
      color: palette.text,
      margin: 0,
    },
    titleButtons: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
    },
    techContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '6px',
      marginBottom: '12px',
    },
    techPill: {
      padding: '3px 10px',
      borderRadius: '12px',
      backgroundColor: 'rgba(43, 118, 162, 0.1)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      color: palette.text,
      fontSize: '0.7rem',
      border: '0.5px solid rgba(255, 255, 255, 0.3)',
      display: 'inline-block',
      lineHeight: '1.2',
      transition: 'transform 0.3s ease-out',
    },
    description: {
      marginBottom: '15px',
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
      lineHeight: '1.3',
      fontSize: '0.8rem',
      opacity: 0.7,
    },
    readMore: {
      color: palette.text,
      cursor: 'pointer',
      marginTop: 'auto',
      alignSelf: 'flex-start',
      textDecoration: 'none',
      fontSize: '0.8rem',
    },
    linksContainer: {
      display: 'flex',
      gap: '12px',
      marginTop: '12px',
      flexWrap: 'wrap',
    },
    linkButton: {
      padding: '6px 12px',
      borderRadius: '4px',
      backgroundColor: palette.accent,
      color: palette.text,
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: '0.8rem',
    },
    iconButton: {
      width: '18px',
      height: '18px',
      objectFit: 'contain',
      cursor: 'pointer',
      opacity: 0.85,
      transition: 'opacity 0.2s ease, transform 0.2s ease',
      '&:hover': {
        opacity: 1,
        transform: 'scale(1.1)',
      }
    },
    tooltip: {
      position: 'absolute',
      top: '-40px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      color: 'white',
      padding: '6px 10px',
      borderRadius: '5px',
      fontSize: '12px',
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
      zIndex: 10,
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    },
    tooltipArrow: {
      position: 'absolute',
      bottom: '-5px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '0',
      height: '0',
      borderLeft: '5px solid transparent',
      borderRight: '5px solid transparent',
      borderTop: '5px solid rgba(0, 0, 0, 0.85)',
    },
    filterPills: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginBottom: '20px',
      '@media (max-width: 768px)': {
        display: 'none',
      }
    },
    projectImageContainer: {
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '8px 8px 0 0',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    projectImage: {
      width: '100%',
      objectFit: 'cover',
      display: 'block',
      transition: 'transform 0.3s ease',
    },
    mobileProjectImageContainer: isMobile ? {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRadius: '8px 8px 0 0',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    } : {},
    mobileProjectImage: isMobile ? {
      width: 'auto !important',
      height: 'auto !important',
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      objectPosition: 'center',
      display: 'block',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
    } : {},
  };

  // Replace the project preview rendering with this GUARANTEED solution
  const renderProjectPreview = (project) => {
    // SAFETY CHECK: Force mobile detection
    const forceMobileCheck = window.innerWidth <= 768;
    
    // MOBILE BRANCH - SCREENSHOT ONLY, NO EXCEPTIONS
    if (forceMobileCheck || isMobile) {
      return project.Screenshot ? (
        <div style={styles.mobileProjectImageContainer}>
          <img
            src={project.Screenshot}
            alt={project.Title}
            style={styles.mobileProjectImage}
          />
        </div>
      ) : (
        <div style={{
          ...styles.screenshot,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          color: 'rgba(255, 255, 255, 0.7)',
        }}>
          No preview available
        </div>
      );
    }
    
    // DESKTOP BRANCH
    if (project["Embed link"] && !project.useScreenshot) {
      return (
        <iframe
          src={project["Embed link"]}
          style={styles.iframe}
          title={project.Title}
        />
      );
    } else if (project.Screenshot) {
      return (
        <div style={styles.projectImageContainer}>
          <img
            src={project.Screenshot}
            alt={project.Title}
            style={styles.projectImage}
          />
        </div>
      );
    } else {
      return (
        <div style={{
          ...styles.screenshot,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          color: 'rgba(255, 255, 255, 0.7)',
        }}>
          No preview available
        </div>
      );
    }
  };

  return (
    <section id="software" style={styles.section} ref={sectionRef}>
      <div style={styles.sectionTitle}>
        <span style={{ fontFamily: "'Poppins', sans-serif" }}>
          <TextClipMask 
            text="Software"
            clipImageSrc={texture2Gif}
            fontFamily="'Poppins', sans-serif"
            fontSize="2.5rem"
            fontWeight={600}
            color="white"
            opacity={0.6}
            blendMode="multiply"
          />
        </span>
        {" "}
        <span>
          <TextClipMask 
            text="Projects"
            clipImageSrc={texture2Gif}
            fontFamily="'Caveat', cursive"
            fontSize="2.5rem"
            fontWeight={600}
            color="white"
            opacity={0.6}
            blendMode="multiply"
          />
        </span>
      </div>
      
      {/* Filter Pills - conditionally render based on mobile state */}
      {!isMobile && (
        <motion.div 
          ref={pillsRef}
          style={styles.filterContainer}
          initial="hidden"
          animate={isPillsInView ? "visible" : "hidden"}
          variants={pillsAnimation}
        >
          {allTechnologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={pillItemAnimation}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                ...styles.filterPill,
                ...(selectedTechnologies.includes(tech)
                  ? styles.activePill
                  : styles.inactivePill),
                position: 'relative',
              }}
              onClick={() => filterProjects(tech)}
              onMouseEnter={(e) => {
                handlePillHover(e, true);
                setHoveredPill(tech);
              }}
              onMouseLeave={(e) => {
                handlePillHover(e, false);
                setHoveredPill(null);
              }}
            >
              {tech}
              <AnimatePresence>
                {hoveredPill === tech && (
                  <motion.div 
                    key={`tooltip-${tech}`}
                    style={styles.tooltip}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    Display projects using {tech}
                    <div style={styles.tooltipArrow}></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      )}
      
      {/* Projects Grid */}
      <div style={styles.projectsGrid}>
        {filteredProjects.map((project, index) => (
          <motion.div
            key={index}
            style={styles.card}
            initial={index < 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            whileInView={index < 2 ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            viewport={{ once: index < 2 ? true : false, margin: "-100px" }}
            exit={index < 2 ? {} : { opacity: 0, y: 50 }}
            transition={index < 2 ? {} : { duration: 0.5 }}
            whileHover={index < 2 ? {} : { 
              scale: 1.02,
              boxShadow: '0 20px 30px rgba(0, 0, 0, 0.3)'
            }}
            onClick={(e) => handleCardClick(e, project)}
          >
            {/* Preview Container */}
            <div style={{...styles.previewContainer}}>
              {renderProjectPreview(project)}
            </div>
            
            {/* Content */}
            <div style={styles.contentContainer}>
              {/* Title row with GitHub and App Store buttons */}
              <div style={styles.titleContainer}>
                {/* Title - Make it clickable to go to the website */}
                <h3 style={styles.title}>
                  {project.Website ? (
                    <a 
                      href={project.Website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ 
                        color: palette.text, 
                        textDecoration: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      {project.Title}
                    </a>
                  ) : (
                    project.Title
                  )}
                </h3>
                
                {/* GitHub and App Store buttons */}
                <div style={styles.titleButtons}>
                  {project.GithubRepoURL && (
                    <a 
                      href={project.GithubRepoURL} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <img 
                        src="../assets/github.png" 
                        alt="GitHub" 
                        style={styles.iconButton}
                      />
                    </a>
                  )}
                  
                  {project.AppStore && (
                    <a 
                      href={project.AppStore} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <img 
                        src="../assets/applestore.png" 
                        alt="App Store" 
                        style={styles.iconButton}
                      />
                    </a>
                  )}
                </div>
              </div>
              
              {/* Technologies */}
              <div style={styles.techContainer}>
                {project.Technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex} 
                    style={styles.techPill}
                    onMouseEnter={(e) => handlePillHover(e, true)}
                    onMouseLeave={(e) => handlePillHover(e, false)}
                  >
                    {normalizeTechName(tech)}
                  </span>
                ))}
              </div>
              
              {/* Description */}
              <p style={styles.description}>{project.Description}</p>
              
              {/* Read More Link */}
              <a 
                style={styles.readMore}
                onClick={(e) => {
                  e.preventDefault();
                  if (shouldPreventModalOnMobile()) {
                    return;
                  }
                  setSelectedProject(project.Title);
                }}
              >
                Read More
              </a>
              
              {/* Links - Demo and Presentation buttons */}
              <div style={styles.linksContainer}>
                {/* Special handling for Weather Now and Communitree demos */}
                {project.Title === "Weather Now" && (
                  <a 
                    href="https://www.youtube.com/watch?v=hZ2lzOpSDF0&ab_channel=RafiBarides" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={styles.linkButton}
                  >
                    Demo
                  </a>
                )}
                
                {project.Title === "Communitree" && (
                  <a 
                    href="https://www.youtube.com/watch?v=KoLg2kjyanE&ab_channel=RafiBarides" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={styles.linkButton}
                  >
                    Demo
                  </a>
                )}
                
                {/* For other projects with websites, don't show Demo button since title is clickable */}
                {project.Title !== "Weather Now" && 
                 project.Title !== "Communitree" && 
                 project.Website && 
                 false && ( // This will never render due to the false condition
                  <a 
                    href={project.Website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={styles.linkButton}
                  >
                    Demo
                  </a>
                )}
                
                {project.Presentation && (
                  <a 
                    href={project.Presentation} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={styles.linkButton}
                  >
                    Presentation
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Modal */}
      {selectedProject && (
        <SoftwareDisplayPage 
          projectTitle={selectedProject} 
          onClose={closeModal} 
        />
      )}
    </section>
  );
};

export default SoftwareSection;
