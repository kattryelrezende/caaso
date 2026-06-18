// src/routes/pautaRoutes.js
const express = require('express');
const router = express.Router();
const pautaController = require('../controllers/pautaController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

router.get('/', pautaController.listar);
router.get('/:id', pautaController.buscarPorId);
router.post('/', authenticate, authorizeAdmin, pautaController.criar);
router.put('/:id', authenticate, authorizeAdmin, pautaController.atualizar);
router.delete('/:id', authenticate, authorizeAdmin, pautaController.deletar);

module.exports = router;