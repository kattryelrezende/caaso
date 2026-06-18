// src/controllers/historicoController.js
const BaseController = require('./BaseController');
const { Historico } = require('../models');

const controller = new BaseController(Historico, {
    order: [['id', 'ASC']],
    // Não inclui data no update? O BaseController usa req.body, então data será atualizada
});

module.exports = {
    listar: controller.listar,
    buscarPorId: controller.buscarPorId,
    criar: controller.criar,
    atualizar: controller.atualizar,
    deletar: controller.deletar,
};