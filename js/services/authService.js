// js/services/authService.js
import { auth, usuarios } from './api.js';
import { navigateTo } from '../utils/router.js';

let isLoggedIn = false;
let currentUser = null;
let currentToken = null;

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
        return { success: true, user: usuario };
    } catch (error) {
        return { success: false, message: error.message || 'Erro no login' };
    }
}

export async function register(nome, nusp, email, senha, curso = '', tipo = 'socio') {
    try {
        const pendingData = { nome, nusp, email, senha, curso, tipo };
        sessionStorage.setItem('pending_user', JSON.stringify(pendingData));
        navigateTo('pagamento');
        return { success: true, redirect: true };
    } catch (error) {
        return { success: false, message: error.message || 'Erro no registro' };
    }
}

export async function confirmPayment() {
    try {
        const pendingData = sessionStorage.getItem('pending_user');
        if (!pendingData) {
            throw new Error('Nenhum cadastro pendente.');
        }
        const { nome, nusp, email, senha, curso, tipo } = JSON.parse(pendingData);
        const response = await auth.register(nome, nusp, email, senha, tipo, curso);
        const { usuario, token } = response;
        sessionStorage.removeItem('pending_user');
        sessionStorage.setItem('user_token', token);
        sessionStorage.setItem('user_data', JSON.stringify(usuario));
        currentToken = token;
        currentUser = usuario;
        isLoggedIn = true;
        return { success: true, user: usuario };
    } catch (error) {
        return { success: false, message: error.message || 'Erro ao ativar cadastro' };
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
    // Redirecionar para login se estiver na página de perfil
    const currentPage = window.location.hash.slice(1) || 'home';
    if (currentPage === 'login') {
        window.location.reload();
    } else {
        navigateTo('login');
    }
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
    // Verificar se já está logado
    const userData = sessionStorage.getItem('user_data');
    if (userData) {
        try {
            const user = JSON.parse(userData);
            document.getElementById('login-section').classList.add('hidden');
            document.getElementById('perfil-socio').classList.remove('hidden');
            document.querySelector('.socio-status').innerHTML = `SÓCIO ATIVO - ${user.nome}`;
            // Configurar logout
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                const newBtn = logoutBtn.cloneNode(true);
                logoutBtn.parentNode.replaceChild(newBtn, logoutBtn);
                newBtn.addEventListener('click', () => {
                    logout();
                });
            }
            return; // Não configurar os forms de login/cadastro
        } catch (e) {}
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nusp = document.getElementById('nusp-login').value;
            const senha = document.getElementById('senha-login').value;
            const result = await login(nusp, senha);
            if (result.success) {
                document.getElementById('login-section').classList.add('hidden');
                document.getElementById('perfil-socio').classList.remove('hidden');
                document.querySelector('.socio-status').innerHTML = `SÓCIO ATIVO - ${result.user.nome}`;
                // Reconfigurar botão logout
                const logoutBtn = document.getElementById('logout-btn');
                if (logoutBtn) {
                    const newBtn = logoutBtn.cloneNode(true);
                    logoutBtn.parentNode.replaceChild(newBtn, logoutBtn);
                    newBtn.addEventListener('click', () => {
                        logout();
                    });
                }
            } else {
                alert(result.message);
            }
        });
    }

    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const nome = document.getElementById('nome-reg').value;
            const nusp = document.getElementById('nusp-reg').value;
            const senha = document.getElementById('senha-reg').value;
            const result = await register(nome, nusp, senha);
            if (result.success && result.redirect) {
                // Redirecionamento já feito
            } else if (!result.success) {
                alert(result.message);
            }
        });
    }

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
        // Atualizar dados na sessão
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