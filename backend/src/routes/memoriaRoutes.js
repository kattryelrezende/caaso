// src/routes/memoriaRoutes.js
const express = require('express');
const router = express.Router();
const memoriaController = require('../controllers/memoriaController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

router.get('/', memoriaController.listar);
router.get('/:id', memoriaController.buscarPorId);
router.post('/', authenticate, authorizeAdmin, memoriaController.criar);
router.put('/:id', authenticate, authorizeAdmin, memoriaController.atualizar);
router.delete('/:id', authenticate, authorizeAdmin, memoriaController.deletar);

module.exports = router;