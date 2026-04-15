/* ==========================================================================
   BANCO DE DADOS TEMPORÁRIO (MOCKUP)
   ========================================================================== */

   // Inicialização de estados para simulação de persistência de dados
let dbPautas = [{ id: 1, titulo: "Aumento do Auxílio", data: "12/04/2026", desc: "Reivindicação de reajuste.", status: "Em Andamento" }];
let dbProdutos = [{ id: 1, nome: "Camiseta CAASO Vive!", preco: 50.00, estoque: 120, foto: "camisa.jpg" }];
let dbNoticias = [{ id: 1, titulo: "Vagas no Aloja", desc: "Edital aberto para o próximo semestre.", urgente: "S" }];
let dbMemoria = [{ id: 1, titulo: "Tuscaaso 2023", desc: "Força da torcida no evento.", imagem: "tuscaaso2023.jpg" }];
let dbHistorico = [{ id: 1, nome: "Ata de 1953", titulo: "Fundação do CAASO", texto: "Aos 22 dias..." }];
let dbConquistas = [{ id: 1, titulo: "Tricampeonato Tusca", desc: "Vitória histórica nos jogos de 2024." }];
let dbCarta = [{ id: 1, titulo: "CARTA VIVE! 2026", texto: "Assumimos a gestão com compromisso..." }];

/* ==========================================================================
   SISTEMA DE NAVEGAÇÃO DO PAINEL
   ========================================================================== */

   /**
 * Controla a alternância de visibilidade entre as seções do CRUD
 */
function switchAdminTab(tabId, btnElement) {
    // Reseta estado visual de todas as seções e botões
    document.querySelectorAll('.crud-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    // Ativa os elementos selecionados
    document.getElementById('crud-' + tabId).classList.add('active');
    btnElement.classList.add('active');
}

/* ==========================================================================
   RENDERIZAÇÃO DE TABELAS (READ)
   ========================================================================== */

/**
 * Atualiza o conteúdo de todas as tabelas administrativas no DOM
 */
function renderTabelas() {
    // Injeção de dados na tabela de Pautas
    document.getElementById('tbody-pautas').innerHTML = dbPautas.map(p => `
        <tr><td>#${p.id}</td><td><strong>${p.titulo}</strong></td><td>${p.data}</td><td><span class="status-badge">${p.status}</span></td>
        <td>
            <button class="btn-edit" onclick="editarItem('pauta', ${p.id})">Editar</button>
            <button class="btn-delete" onclick="deletarItem('pauta', ${p.id})">Excluir</button>
        </td></tr>`).join('');
    
    // Injeção de dados na tabela de Lojinha
    document.getElementById('tbody-loja').innerHTML = dbProdutos.map(p => `
        <tr><td>#${p.id}</td><td><strong>${p.nome}</strong></td><td>R$ ${p.preco.toFixed(2)}</td><td>${p.estoque} un.</td>
        <td>
            <button class="btn-edit" onclick="editarItem('produto', ${p.id})">Editar</button>
            <button class="btn-delete" onclick="deletarItem('produto', ${p.id})">Excluir</button>
        </td></tr>`).join('');

    // Injeção de dados na tabela de Notícias
    document.getElementById('tbody-noticias').innerHTML = dbNoticias.map(n => `
        <tr><td>#${n.id}</td><td><strong>${n.titulo}</strong></td><td>${n.urgente === 'S' ? '🔴 SIM' : 'NÃO'}</td>
        <td>
            <button class="btn-edit" onclick="editarItem('noticia', ${n.id})">Editar</button>
            <button class="btn-delete" onclick="deletarItem('noticia', ${n.id})">Excluir</button>
        </td></tr>`).join('');

    // Injeção de dados na tabela de Memória Viva
    document.getElementById('tbody-memoria').innerHTML = dbMemoria.map(m => `
        <tr><td>#${m.id}</td><td><strong>${m.titulo}</strong></td><td>${m.imagem}</td>
        <td>
            <button class="btn-edit" onclick="editarItem('memoria', ${m.id})">Editar</button>
            <button class="btn-delete" onclick="deletarItem('memoria', ${m.id})">Excluir</button>
        </td></tr>`).join('');

    // Injeção de dados na tabela de Arquivo Histórico
    document.getElementById('tbody-historico').innerHTML = dbHistorico.map(h => `
        <tr><td>#${h.id}</td><td><strong>${h.nome}</strong></td><td>${h.titulo}</td>
        <td>
            <button class="btn-edit" onclick="editarItem('historico', ${h.id})">Editar</button>
            <button class="btn-delete" onclick="deletarItem('historico', ${h.id})">Excluir</button>
        </td></tr>`).join('');

    // Injeção de dados na tabela de Arquivo Histórico
    document.getElementById('tbody-conquistas').innerHTML = dbConquistas.map(c => `
        <tr><td>#${c.id}</td><td><strong>${c.titulo}</strong></td>
        <td>
            <button class="btn-edit" onclick="editarItem('conquista', ${c.id})">Editar</button>
            <button class="btn-delete" onclick="deletarItem('conquista', ${c.id})">Excluir</button>
        </td></tr>`).join('');

    // Injeção de dados na tabela de Carta da Gestão
    document.getElementById('tbody-carta').innerHTML = dbCarta.map(c => `
        <tr><td>#${c.id}</td><td><strong>${c.titulo}</strong></td>
        <td>
            <button class="btn-edit" onclick="editarItem('carta', ${c.id})">Editar</button>
            <button class="btn-delete" onclick="deletarItem('carta', ${c.id})">Excluir</button>
        </td></tr>`).join('');
}

/* ==========================================================================
   GESTÃO DE MODAIS E FORMULÁRIOS
   ========================================================================== */

/**
 * Prepara e exibe o modal de criação/edição com campos dinâmicos
 */
function abrirModal(tipo) {
    const modal = document.getElementById('admin-modal');
    const formFields = document.getElementById('form-fields');
    
    // Verifica se a operação é de edição através do valor do campo hidden ID
    const isEdit = document.getElementById('form-id').value !== '';
    document.getElementById('modal-form-title').innerText = isEdit ? `Editar ${tipo.toUpperCase()}` : `Novo(a) ${tipo.toUpperCase()}`;
    
    document.getElementById('form-type').value = tipo;
    formFields.innerHTML = ''; 

    // Estruturação condicional dos campos do formulário baseado no tipo de entidade
    if (tipo === 'pauta') {
        formFields.innerHTML = `
            <div class="form-group"><label>Título</label><input type="text" id="i-titulo" required></div>
            <div class="form-group"><label>Data</label><input type="text" id="i-data" required></div>
            <div class="form-group"><label>Descrição</label><textarea id="i-desc" required></textarea></div>
            <div class="form-group"><label>Status</label>
                <select id="i-status" class="street-select">
                    <option value="Em Andamento">Em Andamento</option>
                    <option value="Aprovado">Aprovado</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Rejeitado">Rejeitado</option>
                </select>
            </div>`;
    } else if (tipo === 'produto') {
        formFields.innerHTML = `
            <div class="form-group"><label>Nome do Produto</label><input type="text" id="i-nome" required></div>
            <div class="form-group"><label>Preço (R$)</label><input type="number" step="0.01" id="i-preco" required></div>
            <div class="form-group"><label>Estoque</label><input type="number" id="i-estoque" required></div>
            <div class="form-group"><label>Foto (Nome do arquivo ou URL)</label><input type="text" id="i-foto" required></div>`;
    } else if (tipo === 'noticia') {
        formFields.innerHTML = `
            <div class="form-group"><label>Título</label><input type="text" id="i-titulo" required></div>
            <div class="form-group"><label>Descrição</label><textarea id="i-desc" required></textarea></div>
            <div class="form-group"><label>É Urgente?</label>
                <select id="i-urgente" class="street-select"><option value="N">Não</option><option value="S">Sim (Destaque Vermelho)</option></select>
            </div>`;
    } else if (tipo === 'memoria') {
        formFields.innerHTML = `
            <div class="form-group"><label>Título da Foto</label><input type="text" id="i-titulo" required></div>
            <div class="form-group"><label>Descrição Histórica</label><textarea id="i-desc" required></textarea></div>
            <div class="form-group"><label>Imagem (URL ou Arquivo)</label><input type="text" id="i-img" required></div>`;
    } else if (tipo === 'historico') {
        formFields.innerHTML = `
            <div class="form-group"><label>Nome (Ex: greve1990)</label><input type="text" id="i-nome" required></div>
            <div class="form-group"><label>Título do Texto</label><input type="text" id="i-titulo" required></div>
            <div class="form-group"><label>Texto Completo (HTML permitido)</label><textarea id="i-texto" required></textarea></div>`;
    } else if (tipo === 'conquista') {
        formFields.innerHTML = `
            <div class="form-group"><label>Título da Conquista</label><input type="text" id="i-titulo" required></div>
            <div class="form-group"><label>Descrição</label><textarea id="i-desc" required></textarea></div>`;
    } else if (tipo === 'carta') {
        formFields.innerHTML = `
            <div class="form-group"><label>Título da Carta</label><input type="text" id="i-titulo" required></div>
            <div class="form-group"><label>Texto da Carta</label><textarea id="i-texto" required></textarea></div>`;
    }

    modal.classList.remove('hidden');
}

/**
 * Reseta o estado do formulário e oculta o modal
 */
function fecharModal() {
    document.getElementById('admin-modal').classList.add('hidden');
    document.getElementById('admin-form').reset();
    document.getElementById('form-id').value = ''; 
}

/* ==========================================================================
   PROCESSAMENTO DE EDIÇÃO (UPDATE)
   ========================================================================== */
/**
 * Carrega os dados de um item existente para edição no formulário
 */
function editarItem(tipo, id) {
    document.getElementById('form-id').value = id;
    abrirModal(tipo); 

    // Mapeamento de dados do objeto selecionado para os inputs do formulário
    if (tipo === 'pauta') {
        const item = dbPautas.find(i => i.id === id);
        document.getElementById('i-titulo').value = item.titulo;
        document.getElementById('i-data').value = item.data;
        document.getElementById('i-desc').value = item.desc;
        document.getElementById('i-status').value = item.status;
    } else if (tipo === 'produto') {
        const item = dbProdutos.find(i => i.id === id);
        document.getElementById('i-nome').value = item.nome;
        document.getElementById('i-preco').value = item.preco;
        document.getElementById('i-estoque').value = item.estoque;
        document.getElementById('i-foto').value = item.foto;
    } else if (tipo === 'noticia') {
        const item = dbNoticias.find(i => i.id === id);
        document.getElementById('i-titulo').value = item.titulo;
        document.getElementById('i-desc').value = item.desc;
        document.getElementById('i-urgente').value = item.urgente;
    } else if (tipo === 'memoria') {
        const item = dbMemoria.find(i => i.id === id);
        document.getElementById('i-titulo').value = item.titulo;
        document.getElementById('i-desc').value = item.desc;
        document.getElementById('i-img').value = item.imagem;
    } else if (tipo === 'historico') {
        const item = dbHistorico.find(i => i.id === id);
        document.getElementById('i-nome').value = item.nome;
        document.getElementById('i-titulo').value = item.titulo;
        document.getElementById('i-texto').value = item.texto;
    } else if (tipo === 'conquista') {
        const item = dbConquistas.find(i => i.id === id);
        document.getElementById('i-titulo').value = item.titulo;
        document.getElementById('i-desc').value = item.desc;
    } else if (tipo === 'carta') {
        const item = dbCarta.find(i => i.id === id);
        document.getElementById('i-titulo').value = item.titulo;
        document.getElementById('i-texto').value = item.texto;
    }
}

/* ==========================================================================
   PERSISTÊNCIA DE DADOS (CREATE / UPDATE)
   ========================================================================== */

/**
 * Gerencia a submissão do formulário para salvar novas entradas ou atualizar existentes
 */
function salvarCRUD(event) {
    event.preventDefault();
    const tipo = document.getElementById('form-type').value;
    const idInput = document.getElementById('form-id').value;
    const isEdit = idInput !== '';
    let id;

    // Gerador de ID incremental baseado no timestamp ou no registro anterior
    if (isEdit) {
        id = parseInt(idInput);
    } else {
        let currentDb = [];
        if (tipo === 'produto') currentDb = dbProdutos;
        else if (tipo === 'pauta') currentDb = dbPautas;
        else if (tipo === 'noticia') currentDb = dbNoticias;
        else if (tipo === 'memoria') currentDb = dbMemoria;
        else if (tipo === 'historico') currentDb = dbHistorico;
        else if (tipo === 'conquista') currentDb = dbConquistas;
        else if (tipo === 'carta') currentDb = dbCarta;

        id = currentDb.length > 0 ? Math.max(...currentDb.map(item => item.id)) + 1 : 1;
    }

    // Processamento específico para cada entidade do sistema
    if (tipo === 'produto') {
        const nome = document.getElementById('i-nome').value;
        const preco = parseFloat(document.getElementById('i-preco').value);
        const estoque = parseInt(document.getElementById('i-estoque').value);
        const foto = document.getElementById('i-foto').value;
        
        if (isEdit) {
            const index = dbProdutos.findIndex(i => i.id === id);
            dbProdutos[index] = { id, nome, preco, estoque, foto };
        } else {
            dbProdutos.push({ id, nome, preco, estoque, foto });
        }
    } 
    else if (tipo === 'pauta') {
        const titulo = document.getElementById('i-titulo').value;
        const data = document.getElementById('i-data').value;
        const desc = document.getElementById('i-desc').value;
        const status = document.getElementById('i-status').value;

        if (isEdit) {
            const index = dbPautas.findIndex(i => i.id === id);
            dbPautas[index] = { id, titulo, data, desc, status };
        } else {
            dbPautas.push({ id, titulo, data, desc, status });
        }
    } 
    else if (tipo === 'noticia') {
        const titulo = document.getElementById('i-titulo').value;
        const desc = document.getElementById('i-desc').value;
        const urgente = document.getElementById('i-urgente').value;

        if (isEdit) {
            const index = dbNoticias.findIndex(i => i.id === id);
            dbNoticias[index] = { id, titulo, desc, urgente };
        } else {
            dbNoticias.push({ id, titulo, desc, urgente });
        }
    } 
    else if (tipo === 'memoria') {
        const titulo = document.getElementById('i-titulo').value;
        const desc = document.getElementById('i-desc').value;
        const imagem = document.getElementById('i-img').value;

        if (isEdit) {
            const index = dbMemoria.findIndex(i => i.id === id);
            dbMemoria[index] = { id, titulo, desc, imagem };
        } else {
            dbMemoria.push({ id, titulo, desc, imagem });
        }
    } 
    else if (tipo === 'historico') {
        const nome = document.getElementById('i-nome').value;
        const titulo = document.getElementById('i-titulo').value;
        const texto = document.getElementById('i-texto').value;

        if (isEdit) {
            const index = dbHistorico.findIndex(i => i.id === id);
            dbHistorico[index] = { id, nome, titulo, texto };
        } else {
            dbHistorico.push({ id, nome, titulo, texto });
        }
    } 
    else if (tipo === 'conquista') {
        const titulo = document.getElementById('i-titulo').value;
        const desc = document.getElementById('i-desc').value;

        if (isEdit) {
            const index = dbConquistas.findIndex(i => i.id === id);
            dbConquistas[index] = { id, titulo, desc };
        } else {
            dbConquistas.push({ id, titulo, desc });
        }
    } 
    else if (tipo === 'carta') {
        const titulo = document.getElementById('i-titulo').value;
        const texto = document.getElementById('i-texto').value;

        if (isEdit) {
            const index = dbCarta.findIndex(i => i.id === id);
            dbCarta[index] = { id, titulo, texto };
        } else {
            dbCarta.push({ id, titulo, texto });
        }
    }

    // Feedback visual e atualização das tabelas
    alert(`${tipo.toUpperCase()} ${isEdit ? 'atualizado' : 'criado'} com sucesso!`);
    renderTabelas();
    fecharModal();
}

/* ==========================================================================
   EXCLUSÃO DE REGISTROS (DELETE)
   ========================================================================== */

/**
 * Remove um item do banco de dados simulado após confirmação do usuário
 */
function deletarItem(tipo, id) {
    if(confirm(`Tem certeza que deseja APAGAR o registro #${id}?`)) {
        if (tipo === 'produto') dbProdutos = dbProdutos.filter(p => p.id !== id);
        if (tipo === 'pauta') dbPautas = dbPautas.filter(p => p.id !== id);
        if (tipo === 'noticia') dbNoticias = dbNoticias.filter(p => p.id !== id);
        if (tipo === 'memoria') dbMemoria = dbMemoria.filter(p => p.id !== id);
        if (tipo === 'historico') dbHistorico = dbHistorico.filter(p => p.id !== id);
        if (tipo === 'conquista') dbConquistas = dbConquistas.filter(p => p.id !== id);
        if (tipo === 'carta') dbCarta = dbCarta.filter(p => p.id !== id);
        
        renderTabelas();
    }
}

/* ==========================================================================
   EXCLUSÃO DE REGISTROS (DELETE)
   ========================================================================== */

/**
 * Remove um item do banco de dados simulado após confirmação do usuário
 */
renderTabelas();