// backend/src/models/Topico.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Topico = sequelize.define('Topico', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    titulo: { type: DataTypes.STRING(150), allowNull: false },
    conteudo: { type: DataTypes.TEXT, allowNull: false },
    curtidas: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: {
        type: DataTypes.ENUM('ativo', 'arquivado', 'trancado'),
        defaultValue: 'ativo',
        allowNull: false
    },
    trancado_em: { type: DataTypes.DATE, allowNull: true },
    arquivado_em: { type: DataTypes.DATE, allowNull: true },
    usuario_id: {
        type: DataTypes.INTEGER,
        references: { model: 'usuarios', key: 'id' },
        allowNull: false
    }
}, {
    tableName: 'topicos',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: 'atualizado_em'
});

module.exports = Topico;