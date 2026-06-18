// src/controllers/noticiaController.js
const BaseController = require('./BaseController');
const { Noticia } = require('../models');

const controller = new BaseController(Noticia, {
    order: [['criado_em', 'DESC']],
});

module.exports = {
    listar: controller.listar,
    buscarPorId: controller.buscarPorId,
    criar: controller.criar,
    atualizar: controller.atualizar,
    deletar: controller.deletar,
};