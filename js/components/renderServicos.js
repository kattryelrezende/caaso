// js/components/renderServicos.js
import { servicos as servicosAPI } from '../services/api.js';

export async function renderServicos(containerId = 'servicos-container') {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
        const servicos = await servicosAPI.listar();
        container.innerHTML = '';
        if (servicos.length === 0) {
            container.innerHTML = '<p class="text-center" style="grid-column: 1/-1;">Nenhum serviço cadastrado.</p>';
            return;
        }
        servicos.forEach(servico => {
            const div = document.createElement('div');
            div.className = 'service-block card-street';
            if (servico.ativo === false) {
                div.style.opacity = '0.5';
                div.style.filter = 'grayscale(1)';
            }
            div.innerHTML = `
                <img class="minerva-icon" src="${servico.icone}" alt="${servico.titulo}">
                <h3>${servico.titulo}</h3>
                <p>${servico.descricao}</p>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        container.innerHTML = `<p class="text-center" style="color: var(--caaso-red);">Erro ao carregar serviços: ${error.message}</p>`;
    }
}