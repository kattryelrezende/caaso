// js/app.js
import { router, navigateTo } from './utils/router.js';
import { toggleMenu } from './utils/domHelpers.js';
import { initAuth, atualizarPerfil, alterarSenha, getCurrentUser } from './services/authService.js';

window.toggleMenu = toggleMenu;

document.addEventListener('DOMContentLoaded', () => {
    router.init();
    initAuth();
});

// js/app.js (trecho do pageLoaded)
window.addEventListener('pageLoaded', (event) => {
    const page = event.detail.page;

    if (page === 'home') {
        import('./components/renderMemoria.js').then(module => {
            module.renderMemoria();
        });
        import('./components/renderNoticias.js').then(module => {
            module.renderNoticias('noticias-home', 3); // container específico, limite 3
        });
        import('./components/renderServicos.js').then(module => { // NOVO
            module.renderServicos('servicos-container');
        });
    } else if (page === 'pautas') {
        import('./components/renderPautas.js').then(module => {
            module.renderPautas();
        });
    } else if (page === 'forum') {
        import('./components/renderForum.js').then(module => {
            module.renderForum();
        });
    } else if (page === 'loja') {
        import('./components/renderLoja.js').then(module => {
            module.renderLoja();
            module.configurarPesquisa();
        });
    } else if (page === 'conquistas') {
        import('./components/renderConquistas.js').then(module => {
            module.renderConquistas();
        });
    } else if (page === 'historico') {
        import('./components/renderHistorico.js').then(module => {
            module.renderHistorico();
        });
    } else if (page === 'login') {
        import('./services/authService.js').then(module => {
            module.initLoginPage();
            const user = module.getCurrentUser();
            if (user) {
                document.getElementById('perfil-nome').textContent = user.nome;
                document.getElementById('perfil-email').textContent = user.email || '';
                document.getElementById('perfil-curso').textContent = user.curso || '';
            }
        });
    } else if (page === 'pagamento') {
        import('./services/authService.js').then(async (module) => {
            const pending = sessionStorage.getItem('pending_user');
            if (pending) {
                const data = JSON.parse(pending);
                document.getElementById('pagamento-nome').textContent = data.nome;
                document.getElementById('pagamento-nusp').textContent = data.nusp;
                document.getElementById('pagamento-email').textContent = data.email || '';
            } else {
                navigateTo('login');
                return;
            }
            const btnPagar = document.getElementById('btn-pagar');
            if (btnPagar) {
                btnPagar.addEventListener('click', async () => {
                    const result = await module.confirmPayment();
                    if (result.success) {
                        alert('Pagamento confirmado! Bem-vindo ao CAASO!');
                        navigateTo('login');
                        setTimeout(() => window.location.reload(), 100);
                    } else {
                        alert('Erro ao confirmar pagamento: ' + result.message);
                    }
                });
            }
        });
    } else if (page === 'noticias') {
        import('./components/renderNoticias.js').then(module => {
            module.renderNoticias('noticias-container'); // sem limite
        });
    }
});

window.abrirEditarPerfil = function() {
    // Buscar dados do usuário da sessão (garantia)
    let user = getCurrentUser();

    if (!user) {
        const userData = sessionStorage.getItem('user_data');
        if (userData) {
            try {
                user = JSON.parse(userData);
            } catch (e) {
                console.error('Erro ao parsear user_data', e);
            }
        }
    }
    if (!user) {
        alert('Usuário não autenticado.');
        return;
    }

    // Preencher os campos do modal
    document.getElementById('edit-nome').value = user.nome || '';
    document.getElementById('edit-email').value = user.email || '';
    document.getElementById('edit-curso').value = user.curso || '';
    document.getElementById('edit-senha-atual').value = '';
    document.getElementById('edit-nova-senha').value = '';
    document.getElementById('edit-confirma-senha').value = '';

    // Abrir o modal
    document.getElementById('modal-editar-perfil').classList.remove('hidden');
};

window.tornarSocio = function() {
    alert('Mock: Você agora é um sócio CAASO! (Benefícios liberados)');
    // Pode atualizar o status na UI
    document.getElementById('perfil-status').textContent = 'SÓCIO';
};

window.assinarNotificacoes = function() {
    alert('Mock: Você receberá notícias por e-mail!');
};

window.fecharModalPerfil = function() {
    document.getElementById('modal-editar-perfil').classList.add('hidden');
};

// Submissão do formulário de edição
document.addEventListener('submit', async function(e) {
    if (e.target.id === 'editar-perfil-form') {
        e.preventDefault();
        const nome = document.getElementById('edit-nome').value;
        const email = document.getElementById('edit-email').value;
        const curso = document.getElementById('edit-curso').value;
        const senhaAtual = document.getElementById('edit-senha-atual').value;
        const novaSenha = document.getElementById('edit-nova-senha').value;
        const confirmarSenha = document.getElementById('edit-confirma-senha').value;

        // Validar
        if (!nome || !email) {
            alert('Nome e e-mail são obrigatórios.');
            return;
        }
        if (novaSenha && novaSenha.length < 6) {
            alert('A nova senha deve ter pelo menos 6 caracteres.');
            return;
        }
        if (novaSenha && novaSenha !== confirmarSenha) {
            alert('As senhas não coincidem.');
            return;
        }

        try {
            const resultPerfil = await atualizarPerfil({ nome, email, curso });
            if (!resultPerfil.success) {
                alert('Erro ao atualizar perfil: ' + resultPerfil.message);
                return;
            }

            if (novaSenha) {
                if (!senhaAtual) {
                    alert('Para alterar a senha, informe a senha atual.');
                    return;
                }
                const resultSenha = await alterarSenha(senhaAtual, novaSenha);
                if (!resultSenha.success) {
                    alert('Erro ao alterar senha: ' + resultSenha.message);
                    return;
                }
            }

            alert('Perfil atualizado com sucesso!');
            window.fecharModalPerfil();
            const user = getCurrentUser();
            if (user) {
                document.getElementById('perfil-nome').textContent = user.nome;
                document.getElementById('perfil-email').textContent = user.email || '';
                document.getElementById('perfil-curso').textContent = user.curso || '';
            }
        } catch (error) {
            alert('Erro inesperado: ' + error.message);
        }
    }
});

window.comprarProduto = async function(id) {
    try {
        const token = sessionStorage.getItem('user_token');
        if (!token) {
            alert('Faça login para comprar.');
            return;
        }
        const response = await fetch(`http://localhost:3000/api/produtos/${id}/comprar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ quantidade: 1 })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Compra realizada! Estoque restante: ' + data.estoque);
            // Recarregar a lista de produtos
            renderLoja();
        } else {
            alert(data.erro || 'Erro ao comprar');
        }
    } catch (error) {
        alert('Erro na requisição: ' + error.message);
    }
};