// src/routes/categoriaRoutes.js
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

// Rotas públicas (leitura)
router.get('/', categoriaController.listar);

// Rotas protegidas (apenas admin)
router.post('/', authenticate, authorizeAdmin, categoriaController.criar);

module.exports = router;