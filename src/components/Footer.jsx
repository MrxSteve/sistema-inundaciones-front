import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">🌊</span>
              <span className="logo-text">HydroAlertSV</span>
            </div>
            <p>Tecnología IoT para la prevención de desastres naturales</p>
          </div>
          <div className="footer-section">
            <h4>Contribución</h4>
            <p>ODS 11 - Ciudades y Comunidades Sostenibles</p>
            <p>Agenda 2030 para el Desarrollo Sostenible</p>
          </div>
          <div className="footer-section">
            <h4>Tecnología</h4>
            <p>ESP32 • HC-SR04 • SIM800L</p>
            <p>React • Spring Boot • IoT</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} HydroAlertSV. Construyendo un futuro más seguro.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;