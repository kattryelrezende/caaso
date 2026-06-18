// js/components/renderPautas.js
import { renderList } from '../utils/renderList.js';
import { pautas as pautasAPI } from '../services/api.js';

export function renderPautas() {
    renderList(
        'pautas-container',
        pautasAPI.listar,
        (pauta) => {
            const card = document.createElement('div');
            card.className = 'card-street';
            card.innerHTML = `
                <span class="status-badge">${pauta.status}</span>
                <h3>${pauta.titulo}</h3>
                <p><strong>Data:</strong> ${new Date(pauta.data).toLocaleDateString('pt-BR')}</p>
                <p>${pauta.descricao || ''}</p>
            `;
            return card;
        },
        'Nenhuma pauta cadastrada.'
    );
}