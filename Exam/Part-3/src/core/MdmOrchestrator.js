class MdmOrchestrator {
    constructor(productRepository, mediaRepository) {
        this.productRepository = productRepository;
        this.mediaRepository = mediaRepository;
    }

    async linkMediaToProduct(media) {
        const product = this.productRepository.findByEanSku(media.ean, media.sku);
        if (!product) throw new Error('Produit non trouvé pour le média');

        // Ajouter le média au produit
        product.attributes.media = product.attributes.media || [];
        product.attributes.media.push(media);

        // Mettre à jour le produit
        this.productRepository.update(product);

        // Sauvegarder le média dans le repository
        this.mediaRepository.save(media); // <-- ici save(), pas add()

        return media; // retourner le média pour les tests
    }
}

module.exports = MdmOrchestrator;
