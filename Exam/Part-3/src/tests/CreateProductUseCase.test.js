// tests/CreateProductUseCase.test.js
const assert = require('assert');

class MockProductRepository {
    constructor() { this.products = []; }
    save(product) { this.products.push(product); return product; }
}

const repo = new MockProductRepository();
const useCase = new CreateProductUseCase(repo);

const product = useCase.execute({ ean: '123', sku: '456', typology: 'textile', attributes: { size: 'M' } });
assert.strictEqual(repo.products.length, 1);
assert.strictEqual(product.attributes.size, 'M');
