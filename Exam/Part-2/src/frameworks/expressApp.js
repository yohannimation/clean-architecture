// src/frameworks/expressApp.js
const express = require('express');
const ProductUseCases = require('../usecases/productUseCases');
const MediaUseCases = require('../usecases/mediaUseCases');
const TypologyUseCases = require('../usecases/typologyUseCases');
const ProductController = require('../interfaces/controllers/productController');
const MediaController = require('../interfaces/controllers/mediaController');
const LocalFileStorage = require('../interfaces/fileStorage/localFileStorage');
const InMemoryProductRepository = require('../interfaces/repositories/productRepository');
const InMemoryMediaRepository = require('../interfaces/repositories/mediaRepository');

async function startApp() {
    const app = express();
    app.use(express.json());

    // Repositories en mémoire
    const productRepo = new InMemoryProductRepository();
    const mediaRepo = new InMemoryMediaRepository();
    const typologyRepo = new InMemoryProductRepository(); // pour simplifier, tu peux créer InMemoryTypologyRepository

    // Cas d’usage
    const productUC = new ProductUseCases(productRepo);
    const mediaUC = new MediaUseCases(mediaRepo);
    const typologyUC = new TypologyUseCases(typologyRepo);

    // Stockage fichiers
    const fileStorage = new LocalFileStorage();

    // Routes
    app.use('/products', ProductController(productUC));
    app.use('/media', MediaController(mediaUC, fileStorage));

    app.listen(3000, () => console.log("MDM system running on port 3000"));
}

startApp();
