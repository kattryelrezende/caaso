// src/controllers/servicoController.js
const BaseController = require('./BaseController');
const { Servico } = require('../models');

// Sobrescrever listar para filtrar apenas ativos
class ServicoController extends BaseController {
    constructor() {
        super(Servico, { order: [['ordem', 'ASC']] });
    }

    listar = async (req, res) => {
        try {
            const servicos = await this.model.findAll({
                where: { ativo: true },
                order: this.order,
            });
            res.json(servicos);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    };
}

const controller = new ServicoController();

module.exports = {
    listar: controller.listar,
    buscarPorId: controller.buscarPorId,
    criar: controller.criar,
    atualizar: controller.atualizar,
    deletar: controller.deletar,
};