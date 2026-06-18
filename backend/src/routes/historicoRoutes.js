// src/routes/historicoRoutes.js
const express = require('express');
const router = express.Router();
const historicoController = require('../controllers/historicoController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

router.get('/', historicoController.listar);
router.get('/:id', historicoController.buscarPorId);
router.post('/', authenticate, authorizeAdmin, historicoController.criar);
router.put('/:id', authenticate, authorizeAdmin, historicoController.atualizar);
router.delete('/:id', authenticate, authorizeAdmin, historicoController.deletar);

module.exports = router;