// src/controllers/historicoController.js
const { Historico } = require('../models');

exports.listar = async (req, res) => {
    try {
        const historicos = await Historico.findAll({ order: [['id', 'ASC']] });
        res.json(historicos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const historico = await Historico.findByPk(id);
        if (!historico) return res.status(404).json({ erro: 'Documento não encontrado' });
        res.json(historico);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.criar = async (req, res) => {
    try {
        const { nome, titulo, img, texto } = req.body;
        const historico = await Historico.create({ nome, titulo, img, texto });
        res.status(201).json(historico);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, titulo, img, texto } = req.body;
        const historico = await Historico.findByPk(id);
        if (!historico) return res.status(404).json({ erro: 'Documento não encontrado' });
        await historico.update({ nome, titulo, img, texto });
        res.json(historico);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.deletar = async (req, res) => {
    try {
        const { id } = req.params;
        const historico = await Historico.findByPk(id);
        if (!historico) return res.status(404).json({ erro: 'Documento não encontrado' });
        await historico.destroy();
        res.json({ mensagem: 'Documento removido' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};