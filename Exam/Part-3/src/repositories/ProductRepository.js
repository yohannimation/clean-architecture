class ProductRepository {
    constructor() {
        this.products = [];
    }

    save(product) {
        this.products.push(product);
        return product;
    }

    update(product) {
        const index = this.products.findIndex(p => p.ean === product.ean && p.sku === product.sku);
        if (index === -1) throw new Error('Produit non trouvé');
        this.products[index] = product;
        return product;
    }

    findByEanSku(ean, sku) {
        return this.products.find(p => p.ean === ean && p.sku === sku);
    }

    findAll() {
        return this.products;
    }

    update(product) {
        const index = this.products.findIndex(p => p.ean === product.ean && p.sku === product.sku);
        if (index !== -1) this.products[index] = product;
        return product;
    }

    delete(ean, sku) {
        const index = this.products.findIndex(p => p.ean === ean && p.sku === sku);
        if (index === -1) throw new Error('Produit non trouvé');
        return this.products.splice(index, 1)[0]; // retourne le produit supprimé
    }        
}

module.exports = ProductRepository;
