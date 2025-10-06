class Product {
    constructor({ ean, sku, name, price, typology, attributes }) {
        this.ean = ean;
        this.sku = sku;
        this.name = name;
        this.price = price;
        this.typology = typology; // Typology object
        this.attributes = attributes || {}; // {size, color, RAM, etc.}
    }

    updateAttributes(newAttrs) {
        this.attributes = { ...this.attributes, ...newAttrs };
    }
}

module.exports = Product;
