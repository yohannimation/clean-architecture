// core/MdmOrchestrator.js
class MdmOrchestrator {
    constructor(productService, mediaService) {
        this.productService = productService;
        this.mediaService = mediaService;
    }

    async linkMediaToProduct(media) {
        const product = await this.productService.findByEanSku(media.ean, media.sku);
        if (!product) throw new Error('Product not found');
        product.attributes.media = product.attributes.media || [];
        product.attributes.media.push(media);
        await this.productService.update(product);
        return product;
    }
}
