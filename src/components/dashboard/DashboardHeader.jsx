import React from 'react';
import './DashboardHeader.css';

const DashboardHeader = ({ user, onLogout, onProfileClick }) => {
    return (
        <header className="dashboard-header">
            <div className="header-content">
                <div className="header-left">
                    <h1 className="dashboard-title">
                        <span className="icon">🌊</span>
                        Sistema de Monitoreo
                    </h1>
                    <p className="dashboard-subtitle">Panel de Control</p>
                </div>
                
                <div className="header-right">
                    <div className="user-profile" onClick={onProfileClick}>
                        {user?.avatarUrl ? (
                            <img
                                src={user.avatarUrl}
                                alt="Avatar"
                                className="user-avatar"
                            />
                        ) : (
                            <div className="user-avatar-placeholder">
                                {user?.nombre?.charAt(0)?.toUpperCase() || 'U'}
                            </div>
                        )}
                        <div className="user-info">
                            <span className="user-name">{user?.nombre || 'Usuario'}</span>
                            <span className="user-role">{user?.roles?.[0] || 'Usuario'}</span>
                        </div>
                        <svg className="chevron-icon" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </div>
                    
                    <button 
                        onClick={onLogout}
                        className="logout-button"
                        title="Cerrar Sesión"
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H4v16h10v-2h2v2a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2h10z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;