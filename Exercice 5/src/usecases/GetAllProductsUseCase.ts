import { ProductRepository } from '../ports/ProductRepository';
import { ProductOutputPort } from '../ports/ProductOutputPort';

export class GetAllProductsUseCase {
  constructor(
    private repo: ProductRepository,
    private output: ProductOutputPort
  ) {}

  execute() {
    const products = this.repo.findAll();
    return this.output.presentProduct(products);
  }
}
