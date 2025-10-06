// entities/Product.js
class Product {
    constructor({ ean, sku, name, typology, attributes = {} }) {
        this.ean = ean;
        this.sku = sku;
        this.name = name;
        this.typology = typology;
        this.attributes = attributes; // Champs dynamiques
    }
}

module.exports = Product;
