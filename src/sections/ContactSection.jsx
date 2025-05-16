import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLinkedin, 
  faGithub, 
  faYoutube 
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faChevronDown, faChevronUp, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { palette } from '../utils/colors';
import RetroTextEffect from '../components/RetroTextEffect';

const ContactSection = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const emailInputRef = useRef(null);

  const toggleResumeDropdown = () => {
    setIsResumeOpen(!isResumeOpen);
    // Focus the email input when opening the dropdown
    if (!isResumeOpen) {
      setTimeout(() => {
        if (emailInputRef.current) {
          emailInputRef.current.focus();
        }
      }, 300);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setSubmitStatus({ success: false, message: 'Please enter your email address' });
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubmitStatus({ success: false, message: 'Please enter a valid email address' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Your updated Google Apps Script Web App URL
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbyVFDo7ETj7nobDlyb_-PhfaURRMMQnbaiECIfdB86bXuV63oTQ-8sknnDeFRKG2CB3ug/exec';
      
      // Create a hidden form and submit it
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = scriptUrl;
      form.target = 'hidden_iframe';
      form.style.display = 'none';
      
      // Add email as a form field - use 'email' as the parameter name
      const emailInput = document.createElement('input');
      emailInput.type = 'text';
      emailInput.name = 'email';
      emailInput.value = email;
      form.appendChild(emailInput);
      
      // Create a hidden iframe to handle the response
      const iframe = document.createElement('iframe');
      iframe.name = 'hidden_iframe';
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      
      // Add the form to the document
      document.body.appendChild(form);
      
      // Submit the form
      form.submit();
      
      // Set a timeout to assume success after 2 seconds
      setTimeout(() => {
        setSubmitStatus({ 
          success: true, 
          message: 'Thank you! I will send my resume to your email shortly.' 
        });
        
        // Clean up
        document.body.removeChild(form);
        document.body.removeChild(iframe);
        
        // Reset form after successful submission
        setTimeout(() => {
          setEmail('');
          setIsResumeOpen(false);
          setSubmitStatus(null);
        }, 3000);
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting email:', error);
      setSubmitStatus({ 
        success: false, 
        message: 'Sorry, there was an error. Please try again or email me directly.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const styles = {
    section: {
      padding: '60px 20px',
      backgroundColor: '#000',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    },
    content: {
      maxWidth: '800px',
      width: '100%',
      textAlign: 'center',
    },
    header: {
      fontSize: window.innerWidth <= 768 ? '1.75rem' : '3.5rem',
      marginBottom: '30px',
      textAlign: 'center',
      fontFamily: "'Poppins', sans-serif",
    },
    socialLinks: {
      display: 'flex',
      justifyContent: 'center',
      gap: '30px',
      marginBottom: '40px',
    },
    iconButton: {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontSize: '1.5rem',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },
    resumeButton: {
      backgroundColor: 'transparent',
      border: '2px solid #fff',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '30px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      transition: 'all 0.3s ease',
      fontFamily: "'Poppins', sans-serif",
    },
    dropdownContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: '400px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    dropdown: {
      backgroundColor: 'rgba(30, 30, 30, 0.95)',
      borderRadius: '10px',
      padding: '20px',
      marginTop: '15px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      width: '100%',
      boxSizing: 'border-box',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    inputGroup: {
      position: 'relative',
    },
    input: {
      width: '100%',
      padding: '12px 15px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '5px',
      color: '#fff',
      fontSize: '0.9rem',
      outline: 'none',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
    },
    submitButton: {
      backgroundColor: '#fff',
      color: '#000',
      border: 'none',
      padding: '12px',
      borderRadius: '5px',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      transition: 'all 0.3s ease',
    },
    statusMessage: {
      marginTop: '10px',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '0.9rem',
    },
    successMessage: {
      backgroundColor: 'rgba(0, 255, 0, 0.1)',
      border: '1px solid rgba(0, 255, 0, 0.3)',
    },
    errorMessage: {
      backgroundColor: 'rgba(255, 0, 0, 0.1)',
      border: '1px solid rgba(255, 0, 0, 0.3)',
    },
    footer: {
      marginTop: '60px',
      opacity: 0.7,
      fontSize: '0.8rem',
    },
  };

  return (
    <section id="contact" style={styles.section}>
      <div style={styles.content}>
        <div style={styles.header}>
          <RetroTextEffect>
            <h2 style={{ margin: 0, fontSize: '2rem' }}>Connect With Me</h2>
          </RetroTextEffect>
        </div>
        
        <div style={styles.socialLinks}>
          <motion.a
            href="https://www.linkedin.com/in/rafibarides/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            style={styles.iconButton}
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </motion.a>
          
          <motion.a
            href="https://github.com/Rafibarides"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            style={styles.iconButton}
          >
            <FontAwesomeIcon icon={faGithub} />
          </motion.a>
          
          <motion.a
            href="https://www.youtube.com/@RafiBarides"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            style={styles.iconButton}
          >
            <FontAwesomeIcon icon={faYoutube} />
          </motion.a>
          
          <motion.a
            href="mailto:rafibaridesstudio@gmail.com"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            style={styles.iconButton}
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </motion.a>
        </div>
        
        <div style={styles.dropdownContainer}>
          <motion.button
            style={styles.resumeButton}
            onClick={toggleResumeDropdown}
            whileHover={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              scale: 1.02
            }}
            whileTap={{ scale: 0.98 }}
          >
            Resume
            <FontAwesomeIcon icon={isResumeOpen ? faChevronUp : faChevronDown} />
          </motion.button>
          
          <AnimatePresence>
            {isResumeOpen && (
              <motion.div
                style={styles.dropdown}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <p style={{ marginBottom: '15px' }}>
                  Leave your email and I'll send you my resume right away.
                </p>
                
                <form style={styles.form} onSubmit={handleSubmit}>
                  <div style={styles.inputGroup}>
                    <input
                      ref={emailInputRef}
                      type="email"
                      name="email"
                      placeholder="Your email address"
                      style={styles.input}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    style={styles.submitButton}
                    disabled={isSubmitting}
                    whileHover={{ backgroundColor: '#f0f0f0' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? 'Sending...' : 'Request Resume'}
                    {!isSubmitting && <FontAwesomeIcon icon={faPaperPlane} />}
                  </motion.button>
                </form>
                
                {submitStatus && (
                  <motion.div
                    style={{
                      ...styles.statusMessage,
                      ...(submitStatus.success ? styles.successMessage : styles.errorMessage)
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {submitStatus.message}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <div style={styles.footer}>
          <p>© {new Date().getFullYear()} Rafi Barides. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
