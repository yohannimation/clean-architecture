class ProductUseCases {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async createProduct(productData) {
        return this.productRepository.save(productData);
    }

    async updateProduct(ean, updateData) {
        const product = await this.productRepository.findByEAN(ean);
        if (!product) throw new Error('Product not found');

        // Clone propre
        const updated = {
            ...product,
            attributes: { ...product.attributes }
        };

        // Tous les champs existants sauf "attributes"
        const topLevel = new Set(Object.keys(product).filter(k => k !== 'attributes'));

        // Fusion intelligente
        Object.entries(updateData).forEach(([key, value]) => {
        if (key === "attributes" && value && typeof value === "object") {
            Object.assign(updated.attributes, value);
        } else if (topLevel.has(key)) {
            updated[key] = value;
        } else {
            updated.attributes[key] = value;
        }
        });

        return this.productRepository.save(updated);
    }

    async getAllProducts() {
        return this.productRepository.findAll();
    }

    async getProductByEAN(ean) {
        return this.productRepository.findByEAN(ean);
    }
}

module.exports = ProductUseCases;
