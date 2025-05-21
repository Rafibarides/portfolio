import { useEffect, useRef } from 'react';

export const useIntersectionObserver = (callback, options = {}) => {
  const ref = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    const currentElement = ref.current;
    
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [callback, options]);
  
  return ref;
}; 