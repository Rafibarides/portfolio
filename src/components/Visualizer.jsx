import React, { useRef, useEffect, useState } from 'react';

/**
 * A simplified audio visualizer that shows a static visualization when not playing
 */
const Visualizer = ({ audioElement, isPlaying, style = {} }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  // Simple animation that doesn't require Web Audio API
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Simple simulation-based visualizer
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerY = canvas.height / 2;
      const barCount = 30;
      const barWidth = 2;
      const barSpacing = 3;
      
      if (isPlaying && audioElement) {
        // Active state - animated visualization
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        
        for (let i = 0; i < barCount; i++) {
          // Simulate audio reactive behavior with sin waves
          const time = Date.now() / 1000;
          const phase = i / 5;
          
          // Create a wave pattern based on position and time
          const heightMultiplier = 
            0.5 + Math.sin(time * 5 + phase) * 0.2 + 
            Math.sin(time * 3 + phase * 2) * 0.3 + 
            Math.sin(time * 7 + phase / 2) * 0.1;
          
          const barHeight = canvas.height * 0.6 * heightMultiplier;
          
          ctx.fillRect(
            i * (barWidth + barSpacing),
            centerY - barHeight / 2,
            barWidth,
            barHeight
          );
        }
      } else {
        // Static state - nice looking waveform pattern
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        
        for (let i = 0; i < barCount; i++) {
          // Create a gentle curve that looks like a sound wave
          const normalizedPosition = i / barCount;  // 0 to 1
          
          // Generate a gentle bell curve with slight randomness
          const heightFactor = Math.sin(normalizedPosition * Math.PI) * 0.8;
          const randomFactor = Math.random() * 0.2;
          
          // Combine for a natural-looking static wave
          const height = (heightFactor + randomFactor) * 10 + 2;
          
          ctx.fillRect(
            i * (barWidth + barSpacing), 
            centerY - height/2, 
            barWidth, 
            height
          );
        }
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, audioElement]);
  
  return (
    <canvas 
      ref={canvasRef} 
      width={150} 
      height={30}
      style={{ 
        display: 'inline-block',
        verticalAlign: 'middle',
        marginLeft: '15px',
        ...style
      }}
    />
  );
};

export default Visualizer; 