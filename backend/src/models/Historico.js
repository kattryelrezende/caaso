// src/models/Historico.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Historico = sequelize.define('Historico', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING(50), allowNull: false },
    titulo: { type: DataTypes.STRING(100), allowNull: false },
    img: { type: DataTypes.STRING(255), allowNull: true },
    data: { type: DataTypes.DATEONLY, allowNull: true }, // NOVO
    texto: { type: DataTypes.TEXT, allowNull: true },
}, {
    tableName: 'historicos',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: false,
});

module.exports = Historico;