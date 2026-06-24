const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');
const { authenticate } = require('../middleware/auth');

// Rotas Públicas (Leitura)
router.get('/topicos', forumController.listarTopicos);
router.get('/topicos/:id', forumController.obterTopicoComComentarios);

// Rotas Protegidas (Exigem login)
router.post('/topicos', authenticate, forumController.criarTopico);
router.post('/topicos/:id/comentarios', authenticate, forumController.criarComentario);
router.post('/topicos/:id/curtir', authenticate, forumController.curtirTopico);

module.exports = router;