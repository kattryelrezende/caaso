// js/components/renderMemoria.js
import { memorias as memoriasAPI } from '../services/api.js';

let memoriaData = [];

export async function renderMemoria() {
    const select = document.getElementById('foto-select');
    const img = document.getElementById('memoria-img');
    const titulo = document.getElementById('memoria-titulo');
    const desc = document.getElementById('memoria-desc');

    if (!select || !img || !titulo || !desc) return;

    try {
        memoriaData = await memoriasAPI.listar();
        if (memoriaData.length === 0) {
            img.style.display = 'none';
            titulo.innerText = 'Nenhum registro';
            desc.innerText = 'Cadastre memórias no painel admin.';
            return;
        }

        select.innerHTML = '';
        memoriaData.forEach((item, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = item.titulo;
            select.appendChild(option);
        });

        function mudarFoto(index) {
            const dado = memoriaData[index];
            if (!dado) return;
            img.style.display = 'block';
            img.style.opacity = 0;
            setTimeout(() => {
                img.src = dado.img || 'https://placehold.co/800x450/cccccc/666666?text=Sem+Imagem';
                titulo.innerText = dado.titulo;
                desc.innerText = dado.descricao || '';
                img.style.opacity = 1;
            }, 150);
        }

        mudarFoto(0);
        select.addEventListener('change', function() {
            mudarFoto(parseInt(this.value));
        });
    } catch (error) {
        img.style.display = 'none';
        titulo.innerText = 'Erro ao carregar memórias';
        desc.innerText = error.message;
    }
}