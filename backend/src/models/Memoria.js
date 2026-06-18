// src/models/Memoria.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Memoria = sequelize.define('Memoria', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    img: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    tableName: 'memorias',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: false,
});

module.exports = Memoria;