import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAuthOperations } from '../../hooks/useAuth';
import './RegisterPage.css';

const RegisterPage = () => {
    const { isAuthenticated } = useAuth();
    const { register, loading, error, clearError } = useAuthOperations();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmPassword: '',
        telefono: '',
        tipoNotificacion: 'EMAIL',
    });
    const [validationErrors, setValidationErrors] = useState({});

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) clearError();
        if (validationErrors[name]) {
            setValidationErrors((prev) => ({
                ...prev,
                [name]: '',
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
                tipoNotificacion: formData.tipoNotificacion,
            };

            await register(userData);

            navigate('/login', {
                state: {
                    message: 'Registro exitoso. Por favor, inicia sesión con tus credenciales.',
                },
            });
        } catch (err) {
            console.error('Error al registrar:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-6">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden">
                <div className="md:flex">
                      {/* Left - form panel */}
                      <div className="md:w-1/2 bg-[#6D5EBC] text-gray-100 p-8 md:p-12">
                        <div className="mb-6 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">Sistema de Monitoreo de Inundaciones</h1>
                            <p className="text-sm text-gray-200 mt-2">Crear Nueva Cuenta</p>
                        </div>

                        {error && <div className="mb-4 text-sm text-red-300">{error}</div>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="nombre" className="text-sm font-medium text-gray-200">
                                        Nombre completo
                                    </label>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        value={formData.nombre}
                                        onChange={handleInputChange}
                                        required
                                        disabled={loading}
                                        className="mt-1 block w-full px-4 py-2 bg-[#6D5EBC] border border-gray-600 rounded-md text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base font-medium leading-relaxed"
                                        placeholder="Tu nombre completo"
                                    />
                                    {validationErrors.nombre && <span className="text-xs text-red-400">{validationErrors.nombre}</span>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="text-sm font-medium text-gray-200">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                        disabled={loading}
                                        className="mt-1 block w-full px-4 py-2 bg-[#6D5EBC] border border-gray-600 rounded-md text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base font-medium leading-relaxed"
                                        placeholder="tu@email.com"
                                    />
                                    {validationErrors.email && <span className="text-xs text-red-400">{validationErrors.email}</span>}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="telefono" className="text-sm font-medium text-gray-200">
                                        Teléfono (opcional)
                                    </label>
                                    <input
                                        type="tel"
                                        id="telefono"
                                        name="telefono"
                                        value={formData.telefono}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        className="mt-1 block w-full px-4 py-2 bg-[#6D5EBC] border border-gray-600 rounded-md text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base font-medium leading-relaxed"
                                        placeholder="+503 1234-5678"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="tipoNotificacion" className="text-sm font-medium text-gray-200">
                                        Tipo de notificación
                                    </label>
                                    <select
                                        id="tipoNotificacion"
                                        name="tipoNotificacion"
                                        value={formData.tipoNotificacion}
                                        onChange={handleInputChange}
                                        disabled={loading}
                                        className="mt-1 block w-full px-4 py-2 bg-[#6D5EBC] border border-gray-600 rounded-md text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base font-medium leading-relaxed"
                                    >
                                        <option className="bg-[#0f1724] text-white" value="EMAIL">
                                            Email
                                        </option>
                                        <option className="bg-[#0f1724] text-white" value="SMS">
                                            SMS
                                        </option>
                                        <option className="bg-[#0f1724] text-white" value="AMBOS">
                                            Ambos
                                        </option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="password" className="text-sm font-medium text-gray-200">
                                        Contraseña
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            required
                                            disabled={loading}
                                            minLength={6}
                                            className="mt-1 block w-full px-4 py-2 bg-[#6D5EBC] border border-gray-600 rounded-md text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base font-medium leading-relaxed"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
                                            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                        >
                                            {showPassword ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-11-7-11-7a17.36 17.36 0 014.375-5.625M6.5 6.5L17.5 17.5" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    <circle cx="12" cy="12" r="3" strokeWidth="2" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {validationErrors.password && <span className="text-xs text-red-400">{validationErrors.password}</span>}
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-200">
                                        Confirmar contraseña
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirm ? 'text' : 'password'}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            required
                                            disabled={loading}
                                            className="mt-1 block w-full px-4 py-2 bg-[#0f1724] border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base font-medium leading-relaxed"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirm(!showConfirm)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white"
                                            aria-label={showConfirm ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                        >
                                            {showConfirm ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-7 0-11-7-11-7a17.36 17.36 0 014.375-5.625M6.5 6.5L17.5 17.5" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l18 18" />
                                                </svg>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    <circle cx="12" cy="12" r="3" strokeWidth="2" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {validationErrors.confirmPassword && (
                                        <span className="text-xs text-red-400">{validationErrors.confirmPassword}</span>
                                    )}
                                </div>
                            </div>

                            <div className="form-actions">
                                <button
                                    type="submit"
                                    className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded-md shadow-md flex items-center justify-center gap-2 px-6"
                                    disabled={loading}
                                >
                                    {loading && (
                                        <svg
                                            className="animate-spin h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"></path>
                                        </svg>
                                    )}
                                    <span>{loading ? 'Registrando...' : 'Crear Cuenta'}</span>
                                </button>
                            </div>
                        </form>

                        <p className="text-center md:text-left text-sm text-gray-400 mt-6">
                            ¿Ya tienes cuenta? <Link to="/login" className="text-indigo-400">Inicia sesión aquí</Link>
                        </p>
                    </div>

                    {/* Right - image panel */}
                    <div
                        className="md:w-1/2 hidden md:block bg-cover bg-center"
                        style={{
                            backgroundImage: `url('https://altertecnia.com/wp-content/uploads/usos_iot_en_industria.jpg')`,
                            minHeight: '520px',
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;