// src/routes/conquistaRoutes.js
const createBaseRouter = require('./BaseRouter');
const conquistaController = require('../controllers/conquistaController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

module.exports = createBaseRouter(conquistaController, {
    middleware: [authenticate, authorizeAdmin],
});