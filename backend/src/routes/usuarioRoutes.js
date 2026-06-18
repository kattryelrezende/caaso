// src/routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.put('/:id', usuarioController.atualizarPerfil);
router.put('/:id/senha', usuarioController.alterarSenha);
router.get('/:id', usuarioController.perfil);

module.exports = router;