import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import './HomePage.css';

const HomePage = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <div className="home-page">
            {/* Navigation Header */}
            <Navigation />

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title">
                            Sistema de Alerta Temprana
                            <span className="gradient-text"> de Inundaciones</span>
                        </h1>
                        <p className="hero-description">
                            Protegemos vidas y comunidades con tecnología IoT de vanguardia.
                            Monitoreo en tiempo real que salva vidas y contribuye al desarrollo sostenible.
                        </p>
                        <div className="hero-buttons">
                            {isAuthenticated ? (
                                <Link to="/dashboard" className="cta-primary">
                                    Ver Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link to="/register" className="cta-primary">
                                        Comenzar Ahora
                                    </Link>
                                    <Link to="/login" className="cta-secondary">
                                        Iniciar Sesión
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="floating-card">
                            <div className="sensor-simulation">
                                <div className="water-level">
                                    <div className="water-wave"></div>
                                </div>
                                <div className="sensor-data">
                                    <span className="data-label">Nivel del Agua</span>
                                    <span className="data-value">Normal</span>
                                    <span className="data-status safe">🟢 Seguro</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features">
                <div className="container">
                    <h2 className="section-title">¿Cómo Funciona?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">📡</div>
                            <h3>Monitoreo IoT</h3>
                            <p>Sensores ESP32 con tecnología ultrasónica HC-SR04 miden el nivel del agua en tiempo real.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Alertas Instantáneas</h3>
                            <p>Notificaciones SMS automáticas a través de módulos GSM cuando se detectan niveles críticos.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🌍</div>
                            <h3>Desarrollo Sostenible</h3>
                            <p>Contribuye al ODS 11 - Ciudades y Comunidades Sostenibles de la Agenda 2030.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="impact">
                <div className="container">
                    <div className="impact-content">
                        <div className="impact-text">
                            <h2>Impacto en la Comunidad</h2>
                            <p>
                                Nuestro sistema de bajo costo y alta eficiencia fortalece la resiliencia
                                ante desastres naturales, permitiendo evacuaciones oportunas y salvando vidas.
                            </p>
                            <div className="impact-stats">
                                <div className="stat">
                                    <span className="stat-number">24/7</span>
                                    <span className="stat-label">Monitoreo Continuo</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">5s</span>
                                    <span className="stat-label">Tiempo de Respuesta</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">ODS 11</span>
                                    <span className="stat-label">Contribución Agenda 2030</span>
                                </div>
                            </div>
                        </div>
                        <div className="impact-visual">
                            <div className="globe-container">
                                <div className="globe">🌍</div>
                                <div className="orbit orbit-1">
                                    <div className="satellite">🛰️</div>
                                </div>
                                <div className="orbit orbit-2">
                                    <div className="satellite">📱</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Section */}
            <section className="technology">
                <div className="container">
                    <h2 className="section-title">Tecnología de Vanguardia</h2>
                    <div className="tech-grid">
                        <div className="tech-item">
                            <div className="tech-icon">🔧</div>
                            <h4>ESP32 Microcontrolador</h4>
                            <p>Procesamiento dual-core con conectividad Wi-Fi/Bluetooth integrada</p>
                        </div>
                        <div className="tech-item">
                            <div className="tech-icon">📏</div>
                            <h4>Sensor HC-SR04</h4>
                            <p>Medición ultrasónica precisa del nivel del agua</p>
                        </div>
                        <div className="tech-item">
                            <div className="tech-icon">📶</div>
                            <h4>Módulo SIM800L</h4>
                            <p>Comunicación GSM para alertas SMS confiables</p>
                        </div>
                        <div className="tech-item">
                            <div className="tech-icon">☁️</div>
                            <h4>Plataforma Web</h4>
                            <p>Dashboard en tiempo real con autenticación Google OAuth2</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta">
                <div className="container">
                    <div className="cta-content">
                        <h2>Únete a la Revolución de la Prevención</h2>
                        <p>Juntos construimos comunidades más resilientes y sostenibles</p>
                        {!isAuthenticated && (
                            <Link to="/register" className="cta-final">
                                Comenzar Ahora - Es Gratis
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default HomePage;
