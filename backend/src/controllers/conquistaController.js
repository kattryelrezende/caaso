// src/controllers/conquistaController.js
const { Conquista } = require('../models');

exports.listar = async (req, res) => {
    try {
        const conquistas = await Conquista.findAll({ order: [['ano', 'DESC']] });
        res.json(conquistas);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const conquista = await Conquista.findByPk(id);
        if (!conquista) return res.status(404).json({ erro: 'Conquista não encontrada' });
        res.json(conquista);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.criar = async (req, res) => {
    try {
        const { titulo, descricao, ano } = req.body;
        const conquista = await Conquista.create({ titulo, descricao, ano });
        res.status(201).json(conquista);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, ano } = req.body;
        const conquista = await Conquista.findByPk(id);
        if (!conquista) return res.status(404).json({ erro: 'Conquista não encontrada' });
        await conquista.update({ titulo, descricao, ano });
        res.json(conquista);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.deletar = async (req, res) => {
    try {
        const { id } = req.params;
        const conquista = await Conquista.findByPk(id);
        if (!conquista) return res.status(404).json({ erro: 'Conquista não encontrada' });
        await conquista.destroy();
        res.json({ mensagem: 'Conquista removida' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};