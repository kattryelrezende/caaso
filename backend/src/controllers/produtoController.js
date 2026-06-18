// src/controllers/produtoController.js
const BaseController = require('./BaseController');
const { Produto } = require('../models');

const controller = new BaseController(Produto, {
    order: [['id', 'ASC']],
    include: ['categoria'],
});

// Método extra: comprar (diminuir estoque)
controller.comprar = async (req, res) => {
    try {
        const { id } = req.params;
        const { quantidade = 1 } = req.body;
        const produto = await Produto.findByPk(id);
        if (!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
        if (produto.estoque < quantidade) {
            return res.status(400).json({ erro: 'Estoque insuficiente' });
        }
        produto.estoque -= quantidade;
        await produto.save();
        res.json({ mensagem: 'Compra realizada com sucesso', estoque: produto.estoque });
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
    comprar: controller.comprar,
};