const express = require('express');

function ProductController(productUseCases) {
    const router = express.Router();

    // Créer un produit
    router.post('/', async (req, res) => {
        try {
            const product = await productUseCases.createProduct(req.body);
            res.json(product);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // Mettre à jour un produit
    router.patch('/:ean', async (req, res) => {
        try {
            const updated = await productUseCases.updateProduct(req.params.ean, req.body);
            res.json(updated);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    // Lister tous les produits
    router.get('/', async (req, res) => {
        try {
            const products = await productUseCases.getAllProducts();
            res.json(products);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    // Récupérer un produit précis par EAN
    router.get('/:ean', async (req, res) => {
        try {
            const product = await productUseCases.getProductByEAN(req.params.ean);
            if (!product) return res.status(404).json({ error: 'Produit non trouvé' });
            res.json(product);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

    return router;
}

module.exports = ProductController;
