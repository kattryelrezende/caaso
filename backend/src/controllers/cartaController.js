// src/controllers/cartaController.js
const { Carta } = require('../models');

// Listar todas as cartas (ou pegar a última)
exports.listar = async (req, res) => {
    try {
        const cartas = await Carta.findAll({ order: [['criado_em', 'DESC']] });
        res.json(cartas);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// Obter a carta mais recente (para o front-end)
exports.obterUltima = async (req, res) => {
    try {
        const carta = await Carta.findOne({ order: [['criado_em', 'DESC']] });
        if (!carta) return res.status(404).json({ erro: 'Nenhuma carta encontrada' });
        res.json(carta);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const carta = await Carta.findByPk(id);
        if (!carta) return res.status(404).json({ erro: 'Carta não encontrada' });
        res.json(carta);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.criar = async (req, res) => {
    try {
        const { titulo, texto } = req.body;
        const carta = await Carta.create({ titulo, texto });
        res.status(201).json(carta);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, texto } = req.body;
        const carta = await Carta.findByPk(id);
        if (!carta) return res.status(404).json({ erro: 'Carta não encontrada' });
        await carta.update({ titulo, texto });
        res.json(carta);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.deletar = async (req, res) => {
    try {
        const { id } = req.params;
        const carta = await Carta.findByPk(id);
        if (!carta) return res.status(404).json({ erro: 'Carta não encontrada' });
        await carta.destroy();
        res.json({ mensagem: 'Carta removida' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};