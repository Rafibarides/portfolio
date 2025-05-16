import React from 'react';

/**
 * TextClipMask - A component that applies a GIF texture as a clipping mask to text
 * 
 * @param {Object} props
 * @param {string} props.text - The text to display with the clipping mask
 * @param {string} props.clipImageSrc - Source URL of the image/GIF to use as clipping mask
 * @param {string} props.fontFamily - Font family for the text
 * @param {string|number} props.fontSize - Font size for the text
 * @param {number} props.fontWeight - Font weight for the text
 * @param {string} props.color - Text color (visible through the mask)
 * @param {number} props.opacity - Opacity of the texture (0-1), default: 0.4
 * @param {string} props.blendMode - CSS blend mode for the texture, default: 'multiply'
 * @param {Object} props.style - Additional styles to apply
 * @param {string} props.className - Additional CSS classes
 * @returns {React.ReactElement}
 */
const TextClipMask = ({ 
  text, 
  clipImageSrc,
  fontFamily = "'Poppins', sans-serif",
  fontSize = '2.5rem',
  fontWeight = 600,
  color = 'white',
  opacity = 0.6,
  blendMode = 'multiply',
  style = {},
  className = ''
}) => {
  const styles = {
    container: {
      position: 'relative',
      display: 'inline-block',
      lineHeight: 1.2,
    },
    text: {
      fontFamily,
      fontSize,
      fontWeight,
      color,
      margin: 0,
      padding: 0,
      display: 'inline-block',
    },
    clipContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      mixBlendMode: blendMode,
      opacity,
    },
    clipText: {
      position: 'absolute',
      top: 0,
      left: 0,
      fontFamily,
      fontSize,
      fontWeight,
      color: 'transparent',
      WebkitTextFillColor: 'transparent',
      backgroundImage: `url(${clipImageSrc})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      margin: 0,
      padding: 0,
      display: 'inline-block',
      width: '100%',
      height: '100%',
    }
  };
  
  return (
    <div style={{...styles.container, ...style}} className={className}>
      <span style={styles.text}>{text}</span>
      <div style={styles.clipContainer}>
        <span style={styles.clipText}>{text}</span>
      </div>
    </div>
  );
};

export default TextClipMask; 