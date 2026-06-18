// src/routes/conquistaRoutes.js
const express = require('express');
const router = express.Router();
const conquistaController = require('../controllers/conquistaController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

router.get('/', conquistaController.listar);
router.get('/:id', conquistaController.buscarPorId);
router.post('/', authenticate, authorizeAdmin, conquistaController.criar);
router.put('/:id', authenticate, authorizeAdmin, conquistaController.atualizar);
router.delete('/:id', authenticate, authorizeAdmin, conquistaController.deletar);

module.exports = router;