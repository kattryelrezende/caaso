// src/routes/noticiaRoutes.js
const createBaseRouter = require('./BaseRouter');
const noticiaController = require('../controllers/noticiaController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

module.exports = createBaseRouter(noticiaController, {
    middleware: [authenticate, authorizeAdmin],
});