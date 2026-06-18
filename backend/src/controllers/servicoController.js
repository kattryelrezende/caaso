// src/controllers/servicoController.js
const { Servico } = require('../models');

exports.listar = async (req, res) => {
    try {
        const servicos = await Servico.findAll({
            where: { ativo: true },
            order: [['ordem', 'ASC']],
        });
        res.json(servicos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const servico = await Servico.findByPk(id);
        if (!servico) return res.status(404).json({ erro: 'Serviço não encontrado' });
        res.json(servico);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.criar = async (req, res) => {
    try {
        const { titulo, descricao, icone, ordem, ativo } = req.body;
        const servico = await Servico.create({ titulo, descricao, icone, ordem, ativo });
        res.status(201).json(servico);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, descricao, icone, ordem, ativo } = req.body;
        const servico = await Servico.findByPk(id);
        if (!servico) return res.status(404).json({ erro: 'Serviço não encontrado' });
        await servico.update({ titulo, descricao, icone, ordem, ativo });
        res.json(servico);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.deletar = async (req, res) => {
    try {
        const { id } = req.params;
        const servico = await Servico.findByPk(id);
        if (!servico) return res.status(404).json({ erro: 'Serviço não encontrado' });
        await servico.destroy();
        res.json({ mensagem: 'Serviço removido com sucesso' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};