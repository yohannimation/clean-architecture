import { Product } from '../domain/Product';

export interface ProductRepository {
  save(product: Product): void;
  findById(id: string): Product | null;
  update(product: Product): void;
  delete(id: string): void;
  findAll(): Product[];
}
