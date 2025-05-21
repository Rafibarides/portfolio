import React, { useState, useEffect } from 'react';
import ScrollFontTransition from './ScrollFontTransition';
import TextClipMask from './TextClipMask';
import texture2Gif from '../assets/texture2.gif';

const Title = ({ text, useClipMask = false }) => {
  // Split the text into words
  const words = text.split(' ');
  const isOneWord = words.length === 1;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Consistent font size across all title types
  const fontSize = windowWidth <= 768 ? '1.75rem' : '2.5rem';
  
  // Default styles
  const styles = {
    container: {
      marginBottom: '30px',
      textAlign: 'center',
      fontFamily: "var(--font-primary)",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    wordContainer: {
      display: 'inline-flex',
      alignItems: 'baseline', // Critical for baseline alignment
      gap: '10px', // Space between words
      flexWrap: 'wrap',
      justifyContent: 'center',
      lineHeight: 1.2, // Consistent line height
    },
    poppinsWord: {
      fontFamily: "var(--font-primary)",
      fontWeight: 600,
      fontSize: fontSize,
    },
    caveatWord: {
      fontFamily: "var(--font-accent)",
      fontWeight: 600,
      fontSize: fontSize, // Same base font size for consistency
      display: 'inline-block',
      position: 'relative',
      top: '0px', // Adjust if needed for optical alignment
    }
  };

  // For single word titles, use ScrollFontTransition
  if (isOneWord) {
    return (
      <h2 style={styles.container}>
        <ScrollFontTransition 
          text={text}
          startFont="var(--font-accent)"
          endFont="'Poppins', sans-serif"
          fontWeight={600}
          threshold={0.2}
          duration={0.3}
          fontSize={fontSize} // Use consistent font size
        />
      </h2>
    );
  }

  // For multi-word titles with TextClipMask (Software section)
  if (useClipMask) {
    return (
      <h2 style={styles.container}>
        <div style={styles.wordContainer}>
          {words.slice(0, -1).map((word, index) => (
            <span key={index} style={{ display: 'inline-block' }}>
              <TextClipMask 
                text={word}
                clipImageSrc={texture2Gif}
                fontFamily="var(--font-primary)"
                fontSize={fontSize} // Use consistent font size
                fontWeight={600}
                color="white"
                opacity={0.6}
                blendMode="multiply"
              />
            </span>
          ))}
          <span style={{ display: 'inline-block' }}>
            <TextClipMask 
              text={words[words.length - 1]}
              clipImageSrc={texture2Gif}
              fontFamily="var(--font-accent)"
              fontSize={fontSize} // Use consistent font size
              fontWeight={600}
              color="white"
              opacity={0.6}
              blendMode="multiply"
            />
          </span>
        </div>
      </h2>
    );
  }

  // Standard multi-word title
  return (
    <h2 style={styles.container}>
      <div style={styles.wordContainer}>
        {words.slice(0, -1).map((word, index) => (
          <span key={index} style={styles.poppinsWord}>{word}</span>
        ))}
        <span style={styles.caveatWord}>{words[words.length - 1]}</span>
      </div>
    </h2>
  );
};

export default Title; 