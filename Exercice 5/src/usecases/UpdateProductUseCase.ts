import { ProductRepository } from '../ports/ProductRepository';
import { ProductOutputPort } from '../ports/ProductOutputPort';
import { InvalidProductError } from '../domain/Product';

export class UpdateProductUseCase {
  constructor(
    private repo: ProductRepository,
    private output: ProductOutputPort
  ) {}

  execute(id: string, data: { name?: string; description?: string; price?: number; stockDelta?: number }) {
    const product = this.repo.findById(id);
    if (!product) return this.output.presentError(new Error('product not found'));

    try {
      if (data.name !== undefined) product.updateName(data.name);
      if (data.description !== undefined) product.updateDescription(data.description);
      if (data.price !== undefined) product.changePrice(data.price);
      if (data.stockDelta !== undefined) product.adjustStock(data.stockDelta);

      this.repo.update(product);
      return this.output.presentProduct(product);
    } catch (e: any) {
      return this.output.presentError(e);
    }
  }
}
