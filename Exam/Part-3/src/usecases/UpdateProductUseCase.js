class UpdateProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    execute({ ean, sku, attributes }) {
        const product = this.productRepository.findByEanSku(ean, sku);
        if (!product) throw new Error('Produit non trouvé');

        // Met à jour uniquement les champs dynamiques présents
        product.attributes = { ...product.attributes, ...attributes };

        return this.productRepository.update(product);
    }
}

module.exports = UpdateProductUseCase;
