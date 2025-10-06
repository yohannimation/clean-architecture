import { ProductRepository } from '../ports/ProductRepository';
import { Product } from '../domain/Product';

export class InMemoryProductRepository implements ProductRepository {
  private store = new Map<string, Product>();

  save(product: Product) {
    if (this.store.has(product.id)) throw new Error('product already exists');
    this.store.set(product.id, product);
  }

  findById(id: string): Product | null {
    return this.store.get(id) ?? null;
  }

  update(product: Product) {
    if (!this.store.has(product.id)) throw new Error('not found');
    this.store.set(product.id, product);
  }

  delete(id: string) {
    if (!this.store.delete(id)) throw new Error('not found');
  }

  findAll(): Product[] {
    return [...this.store.values()];
  }
}
