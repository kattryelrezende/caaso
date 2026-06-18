// src/routes/categoriaRoutes.js
const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const { authenticate, authorizeAdmin } = require('../middleware/auth');

// Rota pública (GET)
router.get('/', categoriaController.listar);

// Rota protegida (POST)
router.post('/', authenticate, authorizeAdmin, categoriaController.criar);

module.exports = router;