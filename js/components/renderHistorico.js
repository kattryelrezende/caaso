// js/components/renderHistorico.js
import { historicos as historicosAPI } from '../services/api.js';
import { modalController } from './modalController.js';

export async function renderHistorico() {
    const gallery = document.getElementById('historico-gallery');
    if (!gallery) return;

    try {
        const historicos = await historicosAPI.listar();
        gallery.innerHTML = '';
        if (historicos.length === 0) {
            gallery.innerHTML = '<p class="text-center">Nenhum registro histórico encontrado.</p>';
            return;
        }
        historicos.forEach(item => {
            const div = document.createElement('div');
            div.className = 'gallery-item duotone';
            div.style.cursor = 'pointer';
            div.innerHTML = `
                <img src="${item.img || 'https://placehold.co/400x300/cccccc/666666?text=Sem+Imagem'}" alt="${item.titulo}">
                <p class="caption">${item.titulo}</p>
            `;
            div.addEventListener('click', () => {
                modalController.abrirModalHistorico(item.id);
            });
            gallery.appendChild(div);
        });

        // Configurar o modal
        modalController.initModalHistorico();
    } catch (error) {
        gallery.innerHTML = `<p class="text-center" style="color: var(--caaso-red);">Erro ao carregar histórico: ${error.message}</p>`;
    }
}