import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { palette } from '../utils/colors';
import ScrollFontTransition from '../components/ScrollFontTransition';
import RetroTextEffect from '../components/RetroTextEffect';
import artData from '../../Json/ArtSection.json';

const ArtSection = () => {
  const [artworks, setArtworks] = useState([]);
  const [selectedArt, setSelectedArt] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const sectionRef = useRef(null);

  useEffect(() => {
    setArtworks(artData);
    
    // Handle responsive layout
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openArtModal = (artwork, index) => {
    setSelectedArt(artwork);
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeArtModal = () => {
    setSelectedArt(null);
    setSelectedIndex(null);
    document.body.style.overflow = 'auto';
  };

  const navigateArt = useCallback((direction) => {
    if (selectedIndex === null) return;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = (selectedIndex + 1) % artworks.length;
    } else {
      newIndex = (selectedIndex - 1 + artworks.length) % artworks.length;
    }
    
    setSelectedArt(artworks[newIndex]);
    setSelectedIndex(newIndex);
  }, [selectedIndex, artworks]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedArt) return;
      
      if (e.key === 'ArrowRight') {
        navigateArt('next');
      } else if (e.key === 'ArrowLeft') {
        navigateArt('prev');
      } else if (e.key === 'Escape') {
        closeArtModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArt, navigateArt]);

  // Separate artworks with text (featured) from those without
  const featuredArtworks = artworks.filter(art => art.text);
  const regularArtworks = artworks.filter(art => !art.text);

  // Create a combined array for navigation
  const allArtworksInOrder = [...regularArtworks, ...featuredArtworks];

  const styles = {
    section: {
      padding: '50px 30px',
      minHeight: '100vh',
      position: 'relative',
      color: palette.text,
      fontFamily: "'Poppins', sans-serif",
      borderTop: '2px solid rgba(255, 255, 255, 0.2)',
      zIndex: 0,
      overflow: 'hidden', // Ensure the gradient animation stays contained
    },
    gradientBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
      background: 'linear-gradient(135deg, #000000, #222222, #111111, #1a1a1a)',
      backgroundSize: '400% 400%',
    },
    header: {
      fontSize: window.innerWidth <= 768 ? '1rem' : '3.5rem',
      marginBottom: '50px',
      textAlign: 'center',
      fontFamily: "'Poppins', sans-serif",
    },
    artGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
      gap: '30px',
      padding: '30px',
      maxWidth: '1400px',
      margin: '0 auto',
    },
    artContainer: {
      position: 'relative',
      overflow: 'hidden',
      borderRadius: '1px',
      cursor: 'pointer',
      aspectRatio: '1',
      backgroundColor: 'rgba(20, 20, 20, 0.5)',
      transition: 'transform 0.3s ease',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    art: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.5s ease',
    },
    artOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.01)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    featuredSection: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
      gap: '30px',
      padding: '50px',
      maxWidth: '1000px',
      margin: '30px auto',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 1)',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    featuredArt: {
      width: '100%',
      maxHeight: '600px',
      objectFit: 'contain',
      borderRadius: '5px',
      cursor: 'pointer',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backgroundColor: 'rgba(20, 20, 20, 0.5)',
    },
    featuredText: {
      padding: '20px',
      fontSize: '1rem',
      lineHeight: '1.6',
      color: palette.text,
      whiteSpace: 'pre-wrap',
    },
    modalOverlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
    },
    modalContent: {
      position: 'relative',
      maxWidth: '90%',
      maxHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    modalImage: {
      maxWidth: '100%',
      maxHeight: '80vh',
      objectFit: 'contain',
      borderRadius: '4px',
    },
    closeButton: {
      position: 'absolute',
      top: '-40px',
      right: '0',
      backgroundColor: 'transparent',
      border: 'none',
      color: palette.text,
      fontSize: '30px',
      cursor: 'pointer',
      outline: 'none',
    },
    sectionTitle: {
      fontSize: '1.8rem',
      margin: '30px 0 10px',
      textAlign: 'center',
      fontFamily: "'Poppins', sans-serif",
    },
    navButton: {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      color: palette.text,
      border: 'none',
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      outline: 'none',
      zIndex: 1001,
    },
    prevButton: {
      left: '20px',
    },
    nextButton: {
      right: '20px',
    },
    textCardBackground: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      borderRadius: '8px',
      padding: '20px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    featuredTextContainer: {
      padding: '20px',
      fontSize: '1rem',
      lineHeight: '1.6',
      color: palette.text,
      whiteSpace: 'pre-wrap',
    },
    featuredTitle: {
      fontSize: '1.2rem',
      margin: '0 0 10px 0',
      fontWeight: 600,
    },
    skillsContainer: {
      display: 'flex',
      gap: '5px',
    },
    skill: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '5px',
      padding: '5px 10px',
      fontSize: '0.8rem',
    },
  };

  // Animation variants for the gradient background
  const gradientAnimation = {
    animate: {
      backgroundPosition: ['0% 0%', '100% 100%'],
      transition: {
        duration: 15,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  // Word animation variants
  const wordAnimationVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: 5,
      transition: {
        duration: 0.2,
      },
    }
  };

  // Function to animate text by words with proper sequencing
  const AnimatedParagraphs = ({ paragraphs }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);
    const paragraphRefs = useRef([]);
    const containerRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    
    // Initialize paragraph refs
    useEffect(() => {
      paragraphRefs.current = paragraphs.map((_, i) => 
        paragraphRefs.current[i] || React.createRef()
      );
    }, [paragraphs]);
    
    // Calculate container height based on the tallest paragraph
    useEffect(() => {
      const calculateHeight = () => {
        let maxHeight = 0;
        paragraphRefs.current.forEach(ref => {
          if (ref.current) {
            const height = ref.current.offsetHeight;
            maxHeight = Math.max(maxHeight, height);
          }
        });
        setContainerHeight(maxHeight > 0 ? maxHeight : 200); // Fallback height
      };
      
      // Initial calculation
      calculateHeight();
      
      // Recalculate on window resize
      window.addEventListener('resize', calculateHeight);
      return () => window.removeEventListener('resize', calculateHeight);
    }, [paragraphs]);
    
    // Handle intersection with viewport
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsInView(true);
          } else {
            setIsInView(false);
            setActiveIndex(0); // Reset to first paragraph when out of view
          }
        },
        { threshold: 0.2 }
      );
      
      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
      
      return () => {
        if (containerRef.current) {
          observer.unobserve(containerRef.current);
        }
      };
    }, []);
    
    return (
      <div 
        ref={containerRef} 
        style={{ 
          position: 'relative', 
          height: containerHeight,
          transition: 'height 0.3s ease'
        }}
      >
        {paragraphs.map((paragraph, i) => (
          <AnimatedParagraph 
            key={i}
            ref={paragraphRefs.current[i]}
            text={paragraph}
            index={i}
            isActive={i === activeIndex && isInView}
            onComplete={() => {
              if (i < paragraphs.length - 1) {
                setActiveIndex(i + 1);
              }
            }}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              fontWeight: i === paragraphs.length - 1 ? 600 : (i === 0 ? 200 : 400),
              opacity: i === activeIndex && isInView ? 1 : 0,
              pointerEvents: i === activeIndex ? 'auto' : 'none',
            }}
          />
        ))}
      </div>
    );
  };

  // Component for a single animated paragraph
  const AnimatedParagraph = React.forwardRef(({ 
    text, 
    index, 
    isActive, 
    onComplete, 
    style 
  }, ref) => {
    const controls = useAnimation();
    const [hasAnimated, setHasAnimated] = useState(false);
    
    // Process text into words, ensuring proper handling of spaces
    const processText = (text) => {
      // Split by spaces but keep track of spaces
      const parts = [];
      const words = text.split(' ');
      
      words.forEach((word, i) => {
        if (word) {
          parts.push(word);
        }
        // Add space after each word except the last one
        if (i < words.length - 1) {
          parts.push(' ');
        }
      });
      
      return parts;
    };
    
    const words = processText(text);
    
    // Start or reset animation when active state changes
    useEffect(() => {
      if (isActive) {
        setHasAnimated(false);
        controls.start("visible").then(() => {
          if (onComplete && !hasAnimated) {
            setHasAnimated(true);
            setTimeout(() => {
              onComplete();
            }, 1000); // Delay before starting next paragraph
          }
        });
      } else {
        controls.start("hidden");
      }
    }, [isActive, controls, onComplete, hasAnimated]);
    
    return (
      <motion.p
        ref={ref}
        style={style}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {
            opacity: 0,
            transition: {
              duration: 0.3,
            }
          },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.02,
              delayChildren: 0.05,
              when: "beforeChildren",
            }
          }
        }}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordAnimationVariants}
            style={{ 
              display: 'inline-block',
              whiteSpace: word === ' ' ? 'pre' : 'normal',
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    );
  });

  // Add a new component for the fade-in/fade-out artwork
  const FadeInOutImage = ({ src, alt, style, onClick }) => {
    const controls = useAnimation();
    const imageRef = useRef(null);
    
    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            controls.start("visible");
          } else {
            controls.start("hidden");
          }
        },
        { threshold: 0.2 }
      );
      
      if (imageRef.current) {
        observer.observe(imageRef.current);
      }
      
      return () => {
        if (imageRef.current) {
          observer.unobserve(imageRef.current);
        }
      };
    }, [controls]);
    
    return (
      <motion.img
        ref={imageRef}
        src={src}
        alt={alt}
        style={style}
        onClick={onClick}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, scale: 0.98 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { duration: 0.7 }
          }
        }}
      />
    );
  };

  // Component for featured artwork with scroll-based growth animation
  const GrowOnScrollSection = ({ artwork, index }) => {
    const sectionRef = useRef(null);
    
    // Use useScroll to track scroll progress within the viewport
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"]
    });
    
    // Transform scroll progress to scale value
    // Scale starts at 0.95, grows to 1.05 as it enters viewport, then back to 0.95 as it leaves
    const scale = useTransform(
      scrollYProgress,
      [0, 0.4, 0.6, 1],    // Scroll progress points
      [0.95, 1.05, 1.05, 0.95]  // Corresponding scale values
    );
    
    return (
      <motion.div 
        ref={sectionRef}
        style={{
          ...styles.featuredSection,
          scale,
          transformOrigin: 'center',
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ opacity: { duration: 0.8 } }}
      >
        <FadeInOutImage
          src={artwork.url} 
          alt={`Featured Artwork ${index + 1}`} 
          style={styles.featuredArt}
          onClick={() => openArtModal(artwork, regularArtworks.length + index)}
        />
        <RetroTextEffect style={styles.featuredText} opacity={0.5}>
          <AnimatedParagraphs 
            paragraphs={artwork.text.split('\n\n')} 
          />
        </RetroTextEffect>
      </motion.div>
    );
  };

  return (
    <section id="art" style={styles.section} ref={sectionRef}>
      <motion.div 
        style={styles.gradientBackground}
        animate="animate"
        variants={gradientAnimation}
      />
      
      <h2 style={styles.header}>
        <ScrollFontTransition 
          text="Artwork"
          startFont="'Caveat', cursive"
          endFont="'Poppins', sans-serif"
          fontWeight={600}
          threshold={0.2}
          duration={0.3}
        />
      </h2>
      
      {/* Featured Artworks with Text (at the end) */}
      {featuredArtworks.length > 0 && (
        <>
          {featuredArtworks.map((artwork, index) => (
            <GrowOnScrollSection 
              key={index}
              artwork={artwork}
              index={index}
            />
          ))}
        </>
      )}
      
      {/* Regular Artworks Grid */}
      {regularArtworks.length > 0 && (
        <div style={styles.artGrid}>
          {regularArtworks.map((artwork, index) => (
            <motion.div 
              key={index} 
              style={styles.artContainer}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 * (index % 3) }}
              onClick={() => openArtModal(artwork, index)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
                e.currentTarget.querySelector('img').style.transform = 'scale(1.1)';
                e.currentTarget.querySelector('div').style.opacity = 1;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                e.currentTarget.querySelector('div').style.opacity = 0;
              }}
            >
              <FadeInOutImage
                src={artwork.url} 
                alt={`Artwork ${index + 1}`} 
                style={styles.art}
              />
              <div style={styles.artOverlay}></div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Modal for viewing artwork */}
      {selectedArt && (
        <div 
          style={styles.modalOverlay}
          onClick={closeArtModal}
        >
          <button 
            style={{...styles.navButton, ...styles.prevButton}}
            onClick={(e) => {
              e.stopPropagation();
              navigateArt('prev');
            }}
          >
            &#10094;
          </button>
          
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={closeArtModal}>×</button>
            <img 
              src={selectedArt.url} 
              alt={`Artwork ${selectedIndex + 1}`} 
              style={styles.modalImage}
            />
          </div>
          
          <button 
            style={{...styles.navButton, ...styles.nextButton}}
            onClick={(e) => {
              e.stopPropagation();
              navigateArt('next');
            }}
          >
            &#10095;
          </button>
        </div>
      )}
    </section>
  );
};

export default ArtSection;
