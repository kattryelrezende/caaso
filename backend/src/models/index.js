// backend/src/models/index.js
const Categoria = require('./Categoria');
const Produto = require('./Produto');
const Usuario = require('./Usuario');
const Pauta = require('./Pauta');
const Conquista = require('./Conquista');
const Memoria = require('./Memoria');
const Historico = require('./Historico');
const Noticia = require('./Noticia');
const Carta = require('./Carta');
const Servico = require('./Servico');
const Topico = require('./Topico');
const Comentario = require('./Comentario');
const Like = require('./Like');

// Relacionamentos
Categoria.hasMany(Produto, { foreignKey: 'categoria_id', as: 'produtos' });
Produto.belongsTo(Categoria, { foreignKey: 'categoria_id', as: 'categoria' });

Usuario.hasMany(Topico, { foreignKey: 'usuario_id', as: 'topicos' });
Topico.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'autor' });

Topico.hasMany(Comentario, { foreignKey: 'topico_id', as: 'comentarios', onDelete: 'CASCADE' });
Comentario.belongsTo(Topico, { foreignKey: 'topico_id', as: 'topico' });

Usuario.hasMany(Comentario, { foreignKey: 'usuario_id', as: 'comentarios' });
Comentario.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'autor' });

Topico.hasMany(Like, { foreignKey: 'topico_id', as: 'likes' });
Like.belongsTo(Topico, { foreignKey: 'topico_id' });

Usuario.hasMany(Like, { foreignKey: 'usuario_id', as: 'likes' });
Like.belongsTo(Usuario, { foreignKey: 'usuario_id' });

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
    Servico,
    Topico,
    Comentario,
    Like,
};

module.exports = models;