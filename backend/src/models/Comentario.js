const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comentario = sequelize.define('Comentario', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    conteudo: { type: DataTypes.TEXT, allowNull: false },
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
    tableName: 'comentarios',
    timestamps: true,
    createdAt: 'criado_em',
    updatedAt: false
});

module.exports = Comentario;