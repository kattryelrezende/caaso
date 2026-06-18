// js/components/renderServicos.js
import { renderList } from '../utils/renderList.js';
import { servicos as servicosAPI } from '../services/api.js';

export function renderServicos(containerId = 'servicos-container') {
    renderList(
        containerId,
        servicosAPI.listar,
        (servico) => {
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
            return div;
        },
        'Nenhum serviço cadastrado.'
    );
}