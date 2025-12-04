import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import ProfileCard from '../../components/dashboard/ProfileCard';
import ProfileEditModal from '../../components/dashboard/ProfileEditModal';
import QuickActions from '../../components/dashboard/QuickActions';
import SensorStatus from '../../components/alertCards/SensorStatus';
import { authService } from '../../services/authService';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout, login } = useAuth();
    const [showProfileModal, setShowProfileModal] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const handleLogout = () => {
        logout();
    };

    const handleProfileClick = () => {
        setShowProfile(!showProfile);
    };

    const handleEditProfile = () => {
        setShowProfileModal(true);
    };

    const handleProfileUpdate = (updatedUser) => {
        // Actualizar el contexto de autenticación con los nuevos datos
        login(updatedUser);
    };

    return (
        <div className="modern-dashboard">
            <DashboardHeader 
                user={user}
                onLogout={handleLogout}
                onProfileClick={handleProfileClick}
            />
            
            <main className="dashboard-main">
                <div className="dashboard-container">
                    <div className="dashboard-welcome">
                        <h1 className="welcome-title">
                            ¡Bienvenido de vuelta, <span className="user-highlight">{user?.nombre}</span>! 👋
                        </h1>
                        <p className="welcome-subtitle">
                            Monitorea el estado del sistema de alertas de inundación en tiempo real
                        </p>
                    </div>

                    <div className="dashboard-grid">
                        {/* Sensor Status - Alertas en tiempo real */}
                        <div className="grid-section full-width">
                            <div className="section-header">
                                <h2 className="section-title">Estado del Sistema</h2>
                                <p className="section-subtitle">Monitoreo en tiempo real de alertas de inundación</p>
                            </div>
                            <SensorStatus />
                        </div>

                        {/* Profile Card - Solo se muestra cuando showProfile es true */}
                        {showProfile && (
                            <div className="grid-section full-width">
                                <div className="section-header">
                                    <h2 className="section-title">Mi Perfil</h2>
                                    <p className="section-subtitle">Información de tu cuenta y configuración</p>
                                </div>
                                <ProfileCard 
                                    user={user} 
                                    onEditProfile={handleEditProfile}
                                />
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="grid-section full-width">
                            <QuickActions />
                        </div>
                    </div>
                </div>
            </main>

            {/* Profile Edit Modal */}
            <ProfileEditModal 
                user={user}
                isOpen={showProfileModal}
                onClose={() => setShowProfileModal(false)}
                onProfileUpdate={handleProfileUpdate}
            />
        </div>
    );
};

export default Dashboard;