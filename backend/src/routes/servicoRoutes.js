// src/routes/servicoRoutes.js
const createBaseRouter = require('./BaseRouter');
const servicoController = require('../controllers/servicoController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

// O BaseRouter já aplica o middleware para POST, PUT, DELETE.
// As rotas GET são públicas.
module.exports = createBaseRouter(servicoController, {
    middleware: [authenticate, authorizeAdmin],
});