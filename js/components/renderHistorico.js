// js/components/renderHistorico.js
import { renderList } from '../utils/renderList.js';
import { historicos as historicosAPI } from '../services/api.js';
import { modalController } from './modalController.js';

export async function renderHistorico() {
    // Primeiro carregar os dados para ordenar
    try {
        const historicos = await historicosAPI.listar();
        historicos.sort((a, b) => new Date(b.data || 0) - new Date(a.data || 0));

        renderList(
            'historico-gallery',
            () => Promise.resolve(historicos),
            (item) => {
                const div = document.createElement('div');
                div.className = 'gallery-item duotone';
                div.style.cursor = 'pointer';
                const imgSrc = item.img || `https://placehold.co/400x300/cccccc/666666?text=${encodeURIComponent(item.titulo)}`;
                div.innerHTML = `
                    <img src="${imgSrc}" alt="${item.titulo}">
                    <p class="caption">${item.titulo}</p>
                `;
                div.addEventListener('click', () => {
                    modalController.abrirModalHistorico(item.id);
                });
                return div;
            },
            'Nenhum registro histórico encontrado.'
        );
        modalController.initModalHistorico();
    } catch (error) {
        const gallery = document.getElementById('historico-gallery');
        if (gallery) {
            gallery.innerHTML = `<p class="text-center" style="color: var(--caaso-red);">Erro ao carregar histórico: ${error.message}</p>`;
        }
    }
}