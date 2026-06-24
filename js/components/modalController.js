// js/components/modalController.js
import { historicos as historicosAPI } from '../services/api.js';
import { getCurrentUser } from '../services/authService.js'; // <-- IMPORTANTE

export const modalController = {
    // ===== Ações do modal =====
    async deletarTopico(topicoId) {
        if (!confirm('Tem certeza que deseja deletar este tópico?')) return;
        try {
            const { topicos: topicosAPI } = await import('../services/api.js');
            await topicosAPI.deletar(topicoId);
            alert('Tópico deletado com sucesso.');
            this.fecharModalTopico();
            if (typeof window.carregarTopicosForum === 'function') {
                await window.carregarTopicosForum();
            }
        } catch (error) {
            alert('Erro ao deletar: ' + error.message);
        }
    },

    async arquivarTopico(topicoId) {
        if (!confirm('Arquivar este tópico? (Ele ficará visível apenas para admins)')) return;
        try {
            const { topicos: topicosAPI } = await import('../services/api.js');
            await topicosAPI.arquivar(topicoId);
            alert('Tópico arquivado.');
            this.fecharModalTopico();
            if (typeof window.carregarTopicosForum === 'function') {
                await window.carregarTopicosForum();
            }
        } catch (error) {
            alert('Erro ao arquivar: ' + error.message);
        }
    },

    async trancarTopico(topicoId) {
        if (!confirm('Trancar este tópico? (Impedirá novos comentários)')) return;
        try {
            const { topicos: topicosAPI } = await import('../services/api.js');
            await topicosAPI.trancar(topicoId);
            alert('Tópico trancado.');
            this.fecharModalTopico();
            if (typeof window.carregarTopicosForum === 'function') {
                await window.carregarTopicosForum();
            }
        } catch (error) {
            alert('Erro ao trancar: ' + error.message);
        }
    },

    async reabrirTopico(topicoId) {
        try {
            const { topicos: topicosAPI } = await import('../services/api.js');
            await topicosAPI.reabrir(topicoId);
            alert('Tópico reaberto.');
            this.fecharModalTopico();
            if (typeof window.carregarTopicosForum === 'function') {
                await window.carregarTopicosForum();
            }
        } catch (error) {
            alert('Erro ao reabrir: ' + error.message);
        }
    },

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
    },

    // ========== FÓRUM ==========

    initModalTopico() {
        let modal = document.getElementById('modal-topico');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modal-topico';
            modal.className = 'modal-overlay hidden';
            modal.innerHTML = `
                <div class="modal-content" style="max-width: 700px;">
                    <span class="modal-close" onclick="modalController.fecharModalTopico()">&times;</span>
                    <div id="modal-topico-conteudo">
                        <!-- Preenchido dinamicamente -->
                    </div>
                    <div id="modal-topico-comentarios" style="margin-top: 1.5rem;">
                        <!-- Lista de comentários -->
                    </div>
                    <div id="modal-topico-novo-comentario" style="margin-top: 1rem;">
                        <textarea id="modal-comentario-texto" placeholder="Escreva seu comentário..." rows="3" style="width:100%;"></textarea>
                        <button class="btn-primary" onclick="modalController.enviarComentario()">Comentar</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
    },

    async abrirModalTopico(topicoId) {
        const modal = document.getElementById('modal-topico');
        if (!modal) {
            this.initModalTopico();
        }

        try {
            const { topicos: topicosAPI } = await import('../services/api.js');
            const topico = await topicosAPI.obterComComentarios(topicoId);

            const conteudoDiv = document.getElementById('modal-topico-conteudo');
            const comentariosDiv = document.getElementById('modal-topico-comentarios');
            const novoComentarioDiv = document.getElementById('modal-topico-novo-comentario');

            const user = getCurrentUser();
            const usuarioCurtiu = topico.usuarioCurtiu || false;
            // Emojis: coração preto para não curtido, amarelo para curtido
            const likeIcon = usuarioCurtiu ? '💛' : '🖤';
            
            // Monta cabeçalho do tópico
            let html = `
                <h2>${topico.titulo}</h2>
                <p style="color:#666; font-size:0.9rem;">
                    Por ${topico.autor?.nome || 'Anônimo'} em ${new Date(topico.criado_em).toLocaleDateString('pt-BR')}
                    &nbsp;|&nbsp;
                    ${user ? `<button class="btn-like ${usuarioCurtiu ? 'liked' : ''}" onclick="curtirTopico(${topico.id})">${likeIcon} ${topico.curtidas}</button>` : `<span>🖤 ${topico.curtidas}</span>`}
                </p>
                ${topico.status === 'trancado' ? '<p style="color:var(--caaso-red); font-weight:bold;">🔒 Este tópico está trancado. Não é possível comentar.</p>' : ''}
                ${topico.status === 'arquivado' ? '<p style="color:var(--caaso-red); font-weight:bold;">📦 Este tópico está arquivado. Não é possível comentar.</p>' : ''}
                <p>${topico.conteudo}</p>
            `;

            // Botões de ação (deletar, arquivar, trancar, reabrir) para autor/admin
            const isAuthor = user && user.id === topico.usuario_id;
            const isAdmin = user && user.tipo === 'admin';
            let actionButtons = '';
            if (isAuthor || isAdmin) {
                actionButtons += `<button class="btn-delete" style="margin-top: 0.5rem;" onclick="modalController.deletarTopico(${topico.id})">🗑️ Deletar</button> `;
            }
            if (isAdmin) {
                if (topico.status === 'ativo') {
                    actionButtons += `<button class="btn-warning" style="margin-top: 0.5rem;" onclick="modalController.arquivarTopico(${topico.id})">📦 Arquivar</button> `;
                    actionButtons += `<button class="btn-warning" style="margin-top: 0.5rem;" onclick="modalController.trancarTopico(${topico.id})">🔒 Trancar</button> `;
                } else {
                    actionButtons += `<button class="btn-success" style="margin-top: 0.5rem;" onclick="modalController.reabrirTopico(${topico.id})">🔓 Reabrir</button> `;
                }
            }
            if (actionButtons) {
                html += `<div style="margin-top: 1rem;">${actionButtons}</div>`;
            }

            conteudoDiv.innerHTML = html;

            // Comentários
            if (topico.comentarios && topico.comentarios.length > 0) {
                comentariosDiv.innerHTML = topico.comentarios.map(com => `
                    <div style="border-bottom:1px solid #eee; padding:0.8rem 0;">
                        <strong>${com.autor?.nome || 'Anônimo'}</strong>
                        <span style="font-size:0.8rem; color:#999;">${new Date(com.criado_em).toLocaleDateString('pt-BR')}</span>
                        <p>${com.conteudo}</p>
                    </div>
                `).join('');
            } else {
                comentariosDiv.innerHTML = '<p style="color:#999;">Nenhum comentário ainda. Seja o primeiro!</p>';
            }

            // Controla área de novo comentário
            if (topico.status === 'trancado' || topico.status === 'arquivado' || !user) {
                novoComentarioDiv.style.display = 'none';
                if (!user) {
                    comentariosDiv.innerHTML += '<p style="color:#999; margin-top:1rem;">Faça <a href="#login" style="color:var(--caaso-red);">login</a> para comentar.</p>';
                }
            } else {
                novoComentarioDiv.style.display = 'block';
            }

            modal.dataset.topicoId = topicoId;
            modal.classList.remove('hidden');
            document.getElementById('modal-comentario-texto').value = '';

        } catch (error) {
            alert('Erro ao carregar detalhes do tópico: ' + error.message);
        }
    },

    fecharModalTopico() {
        const modal = document.getElementById('modal-topico');
        if (modal) modal.classList.add('hidden');
        // Limpa o campo de comentário
        const textarea = document.getElementById('modal-comentario-texto');
        if (textarea) textarea.value = '';
    },

    async enviarComentario() {
        const modal = document.getElementById('modal-topico');
        const topicoId = modal.dataset.topicoId;
        const texto = document.getElementById('modal-comentario-texto').value.trim();

        if (!texto) {
            alert('Digite um comentário.');
            return;
        }

        const user = getCurrentUser();
        if (!user) {
            alert('Faça login para comentar.');
            return;
        }

        try {
            const { comentarios: comentariosAPI } = await import('../services/api.js');
            await comentariosAPI.criar(topicoId, { conteudo: texto });

            // Recarrega o modal para exibir o novo comentário
            await this.abrirModalTopico(topicoId);
            // Atualiza a lista de tópicos
            if (typeof window.carregarTopicosForum === 'function') {
                await window.carregarTopicosForum();
            }
        } catch (error) {
            alert('Erro ao enviar comentário: ' + error.message);
        }
    }
};

// Para uso com onclick no HTML
window.modalController = modalController;