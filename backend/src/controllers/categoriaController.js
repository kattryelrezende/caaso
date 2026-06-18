// src/controllers/categoriaController.js
const { Categoria } = require('../models');

exports.listar = async (req, res) => {
    try {
        const categorias = await Categoria.findAll({
            order: [['nome', 'ASC']],
        });
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.criar = async (req, res) => {
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