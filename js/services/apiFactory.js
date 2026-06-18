// js/services/apiFactory.js
import { request } from './api.js';

/**
 * Cria um serviço CRUD para uma entidade
 * @param {string} endpoint - O endpoint da API (ex: 'produtos', 'pautas')
 * @param {Object} options - Opções adicionais
 * @param {string} options.singular - Nome singular para mensagens (opcional)
 * @returns {Object} - Objeto com métodos CRUD
 */
export function createApiService(endpoint, options = {}) {
    const singular = options.singular || endpoint.slice(0, -1);

    return {
        listar: () => request(`/${endpoint}`),
        buscar: (id) => request(`/${endpoint}/${id}`),
        criar: (dados) => request(`/${endpoint}`, {
            method: 'POST',
            body: JSON.stringify(dados),
        }),
        atualizar: (id, dados) => request(`/${endpoint}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(dados),
        }),
        deletar: (id) => request(`/${endpoint}/${id}`, {
            method: 'DELETE',
        }),
        // Método extra para serviços que precisam de ações específicas
        extra: (action, id, dados = {}) => request(`/${endpoint}/${id}/${action}`, {
            method: 'POST',
            body: JSON.stringify(dados),
        }),
    };
}