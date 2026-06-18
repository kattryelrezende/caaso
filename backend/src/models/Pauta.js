// src/models/Pauta.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pauta = sequelize.define('Pauta', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'Em Andamento',
        validate: {
            isIn: [['Em Andamento', 'Aprovado', 'Concluído', 'Rejeitado']],
        },
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'pautas',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
});

module.exports = Pauta;