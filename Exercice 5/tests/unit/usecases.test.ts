import { CreateProductUseCase } from '../../src/usecases/CreateProductUseCase';
import { InMemoryProductRepository } from '../../src/adapters/InMemoryProductRepository';
import { ProductOutputPort } from '../../src/ports/ProductOutputPort';

class DummyOutput implements ProductOutputPort {
  last: any;
  presentProduct(p: any) {
    this.last = ['ok', p];
    return this.last;
  }
  presentError(e: any) {
    this.last = ['error', e];
    return this.last;
  }
}

test('CreateProductUseCase success', () => {
  const repo = new InMemoryProductRepository();
  const output = new DummyOutput();
  const uc = new CreateProductUseCase(repo, output);
  const res = uc.execute('Widget', 'desc', 5, 1);
  expect(res[0]).toBe('ok');
  expect(repo.findAll().length).toBe(1);
});

test('CreateProductUseCase invalid input', () => {
  const repo = new InMemoryProductRepository();
  const output = new DummyOutput();
  const uc = new CreateProductUseCase(repo, output);
  const res = uc.execute('', 'desc', 5, 1);
  expect(res[0]).toBe('error');
});
