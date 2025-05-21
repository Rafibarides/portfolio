import React, { useState } from 'react';

const LazyYouTubeEmbed = ({ videoId, title, style = {} }) => {
  const [loadVideo, setLoadVideo] = useState(false);
  
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
  
  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    ...style
  };
  
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  };
  
  const playButtonStyle = {
    width: '68px',
    height: '48px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const triangleStyle = {
    width: 0,
    height: 0,
    borderTop: '12px solid transparent',
    borderBottom: '12px solid transparent',
    borderLeft: '20px solid white',
    marginLeft: '5px',
  };
  
  const handleClick = () => {
    setLoadVideo(true);
  };
  
  return (
    <div style={containerStyle}>
      {!loadVideo ? (
        <>
          <img 
            src={thumbnailUrl}
            alt={`Thumbnail for ${title}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
          <div style={overlayStyle} onClick={handleClick}>
            <div style={playButtonStyle}>
              <div style={triangleStyle}></div>
            </div>
          </div>
        </>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`}
          title={title}
          style={{ width: '100%', height: '100%', border: 'none' }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
};

export default LazyYouTubeEmbed; 