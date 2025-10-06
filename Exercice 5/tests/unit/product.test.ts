import { Product, InvalidProductError } from '../../src/domain/Product';

test('creates valid product', () => {
  const p = new Product('1', 'Phone', 'Smartphone', 999.99, 10);
  expect(p.name).toBe('Phone');
  expect(p.price).toBeGreaterThan(0);
});

test('throws if invalid name', () => {
  expect(() => new Product('1', '', '', 10, 1)).toThrow(InvalidProductError);
});

test('adjust stock correctly', () => {
  const p = new Product('1', 'A', 'B', 10, 5);
  p.adjustStock(-3);
  expect(p.stock).toBe(2);
  expect(() => p.adjustStock(-10)).toThrow();
});
