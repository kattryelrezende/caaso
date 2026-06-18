// src/middleware/auth.js
const jwt = require('jsonwebtoken');

// Verifica se o token JWT é válido e anexa o usuário à requisição
exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: 'Token não fornecido' });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ erro: 'Token mal formatado' });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, tipo, iat, exp }
        next();
    } catch (error) {
        return res.status(401).json({ erro: 'Token inválido ou expirado' });
    }
};

// Verifica se o usuário é administrador
exports.authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.tipo === 'admin') {
        next();
    } else {
        res.status(403).json({ erro: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
    }
};