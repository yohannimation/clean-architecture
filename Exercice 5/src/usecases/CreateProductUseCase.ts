import { Product } from '../domain/Product';
import { ProductRepository } from '../ports/ProductRepository';
import { ProductOutputPort } from '../ports/ProductOutputPort';
import { randomUUID } from 'crypto';

export class CreateProductUseCase {
  constructor(
    private repo: ProductRepository,
    private output: ProductOutputPort
  ) {}

  execute(name: string, description: string, price: number, stock: number) {
    try {
      const product = new Product(randomUUID(), name, description, price, stock);
      this.repo.save(product);
      return this.output.presentProduct(product);
    } catch (e: any) {
      return this.output.presentError(e);
    }
  }
}
