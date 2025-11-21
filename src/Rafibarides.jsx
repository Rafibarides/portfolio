import { useEffect } from 'react'

function ensureMeta(selector, attrName, content) {
  let el = document.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const key = selector.includes('[property=') ? 'property' : 'name'
    el.setAttribute(key, selector.match(/\[(?:property|name)="([^"]+)"\]/)[1])
    document.head.appendChild(el)
  }
  el.setAttribute(attrName, content)
}

export default function Rafibarides() {
  const title = 'Rafi Barides — Singer and Artist from New York'
  const description =
    'Image of Rafi Barides, a singer and artist from New York.'
  const preview = '/assets/Rafi Barides.png'
  const previewAlt =
    'Portrait of Rafi Barides, a singer and artist from New York.'

  useEffect(() => {
    document.title = title
    const url = window.location.href
    // Basic SEO
    ensureMeta('meta[name="description"]', 'content', description)
    // Open Graph
    ensureMeta('meta[property="og:title"]', 'content', title)
    ensureMeta('meta[property="og:description"]', 'content', description)
    ensureMeta('meta[property="og:type"]', 'content', 'website')
    ensureMeta('meta[property="og:url"]', 'content', url)
    ensureMeta('meta[property="og:image"]', 'content', preview)
    ensureMeta('meta[property="og:image:alt"]', 'content', previewAlt)
    // Twitter
    ensureMeta('meta[name="twitter:card"]', 'content', 'summary_large_image')
    ensureMeta('meta[name="twitter:title"]', 'content', title)
    ensureMeta('meta[name="twitter:description"]', 'content', description)
    ensureMeta('meta[name="twitter:image"]', 'content', preview)
  }, [])

  const pageStyle = {
    minHeight: '100vh',
    backgroundColor: '#000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  }

  const containerStyle = {
    width: '100%',
    maxWidth: '1200px',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '32px',
  }

  const imageStyle = {
    width: '100%',
    height: 'auto',
    display: 'block',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
    backgroundColor: '#0a0a0a',
  }

  const figureStyle = {
    margin: 0,
  }

  const captionStyle = {
    color: '#9ca3af',
    fontSize: '14px',
    marginTop: '10px',
    textAlign: 'center',
    letterSpacing: '0.02em',
  }

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <figure style={figureStyle}>
          <img
            src="/assets/Rafi Barides.png"
            alt="Portrait of Rafi Barides, a singer and artist from New York."
            style={imageStyle}
            loading="eager"
          />
          <figcaption style={captionStyle}>
            PNG — Social preview image
          </figcaption>
        </figure>
        <figure style={figureStyle}>
          <img
            src="/assets/Rafi Barides.jpg"
            alt="Portrait of Rafi Barides, a singer and artist from New York."
            style={imageStyle}
            loading="lazy"
          />
          <figcaption style={captionStyle}>JPG — High-quality photo</figcaption>
        </figure>
      </div>
    </div>
  )
}


