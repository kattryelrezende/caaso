// src/models/Produto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Produto = sequelize.define('Produto', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    estoque: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    img: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'categorias',
            key: 'id',
        },
        allowNull: true,
    },
}, {
    tableName: 'produtos',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em',
});

module.exports = Produto;