class Media {
    constructor({ filename, productEAN, productSKU, type }) {
        this.filename = filename;
        this.productEAN = productEAN;
        this.productSKU = productSKU;
        this.type = type; // image, video, pdf, etc.
    }
}

module.exports = Media;
