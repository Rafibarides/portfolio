import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  style = {}, 
  blurhash = null,
  priority = false,
  isLCP = false
}) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);
  
  useEffect(() => {
    if (isLCP && imgRef.current) {
      if ('LCP' in window.performance && typeof window.performance.LCP === 'function') {
        window.performance.LCP(imgRef.current);
      }
    }
  }, [isLCP]);
  
  const placeholderStyle = {
    backgroundColor: '#f0f0f0',
    width: '100%',
    height: '100%',
    ...style,
    opacity: loaded ? 0 : 1,
    position: 'absolute',
    top: 0,
    left: 0,
    transition: 'opacity 0.3s ease-in-out'
  };
  
  const imgStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: loaded ? 1 : 0,
    transition: 'opacity 0.3s ease',
  };
  
  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
  };
  
  return (
    <div style={containerStyle}>
      <div style={placeholderStyle}></div>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={imgStyle}
        onLoad={() => setLoaded(true)}
        loading={priority || isLCP ? "eager" : "lazy"}
        fetchPriority={isLCP ? "high" : (priority ? "auto" : "low")}
        decoding={isLCP ? "sync" : "async"}
      />
    </div>
  );
};

export default OptimizedImage; 