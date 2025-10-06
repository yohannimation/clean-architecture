// usecases/UploadMediaUseCase.js
class UploadMediaUseCase {
    constructor(mediaRepository, mdmOrchestrator) {
        this.mediaRepository = mediaRepository;
        this.mdmOrchestrator = mdmOrchestrator; // DIP
    }

    async execute(file) {
        const { ean, sku } = this.parseFilename(file.filename);
        const media = new Media({ ...file, ean, sku });
        await this.mediaRepository.save(media);
        return this.mdmOrchestrator.linkMediaToProduct(media); // ADP
    }

    parseFilename(filename) {
        const match = filename.match(/EAN(\d+)_SKU(\d+)/);
        return { ean: match[1], sku: match[2] };
    }
}
