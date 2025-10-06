class DeleteProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    execute(ean, sku) {
        const deletedProduct = this.productRepository.delete(ean, sku);
        return deletedProduct;
    }
}

module.exports = DeleteProductUseCase;
