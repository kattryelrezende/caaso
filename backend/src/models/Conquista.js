// src/models/Conquista.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Conquista = sequelize.define('Conquista', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    titulo: { type: DataTypes.STRING(100), allowNull: false },
    descricao: { type: DataTypes.TEXT, allowNull: true },
    ano: { type: DataTypes.STRING(10), allowNull: true },
    data: { type: DataTypes.DATEONLY, allowNull: true }, // NOVO
}, {
    tableName: 'conquistas',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: false,
});

module.exports = Conquista;