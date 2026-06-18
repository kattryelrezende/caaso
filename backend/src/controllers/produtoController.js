// src/controllers/produtoController.js
const { Produto, Categoria } = require('../models');

exports.listar = async (req, res) => {
    try {
        const produtos = await Produto.findAll({
            include: ['categoria'],
            order: [['id', 'ASC']],
        });
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id, {
            include: ['categoria'],
        });
        if (!produto) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        res.json(produto);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.criar = async (req, res) => {
    try {
        const { nome, preco, estoque, img, categoria_id } = req.body;
        const produto = await Produto.create({
            nome,
            preco,
            estoque,
            img,
            categoria_id,
        });
        const produtoCompleto = await Produto.findByPk(produto.id, {
            include: ['categoria'],
        });
        res.status(201).json(produtoCompleto);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, preco, estoque, img, categoria_id } = req.body;
        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        await produto.update({
            nome,
            preco,
            estoque,
            img,
            categoria_id,
        });
        const produtoAtualizado = await Produto.findByPk(id, {
            include: ['categoria'],
        });
        res.json(produtoAtualizado);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.deletar = async (req, res) => {
    try {
        const { id } = req.params;
        const produto = await Produto.findByPk(id);
        if (!produto) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        await produto.destroy();
        res.json({ mensagem: 'Produto removido com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};