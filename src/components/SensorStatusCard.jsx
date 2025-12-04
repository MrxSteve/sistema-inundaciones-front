import React, { useState, useEffect } from 'react';
import { alertaService } from '../services/alertaService';
import './SensorStatusCard.css';

const SensorStatusCard = () => {
    const [alertasActivas, setAlertasActivas] = useState([]);
    const [ultimaAlertaResuelta, setUltimaAlertaResuelta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargarAlertasActivas = async () => {
        try {
            setLoading(true);
            const response = await alertaService.obtenerAlertasActivas();
            setAlertasActivas(response);
            setError(null);
        } catch (err) {
            console.error('Error al cargar alertas activas:', err);
            setError('No se pudieron cargar las alertas');
            setAlertasActivas([]);
        } finally {
            setLoading(false);
        }
    };

    const cargarUltimaAlertaResuelta = async () => {
        try {
            const response = await alertaService.obtenerAlertasResueltas();
            if (response && response.length > 0) {
                // Ordenar por fecha de resolución más reciente
                const alertasOrdenadas = response.sort((a, b) => 
                    new Date(b.fechaResolucion) - new Date(a.fechaResolucion)
                );
                setUltimaAlertaResuelta(alertasOrdenadas[0]);
            }
        } catch (err) {
            console.error('Error al cargar última alerta resuelta:', err);
            setUltimaAlertaResuelta(null);
        }
    };

    useEffect(() => {
        const cargarDatos = async () => {
            await cargarAlertasActivas();
            await cargarUltimaAlertaResuelta();
        };
        
        cargarDatos();

        // Actualizar cada 30 segundos
        const interval = setInterval(cargarDatos, 30000);
        return () => clearInterval(interval);
    }, []);

    const obtenerIconoTipo = (tipo) => {
        const iconos = {
            'ALTO': '🔴',
            'MEDIO': '🟡',
            'BAJO': '🟢'
        };
        return iconos[tipo] || '⚪';
    };

    const obtenerColorTipo = (tipo) => {
        const colores = {
            'ALTO': '#dc2626', // text-red-600
            'MEDIO': '#d97706', // text-amber-600
            'BAJO': '#16a34a' // text-green-600
        };
        return colores[tipo] || '#6b7280'; // text-gray-500
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

    if (error) {
        return (
            <div className="sensor-status-card">
                <div className="sensor-header">
                    <h3>Estado del Sistema</h3>
                </div>
                <div className="sensor-error">
                    <span className="error-icon">⚠️</span>
                    <p>Error de conexión</p>
                    <button
                        className="retry-button"
                        onClick={() => {
                            cargarAlertasActivas();
                            cargarUltimaAlertaResuelta();
                        }}
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    if (alertasActivas.length === 0) {
        return (
            <div className="sensor-status-card">
                <div className="sensor-header">
                    <h3>Estado del Sistema</h3>
                </div>
                <div className="sensor-normal">
                    <span className="status-icon">✅</span>
                    <h4>Sistema Normal</h4>
                    <p>No hay alertas activas</p>
                    <div className="status-details">
                        <span>Todos los sensores funcionando correctamente</span>
                    </div>
                    
                    {/* Mostrar última alerta resuelta si existe */}
                    {ultimaAlertaResuelta && (
                        <div className="last-resolved-alert">
                            <h5>Última Alerta Resuelta</h5>
                            <div className="resolved-alert-info">
                                <span className="resolved-icon">
                                    {obtenerIconoTipo(ultimaAlertaResuelta.tipo)}
                                </span>
                                <div className="resolved-content">
                                    <p className="resolved-description">
                                        {ultimaAlertaResuelta.descripcion}
                                    </p>
                                    <p className="resolved-time">
                                        🕒 Resuelta: {formatearFecha(ultimaAlertaResuelta.fechaResolucion)}
                                    </p>
                                    {ultimaAlertaResuelta.observaciones && (
                                        <p className="resolved-observations">
                                            💬 {ultimaAlertaResuelta.observaciones}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
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
                                    Nivel {alerta.tipo}
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
                                {alerta.tipo}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="sensor-footer">
                <button
                    className="refresh-button"
                    onClick={() => {
                        cargarAlertasActivas();
                        cargarUltimaAlertaResuelta();
                    }}
                >
                    🔄 Actualizar
                </button>
            </div>
        </div>
    );
};

export default SensorStatusCard;