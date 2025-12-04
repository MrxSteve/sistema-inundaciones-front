import React from 'react';
import './SafeStatusCard.css';

const SafeStatusCard = ({ ultimaAlertaResuelta, onRefresh, loading }) => {
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
            'MEDIO': '#fffb16ff', // amarillo/naranja
            'BAJO': '#16a34a', // verde
            // Formatos del backend
            'ALERTA_ROJA': '#dc2626',
            'ALERTA_AMARILLA': '#fffb16ff',
            'ALERTA_VERDE': '#16a34a',
            // Otros posibles formatos
            'RED': '#dc2626',
            'YELLOW': '#fffb16ff',
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
            <div className="sensor-status-card safe">
                <div className="sensor-header">
                    <h3>Estado del Sistema</h3>
                </div>
                <div className="sensor-loading">
                    <div className="loading-spinner"></div>
                    <p>Cargando estado...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="sensor-status-card safe">
            <div className="sensor-header">
                <h3>Estado del Sistema</h3>
            </div>
            
            {/* Estado normal compacto */}
            <div className="safe-status-item">
                <div className="safe-main">
                    <span className="safe-icon">✅</span>
                    <div className="safe-content">
                        <h4 className="safe-title">Sistema Normal</h4>
                        <p className="safe-description">No hay alertas activas</p>
                    </div>
                </div>
                <div className="safe-footer">
                    <span className="safe-status">Todos los sensores funcionando</span>
                </div>
            </div>

            {/* Última alerta resuelta si existe */}
            {ultimaAlertaResuelta && (
                <div className="resolved-status-item">
                    <div className="resolved-main">
                        <span className="resolved-icon">
                            {obtenerIconoTipo(ultimaAlertaResuelta.tipo)}
                        </span>
                        <div className="resolved-content">
                            <h4 
                                className="resolved-title"
                                style={{ color: obtenerColorTipo(ultimaAlertaResuelta.tipo) }}
                            >
                                Última alerta resuelta: {obtenerTextoTipo(ultimaAlertaResuelta.tipo)}
                            </h4>
                            <p className="resolved-description">
                                {ultimaAlertaResuelta.descripcion}
                            </p>
                        </div>
                    </div>
                    <div className="resolved-footer">
                        <span className="resolved-time">
                            ✅ {formatearFecha(ultimaAlertaResuelta.fechaResolucion)}
                        </span>
                        {ultimaAlertaResuelta.observaciones && (
                            <span className="resolved-badge">💬 Resuelta</span>
                        )}
                    </div>
                </div>
            )}

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

export default SafeStatusCard;