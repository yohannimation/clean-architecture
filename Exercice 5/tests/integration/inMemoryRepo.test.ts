import { InMemoryProductRepository } from '../../src/adapters/InMemoryProductRepository';
import { Product } from '../../src/domain/Product';

test('CRUD operations', () => {
  const repo = new InMemoryProductRepository();
  const p = new Product('1', 'X', 'Y', 10, 2);
  repo.save(p);
  expect(repo.findById('1')).toBe(p);
  p.updateName('Z');
  repo.update(p);
  expect(repo.findById('1')?.name).toBe('Z');
  expect(repo.findAll().length).toBe(1);
  repo.delete('1');
  expect(repo.findById('1')).toBeNull();
});
