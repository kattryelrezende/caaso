// src/app.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');

const authRoutes = require('./routes/authRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const pautaRoutes = require('./routes/pautaRoutes');
const conquistaRoutes = require('./routes/conquistaRoutes');
const memoriaRoutes = require('./routes/memoriaRoutes');
const historicoRoutes = require('./routes/historicoRoutes');
const noticiaRoutes = require('./routes/noticiaRoutes');
const cartaRoutes = require('./routes/cartaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const servicoRoutes = require('./routes/servicoRoutes');

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
    sequelize.sync({ alter: true })
        .then(() => console.log('Banco sincronizado'))
        .catch(err => console.error('Erro ao sincronizar:', err));
}

app.use('/api/auth', authRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/produtos', produtoRoutes);
app.use('/api/pautas', pautaRoutes);
app.use('/api/conquistas', conquistaRoutes);
app.use('/api/memorias', memoriaRoutes);
app.use('/api/historicos', historicoRoutes);
app.use('/api/noticias', noticiaRoutes);
app.use('/api/cartas', cartaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/servicos', servicoRoutes);

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'API CAASO funcionando!',
        timestamp: new Date().toISOString(),
    });
});

module.exports = app;