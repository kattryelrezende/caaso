// src/routes/produtoRoutes.js
const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

// Rotas públicas (leitura)
router.get('/', produtoController.listar);
router.get('/:id', produtoController.buscarPorId);

// Rotas protegidas (apenas admin)
router.post('/', authenticate, authorizeAdmin, produtoController.criar);
router.put('/:id', authenticate, authorizeAdmin, produtoController.atualizar);
router.delete('/:id', authenticate, authorizeAdmin, produtoController.deletar);

module.exports = router;