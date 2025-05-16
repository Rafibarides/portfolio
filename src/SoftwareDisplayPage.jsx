import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { palette } from './utils/colors';
import softwareData from '../Json/SoftwareSection.json';

const SoftwareDisplayPage = ({ projectTitle, onClose }) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    // Find the project with the matching title
    const foundProject = softwareData.find(
      p => p.Title.toLowerCase() === decodeURIComponent(projectTitle).toLowerCase()
    );
    setProject(foundProject);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [projectTitle]);

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
        <span style={{ fontFamily: "'Caveat', cursive", fontWeight: 600 }}>{lastWord}</span>
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

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(5px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
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
    },
    iframe: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 'none',
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
      paddingTop: '50.625%',
      height: 0,
    },
  };

  return (
    <motion.div 
      style={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        style={styles.modal}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button style={styles.closeButton} onClick={onClose}>×</button>
        
        <div style={styles.content}>
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
          
          {/* YouTube Demo if available */}
          {youtubeEmbedUrl && (
            <>
              <h2 style={styles.sectionTitle}>Demo Video</h2>
              <div style={styles.embedContainer}>
                <iframe
                  src={youtubeEmbedUrl}
                  style={styles.iframe}
                  title={`${project.Title} Demo`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </>
          )}
          
          {/* Presentation if available */}
          {project.Presentation && project.Presentation.includes('docs.google.com') && (
            <>
              <h2 style={styles.sectionTitle}>Presentation</h2>
              <div style={styles.embedContainer}>
                <iframe
                  src={project.Presentation}
                  style={styles.iframe}
                  title={`${project.Title} Presentation`}
                  allowFullScreen
                />
              </div>
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
      </motion.div>
    </motion.div>
  );
};

export default SoftwareDisplayPage;
