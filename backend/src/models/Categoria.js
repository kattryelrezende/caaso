// src/models/Categoria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categoria = sequelize.define('Categoria', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'categorias',
    timestamps: false,
});

module.exports = Categoria;