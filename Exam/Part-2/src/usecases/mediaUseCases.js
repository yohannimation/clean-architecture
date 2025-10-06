class MediaUseCases {
    constructor(mediaRepository) {
        this.mediaRepository = mediaRepository;
    }

    async linkMediaToProduct(filename) {
        // Parse filename: EAN12345_SKU56789_front.jpg
        const match = filename.match(/EAN(\d+)_SKU(\d+)/);
        if (!match) throw new Error("Filename does not contain EAN and SKU");
        const [_, ean, sku] = match;

        const media = { filename, productEAN: ean, productSKU: sku, type: this.getType(filename) };
        return this.mediaRepository.save(media);
    }

    async getAllMedia() {
        return this.mediaRepository.findAll();
    }

    getType(filename) {
        if (filename.endsWith(".jpg") || filename.endsWith(".png")) return "image";
        if (filename.endsWith(".mp4")) return "video";
        if (filename.endsWith(".pdf")) return "pdf";
        return "unknown";
    }
}

module.exports = MediaUseCases;
