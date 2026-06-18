// src/models/Servico.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Servico = sequelize.define('Servico', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    icone: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    ordem: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    ativo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    tableName: 'servicos',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
});

module.exports = Servico;