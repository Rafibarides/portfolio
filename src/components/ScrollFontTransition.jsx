import React, { useState, useEffect, useRef } from 'react';

const ScrollFontTransition = ({ 
  text, 
  startFont, 
  endFont, 
  threshold = 0.2,
  duration = 0.5,
  fontSize = '2.5rem',
  fontWeight = 400,
  color = 'white',
  className = '',
  style = {}
}) => {
  const containerRef = useRef(null);
  const [letterStates, setLetterStates] = useState([]);
  
  // Initialize letter states
  useEffect(() => {
    if (text) {
      setLetterStates(Array(text.length).fill(0)); // 0 = start font, 1 = end font
    }
  }, [text]);
  
  // Handle scroll effect
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the element is through the viewport
      // 0 = just entered at bottom, 1 = at top of viewport
      const progress = 1 - (rect.top / viewportHeight);
      
      // Only start the effect when the element is in view
      if (progress > 0 && progress < 1) {
        // Calculate how many letters should be transformed based on scroll position
        const effectiveProgress = (progress - threshold) / (0.5 - threshold);
        
        if (effectiveProgress > 0) {
          const lettersToTransform = Math.floor(effectiveProgress * text.length);
          
          setLetterStates(prev => 
            prev.map((state, idx) => 
              idx < lettersToTransform ? 1 : 0
            )
          );
        } else {
          // Reset if we scroll back up
          setLetterStates(Array(text.length).fill(0));
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [text, threshold]);
  
  return (
    <div 
      ref={containerRef} 
      className={className}
      style={{
        display: 'inline-block',
        lineHeight: 1.2,
        ...style
      }}
    >
      {text.split('').map((letter, index) => (
        <span
          key={index}
          style={{
            fontFamily: letterStates[index] ? endFont : startFont,
            fontSize,
            fontWeight,
            color,
            transition: `font-family ${duration}s ease`,
            display: 'inline-block',
          }}
        >
          {letter}
        </span>
      ))}
    </div>
  );
};

export default ScrollFontTransition; 