import api from './api';

export const alertaService = {
    // Crear alerta manual (solo admin)
    crearAlerta: async (alertaData) => {
        const response = await api.post('/alertas', alertaData);
        return response.data;
    },

    // Obtener todas las alertas con paginación
    obtenerAlertas: async (page = 0, size = 10) => {
        const response = await api.get(`/alertas/public/todas?page=${page}&size=${size}`);
        return response.data;
    },

    // Obtener alertas por tipo con paginación
    obtenerAlertasPorTipo: async (tipo, page = 0, size = 10) => {
        const response = await api.get(`/alertas/public/tipo/${tipo}?page=${page}&size=${size}`);
        return response.data;
    },

    // Obtener alertas activas
    obtenerAlertasActivas: async () => {
        const response = await api.get('/alertas/public/activas');
        return response.data;
    },

    // Obtener alertas resueltas
    obtenerAlertasResueltas: async () => {
        const response = await api.get('/alertas/public/resueltas');
        return response.data;
    },

    // Obtener alerta por ID
    obtenerAlertaPorId: async (id) => {
        const response = await api.get(`/alertas/public/${id}`);
        return response.data;
    },

    // Resolver alerta (solo admin)
    resolverAlerta: async (id, observaciones) => {
        const response = await api.put(`/alertas/${id}/resolver`, {
            observaciones: observaciones || 'Situación resuelta por administrador'
        });
        return response.data;
    }
};