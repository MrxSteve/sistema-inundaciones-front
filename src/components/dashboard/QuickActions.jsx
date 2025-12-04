import React from 'react';
import './QuickActions.css';

const QuickActions = () => {
    const actions = [
        {
            title: 'Ver Alertas Activas',
            description: 'Monitorea las alertas de inundación en tiempo real',
            icon: '🚨',
            color: 'red',
            action: () => console.log('Ver alertas')
        },
        {
            title: 'Historial de Alertas',
            description: 'Consulta el historial de alertas resueltas',
            icon: '📊',
            color: 'blue',
            action: () => console.log('Ver historial')
        },
        {
            title: 'Configurar Notificaciones',
            description: 'Personaliza cómo recibes las notificaciones',
            icon: '🔔',
            color: 'green',
            action: () => console.log('Configurar notificaciones')
        },
        {
            title: 'Reportes del Sistema',
            description: 'Genera reportes detallados del sistema',
            icon: '📈',
            color: 'yellow',
            action: () => console.log('Ver reportes')
        },
        {
            title: 'Estado de Sensores',
            description: 'Verifica el estado de los sensores IoT',
            icon: '📡',
            color: 'purple',
            action: () => console.log('Estado sensores')
        },
        {
            title: 'Configuración',
            description: 'Ajustes generales del sistema',
            icon: '⚙️',
            color: 'gray',
            action: () => console.log('Configuración')
        }
    ];

    return (
        <div className="quick-actions">
            <h3 className="section-title">Acciones Rápidas</h3>
            <div className="actions-grid">
                {actions.map((action, index) => (
                    <button
                        key={index}
                        className={`action-card action-${action.color}`}
                        onClick={action.action}
                    >
                        <div className="action-icon">{action.icon}</div>
                        <div className="action-content">
                            <h4 className="action-title">{action.title}</h4>
                            <p className="action-description">{action.description}</p>
                        </div>
                        <div className="action-arrow">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                            </svg>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuickActions;