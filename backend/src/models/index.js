// src/models/index.js
const Categoria = require('./Categoria');
const Produto = require('./Produto');
const Usuario = require('./Usuario');
const Pauta = require('./Pauta');
const Conquista = require('./Conquista');
const Memoria = require('./Memoria');
const Historico = require('./Historico');
const Noticia = require('./Noticia');
const Carta = require('./Carta');
const Servico = require('./Servico'); // NOVO

// Relacionamentos existentes
Categoria.hasMany(Produto, {
    foreignKey: 'categoria_id',
    as: 'produtos',
});
Produto.belongsTo(Categoria, {
    foreignKey: 'categoria_id',
    as: 'categoria',
});

const models = {
    Categoria,
    Produto,
    Usuario,
    Pauta,
    Conquista,
    Memoria,
    Historico,
    Noticia,
    Carta,
    Servico, // NOVO
};

module.exports = models;