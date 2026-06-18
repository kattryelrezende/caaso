// js/components/renderLoja.js
import { renderList } from '../utils/renderList.js';
import { produtos as produtosAPI } from '../services/api.js';

let produtosData = [];

export async function renderLoja(produtosParaExibir = null) {
    if (produtosParaExibir) {
        // Renderização filtrada (já temos os dados)
        renderList(
            'loja-container',
            () => Promise.resolve(produtosParaExibir),
            (produto) => {
                const card = document.createElement('div');
                card.className = 'card-street';
                card.innerHTML = `
                    <div style="width: 100%; aspect-ratio: 1 / 1; border: 4px solid var(--caaso-black); margin-bottom: 1rem; overflow: hidden; background-color: var(--caaso-white);">
                        <img src="${produto.img || 'https://placehold.co/400x400/cccccc/666666?text=Sem+Imagem'}" alt="${produto.nome}" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                    </div>
                    <h3>${produto.nome}</h3>
                    <p style="font-size: 1.5rem; font-weight: bold; font-family: var(--font-title); color: var(--caaso-red);">R$ ${parseFloat(produto.preco).toFixed(2)}</p>
                    <p style="font-weight: bold;">Estoque: ${produto.estoque} un.</p>
                    <button class="btn-primary" style="margin-top: 1rem; width: 100%;" onclick="comprarProduto(${produto.id})">COMPRAR/RESERVAR</button>
                `;
                return card;
            },
            'Nenhum produto encontrado.'
        );
        return;
    }

    // Carregar dados da API
    try {
        const data = await produtosAPI.listar();
        produtosData = data;
        renderLoja(produtosData);
    } catch (error) {
        const container = document.getElementById('loja-container');
        if (container) {
            container.innerHTML = `<p class="text-center" style="color: var(--caaso-red);">Erro ao carregar produtos: ${error.message}</p>`;
        }
    }
}

export function configurarPesquisa() {
    const inputPesquisa = document.getElementById('search-produto');
    if (!inputPesquisa) return;

    inputPesquisa.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase();
        const produtosFiltrados = produtosData.filter(produto =>
            produto.nome.toLowerCase().includes(termo)
        );
        renderLoja(produtosFiltrados);
    });
}