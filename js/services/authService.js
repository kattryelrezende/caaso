// js/services/authService.js
import { auth, usuarios } from './api.js';
import { navigateTo } from '../utils/router.js';

let isLoggedIn = false;
let currentUser = null;
let currentToken = null;

// === LISTENER GLOBAL PARA LOGOUT ===
document.addEventListener('click', function(e) {
    const target = e.target;
    // Verifica se o clique foi no botão de logout (ou em um filho dele)
    if (target.id === 'logout-btn' || target.closest('#logout-btn')) {
        e.preventDefault();
        logout();
    }
});

export function initAuth() {
    const token = sessionStorage.getItem('user_token');
    const userData = sessionStorage.getItem('user_data');
    if (token && userData) {
        try {
            currentToken = token;
            currentUser = JSON.parse(userData);
            isLoggedIn = true;
        } catch (e) {
            logout();
        }
    }
}

export async function login(nusp, senha) {
    try {
        const response = await auth.login(nusp, senha);
        const { usuario, token } = response;
        sessionStorage.setItem('user_token', token);
        sessionStorage.setItem('user_data', JSON.stringify(usuario));
        currentToken = token;
        currentUser = usuario;
        isLoggedIn = true;
        atualizarPerfilUI();

        return { success: true, user: usuario };
    } catch (error) {
        return { success: false, message: error.message || 'Erro no login' };
    }
}

export async function register(nome, nusp, email, senha, curso = '') {
    try {
        const response = await auth.register(nome, nusp, email, senha, 'socio', curso);
        const { usuario, token } = response;
        sessionStorage.setItem('user_token', token);
        sessionStorage.setItem('user_data', JSON.stringify(usuario));
        currentToken = token;
        currentUser = usuario;
        isLoggedIn = true;
        atualizarPerfilUI();
        return { success: true, user: usuario };
    } catch (error) {
        return { success: false, message: error.message || 'Erro no registro' };
    }
}

export function logout() {
    sessionStorage.removeItem('user_token');
    sessionStorage.removeItem('user_data');
    sessionStorage.removeItem('admin_token');
    sessionStorage.removeItem('admin_data');
    sessionStorage.removeItem('pending_user');
    isLoggedIn = false;
    currentUser = null;
    currentToken = null;
    
    // Recarregar a página para resetar tudo
    window.location.reload();
}

export function getCurrentUser() {
    return currentUser;
}

export function isAuthenticated() {
    return isLoggedIn;
}

export function getToken() {
    return currentToken || sessionStorage.getItem('user_token');
}

export function initLoginPage() {
    // Se já estiver logado, mostra o perfil
    if (isAuthenticated() || sessionStorage.getItem('user_data')) {
        atualizarPerfilUI();
        return;
    }

    // Configurar formulário de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nusp = document.getElementById('nusp-login').value;
            const senha = document.getElementById('senha-login').value;
            const result = await login(nusp, senha);
            if (result.success) {
                atualizarPerfilUI();
            } else {
                alert(result.message);
            }
        });
    }

    // Configurar formulário de registro
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome-reg').value;
            const nusp = document.getElementById('nusp-reg').value;
            const email = document.getElementById('email-reg').value;
            const curso = document.getElementById('curso-reg').value;
            const senha = document.getElementById('senha-reg').value;
            const result = await register(nome, nusp, email, senha, curso);
            if (result.success) {
                atualizarPerfilUI();
            } else {
                alert(result.message);
            }
        });
    }

    // Alternar entre login e cadastro
    const toggleLink = document.getElementById('toggle-register');
    if (toggleLink) {
        toggleLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('login-section').classList.toggle('hidden');
            document.getElementById('register-section').classList.toggle('hidden');
        });
    }

    const toggleLoginLink = document.getElementById('toggle-login');
    if (toggleLoginLink) {
        toggleLoginLink.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('login-section').classList.toggle('hidden');
            document.getElementById('register-section').classList.toggle('hidden');
        });
    }
}

// Atualizar perfil do usuário logado
export async function atualizarPerfil(dados) {
    try {
        if (!currentUser) {
            throw new Error('Usuário não autenticado');
        }
        const response = await usuarios.atualizar(currentUser.id, dados);
        sessionStorage.setItem('user_data', JSON.stringify(response));
        currentUser = response;
        return { success: true, user: response };
    } catch (error) {
        return { success: false, message: error.message || 'Erro ao atualizar perfil' };
    }
}

// Alterar senha do usuário logado
export async function alterarSenha(senha_atual, nova_senha) {
    try {
        if (!currentUser) {
            throw new Error('Usuário não autenticado');
        }
        await usuarios.alterarSenha(currentUser.id, senha_atual, nova_senha);
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message || 'Erro ao alterar senha' };
    }
}

// Atualizar a UI da página de login (mostrar perfil)
function atualizarPerfilUI() {
    const loginSection = document.getElementById('login-section');
    const registerSection = document.getElementById('register-section');
    const perfilSection = document.getElementById('perfil-socio');
    
    if (loginSection) loginSection.classList.add('hidden');
    if (registerSection) registerSection.classList.add('hidden');
    if (perfilSection) {
        perfilSection.classList.remove('hidden');
        const user = getCurrentUser() || JSON.parse(sessionStorage.getItem('user_data') || 'null');
        if (user) {
            document.getElementById('perfil-nome').textContent = user.nome;
            document.getElementById('perfil-email').textContent = user.email || '';
            document.getElementById('perfil-curso').textContent = user.curso || '';
            document.querySelector('.socio-status').innerHTML = `SÓCIO ATIVO - ${user.nome}`;
        }
    }
}