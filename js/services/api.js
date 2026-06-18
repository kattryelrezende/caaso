// js/services/api.js - Serviço central para chamadas HTTP
import { createApiService } from './apiFactory.js';

// ========== Configuração ==========
const API_BASE_URL = 'http://localhost:3000/api';

// Função auxiliar para obter o token do sessionStorage
function getToken() {
    return sessionStorage.getItem('admin_token') || sessionStorage.getItem('user_token');
}

// Função genérica para requisições
export async function request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        ...options,
        headers,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
        throw { status: response.status, message: data.erro || 'Erro na requisição' };
    }

    return data;
}

// ========== Serviços (gerados pela fábrica) ==========
export const produtos = createApiService('produtos');
export const pautas = createApiService('pautas');
export const conquistas = createApiService('conquistas');
export const memorias = createApiService('memorias');
export const historicos = createApiService('historicos');
export const noticias = createApiService('noticias');
export const cartas = createApiService('cartas');
export const servicos = createApiService('servicos');
export const categorias = createApiService('categorias');

// ========== Serviços especiais ==========

// Autenticação (não usa a fábrica)
export const auth = {
    login: (nusp, senha) => request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ nusp, senha }),
    }),
    register: (nome, nusp, email, senha, tipo, curso) => request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ nome, nusp, email, senha, tipo, curso }),
    }),
    perfil: () => request('/auth/perfil'),
};

// Usuários (caso especial)
export const usuarios = {
    atualizar: (id, dados) => request(`/usuarios/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados),
    }),
    alterarSenha: (id, senha_atual, nova_senha) => request(`/usuarios/${id}/senha`, {
        method: 'PUT',
        body: JSON.stringify({ senha_atual, nova_senha }),
    }),
    perfil: (id) => request(`/usuarios/${id}`),
};