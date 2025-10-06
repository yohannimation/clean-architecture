// repositories/MediaRepository.js
class MediaRepository {
    constructor() {
        this.medias = [];
    }

    save(media) {
        this.medias.push(media);
        return media;
    }

    findAll() {
        return this.medias;
    }

    findByEanSku(ean, sku) {
        return this.medias.filter(m => m.ean === ean && m.sku === sku);
    }
}

module.exports = MediaRepository;
