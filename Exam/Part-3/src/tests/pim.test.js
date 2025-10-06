const ProductRepository = require('../repositories/ProductRepository');
const CreateProductUseCase = require('../usecases/CreateProductUseCase');
const UpdateProductUseCase = require('../usecases/UpdateProductUseCase');
const DeleteProductUseCase = require('../usecases/DeleteProductUseCase');
const Typology = require('../entities/Typology');


describe('PIM Use Cases', () => {
    let productRepo;
    let createProduct, updateProduct, deleteProduct;

    beforeEach(() => {
        productRepo = new ProductRepository();
        createProduct = new CreateProductUseCase(productRepo);
        updateProduct = new UpdateProductUseCase(productRepo);
        deleteProduct = new DeleteProductUseCase(productRepo);
    });

    test('Créer un produit selon sa typologie', () => {
        const typology = new Typology({ name: 'textile', dynamicFields: ['size','color'] });
        const product = createProduct.execute({
            ean: '12345',
            sku: '56789',
            name: 'Chemise',
            typology,
            attributes: { size: 'M', color: 'red', price: 20 }
        });
        expect(product.attributes.size).toBe('M');
        expect(product.attributes.color).toBe('red');
        expect(product.attributes.price).toBe(20);
    });

    test('Mettre à jour un produit avec attributs dynamiques', () => {
        const typology = new Typology({ name: 'textile', dynamicFields: ['size','color'] });
        createProduct.execute({
            ean: '12345',
            sku: '56789',
            name: 'Chemise',
            typology,
            attributes: { size: 'M', color: 'red', price: 20 }
        });

        const updated = updateProduct.execute({
            ean: '12345',
            sku: '56789',
            attributes: { size: 'L', price: 25 }
        });

        expect(updated.attributes.size).toBe('L');
        expect(updated.attributes.price).toBe(25);
        expect(updated.attributes.color).toBe('red'); // inchangé
    });

    test('Supprimer un produit', () => {
        const typology = new Typology({ name: 'textile', dynamicFields: ['size','color'] });
        createProduct.execute({
            ean: '12345',
            sku: '56789',
            name: 'Chemise',
            typology,
            attributes: { size: 'M', color: 'red', price: 20 }
        });

        const deleted = deleteProduct.execute('12345','56789');
        expect(deleted.ean).toBe('12345');
        expect(productRepo.findAll()).toHaveLength(0);
    });
});
