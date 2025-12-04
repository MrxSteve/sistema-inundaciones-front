import React from 'react';
import './AlertCard.css';

const AlertCard = ({ alertasActivas, onRefresh, loading }) => {
    const obtenerIconoTipo = (tipo) => {
        const iconos = {
            // Formatos originales
            'ALTO': '🔴',
            'MEDIO': '🟡',
            'BAJO': '🟢',
            // Formatos del backend
            'ALERTA_ROJA': '🔴',
            'ALERTA_AMARILLA': '🟡',
            'ALERTA_VERDE': '🟢',
            // Otros posibles formatos
            'RED': '🔴',
            'YELLOW': '🟡',
            'GREEN': '🟢'
        };
        return iconos[tipo] || '⚪';
    };

    const obtenerColorTipo = (tipo) => {
        const colores = {
            // Formatos originales
            'ALTO': '#dc2626', // rojo
            'MEDIO': '#d97706', // amarillo/naranja
            'BAJO': '#16a34a', // verde
            // Formatos del backend
            'ALERTA_ROJA': '#dc2626',
            'ALERTA_AMARILLA': '#d97706',
            'ALERTA_VERDE': '#16a34a',
            // Otros posibles formatos
            'RED': '#dc2626',
            'YELLOW': '#d97706',
            'GREEN': '#16a34a'
        };
        return colores[tipo] || '#6b7280'; // gris por defecto
    };

    const obtenerTextoTipo = (tipo) => {
        const textos = {
            // Formatos originales
            'ALTO': 'ALTO',
            'MEDIO': 'MEDIO', 
            'BAJO': 'BAJO',
            // Formatos del backend
            'ALERTA_ROJA': 'ALTO',
            'ALERTA_AMARILLA': 'MEDIO',
            'ALERTA_VERDE': 'BAJO',
            // Otros posibles formatos
            'RED': 'ALTO',
            'YELLOW': 'MEDIO',
            'GREEN': 'BAJO'
        };
        return textos[tipo] || tipo;
    };

    const formatearFecha = (fechaISO) => {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="sensor-status-card">
                <div className="sensor-header">
                    <h3>Estado del Sistema</h3>
                </div>
                <div className="sensor-loading">
                    <div className="loading-spinner"></div>
                    <p>Cargando alertas...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="sensor-status-card">
            <div className="sensor-header">
                <h3>Estado del Sistema</h3>
                <span className="alerts-count">{alertasActivas.length} alerta(s) activa(s)</span>
            </div>

            <div className="alerts-container">
                {alertasActivas.map((alerta) => (
                    <div
                        key={alerta.id}
                        className="alert-item"
                        style={{ borderColor: obtenerColorTipo(alerta.tipo) }}
                    >
                        <div className="alert-main">
                            <span className="alert-icon">
                                {obtenerIconoTipo(alerta.tipo)}
                            </span>
                            <div className="alert-content">
                                <h4
                                    className="alert-type"
                                    style={{ color: obtenerColorTipo(alerta.tipo) }}
                                >
                                    Nivel {obtenerTextoTipo(alerta.tipo)}
                                </h4>
                                <p className="alert-description">{alerta.descripcion}</p>
                                {alerta.ubicacion && (
                                    <p className="alert-location">📍 {alerta.ubicacion}</p>
                                )}
                            </div>
                        </div>

                        <div className="alert-footer">
                            <span className="alert-time">
                                🕒 {formatearFecha(alerta.fechaCreacion)}
                            </span>
                            <span
                                className="alert-level"
                                style={{
                                    backgroundColor: obtenerColorTipo(alerta.tipo),
                                    color: 'white'
                                }}
                            >
                                {obtenerTextoTipo(alerta.tipo)}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="sensor-footer">
                <button
                    className="refresh-button"
                    onClick={onRefresh}
                >
                    🔄 Actualizar
                </button>
            </div>
        </div>
    );
};

export default AlertCard;