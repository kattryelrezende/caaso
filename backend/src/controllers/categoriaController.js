// src/controllers/categoriaController.js
const BaseController = require('./BaseController');
const { Categoria } = require('../models');

const controller = new BaseController(Categoria, {
    order: [['nome', 'ASC']],
});

// Sobrescrever o método `criar` para validar duplicidade (mantido)
controller.criar = async (req, res) => {
    try {
        const { nome } = req.body;
        if (!nome) {
            return res.status(400).json({ erro: 'Nome da categoria é obrigatório' });
        }
        const categoria = await Categoria.create({ nome });
        res.status(201).json(categoria);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ erro: 'Categoria já existe' });
        }
        res.status(400).json({ erro: error.message });
    }
};

module.exports = {
    listar: controller.listar,
    criar: controller.criar,
};