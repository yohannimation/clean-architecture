class DeleteProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    execute(ean, sku) {
        const deletedProduct = this.productRepository.delete(ean, sku); // <-- retourner le produit supprimé
        return deletedProduct;
    }
}

module.exports = DeleteProductUseCase;
