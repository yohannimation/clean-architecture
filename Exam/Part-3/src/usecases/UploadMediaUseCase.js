// usecases/UploadMediaUseCase.js
const Media = require('../entities/Media');

class UploadMediaUseCase {
    constructor(mediaRepository, mdmOrchestrator) {
        this.mediaRepository = mediaRepository;
        this.mdmOrchestrator = mdmOrchestrator; // pour associer produit
    }

    async execute(file) {
        const { ean, sku } = this.parseFilename(file.originalname);        
        const media = new Media({ filename: file.filename, format: file.mimetype, ean, sku });
        await this.mediaRepository.save(media);
        // association automatique avec le produit
        await this.mdmOrchestrator.linkMediaToProduct(media);
        return media;
    }

    parseFilename(filename) {
        const match = filename.match(/EAN(\d+)_SKU(\d+)/i);
        if (!match) throw new Error('Nom de fichier invalide : EAN/SKU manquant');
        return { ean: match[1], sku: match[2] };
    }
}

module.exports = UploadMediaUseCase;
