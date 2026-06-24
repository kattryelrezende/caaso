// backend/src/routes/forumRoutes.js
const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const { authenticate, optionalAuth, authorizeAdmin } = require('../middleware/auth');

// Rotas Públicas (Leitura) – com autenticação opcional para saber quem é o usuário
router.get('/topicos', optionalAuth, forumController.listarTopicos);
router.get('/topicos/:id', optionalAuth, forumController.obterTopicoComComentarios);

// Rotas Protegidas (exigem login)
router.post('/topicos', authenticate, forumController.criarTopico);
router.post('/topicos/:id/comentarios', authenticate, forumController.criarComentario);
router.post('/topicos/:id/curtir', authenticate, forumController.curtirTopico);
router.delete('/topicos/:id', authenticate, forumController.deletarTopico);

// Rotas exclusivas para admin
router.get('/admin/topicos', authenticate, authorizeAdmin, forumController.listarTopicosAdmin);
router.put('/topicos/:id/arquivar', authenticate, authorizeAdmin, forumController.arquivarTopico);
router.put('/topicos/:id/trancar', authenticate, authorizeAdmin, forumController.trancarTopico);
router.put('/topicos/:id/reabrir', authenticate, authorizeAdmin, forumController.reabrirTopico);

module.exports = router;