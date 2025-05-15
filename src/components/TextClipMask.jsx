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
  fontFamily = 'inherit',
  fontSize = 'inherit',
  fontWeight = 'normal',
  color = 'white',
  opacity = 0.4,
  blendMode = 'multiply',
  style = {},
  className = ''
}) => {
  const containerStyle = {
    position: 'relative',
    display: 'inline-block',
    ...style
  };
  
  const textStyle = {
    fontFamily,
    fontSize,
    fontWeight,
    color,
    position: 'relative',
    margin: 0,
    padding: 0,
    lineHeight: 1.2
  };
  
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${clipImageSrc})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    mixBlendMode: blendMode,
    opacity: opacity,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    zIndex: 1
  };
  
  return (
    <div style={containerStyle} className={className}>
      <h2 style={textStyle}>
        {text}
        <span style={overlayStyle}>{text}</span>
      </h2>
    </div>
  );
};

export default TextClipMask; 