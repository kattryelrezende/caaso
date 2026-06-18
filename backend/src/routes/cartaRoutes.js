// src/routes/cartaRoutes.js
const express = require('express');
const router = express.Router();
const cartaController = require('../controllers/cartaController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

router.get('/', cartaController.listar);
router.get('/ultima', cartaController.obterUltima); // Rota pública para o front-end
router.get('/:id', cartaController.buscarPorId);
router.post('/', authenticate, authorizeAdmin, cartaController.criar);
router.put('/:id', authenticate, authorizeAdmin, cartaController.atualizar);
router.delete('/:id', authenticate, authorizeAdmin, cartaController.deletar);

module.exports = router;