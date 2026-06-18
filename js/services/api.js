// js/services/api.js - Serviço central para chamadas HTTP
const API_BASE_URL = 'http://localhost:3000/api';

// Função auxiliar para obter o token do sessionStorage
function getToken() {
    return sessionStorage.getItem('admin_token') || sessionStorage.getItem('user_token');
}

// Função genérica para requisições
async function request(endpoint, options = {}) {
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

// ========== Autenticação ==========
export const auth = {
    login: (nusp, senha) => request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ nusp, senha }),
    }),
    register: (nome, nusp, senha, tipo = 'socio') => request('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ nome, nusp, senha, tipo }),
    }),
    perfil: () => request('/auth/perfil'),
};

// ========== Categorias ==========
export const categorias = {
    listar: () => request('/categorias'),
    criar: (nome) => request('/categorias', {
        method: 'POST',
        body: JSON.stringify({ nome }),
    }),
};

// ========== Produtos ==========
export const produtos = {
    listar: () => request('/produtos'),
    buscar: (id) => request(`/produtos/${id}`),
    criar: (dados) => request('/produtos', {
        method: 'POST',
        body: JSON.stringify(dados),
    }),
    atualizar: (id, dados) => request(`/produtos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados),
    }),
    deletar: (id) => request(`/produtos/${id}`, {
        method: 'DELETE',
    }),
};

// ========== Pautas ==========
export const pautas = {
    listar: () => request('/pautas'),
    buscar: (id) => request(`/pautas/${id}`),
    criar: (dados) => request('/pautas', {
        method: 'POST',
        body: JSON.stringify(dados),
    }),
    atualizar: (id, dados) => request(`/pautas/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados),
    }),
    deletar: (id) => request(`/pautas/${id}`, {
        method: 'DELETE',
    }),
};

// ========== Conquistas ==========
export const conquistas = {
    listar: () => request('/conquistas'),
    buscar: (id) => request(`/conquistas/${id}`),
    criar: (dados) => request('/conquistas', {
        method: 'POST',
        body: JSON.stringify(dados),
    }),
    atualizar: (id, dados) => request(`/conquistas/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados),
    }),
    deletar: (id) => request(`/conquistas/${id}`, {
        method: 'DELETE',
    }),
};

// ========== Memórias ==========
export const memorias = {
    listar: () => request('/memorias'),
    buscar: (id) => request(`/memorias/${id}`),
    criar: (dados) => request('/memorias', {
        method: 'POST',
        body: JSON.stringify(dados),
    }),
    atualizar: (id, dados) => request(`/memorias/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados),
    }),
    deletar: (id) => request(`/memorias/${id}`, {
        method: 'DELETE',
    }),
};

// ========== Históricos ==========
export const historicos = {
    listar: () => request('/historicos'),
    buscar: (id) => request(`/historicos/${id}`),
    criar: (dados) => request('/historicos', {
        method: 'POST',
        body: JSON.stringify(dados),
    }),
    atualizar: (id, dados) => request(`/historicos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados),
    }),
    deletar: (id) => request(`/historicos/${id}`, {
        method: 'DELETE',
    }),
};

// ========== Notícias ==========
export const noticias = {
    listar: () => request('/noticias'),
    buscar: (id) => request(`/noticias/${id}`),
    criar: (dados) => request('/noticias', {
        method: 'POST',
        body: JSON.stringify(dados),
    }),
    atualizar: (id, dados) => request(`/noticias/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados),
    }),
    deletar: (id) => request(`/noticias/${id}`, {
        method: 'DELETE',
    }),
};

// ========== Cartas ==========
export const cartas = {
    listar: () => request('/cartas'),
    buscar: (id) => request(`/cartas/${id}`),
    criar: (dados) => request('/cartas', {
        method: 'POST',
        body: JSON.stringify(dados),
    }),
    atualizar: (id, dados) => request(`/cartas/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados),
    }),
    deletar: (id) => request(`/cartas/${id}`, {
        method: 'DELETE',
    }),
};

// ========== Usuários ==========
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

// ========== Serviços ==========
export const servicos = {
    listar: () => request('/servicos'),
    buscar: (id) => request(`/servicos/${id}`),
    criar: (dados) => request('/servicos', {
        method: 'POST',
        body: JSON.stringify(dados),
    }),
    atualizar: (id, dados) => request(`/servicos/${id}`, {
        method: 'PUT',
        body: JSON.stringify(dados),
    }),
    deletar: (id) => request(`/servicos/${id}`, {
        method: 'DELETE',
    }),
};