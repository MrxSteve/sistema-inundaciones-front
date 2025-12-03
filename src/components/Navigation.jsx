import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

const Navigation = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <nav className="navigation">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <span className="logo-icon">🌊</span>
                    <span className="logo-text">HydroAlertSV</span>
                </Link>
                <div className="nav-links">
                    <Link to="/" className="nav-link">Inicio</Link>
                    {isAuthenticated ? (
                        <>
                            <span className="welcome-text">Hola, {user?.nombre}</span>
                            <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="nav-link">Iniciar Sesión</Link>
                            <Link to="/register" className="nav-link register-btn">Registrarse</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;