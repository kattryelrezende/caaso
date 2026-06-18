// src/routes/produtoRoutes.js
const createBaseRouter = require('./BaseRouter');
const produtoController = require('../controllers/produtoController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = createBaseRouter(produtoController, {
    middleware: [authenticate, authorizeAdmin],
    extraRoutes: [
        {
            method: 'post',
            path: '/:id/comprar',
            middleware: [authenticate], // qualquer usuário logado pode comprar
            handler: produtoController.comprar,
        },
    ],
});

// Rotas públicas (GET)
// Já são expostas pelo BaseRouter antes do middleware.

module.exports = router;