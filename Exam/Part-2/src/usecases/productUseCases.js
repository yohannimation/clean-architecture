class ProductUseCases {
    constructor(productRepository) {
        this.productRepository = productRepository; // DIP: dépend d’une abstraction
    }

    async createProduct(productData) {
        // Validation typology + champs dynamiques
        const product = await this.productRepository.save(productData);
        return product;
    }

    async updateProduct(ean, attributes) {
        const product = await this.productRepository.findByEAN(ean);
        product.updateAttributes(attributes);
        return this.productRepository.save(product);
    }
}

module.exports = ProductUseCases;
