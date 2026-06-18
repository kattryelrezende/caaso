// src/models/Carta.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Carta = sequelize.define('Carta', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    texto: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'cartas',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
});

module.exports = Carta;