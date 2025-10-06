// middleware/auth.js
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, 'secret-key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function authorize(role) {
    return (req, res, next) => {
        if (req.user.role !== role) return res.sendStatus(403);
        next();
    };
}

module.exports = { authenticate, authorize };
