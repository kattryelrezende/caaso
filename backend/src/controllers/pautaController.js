// src/controllers/pautaController.js
const BaseController = require('./BaseController');
const { Pauta } = require('../models');

const controller = new BaseController(Pauta, {
    order: [['data', 'DESC']],
});

module.exports = {
    listar: controller.listar,
    buscarPorId: controller.buscarPorId,
    criar: controller.criar,
    atualizar: controller.atualizar,
    deletar: controller.deletar,
};