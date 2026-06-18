// js/components/renderConquistas.js
import { conquistas as conquistasAPI } from '../services/api.js';

export async function renderConquistas() {
    const container = document.getElementById('conquistas-container');
    if (!container) return;

    try {
        const conquistas = await conquistasAPI.listar();
        container.innerHTML = '';
        if (conquistas.length === 0) {
            container.innerHTML = '<p class="text-center">Nenhuma conquista cadastrada.</p>';
            return;
        }
        conquistas.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3 style="color: var(--caaso-red);">${item.ano || ''} - ${item.titulo}</h3>
                <p>${item.descricao || ''}</p>
            `;
            container.appendChild(li);
        });
    } catch (error) {
        container.innerHTML = `<p class="text-center" style="color: var(--caaso-red);">Erro ao carregar conquistas: ${error.message}</p>`;
    }
}