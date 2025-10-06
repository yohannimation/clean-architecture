// routes/pimRoutes.js
const express = require('express');
const CreateProductUseCase = require('../usecases/CreateProductUseCase');
const UpdateProductUseCase = require('../usecases/UpdateProductUseCase');
const DeleteProductUseCase = require('../usecases/DeleteProductUseCase');

module.exports = (productRepo) => {
    const router = express.Router();

    const createProduct = new CreateProductUseCase(productRepo);
    const updateProduct = new UpdateProductUseCase(productRepo);
    const deleteProduct = new DeleteProductUseCase(productRepo);

    router.post('/products', (req, res) => {
        const product = createProduct.execute(req.body);
        res.status(201).json(product);
    });

    router.get('/products', (req, res) => res.json(productRepo.findAll()));

    router.get('/products/:ean/:sku', (req, res) => {
        const product = productRepo.findByEanSku(req.params.ean, req.params.sku);
        if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
        res.json(product);
    });

    router.put('/products/:ean/:sku', (req, res) => {
        try {
            const updated = updateProduct.execute({ ean: req.params.ean, sku: req.params.sku, ...req.body });
            res.json(updated);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    });

    router.delete('/products/:ean/:sku', (req, res) => {
        try {
            const result = deleteProduct.execute(req.params.ean, req.params.sku);
            res.json(result);
        } catch (err) {
            res.status(404).json({ message: err.message });
        }
    });

    return router;
};
