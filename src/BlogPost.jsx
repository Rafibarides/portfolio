import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { formatDate, getBlogUrl } from './utils/blogUtils';
import SEO from './components/SEO';
import './styles/BlogPost.css';

/**
 * Individual blog post page
 */
export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Load blog metadata from public directory
    fetch('/blogs/blogMetadata.json')
      .then(response => response.json())
      .then(blogs => {
        const foundBlog = blogs.find(b => b.slug === slug);
        
        if (!foundBlog) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setBlog(foundBlog);

        // Load markdown content from public directory
        return fetch(`/blogs/${foundBlog.markdownFile}`);
      })
      .then(response => {
        if (response) {
          return response.text();
        }
      })
      .then(text => {
        if (text) {
          setContent(text);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error loading blog:', err);
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  // Simple markdown to HTML converter
  const renderMarkdown = (markdown) => {
    let html = markdown;
    
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    
    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    
    // Links
    html = html.replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Paragraphs
    const lines = html.split('\n');
    let inParagraph = false;
    const processed = [];
    
    for (let line of lines) {
      const trimmed = line.trim();
      
      if (trimmed === '') {
        if (inParagraph) {
          processed.push('</p>');
          inParagraph = false;
        }
      } else if (trimmed.startsWith('<h')) {
        if (inParagraph) {
          processed.push('</p>');
          inParagraph = false;
        }
        processed.push(trimmed);
      } else {
        if (!inParagraph) {
          processed.push('<p>');
          inParagraph = true;
        } else {
          processed.push(' ');
        }
        processed.push(trimmed);
      }
    }
    
    if (inParagraph) {
      processed.push('</p>');
    }
    
    return processed.join('');
  };

  if (notFound) {
    return <Navigate to="/blog" replace />;
  }

  if (loading) {
    return (
      <div className="blog-post-page">
        <div className="blog-post-container">
          <div className="blog-loading">Loading...</div>
        </div>
      </div>
    );
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "description": blog.description,
    "image": blog.image,
    "datePublished": blog.date,
    "dateModified": blog.date,
    "author": {
      "@type": "Person",
      "name": blog.author,
      "url": "https://rafi-barides.com",
      "sameAs": [
        "https://github.com/rafibarides",
        "https://www.linkedin.com/in/rafibarides"
      ]
    },
    "publisher": {
      "@type": "Person",
      "name": "Rafi Barides"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": getBlogUrl(slug)
    },
    "keywords": blog.keywords.join(', ')
  };

  return (
    <div className="blog-post-page">
      <SEO
        title={`${blog.title} - Rafi Barides`}
        description={blog.description}
        canonical={getBlogUrl(slug)}
        image={blog.image}
        type="article"
        author={blog.author}
        publishedTime={blog.date}
        keywords={blog.keywords}
        structuredData={structuredData}
      />
      
      <Link to="/blog" className="back-link">← Blog</Link>
      
      <div className="blog-post-container">
        <nav className="blog-post-nav">
          <Link to="/blog" className="back-link-nav">← Back to Blog</Link>
        </nav>

        <article className="blog-post">
          <header className="blog-post-header">
            {blog.image && (
              <div className="blog-post-image">
                <img src={blog.image} alt={blog.title} />
              </div>
            )}
            <h1>{blog.title}</h1>
            {blog.subtitle && (
              <h2 className="blog-post-subtitle">{blog.subtitle}</h2>
            )}
            <div className="blog-post-meta">
              <span className="blog-post-author">By {blog.author}</span>
              <span className="blog-divider">•</span>
              <time dateTime={blog.date}>{formatDate(blog.date)}</time>
              <span className="blog-divider">•</span>
              <span className="blog-read-time">{blog.readTime}</span>
            </div>
          </header>

          <div 
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
          />
        </article>
      </div>
    </div>
  );
}

