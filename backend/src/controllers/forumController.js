const { Topico, Comentario, Usuario } = require('../models');

// Tópicos
exports.listarTopicos = async (req, res) => {
    try {
        const topicos = await Topico.findAll({
            include: [{ model: Usuario, as: 'autor', attributes: ['nome', 'curso'] }],
            order: [['criado_em', 'DESC']]
        });
        res.json(topicos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.criarTopico = async (req, res) => {
    try {
        const { titulo, conteudo } = req.body;
        if (!titulo || !conteudo) return res.status(400).json({ erro: 'Título e conteúdo são obrigatórios' });
        
        const novoTopico = await Topico.create({
            titulo,
            conteudo,
            usuario_id: req.user.id // Pego diretamente do token autenticado
        });
        res.status(201).json(novoTopico);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

exports.curtirTopico = async (req, res) => {
    try {
        const { id } = req.params;
        const topico = await Topico.findByPk(id);
        if (!topico) return res.status(404).json({ erro: 'Tópico não encontrado' });
        
        topico.curtidas += 1;
        await topico.save();
        res.json({ curtidas: topico.curtidas });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// Comentários
// Buscar um tópico específico com suas respectivas respostas
exports.obterTopicoComComentarios = async (req, res) => {
    try {
        const { id } = req.params;
        const topico = await Topico.findByPk(id, {
            include: [
                { model: Usuario, as: 'autor', attributes: ['nome', 'curso'] },
                {
                    model: Comentario,
                    as: 'comentarios',
                    include: [{ model: Usuario, as: 'autor', attributes: ['nome', 'curso'] }]
                }
            ],
            order: [[{ model: Comentario, as: 'comentarios' }, 'criado_em', 'ASC']]
        });
        if (!topico) return res.status(404).json({ erro: 'Tópico não encontrado' });
        res.json(topico);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

exports.criarComentario = async (req, res) => {
    try {
        const { id } = req.params; // ID do tópico
        const { conteudo } = req.body;
        if (!conteudo) return res.status(400).json({ erro: 'O conteúdo do comentário não pode estar vazio' });

        const novoComentario = await Comentario.create({
            conteudo,
            topico_id: id,
            usuario_id: req.user.id // Pego do token autenticado
        });
        res.status(201).json(novoComentario);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};