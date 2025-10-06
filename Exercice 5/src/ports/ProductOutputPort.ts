import { Product } from '../domain/Product';

export interface ProductOutputPort {
  presentProduct(product: Product | Product[] | any): any;
  presentError(error: Error): any;
}
