import React from 'react';
import textureGif from '../assets/texture.gif';

/**
 * RetroTextEffect - A component that applies a retro texture overlay to its children
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - The content to apply the effect to
 * @param {Object} props.style - Additional styles to apply to the container
 * @param {string} props.className - Additional CSS classes
 * @param {number} props.opacity - Opacity of the texture overlay (0-1), default: 0.7
 * @param {string} props.blendMode - CSS blend mode for the texture, default: 'multiply'
 * @returns {React.ReactElement}
 */
const RetroTextEffect = ({ 
  children, 
  style = {}, 
  className = '',
  opacity = 0.7,
  blendMode = 'multiply'
}) => {
  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    ...style
  };

  const textureStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none',
    opacity: opacity,
    mixBlendMode: blendMode,
    zIndex: 1
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 0
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={contentStyle}>
        {children}
      </div>
      <img 
        src={textureGif} 
        alt="" 
        style={textureStyle} 
        aria-hidden="true"
      />
    </div>
  );
};

export default RetroTextEffect; 