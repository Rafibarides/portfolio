import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../utils/useIntersectionObserver';
import OptimizedImage from './OptimizedImage';

const LazyScreenshot = ({ 
  src, 
  alt, 
  dimensions, 
  format,
  style = {},
  priority = false,
  onClick = null
}) => {
  const [shouldLoad, setShouldLoad] = useState(priority);
  
  // Generate a tiny placeholder if we know the format
  const placeholder = dimensions ? 
    `data:image/${format || 'png'};base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=` 
    : null;
  
  const ref = useIntersectionObserver(
    entries => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        setShouldLoad(true);
      }
    },
    { rootMargin: '200px 0px' }
  );
  
  return (
    <div 
      ref={ref} 
      style={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative',
        ...style 
      }}
    >
      {shouldLoad ? (
        <OptimizedImage
          src={src}
          alt={alt}
          width={dimensions?.width || 1200}
          height={dimensions?.height || 800}
          style={style}
          priority={priority}
          onClick={onClick}
        />
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f0f0f0',
          backgroundImage: placeholder ? `url(${placeholder})` : 'none',
          backgroundSize: 'cover',
          ...style
        }} />
      )}
    </div>
  );
};

export default LazyScreenshot; 