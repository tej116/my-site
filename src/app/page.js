"use client";
import { useEffect, useRef, useState } from 'react';
import Typed from 'typed.js';

export default function Home() {
  const typedTarget = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // --- NEW: MONGODB FORM LOGIC ---
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setFormData({ name: '', email: '', message: '' }); // Clear form
        setStatus('✅ Message sent successfully!');
      } else {
        setStatus(`❌ Error: ${result.error || 'Failed to send'}`);
      }
    } catch (error) {
      setStatus('❌ Network error. Please try again.');
    }
  };
  // -------------------------------

  useEffect(() => {
    const typed = new Typed(typedTarget.current, {
      strings: ["Full Stack Developer", "React Specialist", "Java Developer"],
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 1500,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  return (
    <>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
      
      <header className="header">
        <a href="#" className="logo">TEJAS<span>MORE</span></a>
        <div className='menu-icon' onClick={() => setMenuOpen(!menuOpen)}>
          <i className={menuOpen ? 'bx bx-x' : 'bx bx-menu'}></i>
        </div>
        <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#project" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#achievements" onClick={() => setMenuOpen(false)}>Achievements</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="home" id="home">
        <div className="home-content">
          <h3>Hello, It's Me</h3>
          <h1>Tejas <span>More</span></h1>
          <h3>I'm a <span ref={typedTarget} style={{color: 'var(--main-color)'}}></span></h3>
          <p>
            Specialized in building high-performance, real-time industrial applications. 
            I bridge the gap between complex backend logic and seamless user interfaces.
          </p>

          <div className="social-icons">
            <a href="https://www.linkedin.com/in/tejas-more-a59165281/" target="_blank"><i className='bx bxl-linkedin'></i></a>
            <a href="https://github.com/tej116" target="_blank"><i className='bx bxl-github'></i></a>
            <a href="https://leetcode.com/u/TejaMore/" target="_blank"><i className='bx bx-code-alt'></i></a>
            <a href="https://www.instagram.com/tej_asmore007/" target="_blank"><i className='bx bxl-instagram' ></i></a>
          </div>

          <div className="home-scl">
            <a href="https://www.linkedin.com/in/tejas-more-a59165281/" target="_blank" className="btn-box linkedin-main-btn">
               View LinkedIn
            </a>
            <a href="/resume.pdf" download="Tejas_More_Resume.pdf" className="btn-box resume-btn">
               Download CV
            </a>
          </div>
        </div>

        <div className="home-img-container">
            <div className="glowing-circle">
                <img src="/tejas.jpeg" alt="Tejas More" className="profile-img" />
            </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="project" className="section-padding">
        <h2 className="sub-title">Real-Time <span>Industrial Projects</span></h2>
        <div className="card-grid">
          <ProjectCard badge="Industry" icon="bx-plus-medical" title="JSW OHC" desc="Real-time medical monitoring for JSW using React.js and API integration." />
          <ProjectCard badge="College" icon="bx-calendar-event" title="Event Management" desc="Platform for large-scale coordination and automated notifications." />
          <ProjectCard badge="Industrial" icon="bx-package" title="Inventory Track" desc="Professional-grade supply chain tracking and analytics reports." />
        </div>
      </section>

      {/* ACHIEVEMENTS SECTION */}
      <section id="achievements" className="section-padding" style={{background: 'var(--second-bg-color)'}}>
        <h2 className="sub-title">Key <span>Achievements</span></h2>
        <div className="achievements-container">
          <AchievementCard 
            img="/Achievement1.jpg" 
            title="3rd Place - Sync & Solve" 
            desc="Secured 3rd place in the Technical Symposium PORT’25 at Sona College of Technology."
          />
          <AchievementCard 
            img="/Learnathon.png" 
            title="Learnathon 2024" 
            desc="Successfully completed 8 professional certifications in AI, Cloud, and Data Analytics."
          />
        </div>
      </section>

      {/* SKILLS & TOOLS SECTION */}
      <section id="skills" className="section-padding">
        <h2 className="sub-title">My <span>Technical Toolkit</span></h2>
        <div className="skills-wrapper">
          <div className="skill-category">
            <h3>Technical Skills</h3>
            <div className="skill-tags">
              <span>Core Java & Java(8)</span><span>C</span><span>HTML</span><span>CSS</span>
              <span>JavaScript</span><span>React.js</span><span>Bootstrap</span><span>Next.js</span><span>MySQL</span>
            </div>
          </div>
          <div className="skill-category">
            <h3>Tools</h3>
            <div className="skill-tags tools">
              <span><i className='bx bxl-git'></i> Git</span>
              <span><i className='bx bxl-github'></i> GitHub</span>
              <span><i className='bx bxl-visual-studio'></i> VS Code</span>
              <span><i className='bx bx-chip'></i> Tinkercad</span>
            </div>
          </div>
          <div className="skill-category">
            <h3>Spoken Languages</h3>
            <div className="language-list">
              <div className="lang-item">Marathi <span>Native</span></div>
              <div className="lang-item">Tamil <span>Fluent</span></div>
              <div className="lang-item">Hindi <span>Professional</span></div>
              <div className="lang-item">Sourashtra <span>Fluent</span></div>
              <div className="lang-item">English <span>Professional</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section-padding">
        <h2 className="sub-title">Contact <span>Me</span></h2>
        <div className="contact-container">
          <div className="contact-info">
            <div className="contact-card">
              <i className='bx bxs-envelope'></i>
              <p>mor.tejas5595@gmail.com</p>
            </div>
            <div className="contact-card">
              <i className='bx bxs-phone'></i>
              <p>+91 9025883408</p>
            </div>
            <div className="contact-card">
              <i className='bx bxl-linkedin-square'></i>
              <p>linkedin.com/in/tejasmore02072005</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="input-group">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required 
                />
            </div>
            <textarea 
              placeholder="Your Message" 
              rows="6" 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              required
            ></textarea>
            <button type="submit" className="btn-box">Send Message</button>
            {status && <p style={{marginTop: '15px', color: 'var(--main-color)', fontWeight: 'bold'}}>{status}</p>}
          </form>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 Tejas Tanaji More | Computer Science Engineering</p>
      </footer>
    </>
  );
}

// Sub-components
function ProjectCard({ icon, title, desc, badge }) {
  return (
    <div className="card project-card">
      <span className="project-badge">{badge}</span>
      <i className={`bx ${icon}`}></i>
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>
  );
}

function AchievementCard({ img, title, desc }) {
    return (
      <div className="achievement-card">
        <div className="ach-img">
          <img src={img} alt={title} />
        </div>
        <div className="ach-content">
          <h3>{title}</h3>
          <p>{desc}</p>
        </div>
      </div>
    );
}