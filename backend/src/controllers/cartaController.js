// src/controllers/cartaController.js
const BaseController = require('./BaseController');
const { Carta } = require('../models');

const controller = new BaseController(Carta, {
    order: [['criado_em', 'DESC']],
});

// Método extra: obter a carta mais recente
controller.obterUltima = async (req, res) => {
    try {
        const carta = await Carta.findOne({ order: [['criado_em', 'DESC']] });
        if (!carta) return res.status(404).json({ erro: 'Nenhuma carta encontrada' });
        res.json(carta);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

module.exports = {
    listar: controller.listar,
    buscarPorId: controller.buscarPorId,
    criar: controller.criar,
    atualizar: controller.atualizar,
    deletar: controller.deletar,
    obterUltima: controller.obterUltima,
};