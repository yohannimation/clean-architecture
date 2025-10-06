import { ProductRepository } from '../ports/ProductRepository';
import { ProductOutputPort } from '../ports/ProductOutputPort';

export class GetProductByIdUseCase {
  constructor(
    private repo: ProductRepository,
    private output: ProductOutputPort
  ) {}

  execute(id: string) {
    const product = this.repo.findById(id);
    if (product) return this.output.presentProduct(product);
    return this.output.presentError(new Error('product not found'));
  }
}
