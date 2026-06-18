// src/controllers/memoriaController.js
const { Memoria } = require('../models');

exports.listar = async (req, res) => {
    try {
        const memorias = await Memoria.findAll({ order: [['id', 'ASC']] });
        res.json(memorias);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const memoria = await Memoria.findByPk(id);
        if (!memoria) return res.status(404).json({ erro: 'Registro não encontrado' });
        res.json(memoria);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.criar = async (req, res) => {
    try {
        const { titulo, descricao, img } = req.body;
        const memoria = await Memoria.create({ titulo, descricao, img });
        res.status(201).json(memoria);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, img } = req.body;
        const memoria = await Memoria.findByPk(id);
        if (!memoria) return res.status(404).json({ erro: 'Registro não encontrado' });
        await memoria.update({ titulo, descricao, img });
        res.json(memoria);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.deletar = async (req, res) => {
    try {
        const { id } = req.params;
        const memoria = await Memoria.findByPk(id);
        if (!memoria) return res.status(404).json({ erro: 'Registro não encontrado' });
        await memoria.destroy();
        res.json({ mensagem: 'Registro removido' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};