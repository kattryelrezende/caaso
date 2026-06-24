// backend/src/models/Like.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Like = sequelize.define('Like', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    topico_id: {
        type: DataTypes.INTEGER,
        references: { model: 'topicos', key: 'id' },
        allowNull: false
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        references: { model: 'usuarios', key: 'id' },
        allowNull: false
    }
}, {
    tableName: 'likes',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: false
});

module.exports = Like;