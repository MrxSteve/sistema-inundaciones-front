import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAuthOperations } from '../hooks/useAuth';
import './RegisterPage.css';

const RegisterPage = () => {
    const { isAuthenticated } = useAuth();
    const { register, loading, error, clearError } = useAuthOperations();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: '',
        telefono: '',
        tipoNotificacion: 'EMAIL'
    });
    const [validationErrors, setValidationErrors] = useState({});

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (error) clearError();
        if (validationErrors[name]) {
            setValidationErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.nombre.trim()) {
            errors.nombre = 'El nombre es requerido';
        }

        if (!formData.email.trim()) {
            errors.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.email = 'El email no es válido';
        }

        if (!formData.password) {
            errors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            errors.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = 'Las contraseñas no coinciden';
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const userData = {
                nombre: formData.nombre,
                email: formData.email,
                password: formData.password,
                telefono: formData.telefono || null,
                tipoNotificacion: formData.tipoNotificacion
            };

            await register(userData);

            navigate('/login', {
                state: {
                    message: 'Registro exitoso. Por favor, inicia sesión con tus credenciales.'
                }
            });
        } catch (error) {
            console.error('Error al registrar:', error);
        }
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="register-header">
                    <h1>Sistema de Monitoreo de Inundaciones</h1>
                    <p>Crear Nueva Cuenta</p>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre completo:</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            required
                            placeholder="Tu nombre completo"
                            disabled={loading}
                        />
                        {validationErrors.nombre && (
                            <span className="field-error">{validationErrors.nombre}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
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
                        {validationErrors.email && (
                            <span className="field-error">{validationErrors.email}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono (opcional):</label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            placeholder="+503 1234-5678"
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="tipoNotificacion">Tipo de notificación:</label>
                        <select
                            id="tipoNotificacion"
                            name="tipoNotificacion"
                            value={formData.tipoNotificacion}
                            onChange={handleInputChange}
                            disabled={loading}
                        >
                            <option value="EMAIL">Email</option>
                            <option value="SMS">SMS</option>
                            <option value="AMBOS">Ambos</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            placeholder="••••••••"
                            disabled={loading}
                            minLength={6}
                        />
                        {validationErrors.password && (
                            <span className="field-error">{validationErrors.password}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar contraseña:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            required
                            placeholder="••••••••"
                            disabled={loading}
                        />
                        {validationErrors.confirmPassword && (
                            <span className="field-error">{validationErrors.confirmPassword}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >
                        {loading ? 'Registrando...' : 'Crear Cuenta'}
                    </button>
                </form>

                <div className="login-link">
                    <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;