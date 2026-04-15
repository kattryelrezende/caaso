# CAASO VIVE! - Plataforma de Gestão e Memória Estudantil (2026)

Este projeto consiste em uma plataforma web completa desenvolvida para o **Centro Acadêmico Armando de Salles Oliveira (CAASO)** da USP São Carlos. O sistema integra um portal público focado em história, cultura e serviços estudantis, além de um painel administrativo robusto para a gestão de conteúdo dinâmico da entidade.

## 👥 Equipe
Projeto desenvolvido de forma colaborativa por:
* **Kattryel Henrique Santos Rezende** (15522383)
* **Marcos Vinicius Cota Rodrigues da Trindade** (15511001)

## 🛠️ Especificações Técnicas
A arquitetura do projeto foi estruturada com foco inicial em um Front-End altamente interativo, seguindo as exigências da disciplina:

* **Linguagens:** HTML5, CSS3 e JavaScript (Vanilla).
* **Design System:** Identidade Visual CAASO 2026, baseada em estética *street art*, colagens urbanas e paleta vibrante (Amarelo, Preto e Vermelho).
* **Desenvolvimento Inicial:** Mockups de banco de dados via vetores de objetos JavaScript para simular o comportamento de um sistema real em tempo de execução.
* **Futuras Integrações:** Estrutura preparada para integração com **Node.js**, **Express** e banco de dados **PostgreSQL** via **Sequelize**.

## 🖼️ Identidade Visual e UI/UX
Seguindo a documentação da gestão atual, o site incorpora:
* **Estética Lambe-Lambe:** Mural de notícias com miniaturas que remetem a cartazes urbanos e tipografia extra-bold.
* **Filtros Duotone:** Imagens históricas processadas via CSS com tons amarelados para reforçar a memória e o estilo de colagem.
* **Elementos de Apoio:** Uso das variações da Minerva (geométrica e tipográfica) integradas ao layout.
* **Interatividade Street:** Galerias com overlays opacos, texturas de respingos de tinta e animações de deslizamento (*hover*).

## 🚀 Funcionalidades Implementadas

### Portal do Estudante
* **Memória Viva:** Visualizador dinâmico de fotos históricas com descrições selecionáveis via dropdown.
* **Mural de Pautas:** Acompanhamento em tempo real do status de assembleias e ofícios (Aprovado, Em Andamento, Rejeitado).
* **Lojinha:** Catálogo de produtos dos kits com visualização em grid quadrado e sistema de reserva simulado.
* **Arquivo Histórico:** Galeria de documentos com sistema de modais responsivos para leitura detalhada de atas e registros.
* **Área do Sócio:** Sistema de autenticação (Login/Cadastro) com alternância dinâmica de formulários e painel de benefícios.

### Painel de Gestão (Admin)
Dashboard completo para administração da entidade, permitindo operações de **CRUD** (Create, Read, Update, Delete) com formulários gerados dinamicamente para:
* Pautas e Assembleias.
* Produtos da Lojinha (Controle de estoque e preços).
* Mural de Notícias Urgentes.
* Registros da Memória Viva e Arquivo Histórico.
* Linha do tempo de Conquistas.

## 📂 Estrutura do Projeto
```text
├── index.html          # Home com Manifesto, Serviços e Galeria CAASO Vive
├── pautas.html         # Portal de acompanhamento de demandas
├── loja.html           # Interface da lojinha de produtos
├── historico.html      # Arquivo de memória documental
├── conquistas.html     # Linha do tempo de marcos históricos
├── login.html          # Cadastro e login de sócios
├── admin.html          # Painel Administrativo de gestão
├── style.css           # Estilização global e regras de responsividade
├── script.js           # Lógica do portal e renderização dinâmica
├── admin.js            # Motor do CRUD e gestão de dados do painel
└── img/                # Assets, fotos históricas e logos oficiais
```

## 📱 Responsividade
O sistema foi otimizado para múltiplos dispositivos:

* **Desktop:** Layout em grid multi-colunas com sidebar fixa no painel admin.
* **Mobile:** Navegação adaptativa com menu lateral toggle no portal e menu horizontal rolável no painel de gestão, garantindo usabilidade em qualquer tamanho de tela.