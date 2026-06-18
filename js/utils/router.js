// js/utils/router.js
const routes = {
    home: '/pages/home.html',
    pautas: '/pages/pautas.html',
    carta: '/pages/carta.html',
    historico: '/pages/historico.html',
    conquistas: '/pages/conquistas.html',
    loja: '/pages/loja.html',
    login: '/pages/login.html',
    pagamento: '/pages/pagamento.html',
    noticias: '/pages/noticias.html', // NOVO
};

let currentPage = 'home';

export const router = {
    init() {
        window.addEventListener('hashchange', () => {
            this.handleRoute();
        });
        if (!window.location.hash) {
            window.location.hash = '#home';
        } else {
            this.handleRoute();
        }
    },
    handleRoute() {
        const hash = window.location.hash.slice(1) || 'home';
        const page = hash.split('?')[0];
        if (routes[page]) {
            this.loadPage(page);
        } else {
            window.location.hash = '#home';
        }
    },
    async loadPage(page) {
        const url = routes[page];
        if (!url) return;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Página não encontrada');
            const html = await response.text();
            const main = document.getElementById('app-content');
            main.innerHTML = html;
            currentPage = page;
            // Atualizar links ativos
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active-page');
                if (link.dataset.page === page) {
                    link.classList.add('active-page');
                }
            });
            window.dispatchEvent(new CustomEvent('pageLoaded', { detail: { page } }));
        } catch (error) {
            console.error('Erro ao carregar página:', error);
            document.getElementById('app-content').innerHTML = '<p>Erro ao carregar página.</p>';
        }
    },
    getCurrentPage() {
        return currentPage;
    }
};

export function navigateTo(page) {
    window.location.hash = '#' + page;
}