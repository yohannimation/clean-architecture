// entities/Media.js
class Media {
    constructor({ filename, format, ean, sku }) {
        this.filename = filename;
        this.format = format;
        this.ean = ean;
        this.sku = sku;
    }
}

module.exports = Media;
