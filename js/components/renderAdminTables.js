// js/components/renderAdminTables.js
import {
    pautas as pautasAPI,
    produtos as produtosAPI,
    noticias as noticiasAPI,
    memorias as memoriasAPI,
    historicos as historicosAPI,
    conquistas as conquistasAPI,
    cartas as cartasAPI,
    servicos as servicosAPI
} from '../services/api.js';

export async function renderTabelas() {
    try {
        // Pautas
        const pautas = await pautasAPI.listar();
        const tbodyPautas = document.getElementById('tbody-pautas');
        if (tbodyPautas) {
            tbodyPautas.innerHTML = pautas.map(p => `
                <tr>
                    <td>#${p.id}</td>
                    <td><strong>${p.titulo}</strong></td>
                    <td>${new Date(p.data).toLocaleDateString('pt-BR')}</td>
                    <td><span class="status-badge">${p.status}</span></td>
                    <td>
                        <button class="btn-edit" onclick="window.editarItem('pauta', ${p.id})">Editar</button>
                        <button class="btn-delete" onclick="window.deletarItem('pauta', ${p.id})">Excluir</button>
                    </td>
                </tr>
            `).join('');
        }

        // Produtos
        const produtos = await produtosAPI.listar();
        const tbodyLoja = document.getElementById('tbody-loja');
        if (tbodyLoja) {
            tbodyLoja.innerHTML = produtos.map(p => `
                <tr>
                    <td>#${p.id}</td>
                    <td><strong>${p.nome}</strong></td>
                    <td>R$ ${parseFloat(p.preco).toFixed(2)}</td>
                    <td>${p.estoque} un.</td>
                    <td>
                        <button class="btn-edit" onclick="window.editarItem('produto', ${p.id})">Editar</button>
                        <button class="btn-delete" onclick="window.deletarItem('produto', ${p.id})">Excluir</button>
                    </td>
                </tr>
            `).join('');
        }

        // Notícias
        const noticias = await noticiasAPI.listar();
        const tbodyNoticias = document.getElementById('tbody-noticias');
        if (tbodyNoticias) {
            tbodyNoticias.innerHTML = noticias.map(n => `
                <tr>
                    <td>#${n.id}</td>
                    <td><strong>${n.titulo}</strong></td>
                    <td>${n.urgente ? 'SIM' : 'NÃO'}</td>
                    <td>
                        <button class="btn-edit" onclick="window.editarItem('noticia', ${n.id})">Editar</button>
                        <button class="btn-delete" onclick="window.deletarItem('noticia', ${n.id})">Excluir</button>
                    </td>
                </tr>
            `).join('');
        }

        // Memórias
        const memorias = await memoriasAPI.listar();
        const tbodyMemoria = document.getElementById('tbody-memoria');
        if (tbodyMemoria) {
            tbodyMemoria.innerHTML = memorias.map(m => `
                <tr>
                    <td>#${m.id}</td>
                    <td><strong>${m.titulo}</strong></td>
                    <td>${m.img || 'Sem imagem'}</td>
                    <td>
                        <button class="btn-edit" onclick="window.editarItem('memoria', ${m.id})">Editar</button>
                        <button class="btn-delete" onclick="window.deletarItem('memoria', ${m.id})">Excluir</button>
                    </td>
                </tr>
            `).join('');
        }

        // Históricos
        const historicos = await historicosAPI.listar();
        const tbodyHistorico = document.getElementById('tbody-historico');
        if (tbodyHistorico) {
            tbodyHistorico.innerHTML = historicos.map(h => `
                <tr>
                    <td>#${h.id}</td>
                    <td><strong>${h.nome}</strong></td>
                    <td>${h.titulo}</td>
                    <td>
                        <button class="btn-edit" onclick="window.editarItem('historico', ${h.id})">Editar</button>
                        <button class="btn-delete" onclick="window.deletarItem('historico', ${h.id})">Excluir</button>
                    </td>
                </tr>
            `).join('');
        }

        // Conquistas
        const conquistas = await conquistasAPI.listar();
        const tbodyConquistas = document.getElementById('tbody-conquistas');
        if (tbodyConquistas) {
            tbodyConquistas.innerHTML = conquistas.map(c => `
                <tr>
                    <td>#${c.id}</td>
                    <td><strong>${c.titulo}</strong></td>
                    <td>
                        <button class="btn-edit" onclick="window.editarItem('conquista', ${c.id})">Editar</button>
                        <button class="btn-delete" onclick="window.deletarItem('conquista', ${c.id})">Excluir</button>
                    </td>
                </tr>
            `).join('');
        }

        // Cartas
        const cartas = await cartasAPI.listar();
        const tbodyCarta = document.getElementById('tbody-carta');
        if (tbodyCarta) {
            if (cartas.length > 0) {
                const carta = cartas[0];
                tbodyCarta.innerHTML = `
                    <tr>
                        <td>#${carta.id}</td>
                        <td><strong>${carta.titulo}</strong></td>
                        <td>
                            <button class="btn-edit" onclick="window.editarItem('carta', ${carta.id})">Editar</button>
                            <button class="btn-delete" onclick="window.deletarItem('carta', ${carta.id})">Excluir</button>
                        </td>
                    </tr>
                `;
            } else {
                tbodyCarta.innerHTML = '<tr><td colspan="3">Nenhuma carta cadastrada.</td></tr>';
            }
        }

        // Serviços
        const servicos = await servicosAPI.listar();
        const tbodyServicos = document.getElementById('tbody-servicos');
        if (tbodyServicos) {
            tbodyServicos.innerHTML = servicos.map(s => `
                <tr>
                    <td>#${s.id}</td>
                    <td><strong>${s.titulo}</strong></td>
                    <td>${s.icone}</td>
                    <td>${s.ativo ? '✅' : '❌'}</td>
                    <td>
                        <button class="btn-edit" onclick="window.editarItem('servico', ${s.id})">Editar</button>
                        <button class="btn-delete" onclick="window.deletarItem('servico', ${s.id})">Excluir</button>
                    </td>
                </tr>
            `).join('');
        }
    } catch (error) {
        console.error('Erro ao renderizar tabelas:', error);
        alert('Erro ao carregar dados. Verifique se o servidor está rodando.');
    }
}