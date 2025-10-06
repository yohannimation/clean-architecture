import { ProductRepository } from '../ports/ProductRepository';
import { ProductOutputPort } from '../ports/ProductOutputPort';

export class DeleteProductUseCase {
  constructor(
    private repo: ProductRepository,
    private output: ProductOutputPort
  ) {}

  execute(id: string) {
    try {
      this.repo.delete(id);
      return this.output.presentProduct({ deletedId: id });
    } catch (e: any) {
      return this.output.presentError(e);
    }
  }
}
