import React, { useState } from 'react';
import { authService } from '../../services/authService';
import './ProfileEditModal.css';

const ProfileEditModal = ({ user, isOpen, onClose, onProfileUpdate }) => {
    const [formData, setFormData] = useState({
        nombre: user?.nombre || '',
        email: user?.email || '',
        telefono: user?.telefono || '',
        tipoNotificacion: user?.tipoNotificacion || 'EMAIL'
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

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
        setSuccess('');

        try {
            const updatedUser = await authService.updateProfile(formData);
            setSuccess('Perfil actualizado exitosamente');
            onProfileUpdate(updatedUser);
            
            setTimeout(() => {
                onClose();
                setSuccess('');
            }, 1500);
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            setError(
                error.response?.data?.message ||
                'Error al actualizar el perfil. Inténtalo de nuevo.'
            );
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Editar Perfil</h2>
                    <button 
                        className="close-button"
                        onClick={onClose}
                        type="button"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="profile-form">
                    {error && (
                        <div className="alert alert-error">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                            {success}
                        </div>
                    )}

                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre Completo</label>
                            <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleInputChange}
                                required
                                disabled={loading}
                                placeholder="Ingresa tu nombre completo"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                disabled={loading}
                                placeholder="tu@email.com"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="telefono">Teléfono</label>
                            <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                value={formData.telefono}
                                onChange={handleInputChange}
                                disabled={loading}
                                placeholder="Número de teléfono (opcional)"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="tipoNotificacion">Tipo de Notificación</label>
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
                                <option value="NINGUNO">Ninguno</option>
                            </select>
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button
                            type="button"
                            onClick={onClose}
                            className="cancel-button"
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="save-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="loading-spinner"></div>
                                    Guardando...
                                </>
                            ) : (
                                'Guardar Cambios'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileEditModal;