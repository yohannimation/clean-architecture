// core/MdmOrchestrator.js
class MdmOrchestrator {
    constructor(productRepository, mediaRepository) {
        this.productRepository = productRepository;
        this.mediaRepository = mediaRepository;
    }

    async linkMediaToProduct(media) {
        const product = this.productRepository.findByEanSku(media.ean, media.sku);

        if (!product) throw new Error('Produit non trouvé pour le média');

        product.attributes.media = product.attributes.media || [];
        product.attributes.media.push(media);
        this.productRepository.update(product);
        return product;
    }
}

module.exports = MdmOrchestrator;
