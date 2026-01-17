import { useEffect } from 'react';

/**
 * SEO Component for managing meta tags and structured data
 */
export default function SEO({ 
  title, 
  description, 
  canonical, 
  image, 
  type = 'website',
  author,
  publishedTime,
  keywords = [],
  structuredData 
}) {
  useEffect(() => {
    // Set title
    if (title) {
      document.title = title;
    }

    // Create or update meta tags
    const updateMetaTag = (property, content) => {
      if (!content) return;
      
      let element = document.querySelector(`meta[property="${property}"]`) ||
                   document.querySelector(`meta[name="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('article:')) {
          element.setAttribute('property', property);
        } else {
          element.setAttribute('name', property);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description);
    if (keywords.length > 0) {
      updateMetaTag('keywords', keywords.join(', '));
    }

    // Open Graph tags
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:type', type);
    updateMetaTag('og:url', canonical);
    updateMetaTag('og:site_name', 'Rafi Barides');
    if (image) {
      updateMetaTag('og:image', image);
      updateMetaTag('og:image:secure_url', image);
      updateMetaTag('og:image:type', 'image/png');
      updateMetaTag('og:image:alt', title || 'Rafi Barides');
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    if (image) {
      updateMetaTag('twitter:image', image);
    }

    // Article specific tags
    if (type === 'article') {
      if (author) {
        updateMetaTag('article:author', author);
      }
      if (publishedTime) {
        updateMetaTag('article:published_time', publishedTime);
      }
    }

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink && canonical) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    if (canonicalLink && canonical) {
      canonicalLink.setAttribute('href', canonical);
    }

    // Structured data (JSON-LD)
    if (structuredData) {
      let scriptTag = document.getElementById('structured-data');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'structured-data';
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function
    return () => {
      // Reset title to default when component unmounts
      document.title = 'Rafi Barides - Portfolio';
    };
  }, [title, description, canonical, image, type, author, publishedTime, keywords, structuredData]);

  return null; // This component doesn't render anything
}

