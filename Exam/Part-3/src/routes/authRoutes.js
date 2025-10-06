// src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserRepository = require('../repositories/UserRepository');

const userRepo = new UserRepository();
const SECRET = 'SECRET_KEY'; // À mettre dans un .env

// POST /api/auth/login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = userRepo.findByUsername(username);

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
        return res.status(401).json({ message: 'Identifiants invalides' });
    }

    const token = jwt.sign({ username: user.username, role: user.role }, SECRET, { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;
