// src/routes/pautaRoutes.js
const createBaseRouter = require('./BaseRouter');
const pautaController = require('../controllers/pautaController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

module.exports = createBaseRouter(pautaController, {
    middleware: [authenticate, authorizeAdmin],
});