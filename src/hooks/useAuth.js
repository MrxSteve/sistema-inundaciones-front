import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';

export const useAuthOperations = () => {
    const { user, login, logout, updateUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginWithEmail = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.login(email, password);
            login(response);
            return response;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al iniciar sesión';
            setError(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const loginWithGoogle = async (googleToken) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.loginWithGoogle(googleToken);
            login(response);
            return response;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al iniciar sesión con Google';
            setError(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.register(userData);
            return response;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al registrar usuario';
            setError(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.getProfile();
            updateUser(response);
            return response;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al obtener perfil';
            setError(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateProfile = async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await authService.updateProfile(userData);
            updateUser(response);
            return response;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al actualizar perfil';
            setError(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logoutUser = async () => {
        setLoading(true);
        setError(null);
        try {
            await authService.logout();
            logout();
        } catch (error) {
            logout();
            console.warn('Error al cerrar sesión en el servidor, pero se limpió el estado local');
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => {
        setError(null);
    };

    return {
        user,
        loading,
        error,
        loginWithEmail,
        loginWithGoogle,
        register,
        getProfile,
        updateProfile,
        logoutUser,
        clearError
    };
};