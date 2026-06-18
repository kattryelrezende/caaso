// js/utils/renderList.js
/**
 * Utilitário para renderizar listas de forma consistente
 * @param {string} containerId - ID do container onde os itens serão inseridos
 * @param {Function} fetchFn - Função que retorna uma Promise com os dados (ex: produtos.listar)
 * @param {Function} renderItem - Função que recebe um item e retorna um elemento DOM
 * @param {string} emptyMessage - Mensagem exibida quando a lista está vazia
 * @param {Object} options - Opções adicionais
 * @param {boolean} options.silent - Se true, não exibe erros (apenas console)
 */
export async function renderList(
    containerId,
    fetchFn,
    renderItem,
    emptyMessage = 'Nenhum item encontrado.',
    options = { silent: false }
) {
    const container = document.getElementById(containerId);
    if (!container) {
        if (!options.silent) console.warn(`Container #${containerId} não encontrado.`);
        return;
    }

    try {
        const data = await fetchFn();
        container.innerHTML = '';

        if (!data || data.length === 0) {
            container.innerHTML = `<p class="text-center" style="grid-column: 1/-1;">${emptyMessage}</p>`;
            return;
        }

        data.forEach(item => {
            const element = renderItem(item);
            if (element) container.appendChild(element);
        });
    } catch (error) {
        const errorMsg = error.message || 'Erro ao carregar dados';
        if (!options.silent) console.error('Erro em renderList:', error);
        container.innerHTML = `
            <p class="text-center" style="color: var(--caaso-red); grid-column: 1/-1;">
                ⚠️ ${errorMsg}
            </p>
        `;
    }
}