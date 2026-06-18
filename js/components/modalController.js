// js/components/modalController.js
import { historicos as historicosAPI } from '../services/api.js';

export const modalController = {
    initModalHistorico() {
        const modal = document.getElementById('modal-historico');
        const fecharBtn = document.getElementById('fechar-modal-historico');
        if (fecharBtn) {
            fecharBtn.addEventListener('click', () => this.fecharModalHistorico());
        }
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.fecharModalHistorico();
            });
        }
    },

    async abrirModalHistorico(id) {
        const modal = document.getElementById('modal-historico');
        if (!modal) return;

        try {
            const item = await historicosAPI.buscar(id);
            if (!item) return;

            document.getElementById('modal-img').src = item.img || 'https://placehold.co/400x300/cccccc/666666?text=Sem+Imagem';
            document.getElementById('modal-titulo').innerText = item.titulo;
            document.getElementById('modal-corpo').innerHTML = item.texto || '';

            modal.classList.remove('hidden');
        } catch (error) {
            alert('Erro ao carregar detalhes do histórico.');
        }
    },

    fecharModalHistorico() {
        const modal = document.getElementById('modal-historico');
        if (modal) modal.classList.add('hidden');
    }
};