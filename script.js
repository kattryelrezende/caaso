/* ==========================================================================
   BASE DE DADOS - MOCK DATA
   ========================================================================== */

/**
 * Dados para o Mural de Pautas
 */
const dadosPautas = [
    { titulo: "Aumento do Auxílio Alimentação", data: "12 Abril 2026", status: "Em Andamento", desc: "Reivindicação enviada à prefeitura do campus solicitando reajuste conforme inflação." },
    { titulo: "Reforma do Alojamento", data: "05 Abril 2026", status: "Aprovado", desc: "Verba liberada para manutenção da fiação elétrica do bloco C." },
    { titulo: "Assembleia Geral Extraordinária", data: "28 Março 2026", status: "Concluído", desc: "Discussão sobre o novo estatuto e diretrizes da gestão atual." }
];

/**
 * Dados para a Lojinha do CAASO
 */
const dadosProdutos = [
    { 
        id: 1, 
        nome: "Camiseta CAASO Vive! (Kit 2026)", 
        preco: 50.00, 
        img: "img/camisa.jpg", 
        estoque: 120 
    },
    { 
        id: 2, 
        nome: "Caneca + Tirante (Kit 2026)", 
        preco: 35.00, 
        img: "img/caneta-tirante.jpg", 
        estoque: 80 
    },
    { 
        id: 3, 
        nome: "Camiseta Minerva (Kit 2024)", 
        preco: 45.00, 
        img: "img/camiseta2.png", 
        estoque: 15 
    },
    { 
        id: 4, 
        nome: "Caneca + Tirante (Kit 2024)", 
        preco: 25.00, 
        img: "img/caneca-tirante2.png", 
        estoque: 8 
    }
];

/**
 * Dados para a Linha do Tempo de Conquistas
 */
const dadosConquistas = [
    { 
        ano: "2024", 
        titulo: "Tricampeonato Consecutivo da Tusca", 
        desc: "O CAASO consagrou-se campeão da Taça Universitária de São Carlos (TUSCA) pelo terceiro ano seguido, alcançando a marca histórica de 8 títulos na competição desde sua criação." 
    },
    { 
        ano: "2024", 
        titulo: "70 Anos de História e Resistência", 
        desc: "Celebração das sete décadas de fundação do Centro Acadêmico, marcada por uma exposição histórica na Biblioteca da EESC, resgatando a memória política, esportiva e cultural da entidade." 
    },
    { 
        ano: "2013", 
        titulo: "Fim da Greve Estudantil e Conquistas", 
        desc: "Após forte mobilização e ocupação, os estudantes conquistaram a abertura de negociações para liberação de mais verbas e melhorias estruturais para o campus e para a entidade." 
    },
    { 
        ano: "2011", 
        titulo: "Mobilização em Defesa do Campus", 
        desc: "Grande ato político realizado em 26 de outubro, que reuniu mais de 200 estudantes contra a proibição de bebidas no campus, defendendo a autonomia dos espaços de vivência universitária." 
    },
    { 
        ano: "2007", 
        titulo: "Greve contra Decretos Privatistas", 
        desc: "Mobilização histórica ao lado de outros diretórios em defesa do ensino público de qualidade e contra os decretos do então governador que ameaçavam a autonomia universitária da USP." 
    },
    { 
        ano: "1970s", 
        titulo: "Resistência à Ditadura e Refundação do DCE", 
        desc: "O CAASO consolidou-se como um dos maiores centros acadêmicos da América Latina, tendo papel central na resistência ao regime militar e na refundação do DCE Livre da USP Alexandre Vannucchi Leme." 
    },
    { 
        ano: "1953", 
        titulo: "A Fundação", 
        desc: "Fundado em 22 de abril pela primeira turma de engenharia da EESC, nascia o órgão representativo que carregaria o nome do criador da USP e seria o pilar do movimento estudantil em São Carlos." 
    }
];

/**
 * Dados para o visualizador Memória Viva
 */
const dadosMemoria = [
    {
        img: "img/tuscaaso2023.png",
        titulo: "TUSCAASO 2023",
        desc: "A vibração e a força da torcida no Tuscaaso 2023, mostrando a união e a paixão dos estudantes nos momentos de esporte, integração e representação do nosso campus."
    },
    {
        img: "img/assembleia2012.jpg",
        titulo: "ASSEMBLEIA CONTRA A DITADURA",
        desc: "Ampla participação dos estudantes na assembleia de 2012, reafirmando o compromisso do CAASO com a democracia, a liberdade de expressão e a luta contínua contra qualquer resquício de autoritarismo."
    },
    {
        img: "img/mobilizacao2011.jpg",
        titulo: "MOBILIZAÇÃO DE 26/10/2011",
        desc: "Grande mobilização estudantil contra a proibição de bebidas no campus. O ato contou com a presença de mais de 200 estudantes em defesa de seus espaços de vivência, cultura e autonomia universitária."
    }
];

/**
 * Dados detalhados para o Modal do Arquivo Histórico
 */
const dadosArquivoHistorico = {
    "greve1990": {
        titulo: "GREVE ESTUDANTIL DE 1990",
        img: "https://placehold.co/400x300/000000/FFFFFF?text=Greve+Estudantil",
        texto: `
            <p>Em 1990, os estudantes da USP São Carlos protagonizaram uma das maiores paralisações da história do campus, exigindo a contratação imediata de novos professores e melhorias na infraestrutura dos laboratórios.</p>
            <p>O movimento foi marcado por assembleias diárias em frente à sede do CAASO, consolidando o centro acadêmico como o principal articulador político da época.</p>
            <p><strong>Documento nº 45/1990 - Arquivo Geral do CAASO.</strong></p>
        `
    },
    "reforma": {
        titulo: "CONSTRUÇÃO DA SEDE",
        img: "https://placehold.co/400x300/000000/FFFFFF?text=Reforma+CAASO",
        texto: `
            <p>A consolidação do espaço físico do CAASO não veio de doações, mas do suor e organização dos próprios estudantes. Através de mutirões e campanhas de arrecadação na cidade, o galpão que hoje abriga a sede ganhou forma.</p>
            <p>Esta foto registra o dia em que o telhado do salão principal foi finalizado, garantindo um espaço independente para reuniões, festas e vivência cultural.</p>
        `
    },
    "fundacao": {
        titulo: "ATA DE FUNDAÇÃO (1953)",
        img: "https://placehold.co/400x300/000000/FFFFFF?text=Documento+Oficial",
        texto: `
            <p><em>"Aos 22 dias do mês de abril de 1953, reunidos os alunos da primeira turma da Escola de Engenharia de São Carlos..."</em></p>
            <p>Este é o trecho inicial do documento mais importante da nossa história. Escrito à máquina, ele oficializa a criação do Centro Acadêmico Armando de Salles Oliveira, batizado em homenagem ao criador da Universidade de São Paulo.</p>
            <p>A ata original encontra-se emoldurada na sala da diretoria.</p>
        `
    },
    "passeata2015": {
        titulo: "PASSEATA PELA PERMANÊNCIA",
        img: "https://placehold.co/400x300/000000/FFFFFF?text=Movimento+Estudantil",
        texto: `
            <p>O ano de 2015 foi marcado por intensos debates sobre as cotas sociais e raciais na universidade. O CAASO liderou uma grande passeata até a reitoria, paralisando o trânsito do centro de São Carlos.</p>
            <p>As reivindicações garantiram o comprometimento da diretoria do campus com a expansão imediata das vagas de moradia estudantil (Aloja) e a manutenção do valor do Bandejão.</p>
        `
    }
};

/* ==========================================================================
   CONTROLE DE MODAIS (ARQUIVO HISTÓRICO)
   ========================================================================== */

/**
 * Abre o modal histórico e popula com os dados da chave informada
 */
function abrirModalHistorico(idArquivo) {
    const modal = document.getElementById('modal-historico');
    const dados = dadosArquivoHistorico[idArquivo];

    if (dados && modal) {
        document.getElementById('modal-img').src = dados.img;
        document.getElementById('modal-titulo').innerText = dados.titulo;
        document.getElementById('modal-corpo').innerHTML = dados.texto;

        modal.classList.remove('hidden');
    }
}

/**
 * Fecha o modal histórico adicionando a classe 'hidden'
 */
function fecharModalHistorico() {
    const modal = document.getElementById('modal-historico');
    if (modal) {
        modal.classList.add('hidden');
    }
}

/**
 * Listener global para fechar o modal ao clicar na área externa (overlay)
 */
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal-historico');
    if (event.target === modal) {
        fecharModalHistorico();
    }
});

/* ==========================================================================
   INTERATIVIDADE (PÁGINA INICIAL)
   ========================================================================== */

/**
 * Altera a imagem e os textos da seção Memória Viva com base no Select
 */
function mudarFotoMemoria() {
    const select = document.getElementById("foto-select");
    if(!select) return;
    
    const index = select.value;
    const dadoSelecionado = dadosMemoria[index];
    const imgElement = document.getElementById("memoria-img");
    
    imgElement.style.opacity = 0;
    
    setTimeout(() => {
        imgElement.src = dadoSelecionado.img;
        document.getElementById("memoria-titulo").innerText = dadoSelecionado.titulo;
        document.getElementById("memoria-desc").innerText = dadoSelecionado.desc;
        imgElement.style.opacity = 1;
    }, 150);
}

/**
 * Alterna a visibilidade do menu de navegação em dispositivos móveis
 */
function toggleMenu() {
    const navMenu = document.getElementById('nav-links');
    navMenu.classList.toggle('active');
}

/* ==========================================================================
   RENDERIZAÇÃO DINÂMICA DE CONTEÚDO
   ========================================================================== */

/**
 * Gera os cards do Mural de Pautas no container específico
 */
function renderPautas() {
    const container = document.getElementById('pautas-container');
    if (!container) return;

    container.innerHTML = '';
    dadosPautas.forEach(pauta => {
        const card = document.createElement('div');
        card.className = 'card-street';
        card.innerHTML = `
            <span class="status-badge">${pauta.status}</span>
            <h3>${pauta.titulo}</h3>
            <p><strong>Data:</strong> ${pauta.data}</p>
            <p>${pauta.desc}</p>
        `;
        container.appendChild(card);
    });
}

/* ==========================================================================
   RENDERIZAÇÃO DINÂMICA DE CONTEÚDO
   ========================================================================== */

/**
 * Gera os itens da Lojinha com suporte a filtragem (Barra de Pesquisa)
 * @param {Array} produtosParaExibir - Lista opcional de produtos para renderizar
 */
function renderLoja(produtosParaExibir = dadosProdutos) {
    const container = document.getElementById('loja-container');
    if (!container) return;

    container.innerHTML = '';

    // Verifica se existem produtos após o filtro
    if (produtosParaExibir.length === 0) {
        container.innerHTML = '<p class="text-center" style="grid-column: 1/-1; font-size: 1.5rem; font-family: var(--font-title);">Nenhum produto encontrado.</p>';
        return;
    }

    produtosParaExibir.forEach(produto => {
        const card = document.createElement('div');
        card.className = 'card-street';
        card.innerHTML = `
            <div style="width: 100%; aspect-ratio: 1 / 1; border: 4px solid var(--caaso-black); margin-bottom: 1rem; overflow: hidden; background-color: var(--caaso-white);">
                <img src="${produto.img}" alt="${produto.nome}" style="width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.3s ease;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
            </div>
            
            <h3>${produto.nome}</h3>
            <p style="font-size: 1.5rem; font-weight: bold; font-family: var(--font-title); color: var(--caaso-red);">R$ ${produto.preco.toFixed(2)}</p>
            <p style="font-weight: bold;">Estoque: ${produto.estoque} un.</p>
            <button class="btn-primary" style="margin-top: 1rem; width: 100%;" onclick="reservarProduto(${produto.id})">COMPRAR / RESERVAR</button>
        `;
        container.appendChild(card);
    });
}

/**
 * Lógica da Barra de Pesquisa
 */
function configurarPesquisa() {
    const inputPesquisa = document.getElementById('search-produto');
    if (!inputPesquisa) return;

    inputPesquisa.addEventListener('input', (e) => {
        const termo = e.target.value.toLowerCase();
        
        // Filtra os produtos cujo nome contém o termo pesquisado
        const produtosFiltrados = dadosProdutos.filter(produto => 
            produto.nome.toLowerCase().includes(termo)
        );

        renderLoja(produtosFiltrados);
    });
}

/**
 * Gera a lista de conquistas históricas (Timeline)
 */
function renderConquistas() {
    const container = document.getElementById('conquistas-container');
    if (!container) return;

    container.innerHTML = '';
    dadosConquistas.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3 style="color: var(--caaso-red);">${item.ano} - ${item.titulo}</h3>
            <p>${item.desc}</p>
        `;
        container.appendChild(li);
    });
}

/* ==========================================================================
   LÓGICA DE NEGÓCIO E AUTENTICAÇÃO (MOCKUP)
   ========================================================================== */

/**
 * Simula a reserva de um produto da lojinha
 */
function reservarProduto(id) {
    const produto = dadosProdutos.find(p => p.id === id);
    alert(`Mockup: O produto ${produto.nome} foi adicionado à sua reserva para retirada na sede.`);
}

/**
 * Alterna entre as seções de Login e Cadastro na Área do Sócio
 */
function toggleForms(event) {
    event.preventDefault();
    const loginSec = document.getElementById('login-section');
    const regSec = document.getElementById('register-section');

    if (loginSec.classList.contains('hidden')) {
        loginSec.classList.remove('hidden');
        regSec.classList.add('hidden');
    } else {
        loginSec.classList.add('hidden');
        regSec.classList.remove('hidden');
    }
}

/**
 * Validação simulada de login via Número USP
 */
function handleLogin(event) {
    event.preventDefault(); 
    const nusp = document.getElementById('nusp-login').value;
    
    if(nusp.length > 5) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('perfil-socio').classList.remove('hidden');
    } else {
        alert("Número USP inválido. (Use qualquer número com mais de 5 dígitos para testar)");
    }
}

/**
 * Registro simulado de novo sócio
 */
function handleRegister(event) {
    event.preventDefault();
    const nome = document.getElementById('nome-reg').value;
    const nusp = document.getElementById('nusp-reg').value;

    if(nusp.length > 5) {
        alert(`Sucesso! A conta para ${nome} (N-USP: ${nusp}) foi criada. Na Parte 2 do projeto, isso será salvo no PostgreSQL.`);
        document.getElementById('register-section').classList.add('hidden');
        document.getElementById('perfil-socio').classList.remove('hidden');
    } else {
        alert("Preencha um Número USP válido.");
    }
}

/**
 * Finaliza a sessão do usuário e reseta os formulários
 */
function logout() {
    document.getElementById('perfil-socio').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('login-form').reset();
    document.getElementById('register-form').reset();
}

/* ==========================================================================
   INICIALIZAÇÃO DE SCRIPTS
   ========================================================================== */

renderPautas();
renderLoja();
configurarPesquisa();
renderConquistas();
mudarFotoMemoria();