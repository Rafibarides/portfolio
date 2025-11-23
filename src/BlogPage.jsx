import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { formatDate } from './utils/blogUtils';
import SEO from './components/SEO';
import './styles/BlogPage.css';

/**
 * Blog listing page - shows all blog posts
 */
export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load blog metadata from public directory
    fetch('/blogs/blogMetadata.json')
      .then(response => response.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading blog metadata:', err);
        setLoading(false);
      });
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Rafi Barides Blog",
    "description": "Personal blog by Rafi Barides covering music, technology, life experiences, and creative journey",
    "url": "https://rafi-barides.com/blog",
    "author": {
      "@type": "Person",
      "name": "Rafi Barides",
      "url": "https://rafi-barides.com",
      "sameAs": [
        "https://github.com/rafibarides",
        "https://www.linkedin.com/in/rafibarides"
      ]
    },
    "blogPost": blogs.map(blog => ({
      "@type": "BlogPosting",
      "headline": blog.title,
      "url": `https://rafi-barides.com/blog/${blog.slug}`,
      "datePublished": blog.date,
      "author": {
        "@type": "Person",
        "name": blog.author
      },
      "image": blog.image
    }))
  };

  return (
    <div className="blog-page">
      <SEO
        title="Blog - Rafi Barides"
        description="Personal blog by Rafi Barides covering music, singing, technology, personal growth, and creative journey. Read about vocal transformation, music production, and life experiences."
        canonical="https://rafi-barides.com/blog"
        type="website"
        structuredData={structuredData}
        keywords={["Rafi Barides blog", "music blog", "vocal training blog", "personal growth", "music production"]}
      />
      
      <Link to="/" className="back-link">← Portfolio</Link>
      
      <div className="blog-container">
        <header className="blog-header">
          <h1>Blog</h1>
          <p className="blog-subtitle">Thoughts on music, technology, and life</p>
        </header>

        {loading ? (
          <div className="blog-loading">Loading posts...</div>
        ) : (
          <div className="blog-grid">
            {blogs.map((blog) => (
              <Link 
                to={`/blog/${blog.slug}`} 
                key={blog.slug} 
                className="blog-card"
              >
                {blog.image && (
                  <div className="blog-card-image">
                    <img src={blog.image} alt={blog.title} loading="lazy" />
                  </div>
                )}
                <div className="blog-card-content">
                  <h2>{blog.title}</h2>
                  {blog.subtitle && (
                    <p className="blog-card-subtitle">{blog.subtitle}</p>
                  )}
                  <div className="blog-card-meta">
                    <span className="blog-date">{formatDate(blog.date)}</span>
                    <span className="blog-divider">•</span>
                    <span className="blog-read-time">{blog.readTime}</span>
                  </div>
                  {blog.description && (
                    <p className="blog-card-description">{blog.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

