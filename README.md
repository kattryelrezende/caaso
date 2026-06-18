# CAASO VIVE! - Plataforma de Gestão e Memória Estudantil (2026)

Projeto desenvolvido para o Centro Acadêmico Armando de Salles Oliveira (CAASO) da USP São Carlos. O sistema integra um portal público com informações históricas e serviços estudantis, além de um painel administrativo para gestão de conteúdo.

## Equipe

- Kattryel Henrique Santos Rezende (15522383)
- Marcos Vinicius Cota Rodrigues da Trindade (15511001)

## Tecnologias Utilizadas

- **Front-end:** HTML5, CSS3, JavaScript (Vanilla) – SPA com roteamento por hash.
- **Back-end:** Node.js, Express, Sequelize (ORM), PostgreSQL.
- **Autenticação:** JWT (JSON Web Tokens) com bcrypt para hash de senhas.
- **Estrutura modular:** pronta para evolução e manutenção.

## Identidade Visual

O design segue a identidade visual do CAASO 2026, com estética street art, colagens urbanas e paleta de cores composta por amarelo, preto e vermelho.

## Funcionalidades Implementadas

### Portal do Estudante

- Memória Viva: visualizador de fotos históricas com descrições (dados vindos da API).
- Mural de Pautas: acompanhamento de assembleias e ofícios (dados da API).
- Lojinha: catálogo de produtos com busca e reserva mock (dados da API).
- Arquivo Histórico: galeria de documentos com modais interativos (dados da API).
- Mural de Notícias: exibição de comunicados e eventos (dados da API).
- Serviços ao Estudante: lista de serviços gerenciáveis pelo admin (dados da API).
- Área do Sócio: cadastro com e-mail obrigatório, curso opcional, e fluxo de pagamento mock. Login com JWT.
- Edição de Perfil: usuário pode atualizar nome, e-mail, curso e senha.

### Painel Administrativo

- CRUD completo para: Pautas, Produtos, Notícias, Memória Viva, Arquivo Histórico, Conquistas, Carta da Gestão e Serviços.
- Autenticação JWT com verificação de papel (admin).
- Interface responsiva com navegação por abas.
- Proteção de rotas no front-end e back-end.

## Estrutura de Pastas

```
/
├── index.html                 # SPA principal (front-end)
├── admin.html                 # Painel administrativo
├── admin-login.html           # Login do administrador
├── css/                       # Estilos modulares
├── js/                        # Módulos JavaScript
│   ├── data/                  # Dados mockados (legado)
│   ├── services/              # Serviços (API, autenticação)
│   ├── components/            # Renderizadores de UI
│   └── utils/                 # Utilitários (roteador, DOM)
├── pages/                     # Parciais HTML (carregados via SPA)
├── img/                       # Imagens e ícones
├── backend/                   # Back-end Node.js + Express
│   ├── src/
│   │   ├── config/            # Configurações (banco, auth)
│   │   ├── models/            # Models do Sequelize
│   │   ├── controllers/       # Lógica das rotas
│   │   ├── routes/            # Definição de rotas
│   │   ├── middleware/        # Middlewares (auth, validação)
│   │   └── app.js             # Configuração do Express
│   ├── server.js              # Ponto de entrada
│   ├── .env                   # Variáveis de ambiente (não versionado)
│   └── package.json
└── README.md
```

## Como Executar (Desenvolvimento)

### Pré-requisitos

- Node.js (v18+)
- PostgreSQL (v14+)
- Git

### Passos

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd caaso
   ```

2. **Configure o banco de dados**
   - Crie um banco PostgreSQL (ex: `caaso`).
   - Anote as credenciais (usuário, senha, host, porta).

3. **Configure o back-end**
   ```bash
   cd backend
   cp .env.example .env   # (crie um .env.example com as variáveis)
   ```
   Edite o `.env` com suas credenciais:
   ```text
   PORT=3000
   NODE_ENV=development
   DATABASE_URL=postgres://usuario:senha@localhost:5432/caaso
   JWT_SECRET=uma_chave_secreta_forte
   ```
4. **Instale as dependências e inicie o servidor**
   ```bash
   npm install
   npm run dev
   ```
   O servidor será iniciado em `http://localhost:3000`. O Sequelize criará automaticamente as tabelas (se não existirem).
5. **Crie um usuário administrador**
   - Via `curl` ou Postman:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"nome":"Admin CAASO","nusp":"123456","email":"admin@caaso.usp.br","senha":"admin123","tipo":"admin"}'
   ```
   - Credenciais de acesso: NUSP `123456`, senha `admin123`.

6. **Configure o front-end**
   - O front-end já está configurado para apontar para `http://localhost:3000/api` (veja `js/services/api.js`).
   - Abra o projeto em um servidor local (ex: Live Server do VS Code) ou sirva os arquivos estaticamente.
   - Acesse `http://localhost:5500` (ou a porta do seu servidor).

7. **Acesse o painel administrativo**
   - Vá para `http://localhost:5500/admin-login.html`.
   - Use as credenciais do administrador criado.

## Credenciais de Teste

- **Administrador:** NUSP `123456`, senha `admin123` (criado via seed, ou via comando curl).
- **Sócio comum:** cadastre-se via portal (Área do Sócio) com um NUSP e senha.

## Observações

- O back-end utiliza `sequelize.sync({ alter: true })` em desenvolvimento, que ajusta as tabelas automaticamente. Em produção, recomenda-se usar migrations.
- Os dados iniciais (categorias, produtos, etc.) podem ser inseridos via API ou pelo painel admin.
- O front-end consome a API real; os dados mockados em `js/data/` são mantidos apenas como referência.

## Licença

Projeto acadêmico – uso restrito ao contexto da disciplina.