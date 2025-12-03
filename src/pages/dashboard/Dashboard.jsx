import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Dashboard - Sistema de Monitoreo de Inundaciones</h1>
                <div className="user-info">
                    {user?.avatarUrl && (
                        <img
                            src={user.avatarUrl}
                            alt="Avatar"
                            className="user-avatar"
                            style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%',
                                marginRight: '10px'
                            }}
                        />
                    )}
                    <div className="user-details">
                        <span className="user-name">Hola, {user?.nombre}</span>
                        <span className="user-email">{user?.email}</span>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="logout-button"
                        style={{
                            marginLeft: '20px',
                            padding: '8px 16px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </header>

            <main className="dashboard-content" style={{ padding: '20px' }}>
                <div className="welcome-section">
                    <h2>¡Bienvenido al Sistema!</h2>
                    <p>Has iniciado sesión correctamente.</p>

                    <div className="user-info-card" style={{
                        backgroundColor: '#f8f9fa',
                        padding: '20px',
                        borderRadius: '8px',
                        marginTop: '20px'
                    }}>
                        <h3>Información del Usuario</h3>
                        <p><strong>ID:</strong> {user?.id}</p>
                        <p><strong>Nombre:</strong> {user?.nombre}</p>
                        <p><strong>Email:</strong> {user?.email}</p>
                        <p><strong>Teléfono:</strong> {user?.telefono || 'No especificado'}</p>
                        <p><strong>Roles:</strong> {user?.roles?.join(', ')}</p>
                        <p><strong>Estado:</strong> {user?.activo ? 'Activo' : 'Inactivo'}</p>
                        <p><strong>Tipo de notificación:</strong> {user?.tipoNotificacion}</p>
                        <p><strong>Fecha de registro:</strong> {
                            user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'No disponible'
                        }</p>
                    </div>
                </div>

                <div className="quick-actions" style={{ marginTop: '30px' }}>
                    <h3>Acciones Rápidas</h3>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <button style={{
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}>
                            Ver Alertas
                        </button>
                        <button style={{
                            padding: '10px 20px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}>
                            Configurar Notificaciones
                        </button>
                        <button style={{
                            padding: '10px 20px',
                            backgroundColor: '#ffc107',
                            color: 'black',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}>
                            Ver Reportes
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;