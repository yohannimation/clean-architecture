const Product = require('../entities/Product');
const FormDefinition = require('../entities/FormDefinition');

class CreateProductUseCase {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    execute({ ean, sku, name, typology, attributes }) {
        const formDef = new FormDefinition(typology);
        const filteredAttributes = formDef.generateFormData(attributes);

        const product = new Product({
            ean,
            sku,
            name,
            typology: typology.name,
            attributes: filteredAttributes
        });

        return this.productRepository.save(product);
    }
}

module.exports = CreateProductUseCase;
