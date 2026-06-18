// js/components/renderNoticias.js
import { renderList } from '../utils/renderList.js';
import { noticias as noticiasAPI } from '../services/api.js';

export function renderNoticias(containerId = 'noticias-container', limit = null) {
    let fetchFn = noticiasAPI.listar;
    if (limit) {
        fetchFn = async () => {
            const all = await noticiasAPI.listar();
            return all.slice(0, limit);
        };
    }

    renderList(
        containerId,
        fetchFn,
        (noticia) => {
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
            return article;
        },
        'Nenhuma notícia cadastrada.'
    );
}