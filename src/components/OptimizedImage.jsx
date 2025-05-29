import React, { useState, useRef, useEffect } from 'react';

const OptimizedImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  style = {}, 
  blurhash = null,
  priority = false,
  isLCP = false,
  onError = null
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef(null);
  
  useEffect(() => {
    if (isLCP && imgRef.current) {
      if ('LCP' in window.performance && typeof window.performance.LCP === 'function') {
        window.performance.LCP(imgRef.current);
      }
    }
  }, [isLCP]);

  const handleLoad = () => {
    setLoaded(true);
    setError(false);
  };

  const handleError = () => {
    setError(true);
    setLoaded(false);
    if (onError) {
      onError();
    }
    console.error('Failed to load image:', src);
  };
  
  const placeholderStyle = {
    backgroundColor: error ? '#ff4444' : '#f0f0f0',
    width: '100%',
    height: '100%',
    ...style,
    opacity: loaded ? 0 : 1,
    position: 'absolute',
    top: 0,
    left: 0,
    transition: 'opacity 0.3s ease-in-out',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: error ? 'white' : '#666',
    fontSize: '12px'
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
      <div style={placeholderStyle}>
        {error ? 'Failed to load' : 'Loading...'}
      </div>
      {!error && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          style={imgStyle}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority || isLCP ? "eager" : "lazy"}
          fetchPriority={isLCP ? "high" : (priority ? "auto" : "low")}
          decoding={isLCP ? "sync" : "async"}
        />
      )}
    </div>
  );
};

export default OptimizedImage; 