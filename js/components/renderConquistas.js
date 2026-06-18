// js/components/renderConquistas.js
import { renderList } from '../utils/renderList.js';
import { conquistas as conquistasAPI } from '../services/api.js';

export function renderConquistas() {
    renderList(
        'conquistas-container',
        conquistasAPI.listar,
        (item) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3 style="color: var(--caaso-red);">
                    ${item.ano || ''} 
                    ${item.data ? `- ${new Date(item.data).toLocaleDateString('pt-BR')}` : ''}
                    - ${item.titulo}
                </h3>
                <p>${item.descricao || ''}</p>
            `;
            return li;
        },
        'Nenhuma conquista cadastrada.'
    );
}