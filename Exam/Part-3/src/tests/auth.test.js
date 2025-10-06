const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Modules à tester
const authRoutes = require('../routes/authRoutes');
const { authenticate } = require('../middleware/auth');

// Création d’une app Express simulée
const app = express();
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// Route protégée simulée pour le test
app.get('/api/protected', authenticate, (req, res) => {
    res.json({ message: `Bienvenue ${req.user.username}` });
});

describe('🧪 Authentification JWT', () => {
    test('Connexion réussie avec identifiants valides', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'admin', password: 'admin123' });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();

        // Vérifie que le token est bien décodable
        const payload = jwt.decode(res.body.token);
        expect(payload.username).toBe('admin');
    });

    test('Connexion échoue avec mauvais mot de passe', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'admin', password: 'wrongpass' });
        
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Identifiants invalides');
    });

    test('Refus d’accès sans token', async () => {
        const res = await request(app).get('/api/protected');
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Token manquant');
    });

    test('Accès autorisé avec token valide', async () => {
        const login = await request(app)
            .post('/api/auth/login')
            .send({ username: 'user', password: 'user123' });
        
        const token = login.body.token;
        const res = await request(app)
            .get('/api/protected')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toContain('Bienvenue user');
    });

    test('Refus avec token invalide', async () => {
        const res = await request(app)
            .get('/api/protected')
            .set('Authorization', 'Bearer FAKE_TOKEN');
        
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Token invalide');
    });
});
