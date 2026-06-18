// src/routes/cartaRoutes.js
const createBaseRouter = require('./BaseRouter');
const cartaController = require('../controllers/cartaController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

const router = createBaseRouter(cartaController, {
    middleware: [authenticate, authorizeAdmin],
    extraRoutes: [
        {
            method: 'get',
            path: '/ultima',
            middleware: [], // pública
            handler: cartaController.obterUltima,
        },
    ],
});

module.exports = router;