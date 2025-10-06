class InMemoryProductRepository {
    constructor() {
        this.products = new Map(); // clé : ean, valeur : product object
    }

    async save(product) {
        this.products.set(product.ean, product);
        return product;
    }

    async findByEAN(ean) {
        return this.products.get(ean);
    }

    async findAll() {
        return Array.from(this.products.values());
    }
}

module.exports = InMemoryProductRepository;
