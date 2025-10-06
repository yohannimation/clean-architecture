// usecases/UpdateProductUseCase.js
class UpdateProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    execute({ ean, sku, name, typology, attributes }) {
        const product = this.productRepository.findByEanSku(ean, sku);
        if (!product) throw new Error('Produit non trouvé');

        // Mise à jour des champs
        if (name) product.name = name;
        if (typology) product.typology = typology;
        if (attributes) product.attributes = { ...product.attributes, ...attributes };

        return this.productRepository.update(product);
    }
}

module.exports = UpdateProductUseCase;
