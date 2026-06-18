// js/components/renderPautas.js
import { pautas as pautasAPI } from '../services/api.js';

export async function renderPautas() {
    const container = document.getElementById('pautas-container');
    if (!container) return;

    try {
        const pautas = await pautasAPI.listar();
        container.innerHTML = '';
        if (pautas.length === 0) {
            container.innerHTML = '<p class="text-center">Nenhuma pauta cadastrada.</p>';
            return;
        }
        pautas.forEach(pauta => {
            const card = document.createElement('div');
            card.className = 'card-street';
            card.innerHTML = `
                <span class="status-badge">${pauta.status}</span>
                <h3>${pauta.titulo}</h3>
                <p><strong>Data:</strong> ${new Date(pauta.data).toLocaleDateString('pt-BR')}</p>
                <p>${pauta.descricao || ''}</p>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = `<p class="text-center" style="color: var(--caaso-red);">Erro ao carregar pautas: ${error.message}</p>`;
    }
}