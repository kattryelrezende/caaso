// js/components/renderForum.js
import { renderList } from '../utils/renderList.js';
import { modalController } from './modalController.js';
import { getCurrentUser } from '../services/authService.js';

export async function renderForum() {
    await carregarTopicos();

    modalController.initModalTopico();

    const user = getCurrentUser();
    const areaNovo = document.getElementById('area-novo-topico');
    const avisoLogin = document.getElementById('aviso-login-forum');
    if (user) {
        if (areaNovo) areaNovo.style.display = 'block';
        if (avisoLogin) avisoLogin.style.display = 'none';
    } else {
        if (areaNovo) areaNovo.style.display = 'none';
        if (avisoLogin) avisoLogin.style.display = 'block';
    }

    window.publicarNovoTopico = publicarNovoTopico;
    window.curtirTopico = curtirTopico;
    window.carregarTopicosForum = carregarTopicos;
}

async function carregarTopicos() {
    try {
        const { topicos: topicosAPI } = await import('../services/api.js');
        let topicos = await topicosAPI.listar();

        topicos.sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em));

        renderList(
            'lista-topicos-forum',
            () => Promise.resolve(topicos),
            (topico) => {
                const div = document.createElement('div');
                div.className = 'card-street';
                div.style.cursor = 'pointer';

                const user = getCurrentUser();
                const autorNome = topico.autor?.nome || 'Anônimo';
                const qtdComentarios = topico.comentarios?.length || 0;
                const dataFormatada = new Date(topico.criado_em).toLocaleDateString('pt-BR');
                const isTrancado = topico.status === 'trancado';
                const statusBadge = isTrancado ? ' <span style="color:var(--caaso-red);">🔒 Trancado</span>' : '';

                // Define ícones: 💛 curtido, 🖤 não curtido
                const usuarioCurtiu = user ? topico.usuarioCurtiu : false;
                const likeIcon = usuarioCurtiu ? '💛' : '🖤';

                div.innerHTML = `
                    <h3>${topico.titulo} ${statusBadge}</h3>
                    <p>${topico.conteudo.substring(0, 150)}${topico.conteudo.length > 150 ? '...' : ''}</p>
                    <div style="display:flex; gap:1rem; font-size:0.9rem; color:#666; margin-top:0.5rem; flex-wrap:wrap; align-items:center;">
                        <span>👤 ${autorNome}</span>
                        ${user ? `<button class="btn-like ${usuarioCurtiu ? 'liked' : ''}" onclick="event.stopPropagation(); curtirTopico(${topico.id})">${likeIcon} ${topico.curtidas}</button>` : `<span>💛 ${topico.curtidas}</span>`}
                        <span>💬 ${qtdComentarios}</span>
                        <span>📅 ${dataFormatada}</span>
                    </div>
                `;

                div.addEventListener('click', (e) => {
                    if (e.target.closest('.btn-like')) return;
                    modalController.abrirModalTopico(topico.id);
                });

                return div;
            },
            'Nenhum tópico encontrado. Seja o primeiro a criar uma discussão!'
        );
    } catch (error) {
        const lista = document.getElementById('lista-topicos-forum');
        if (lista) {
            lista.innerHTML = `<p class="text-center" style="color: var(--caaso-red);">Erro ao carregar tópicos: ${error.message}</p>`;
        }
        console.error('Erro em carregarTopicos:', error);
    }
}

async function publicarNovoTopico() {
    const titulo = document.getElementById('forum-titulo').value.trim();
    const conteudo = document.getElementById('forum-conteudo').value.trim();

    if (!titulo || !conteudo) {
        alert('Preencha título e conteúdo.');
        return;
    }

    const user = getCurrentUser();
    if (!user) {
        alert('Faça login para publicar.');
        return;
    }

    try {
        const { topicos: topicosAPI } = await import('../services/api.js');
        await topicosAPI.criar({ titulo, conteudo });

        document.getElementById('forum-titulo').value = '';
        document.getElementById('forum-conteudo').value = '';

        await carregarTopicos();
        alert('Tópico publicado com sucesso!');
    } catch (error) {
        alert('Erro ao publicar: ' + error.message);
    }
}

async function curtirTopico(id) {
    const user = getCurrentUser();
    if (!user) { alert('Faça login para curtir.'); return; }

    try {
        const { topicos: topicosAPI } = await import('../services/api.js');
        await topicosAPI.curtir(id);
        await carregarTopicos();
        const modal = document.getElementById('modal-topico');
        if (modal && !modal.classList.contains('hidden')) {
            const topicoId = modal.dataset.topicoId;
            if (topicoId) {
                await modalController.abrirModalTopico(topicoId);
            }
        }
    } catch (error) {
        alert('Erro ao curtir: ' + error.message);
    }
}