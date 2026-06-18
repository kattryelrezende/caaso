// src/controllers/usuarioController.js
const { Usuario } = require('../models');

// Atualizar perfil (nome, email, curso)
exports.atualizarPerfil = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, curso } = req.body;

        // Verificar se o usuário está editando o próprio perfil
        if (parseInt(id) !== req.user.id) {
            return res.status(403).json({ erro: 'Você só pode editar seu próprio perfil.' });
        }

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        // Verificar se email já existe (se foi alterado)
        if (email && email !== usuario.email) {
            const emailExistente = await Usuario.findOne({ where: { email } });
            if (emailExistente) {
                return res.status(400).json({ erro: 'E-mail já cadastrado por outro usuário' });
            }
        }

        // Atualizar campos permitidos
        await usuario.update({
            nome: nome || usuario.nome,
            email: email || usuario.email,
            curso: curso || usuario.curso,
        });

        // Retornar dados atualizados (sem senha)
        const usuarioAtualizado = await Usuario.findByPk(id, {
            attributes: { exclude: ['senha_hash'] },
        });

        res.json(usuarioAtualizado);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

// Alterar senha (com validação da senha atual)
exports.alterarSenha = async (req, res) => {
    try {
        const { id } = req.params;
        const { senha_atual, nova_senha } = req.body;

        if (parseInt(id) !== req.user.id) {
            return res.status(403).json({ erro: 'Você só pode alterar sua própria senha.' });
        }

        if (!senha_atual || !nova_senha) {
            return res.status(400).json({ erro: 'Senha atual e nova senha são obrigatórias.' });
        }

        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }

        // Verificar senha atual
        const senhaValida = await usuario.verificarSenha(senha_atual);
        if (!senhaValida) {
            return res.status(401).json({ erro: 'Senha atual incorreta' });
        }

        // Atualizar senha
        await usuario.atualizarSenha(nova_senha);

        res.json({ mensagem: 'Senha alterada com sucesso' });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

// Obter perfil do usuário (público, mas só do próprio)
exports.perfil = async (req, res) => {
    try {
        const { id } = req.params;
        if (parseInt(id) !== req.user.id) {
            return res.status(403).json({ erro: 'Acesso negado' });
        }
        const usuario = await Usuario.findByPk(id, {
            attributes: { exclude: ['senha_hash'] },
        });
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};