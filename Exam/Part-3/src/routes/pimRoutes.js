// routes/pimRoutes.js
const express = require('express');
const router = express.Router();
const ProductRepository = require('../repositories/ProductRepository');
const CreateProductUseCase = require('../usecases/CreateProductUseCase');
const UpdateProductUseCase = require('../usecases/UpdateProductUseCase');
const DeleteProductUseCase = require('../usecases/DeleteProductUseCase');

const productRepo = new ProductRepository();
const createProduct = new CreateProductUseCase(productRepo);
const updateProduct = new UpdateProductUseCase(productRepo);
const deleteProduct = new DeleteProductUseCase(productRepo);

// Créer un produit
router.post('/products', (req, res) => {
    const { ean, sku, name, typology, attributes } = req.body;
    const product = createProduct.execute({ ean, sku, name, typology, attributes });
    res.status(201).json(product);
});

// Récupérer tous les produits
router.get('/products', (req, res) => {
    const products = productRepo.findAll();
    res.json(products);
});

// Récupérer un produit par EAN/SKU
router.get('/products/:ean/:sku', (req, res) => {
    const product = productRepo.findByEanSku(req.params.ean, req.params.sku);
    if (!product) return res.status(404).json({ message: 'Produit non trouvé' });
    res.json(product);
});

// Mettre à jour un produit
router.put('/products/:ean/:sku', (req, res) => {
    try {
        const updatedProduct = updateProduct.execute({ 
            ean: req.params.ean, 
            sku: req.params.sku, 
            ...req.body 
        });
        res.json(updatedProduct);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

// Supprimer un produit
router.delete('/products/:ean/:sku', (req, res) => {
    try {
        const result = deleteProduct.execute(req.params.ean, req.params.sku);
        res.json(result);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});

module.exports = router;