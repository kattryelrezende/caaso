// src/controllers/conquistaController.js
const BaseController = require('./BaseController');
const { Conquista } = require('../models');

const controller = new BaseController(Conquista, {
    order: [
        ['data', 'DESC NULLS LAST'],
        ['ano', 'DESC'],
    ],
});

module.exports = {
    listar: controller.listar,
    buscarPorId: controller.buscarPorId,
    criar: controller.criar,
    atualizar: controller.atualizar,
    deletar: controller.deletar,
};