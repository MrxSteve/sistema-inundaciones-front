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
    const [showPassword, setShowPassword] = useState(false);
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

    const handleGoogleLoginSuccess = () => {
        navigate('/dashboard');
    };

    const handleGoogleLoginError = (error) => {
        setError('Error al iniciar sesión con Google: ' + error.message);
    };

    return (
        <>

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#5B3DB6] to-[#3A0764] p-6 pt-24">
                <div className="w-full max-w-5xl overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="md:flex">
                    {/* Left - form panel */}
                    <div className="md:w-1/2 p-8 md:p-12 flex justify-center">
                        <div className="w-full max-w-md bg-slate-900/80 border border-white/5 rounded-2xl p-6 md:p-10 shadow-xl">
                            {error && (
                                <div className="mb-4 rounded-lg bg-red-900/30 border border-red-700/30 text-red-200 p-3 flex items-start gap-3">
                                    <span className="text-xl">⚠️</span>
                                    <div className="text-sm">{error}</div>
                                </div>
                            )}

                            <div className="mb-6">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="text-2xl">🌊</span>
                                    <span className="text-white font-semibold">HydroAlertSV</span>
                                </div>
                                <h2 className="text-white text-2xl font-bold mb-1">Bienvenido de vuelta</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                        <div className="w-full">
                                            <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">Correo electrónico</label>
                                            <div>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    placeholder="name@company.com"
                                                    disabled={loading}
                                                    className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                                                />
                                            </div>
                                        </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">Contraseña</label>
                                        <div className="relative w-full">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="••••••••"
                                                disabled={loading}
                                                className="w-full pr-10 bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80"
                                            >
                                                {showPassword ? '👁️‍🗨️' : '👁️'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 text-white/80 text-sm"><input type="checkbox" className="accent-indigo-500"/> Recuérdame</label>
                                    <Link to="#" className="text-indigo-300 text-sm font-medium">¿Olvidaste tu contraseña?</Link>
                                </div> */}

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md shadow-md flex items-center justify-center gap-3"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className="loading-spinner"></span>
                                                Iniciando sesión...
                                            </>
                                        ) : (
                                            <>
                                                <span>🔐</span>
                                                Iniciar sesión
                                            </>
                                        )}
                                    </button>
                                </div>

                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-full max-w-xs">
                                        <GoogleLoginButton
                                            onLoginSuccess={handleGoogleLoginSuccess}
                                            onLoginError={handleGoogleLoginError}
                                        />
                                    </div>
                                </div>

                                <p className="text-center text-white/70 text-sm mt-2">¿No tienes cuenta? <Link to="/register" className="text-indigo-300 font-medium">Regístrate.</Link></p>
                            </form>
                        </div>
                    </div>

                    {/* Right - logo panel (replaces image) */}
                    <div className="md:w-1/2 hidden md:flex items-center justify-center bg-cover bg-center">
                        <div className="text-center">
                            <span className="logo-icon text-[56px] block">🌊</span>
                            <span className="logo-text block text-2xl font-bold text-white mt-4">HydroAlertSV</span>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;