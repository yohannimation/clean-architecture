const MediaRepository = require('../repositories/MediaRepository');
const MdmOrchestrator = require('../core/MdmOrchestrator');

describe('DAM Use Cases', () => {
    let mediaRepo, productRepo, orchestrator;

    beforeEach(() => {
        productRepo = { 
            products: [{ ean:'12345', sku:'56789', attributes:{} }],
            findByEanSku(ean, sku) { 
                return this.products.find(p => p.ean === ean && p.sku === sku); 
            },
            update(product) {
                const index = this.products.findIndex(p => p.ean === product.ean && p.sku === product.sku);
                if(index !== -1) this.products[index] = product;
                return product;
            }
        };
        mediaRepo = new MediaRepository();
        orchestrator = new MdmOrchestrator(productRepo, mediaRepo);
    });

    test('Associer un média automatiquement à un produit', async () => {
        const file = { originalname: 'EAN12345_SKU56789_front.png', mimetype: 'image/png' };
        const media = await orchestrator.linkMediaToProduct({ 
            filename: file.originalname, 
            format: file.mimetype, 
            ean: '12345', sku: '56789' 
        });
        expect(media.filename).toBe('EAN12345_SKU56789_front.png');
        expect(productRepo.products[0].attributes.media).toContain(media);
    });
});