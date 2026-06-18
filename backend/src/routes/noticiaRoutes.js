// src/routes/noticiaRoutes.js
const express = require('express');
const router = express.Router();
const noticiaController = require('../controllers/noticiaController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

router.get('/', noticiaController.listar);
router.get('/:id', noticiaController.buscarPorId);
router.post('/', authenticate, authorizeAdmin, noticiaController.criar);
router.put('/:id', authenticate, authorizeAdmin, noticiaController.atualizar);
router.delete('/:id', authenticate, authorizeAdmin, noticiaController.deletar);

module.exports = router;