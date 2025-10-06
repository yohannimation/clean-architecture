// usecases/CreateProductUseCase.js
const Product = require('../entities/Product');

class CreateProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    execute({ ean, sku, name, typology, attributes }) {
        const product = new Product({ ean, sku, name, typology, attributes });
        return this.productRepository.save(product);
    }
}

module.exports = CreateProductUseCase;
