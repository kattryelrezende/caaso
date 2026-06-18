// src/controllers/authController.js
const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

// Registrar novo usuário
exports.register = async (req, res) => {
    try {
        const { nome, nusp, email, senha, tipo, curso } = req.body;

        if (!nome || !nusp || !email || !senha) {
            return res.status(400).json({ erro: 'Nome, NUSP, e-mail e senha são obrigatórios' });
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ erro: 'E-mail inválido' });
        }

        // Verificar duplicados
        const usuarioExistente = await Usuario.findOne({ where: { nusp } });
        if (usuarioExistente) {
            return res.status(400).json({ erro: 'NUSP já cadastrado' });
        }
        const emailExistente = await Usuario.findOne({ where: { email } });
        if (emailExistente) {
            return res.status(400).json({ erro: 'E-mail já cadastrado' });
        }

        const usuario = await Usuario.create({
            nome,
            nusp,
            email,
            senha_hash: senha,
            tipo: tipo || 'socio',
            curso: curso || null,
        });

        const token = jwt.sign(
            { id: usuario.id, tipo: usuario.tipo },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                nusp: usuario.nusp,
                email: usuario.email,
                curso: usuario.curso,
                tipo: usuario.tipo,
                criado_em: usuario.criado_em,
            },
            token,
        });
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
};

// Login de usuário
exports.login = async (req, res) => {
    try {
        const { nusp, senha } = req.body;

        if (!nusp || !senha) {
            return res.status(400).json({ erro: 'NUSP e senha são obrigatórios' });
        }

        // Buscar usuário
        const usuario = await Usuario.findOne({ where: { nusp } });
        if (!usuario) {
            return res.status(401).json({ erro: 'Credenciais inválidas' });
        }

        // Verificar senha
        const senhaValida = await usuario.verificarSenha(senha);
        if (!senhaValida) {
            return res.status(401).json({ erro: 'Credenciais inválidas' });
        }

        // Gerar token JWT
        const token = jwt.sign(
            { id: usuario.id, tipo: usuario.tipo },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Retornar dados do usuário
        res.json({
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                nusp: usuario.nusp,
                tipo: usuario.tipo,
                criado_em: usuario.criado_em,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// (Opcional) Obter perfil do usuário autenticado
exports.perfil = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.user.id, {
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