// js/components/renderLoja.js
import { renderList } from '../utils/renderList.js';
import { produtos as produtosAPI } from '../services/api.js';

let produtosData = [];

// Função interna para obter os produtos com filtros ativos no input de busca
function filtrarProdutos() {
    const inputPesquisa = document.getElementById('search-produto');
    const termo = inputPesquisa ? inputPesquisa.value.toLowerCase() : '';
    return produtosData.filter(produto =>
        produto.nome.toLowerCase().includes(termo)
    );
}

export function criarCardProduto(produto) {
    const card = document.createElement('div');
    card.className = 'card-street';
    
    // Altera dinamicamente a estética e o estado do botão caso esteja zerado
    const esgotado = produto.estoque <= 0;
    const bntHTML = esgotado
        ? `<button class="btn-primary" style="margin-top: 1rem; width: 100%; background-color: #555; border-color: #222; box-shadow: none; cursor: not-allowed; transform: none;" disabled>ESGOTADO</button>`
        : `<button class="btn-primary" style="margin-top: 1rem; width: 100%;" onclick="comprarProduto(${produto.id})">COMPRAR/RESERVAR</button>`;

    card.innerHTML = `
        <div style="width: 100%; aspect-ratio: 1 / 1; border: 4px solid var(--caaso-black); margin-bottom: 1rem; overflow: hidden; background-color: var(--caaso-white);">
            <img src="${produto.img || 'https://placehold.co/400x400/cccccc/666666?text=Sem+Imagem'}" alt="${produto.nome}" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
        </div>
        <h3>${produto.nome}</h3>
        <p style="font-size: 1.5rem; font-weight: bold; font-family: var(--font-title); color: var(--caaso-red);">R$ ${parseFloat(produto.preco).toFixed(2)}</p>
        <p style="font-weight: bold;">Estoque: ${produto.estoque} un.</p>
        ${bntHTML}
    `;
    return card;
}

export async function renderLoja(produtosParaExibir = null) {
    if (produtosParaExibir) {
        renderList(
            'loja-container',
            () => Promise.resolve(produtosParaExibir),
            (produto) => criarCardProduto(produto),
            'Nenhum produto encontrado.'
        );
        return;
    }

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

    inputPesquisa.addEventListener('input', () => {
        renderLoja(filtrarProdutos());
    });
}

// === INTERAÇÃO E CONEXÃO ASSÍNCRONA COM O BACK-END ===
export async function comprarProdutoGlobal(id) {
    try {
        const token = sessionStorage.getItem('user_token');
        if (!token) {
            alert('Acesso negado. Por favor, acesse sua conta de Sócio CAASO para comprar.');
            return;
        }

        const produtoLocal = produtosData.find(p => p.id === id);
        if (produtoLocal && produtoLocal.estoque <= 0) {
            alert('Ação inválida. Este item encontra-se esgotado no momento!');
            return;
        }

        const response = await fetch(`http://localhost:3000/api/produtos/${id}/comprar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ quantidade: 1 })
        });

        const data = await response.json();

        if (response.ok) {
            alert('Reserva efetuada com sucesso!');
            
            // Sincroniza dinamicamente o estado local do estoque na UI
            if (produtoLocal) {
                produtoLocal.estoque = data.estoque; 
            }
            // Re-renderiza respeitando filtros de busca ativos na Lojinha
            renderLoja(filtrarProdutos());
        } else {
            alert(data.erro || 'Não foi possível completar a operação de compra.');
        }
    } catch (error) {
        alert('Erro de conexão com o servidor do CAASO: ' + error.message);
    }
}

// Vincula a função ao escopo de execução global do navegador
window.comprarProduto = comprarProdutoGlobal;