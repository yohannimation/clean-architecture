// src/middleware/auth.js
const jwt = require('jsonwebtoken');
const SECRET = 'SECRET_KEY';

function authenticate(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Token manquant' });

    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token, SECRET);
        req.user = payload;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token invalide' });
    }
}

// Middleware pour vérifier le rôle
function authorizeRole(role) {
    return (req, res, next) => {
        if (req.user.role !== role) return res.status(403).json({ message: 'Accès refusé' });
        next();
    };
}

module.exports = { authenticate, authorizeRole };
