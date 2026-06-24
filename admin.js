// admin.js - Painel administrativo com integração API
import { renderTabelas } from './js/components/renderAdminTables.js';
import { 
    produtos as produtosAPI, 
    pautas as pautasAPI, 
    noticias as noticiasAPI,
    memorias as memoriasAPI,
    historicos as historicosAPI,
    conquistas as conquistasAPI,
    cartas as cartasAPI,
    servicos as servicosAPI,
    topicos as topicosAPI
} from './js/services/api.js';
import { getToken } from './js/services/authService.js';

// Verificar autenticação admin
function checkAdminAuth() {
    const token = sessionStorage.getItem('admin_token');
    const userData = sessionStorage.getItem('user_data');
    if (!token || !userData) {
        window.location.href = 'admin-login.html';
        return false;
    }
    try {
        const user = JSON.parse(userData);
        if (user.tipo !== 'admin') {
            window.location.href = 'admin-login.html';
            return false;
        }
        return true;
    } catch (e) {
        window.location.href = 'admin-login.html';
        return false;
    }
}

// Proteção
if (!checkAdminAuth()) {
    // O redirecionamento já acontece dentro da função
}

window.arquivarTopicoAdmin = async (id) => {
    if (!confirm('Arquivar este tópico?')) return;
    await topicosAPI.arquivar(id);
    renderTabelas();
};
window.trancarTopicoAdmin = async (id) => {
    if (!confirm('Trancar este tópico? (impede novos comentários)')) return;
    await topicosAPI.trancar(id);
    renderTabelas();
};
window.reabrirTopicoAdmin = async (id) => {
    await topicosAPI.reabrir(id);
    renderTabelas();
};
window.deletarTopicoAdmin = async (id) => {
    if (!confirm('Deletar permanentemente este tópico?')) return;
    await topicosAPI.deletar(id);
    renderTabelas();
};

window.renderTabelas = renderTabelas;

// Configuração de campos
const fieldConfig = {
    pauta: [
        { id: 'i-titulo', label: 'Título', type: 'text', required: true },
        { id: 'i-data', label: 'Data', type: 'date', required: true },
        { id: 'i-desc', label: 'Descrição', type: 'textarea', required: true },
        { id: 'i-status', label: 'Status', type: 'select', options: ['Em Andamento', 'Aprovado', 'Concluído', 'Rejeitado'] }
    ],
    produto: [
        { id: 'i-nome', label: 'Nome do Produto', type: 'text', required: true },
        { id: 'i-preco', label: 'Preço (R$)', type: 'number', step: '0.01', required: true },
        { id: 'i-estoque', label: 'Estoque', type: 'number', required: true },
        { id: 'i-img', label: 'Foto (Nome do arquivo ou URL)', type: 'text' }
    ],
    noticia: [
        { id: 'i-titulo', label: 'Título', type: 'text', required: true },
        { id: 'i-desc', label: 'Descrição', type: 'textarea', required: true },
        { id: 'i-urgente', label: 'É Urgente?', type: 'select', options: ['false', 'true'], optionLabels: ['Não', 'Sim (Destaque Vermelho)'] }
    ],
    memoria: [
        { id: 'i-titulo', label: 'Título da Foto', type: 'text', required: true },
        { id: 'i-desc', label: 'Descrição Histórica', type: 'textarea', required: true },
        { id: 'i-img', label: 'Imagem (URL ou Arquivo)', type: 'text' }
    ],
    historico: [
        { id: 'i-nome', label: 'Nome (Ex: greve1990)', type: 'text', required: true },
        { id: 'i-titulo', label: 'Título do Texto', type: 'text', required: true },
        { id: 'i-texto', label: 'Texto Completo (HTML permitido)', type: 'textarea', required: true }
    ],
    conquista: [
        { id: 'i-titulo', label: 'Título da Conquista', type: 'text', required: true },
        { id: 'i-desc', label: 'Descrição', type: 'textarea', required: true }
    ],
    carta: [
        { id: 'i-titulo', label: 'Título da Carta', type: 'text', required: true },
        { id: 'i-texto', label: 'Texto da Carta', type: 'textarea', required: true }
    ],
    servico: [ // NOVO
        { id: 'i-titulo', label: 'Título', type: 'text', required: true },
        { id: 'i-descricao', label: 'Descrição', type: 'textarea', required: true },
        { id: 'i-icone', label: 'Ícone (caminho da imagem)', type: 'text', required: true },
        { id: 'i-ordem', label: 'Ordem (número)', type: 'number', required: true },
        { id: 'i-ativo', label: 'Ativo?', type: 'select', options: ['true', 'false'], optionLabels: ['Sim', 'Não'] }
    ]
};

function gerarCampos(tipo, valores = {}) {
    const config = fieldConfig[tipo];
    if (!config) return '';
    return config.map(campo => {
        // Remove o prefixo do identificador do input para cruzar dados com o modelo
        const propName = campo.id.replace('i-', '');
        
        // Evita colisões e divergências entre a nomenclatura de inputs do Front e esquemas do Back-end
        let value = valores[propName];
        if (value === undefined && propName === 'desc') value = valores['descricao'];
        if (value === undefined && propName === 'texto') value = valores['texto'];
        if (value === undefined) value = '';

        if (campo.type === 'select') {
            const options = campo.options.map((opt, idx) => {
                const label = campo.optionLabels ? campo.optionLabels[idx] : opt;
                const selected = String(value) === String(opt) ? 'selected' : '';
                return `<option value="${opt}" ${selected}>${label}</option>`;
            }).join('');
            return `<div class="form-group"><label>${campo.label}</label><select id="${campo.id}" class="street-select">${options}</select></div>`;
        } else if (campo.type === 'textarea') {
            // Textareas precisam ter os dados injetados dentro das tags sem atributos inline de value
            return `<div class="form-group"><label>${campo.label}</label><textarea id="${campo.id}" ${campo.required ? 'required' : ''}>${value}</textarea></div>`;
        } else {
            const step = campo.step ? `step="${campo.step}"` : '';
            return `<div class="form-group"><label>${campo.label}</label><input type="${campo.type}" id="${campo.id}" value="${value}" ${campo.required ? 'required' : ''} ${step}></div>`;
        }
    }).join('');
}

async function carregarItemParaEdicao(tipo, id) {
    try {
        let item = null;
        if (tipo === 'produto') item = await produtosAPI.buscar(id);
        else if (tipo === 'pauta') item = await pautasAPI.buscar(id);
        else if (tipo === 'noticia') item = await noticiasAPI.buscar(id);
        else if (tipo === 'memoria') item = await memoriasAPI.buscar(id);
        else if (tipo === 'historico') item = await historicosAPI.buscar(id);
        else if (tipo === 'conquista') item = await conquistasAPI.buscar(id);
        else if (tipo === 'servico') item = await servicosAPI.buscar(id); // NOVO
        else if (tipo === 'carta') {
            const cartas = await cartasAPI.listar();
            item = cartas[0] || null;
        }
        return item;
    } catch (error) {
        alert('Erro ao carregar dados para edição: ' + error.message);
        return null;
    }
}

window.abrirModal = async function(tipo, id = null) {
    const modal = document.getElementById('admin-modal');
    const formFields = document.getElementById('form-fields');
    const modalTitle = document.getElementById('modal-form-title');
    const formId = document.getElementById('form-id');
    const formType = document.getElementById('form-type');

    const isEdit = id !== null;
    modalTitle.innerText = isEdit ? `Editar ${tipo.toUpperCase()}` : `Novo(a) ${tipo.toUpperCase()}`;
    formType.value = tipo;
    formId.value = id || '';

    let valores = {};
    if (isEdit) {
        const item = await carregarItemParaEdicao(tipo, id);
        if (item) valores = item;
    }
    formFields.innerHTML = gerarCampos(tipo, valores);
    modal.classList.remove('hidden');
};

window.fecharModal = function() {
    document.getElementById('admin-modal').classList.add('hidden');
    document.getElementById('admin-form').reset();
    document.getElementById('form-id').value = '';
};

document.getElementById('admin-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const tipo = document.getElementById('form-type').value;
    const id = document.getElementById('form-id').value;
    const isEdit = id !== '';

    const config = fieldConfig[tipo];
    const dados = {};
    config.forEach(campo => {
        const el = document.getElementById(campo.id);
        if (el) dados[campo.id.replace('i-', '')] = el.value;
    });

    try {
        let itemSalvo = null;
        if (tipo === 'produto') {
            const { nome, preco, estoque, img } = dados;
            const payload = { nome, preco: parseFloat(preco), estoque: parseInt(estoque), img };
            itemSalvo = isEdit ? await produtosAPI.atualizar(id, payload) : await produtosAPI.criar(payload);
        } else if (tipo === 'pauta') {
            const { titulo, data, desc, status } = dados;
            const payload = { titulo, data, descricao: desc, status };
            itemSalvo = isEdit ? await pautasAPI.atualizar(id, payload) : await pautasAPI.criar(payload);
        } else if (tipo === 'noticia') {
            const { titulo, desc, urgente } = dados;
            const payload = { titulo, descricao: desc, urgente: urgente === 'true' };
            itemSalvo = isEdit ? await noticiasAPI.atualizar(id, payload) : await noticiasAPI.criar(payload);
        } else if (tipo === 'memoria') {
            const { titulo, desc, img } = dados;
            const payload = { titulo, descricao: desc, img };
            itemSalvo = isEdit ? await memoriasAPI.atualizar(id, payload) : await memoriasAPI.criar(payload);
        } else if (tipo === 'historico') {
            const { nome, titulo, texto } = dados;
            const img = 'https://placehold.co/400x300/000000/FFFFFF?text=' + encodeURIComponent(titulo);
            const payload = { nome, titulo, texto, img };
            itemSalvo = isEdit ? await historicosAPI.atualizar(id, payload) : await historicosAPI.criar(payload);
        } else if (tipo === 'conquista') {
            const { titulo, desc } = dados;
            const payload = { titulo, descricao: desc };
            itemSalvo = isEdit ? await conquistasAPI.atualizar(id, payload) : await conquistasAPI.criar(payload);
        } else if (tipo === 'servico') { // NOVO
            const { titulo, descricao, icone, ordem, ativo } = dados;
            const payload = { 
                titulo, 
                descricao, 
                icone, 
                ordem: parseInt(ordem) || 0, 
                ativo: ativo === 'true' 
            };
            itemSalvo = isEdit ? await servicosAPI.atualizar(id, payload) : await servicosAPI.criar(payload);
        } else if (tipo === 'carta') {
            const { titulo, texto } = dados;
            const payload = { titulo, texto };
            const cartas = await cartasAPI.listar();
            if (cartas.length > 0) {
                itemSalvo = await cartasAPI.atualizar(cartas[0].id, payload);
            } else {
                itemSalvo = await cartasAPI.criar(payload);
            }
        }

        if (itemSalvo) {
            alert(`${tipo.toUpperCase()} ${isEdit ? 'atualizado' : 'criado'} com sucesso!`);
            await renderTabelas();
            window.fecharModal();
        }
    } catch (error) {
        alert('Erro ao salvar: ' + error.message);
    }
});

window.editarItem = function(tipo, id) {
    window.abrirModal(tipo, id);
};

window.deletarItem = async function(tipo, id) {
    if (confirm(`Tem certeza que deseja APAGAR o registro #${id}?`)) {
        try {
            let sucesso = false;
            if (tipo === 'produto') { await produtosAPI.deletar(id); sucesso = true; }
            else if (tipo === 'pauta') { await pautasAPI.deletar(id); sucesso = true; }
            else if (tipo === 'noticia') { await noticiasAPI.deletar(id); sucesso = true; }
            else if (tipo === 'memoria') { await memoriasAPI.deletar(id); sucesso = true; }
            else if (tipo === 'historico') { await historicosAPI.deletar(id); sucesso = true; }
            else if (tipo === 'conquista') { await conquistasAPI.deletar(id); sucesso = true; }
            else if (tipo === 'servico') { await servicosAPI.deletar(id); sucesso = true; } // NOVO
            else if (tipo === 'carta') {
                const payload = { titulo: 'CARTA VIVE! 2026', texto: 'Assumimos a gestão com compromisso...' };
                const cartas = await cartasAPI.listar();
                if (cartas.length > 0) {
                    await cartasAPI.atualizar(cartas[0].id, payload);
                } else {
                    await cartasAPI.criar(payload);
                }
                sucesso = true;
            }
            if (sucesso) {
                await renderTabelas();
            }
        } catch (error) {
            alert('Erro ao excluir: ' + error.message);
        }
    }
};

// Alternar abas
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tab = this.dataset.tab;
        document.querySelectorAll('.crud-section').forEach(sec => sec.classList.remove('active'));
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.getElementById('crud-' + tab).classList.add('active');
        this.classList.add('active');
    });
});

// Logout admin
window.adminLogout = function() {
    sessionStorage.removeItem('admin_token');
    sessionStorage.removeItem('user_token');
    sessionStorage.removeItem('user_data');
    window.location.href = 'admin-login.html';
};

document.addEventListener('DOMContentLoaded', function() {
    const logoutLink = document.querySelector('.sidebar-footer a');
    if (logoutLink) {
        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.adminLogout();
        });
    }
});

// Inicializar tabelas
renderTabelas();