// src/controllers/noticiaController.js
const { Noticia } = require('../models');

exports.listar = async (req, res) => {
    try {
        const noticias = await Noticia.findAll({ order: [['criado_em', 'DESC']] });
        res.json(noticias);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const noticia = await Noticia.findByPk(id);
        if (!noticia) return res.status(404).json({ erro: 'Notícia não encontrada' });
        res.json(noticia);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.criar = async (req, res) => {
    try {
        const { titulo, descricao, urgente } = req.body;
        const noticia = await Noticia.create({ titulo, descricao, urgente });
        res.status(201).json(noticia);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, urgente } = req.body;
        const noticia = await Noticia.findByPk(id);
        if (!noticia) return res.status(404).json({ erro: 'Notícia não encontrada' });
        await noticia.update({ titulo, descricao, urgente });
        res.json(noticia);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.deletar = async (req, res) => {
    try {
        const { id } = req.params;
        const noticia = await Noticia.findByPk(id);
        if (!noticia) return res.status(404).json({ erro: 'Notícia não encontrada' });
        await noticia.destroy();
        res.json({ mensagem: 'Notícia removida' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};