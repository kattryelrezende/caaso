// src/controllers/pautaController.js
const { Pauta } = require('../models');

exports.listar = async (req, res) => {
    try {
        const pautas = await Pauta.findAll({ order: [['data', 'DESC']] });
        res.json(pautas);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pauta = await Pauta.findByPk(id);
        if (!pauta) return res.status(404).json({ erro: 'Pauta não encontrada' });
        res.json(pauta);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.criar = async (req, res) => {
    try {
        const { titulo, data, status, descricao } = req.body;
        const pauta = await Pauta.create({ titulo, data, status, descricao });
        res.status(201).json(pauta);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, data, status, descricao } = req.body;
        const pauta = await Pauta.findByPk(id);
        if (!pauta) return res.status(404).json({ erro: 'Pauta não encontrada' });
        await pauta.update({ titulo, data, status, descricao });
        res.json(pauta);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.deletar = async (req, res) => {
    try {
        const { id } = req.params;
        const pauta = await Pauta.findByPk(id);
        if (!pauta) return res.status(404).json({ erro: 'Pauta não encontrada' });
        await pauta.destroy();
        res.json({ mensagem: 'Pauta removida' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};