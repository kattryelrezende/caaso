// src/models/Usuario.js
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    nusp: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    curso: {
        type: DataTypes.STRING(100),
        allowNull: true,
    },
    senha_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    tipo: {
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: 'socio',
        validate: {
            isIn: [['socio', 'admin']],
        },
    },
}, {
    tableName: 'usuarios',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
});

// Hook para hashear a senha antes de salvar
Usuario.beforeCreate(async (usuario) => {
    const salt = await bcrypt.genSalt(10);
    usuario.senha_hash = await bcrypt.hash(usuario.senha_hash, salt);
});

// Método para verificar senha
Usuario.prototype.verificarSenha = async function(senha) {
    return await bcrypt.compare(senha, this.senha_hash);
};

// Método para atualizar senha
Usuario.prototype.atualizarSenha = async function(novaSenha) {
    const salt = await bcrypt.genSalt(10);
    this.senha_hash = await bcrypt.hash(novaSenha, salt);
    await this.save();
};

module.exports = Usuario;