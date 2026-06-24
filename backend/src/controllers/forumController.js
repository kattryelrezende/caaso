// backend/src/controllers/forumController.js
const { Topico, Comentario, Usuario, Like } = require('../models');

// ===== Listar tópicos PÚBLICOS (apenas ativos) =====
exports.listarTopicos = async (req, res) => {
    try {
        const usuario_id = req.user ? req.user.id : null;
        const topicos = await Topico.findAll({
            where: { status: ['ativo', 'trancado'] },
            include: [{ model: Usuario, as: 'autor', attributes: ['nome', 'curso'] }],
            order: [['criado_em', 'DESC']]
        });

        // Adiciona usuarioCurtiu para cada tópico
        const topicosComCurtida = await Promise.all(topicos.map(async (topico) => {
            const json = topico.toJSON();
            if (usuario_id) {
                const like = await Like.findOne({ where: { topico_id: topico.id, usuario_id } });
                json.usuarioCurtiu = !!like;
            } else {
                json.usuarioCurtiu = false;
            }
            return json;
        }));

        res.json(topicosComCurtida);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// ===== Listar TODOS os tópicos para ADMIN =====
exports.listarTopicosAdmin = async (req, res) => {
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

// ===== Criar tópico =====
exports.criarTopico = async (req, res) => {
    try {
        const { titulo, conteudo } = req.body;
        if (!titulo || !conteudo) return res.status(400).json({ erro: 'Título e conteúdo são obrigatórios' });
        
        const novoTopico = await Topico.create({
            titulo,
            conteudo,
            usuario_id: req.user.id
        });
        res.status(201).json(novoTopico);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

// ===== Curtir tópico =====
exports.curtirTopico = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario_id = req.user.id;

        const topico = await Topico.findByPk(id);
        if (!topico) return res.status(404).json({ erro: 'Tópico não encontrado' });
        if (topico.status === 'arquivado') return res.status(403).json({ erro: 'Tópico arquivado' });

        // Verifica se já curtiu
        const likeExistente = await Like.findOne({
            where: { topico_id: id, usuario_id }
        });

        let curtidas = topico.curtidas;
        let usuarioCurtiu = false;

        if (likeExistente) {
            // Descurtir
            await likeExistente.destroy();
            curtidas = Math.max(0, curtidas - 1);
            usuarioCurtiu = false;
        } else {
            // Curtir
            await Like.create({ topico_id: id, usuario_id });
            curtidas += 1;
            usuarioCurtiu = true;
        }

        topico.curtidas = curtidas;
        await topico.save();

        res.json({ curtidas, usuarioCurtiu });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// ===== Obter tópico com comentários =====
exports.obterTopicoComComentarios = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario_id = req.user ? req.user.id : null;

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

        // Verifica se o usuário curtiu
        let usuarioCurtiu = false;
        if (usuario_id) {
            const like = await Like.findOne({ where: { topico_id: id, usuario_id } });
            usuarioCurtiu = !!like;
        }

        const topicoJson = topico.toJSON();
        topicoJson.usuarioCurtiu = usuarioCurtiu;
        res.json(topicoJson);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// ===== Criar comentário =====
exports.criarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const { conteudo } = req.body;
        if (!conteudo) return res.status(400).json({ erro: 'O conteúdo do comentário não pode estar vazio' });

        const topico = await Topico.findByPk(id);
        if (!topico) return res.status(404).json({ erro: 'Tópico não encontrado' });
        if (topico.status === 'trancado') {
            return res.status(403).json({ erro: 'Este tópico está trancado. Não é possível comentar.' });
        }
        if (topico.status === 'arquivado') {
            return res.status(403).json({ erro: 'Este tópico está arquivado. Não é possível comentar.' });
        }

        const novoComentario = await Comentario.create({
            conteudo,
            topico_id: id,
            usuario_id: req.user.id
        });
        res.status(201).json(novoComentario);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

// ===== DELETAR tópico (autor ou admin) =====
exports.deletarTopico = async (req, res) => {
    try {
        const { id } = req.params;
        const topico = await Topico.findByPk(id);
        if (!topico) return res.status(404).json({ erro: 'Tópico não encontrado' });

        const isAdmin = req.user.tipo === 'admin';
        const isAuthor = req.user.id === topico.usuario_id;

        if (!isAdmin && !isAuthor) {
            return res.status(403).json({ erro: 'Você não tem permissão para deletar este tópico.' });
        }

        await topico.destroy();
        res.json({ mensagem: 'Tópico deletado com sucesso.' });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// ===== ARQUIVAR tópico (admin) =====
exports.arquivarTopico = async (req, res) => {
    try {
        const { id } = req.params;
        const topico = await Topico.findByPk(id);
        if (!topico) return res.status(404).json({ erro: 'Tópico não encontrado' });

        topico.status = 'arquivado';
        topico.arquivado_em = new Date();
        await topico.save();
        res.json({ mensagem: 'Tópico arquivado com sucesso.', topico });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// ===== TRANCAR tópico (admin) =====
exports.trancarTopico = async (req, res) => {
    try {
        const { id } = req.params;
        const topico = await Topico.findByPk(id);
        if (!topico) return res.status(404).json({ erro: 'Tópico não encontrado' });

        topico.status = 'trancado';
        topico.trancado_em = new Date();
        await topico.save();
        res.json({ mensagem: 'Tópico trancado com sucesso. Comentários desabilitados.', topico });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// ===== REABRIR tópico (admin) =====
exports.reabrirTopico = async (req, res) => {
    try {
        const { id } = req.params;
        const topico = await Topico.findByPk(id);
        if (!topico) return res.status(404).json({ erro: 'Tópico não encontrado' });

        topico.status = 'ativo';
        topico.arquivado_em = null;
        topico.trancado_em = null;
        await topico.save();
        res.json({ mensagem: 'Tópico reaberto com sucesso.', topico });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};