// src/routes/historicoRoutes.js
const createBaseRouter = require('./BaseRouter');
const historicoController = require('../controllers/historicoController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

module.exports = createBaseRouter(historicoController, {
    middleware: [authenticate, authorizeAdmin],
});