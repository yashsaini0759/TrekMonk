import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About: React.FC = () => {
  return (
    <motion.div 
      className="about-page" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      {/* 1. HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>
        <div className="container about-hero-content text-center">
          <h1 className="about-hero-title">About TrekMonk</h1>
          <p className="about-hero-subtitle">
            Connecting people with unforgettable trekking experiences across India.
          </p>
        </div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="about-intro">
        <div className="container container-narrow text-center">
          <p className="intro-text">
            TrekMonk is your ultimate platform for treks and trips. We focus on safety,
            experience, and bringing you closer to nature. Our mission is to help you
            discover the hidden gems of India, one step at a time.
          </p>
        </div>
      </section>

      {/* 3. TEAM SECTION */}
      <section className="about-team">
        <div className="container">
          <h2 className="text-center section-title">Meet Our Team</h2>
          <div className="team-grid">
            {[
              { name: 'Aditi Verma', role: 'Team Lead', id: '23042428', course: 'BCA E1, 6th Sem', email: 'vermaaditi593@gmail.com', initials: 'AV' },
              { name: 'Aditi Sharma', role: 'Team Member', id: '23042545', course: 'BCA E1, 6th Sem', email: 'aditisharmaa252@gmail.com', initials: 'AS' },
              { name: 'Preeti Joshi', role: 'Team Member', id: '23042488', course: 'BCA E1, 6th Sem', email: 'joshipreeti281@gmail.com', initials: 'PJ' }
            ].map((member, index) => (
              <div className="team-card" key={index}>
                <div className="team-avatar">{member.initials}</div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <div className="team-details">
                  <p><strong>ID:</strong> {member.id}</p>
                  <p><strong>Course:</strong> {member.course}</p>
                  <p className="team-email">{member.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 5. CLOSING SECTION */}
      <section className="about-closing">
        <div className="container text-center">
          <p className="closing-text">Built with passion to make trekking accessible and memorable.</p>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
