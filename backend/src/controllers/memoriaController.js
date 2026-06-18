// src/controllers/memoriaController.js
const BaseController = require('./BaseController');
const { Memoria } = require('../models');

const controller = new BaseController(Memoria, {
    order: [['id', 'ASC']],
});

module.exports = {
    listar: controller.listar,
    buscarPorId: controller.buscarPorId,
    criar: controller.criar,
    atualizar: controller.atualizar,
    deletar: controller.deletar,
};