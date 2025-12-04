import React, { useState, useEffect } from 'react';
import { alertaService } from '../../services/alertaService';
import AlertCard from './AlertCard';
import SafeStatusCard from './SafeStatusCard';
import './SensorStatus.css';

const SensorStatus = () => {
    const [alertasActivas, setAlertasActivas] = useState([]);
    const [ultimaAlertaResuelta, setUltimaAlertaResuelta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargarAlertasActivas = async () => {
        try {
            setLoading(true);
            const response = await alertaService.obtenerAlertasActivas();
            console.log('Alertas activas recibidas:', response); // Debug
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

    const cargarDatos = async () => {
        await cargarAlertasActivas();
        await cargarUltimaAlertaResuelta();
    };

    useEffect(() => {
        cargarDatos();
        
        // Actualizar cada 30 segundos
        const interval = setInterval(cargarDatos, 30000);
        return () => clearInterval(interval);
    }, []);

    const handleRefresh = () => {
        cargarDatos();
    };

    // Si hay error de conexión
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
                        onClick={handleRefresh}
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    // Si hay alertas activas, mostrar AlertCard
    if (alertasActivas.length > 0) {
        return (
            <AlertCard 
                alertasActivas={alertasActivas}
                onRefresh={handleRefresh}
                loading={loading}
            />
        );
    }

    // Si no hay alertas activas, mostrar SafeStatusCard
    return (
        <SafeStatusCard 
            ultimaAlertaResuelta={ultimaAlertaResuelta}
            onRefresh={handleRefresh}
            loading={loading}
        />
    );
};

export default SensorStatus;