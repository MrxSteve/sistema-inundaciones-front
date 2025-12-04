import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { authService } from '../../services/authService';
import Navigation from '../../components/navbar/Navigation';
import GoogleLoginButton from '../../components/googleButton/GoogleLoginButton';
import './LoginPage.css';

const LoginPage = () => {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await authService.login(formData.email, formData.password);
            login(response);
            navigate('/dashboard');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            setError(
                error.response?.data?.message ||
                'Error al iniciar sesión. Verifica tus credenciales.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLoginSuccess = (authData) => {
        navigate('/dashboard');
    };

    const handleGoogleLoginError = (error) => {
        setError('Error al iniciar sesión con Google: ' + error.message);
    };

    return (
        <div className="login-page">
            <Navigation />
            
            <div className="login-hero">
                <div className="login-hero-content">
                    <div className="login-hero-text">
                        <h1 className="login-title">
                            Bienvenido de vuelta
                        </h1>
                        <p className="login-subtitle">
                            Accede a tu cuenta y monitorea el sistema de alertas en tiempo real
                        </p>
                    </div>
                    
                    <div className="login-form-container">
                        <div className="login-card">
                            <div className="login-card-header">
                                <h2>Iniciar Sesión</h2>
                                <p>Ingresa tus credenciales o usa Google</p>
                            </div>

                            {error && (
                                <div className="error-alert">
                                    <span className="error-icon">⚠️</span>
                                    <span>{error}</span>
                                </div>
                            )}

                            <div className="google-login-section">
                                <GoogleLoginButton
                                    onLoginSuccess={handleGoogleLoginSuccess}
                                    onLoginError={handleGoogleLoginError}
                                />

                                <div className="login-divider">
                                    <span>O continúa con email</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="login-form">
                                <div className="form-group">
                                    <label htmlFor="email">Correo Electrónico</label>
                                    <div className="input-container">
                                        <span className="input-icon">📧</span>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="tu@email.com"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Contraseña</label>
                                    <div className="input-container">
                                        <span className="input-icon">🔒</span>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="••••••••"
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="login-submit-btn"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="loading-spinner"></span>
                                            Iniciando sesión...
                                        </>
                                    ) : (
                                        <>
                                            <span>🚀</span>
                                            Iniciar Sesión
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="login-footer">
                                <p>
                                    ¿No tienes cuenta? 
                                    <Link to="/register" className="register-link">
                                        Regístrate aquí
                                    </Link>
                                </p>
                                <Link to="/" className="back-home-link">
                                    ← Volver al inicio
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;