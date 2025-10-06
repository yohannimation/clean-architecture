// usecases/DeleteProductUseCase.js
class DeleteProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    execute(ean, sku) {
        const success = this.productRepository.delete(ean, sku);
        if (!success) throw new Error('Produit non trouvé');
        return { message: 'Produit supprimé avec succès' };
    }
}

module.exports = DeleteProductUseCase;
