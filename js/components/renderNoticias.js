// js/components/renderNoticias.js
import { noticias as noticiasAPI } from '../services/api.js';

export async function renderNoticias(containerId = 'noticias-container', limit = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
        const noticias = await noticiasAPI.listar();
        const lista = limit ? noticias.slice(0, limit) : noticias;
        container.innerHTML = '';
        if (lista.length === 0) {
            container.innerHTML = '<p class="text-center" style="grid-column: 1/-1;">Nenhuma notícia cadastrada.</p>';
            return;
        }
        lista.forEach(noticia => {
            const article = document.createElement('article');
            article.className = `lambe-poster ${noticia.urgente ? 'poster-1' : 'poster-2'}`;
            article.innerHTML = `
                ${noticia.urgente ? '<span class="status-badge">URGENTE</span>' : ''}
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descricao || ''}</p>
                <p style="font-size: 0.8rem; margin-top: 1rem; opacity: 0.7;">
                    ${new Date(noticia.criado_em).toLocaleDateString('pt-BR')}
                </p>
            `;
            container.appendChild(article);
        });
    } catch (error) {
        container.innerHTML = `<p class="text-center" style="color: var(--caaso-red);">Erro ao carregar notícias: ${error.message}</p>`;
    }
}