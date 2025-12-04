import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ user, onEditProfile }) => {
    return (
        <div className="profile-card">
            <div className="profile-header">
                <div className="profile-avatar-section">
                    {user?.avatarUrl ? (
                        <img
                            src={user.avatarUrl}
                            alt="Avatar"
                            className="profile-avatar-large"
                        />
                    ) : (
                        <div className="profile-avatar-large-placeholder">
                            {user?.nombre?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                    )}
                    <div className="profile-status">
                        <span className={`status-indicator ${user?.activo ? 'active' : 'inactive'}`}></span>
                        {user?.activo ? 'Activo' : 'Inactivo'}
                    </div>
                </div>
                
                <div className="profile-basic-info">
                    <h3 className="profile-name">{user?.nombre || 'Usuario'}</h3>
                    <p className="profile-email">{user?.email}</p>
                    <div className="profile-roles">
                        {user?.roles?.map((role, index) => (
                            <span key={index} className="role-badge">{role}</span>
                        ))}
                    </div>
                </div>
                
                <button 
                    onClick={onEditProfile}
                    className="edit-profile-button"
                >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                    Editar Perfil
                </button>
            </div>
            
            <div className="profile-details">
                <div className="detail-group">
                    <h4>Información Personal</h4>
                    <div className="detail-item">
                        <span className="detail-label">ID de Usuario:</span>
                        <span className="detail-value">{user?.id}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Teléfono:</span>
                        <span className="detail-value">{user?.telefono || 'No especificado'}</span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Fecha de registro:</span>
                        <span className="detail-value">
                            {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            }) : 'No disponible'}
                        </span>
                    </div>
                </div>
                
                <div className="detail-group">
                    <h4>Configuración</h4>
                    <div className="detail-item">
                        <span className="detail-label">Tipo de notificación:</span>
                        <span className="detail-value notification-type">
                            {user?.tipoNotificacion || 'No configurado'}
                        </span>
                    </div>
                    <div className="detail-item">
                        <span className="detail-label">Estado de cuenta:</span>
                        <span className={`detail-value status-text ${user?.activo ? 'active' : 'inactive'}`}>
                            {user?.activo ? 'Cuenta Activa' : 'Cuenta Inactiva'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;