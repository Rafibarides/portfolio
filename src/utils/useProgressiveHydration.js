import { useEffect, useState } from 'react';

// This hook delays rendering non-critical UI until after the main content is loaded
export const useProgressiveHydration = (priority = 'low') => {
  const [shouldRender, setShouldRender] = useState(priority === 'high');
  
  useEffect(() => {
    if (priority === 'high') return;
    
    if (priority === 'medium') {
      // Render medium priority content after DOM is ready but before full load
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        setShouldRender(true);
      } else {
        document.addEventListener('DOMContentLoaded', () => setShouldRender(true));
        return () => document.removeEventListener('DOMContentLoaded', () => setShouldRender(true));
      }
    } else {
      // Low priority - wait for complete page load
      if (document.readyState === 'complete') {
        setShouldRender(true);
      } else {
        window.addEventListener('load', () => {
          // Use requestIdleCallback or setTimeout to defer even further
          if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => setShouldRender(true));
          } else {
            setTimeout(() => setShouldRender(true), 200);
          }
        });
        return () => window.removeEventListener('load', () => setShouldRender(true));
      }
    }
  }, [priority]);
  
  return shouldRender;
}; 