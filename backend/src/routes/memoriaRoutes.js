// src/routes/memoriaRoutes.js
const createBaseRouter = require('./BaseRouter');
const memoriaController = require('../controllers/memoriaController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

module.exports = createBaseRouter(memoriaController, {
    middleware: [authenticate, authorizeAdmin],
});