const express = require('express');

function ProductController(productUseCases) {
    const router = express.Router();

    router.post('/', async (req, res) => {
        try {
            const product = await productUseCases.createProduct(req.body);
            res.json(product);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    router.patch('/:ean', async (req, res) => {
        try {
            const updated = await productUseCases.updateProduct(req.params.ean, req.body);
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    return router;
}

module.exports = ProductController;
