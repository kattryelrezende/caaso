// backend/src/middleware/auth.js
const jwt = require('jsonwebtoken');

// Autenticação obrigatória
exports.authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ erro: 'Token não fornecido' });
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ erro: 'Token mal formatado' });
    try {
        const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ erro: 'Token inválido ou expirado' });
    }
};

// Autenticação opcional
exports.optionalAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const parts = authHeader.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            try {
                const decoded = jwt.verify(parts[1], process.env.JWT_SECRET);
                req.user = decoded;
            } catch (error) {
                // Token inválido – apenas ignora e continua como não autenticado
            }
        }
    }
    next();
};

// Verifica se o usuário é administrador
exports.authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.tipo === 'admin') {
        next();
    } else {
        res.status(403).json({ erro: 'Acesso negado. Apenas administradores podem realizar esta ação.' });
    }
};