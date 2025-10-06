export class InvalidProductError extends Error {}

export class Product {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public stock: number
  ) {
    this.validate();
  }

  private validate() {
    if (!this.name || this.name.trim() === '')
      throw new InvalidProductError('name cannot be empty');
    if (this.price <= 0)
      throw new InvalidProductError('price must be > 0');
    if (this.stock < 0)
      throw new InvalidProductError('stock cannot be negative');
  }

  updateName(newName: string) {
    if (!newName || newName.trim() === '')
      throw new InvalidProductError('invalid name');
    this.name = newName;
  }

  updateDescription(newDesc: string) {
    this.description = newDesc ?? '';
  }

  changePrice(newPrice: number) {
    if (newPrice <= 0)
      throw new InvalidProductError('invalid price');
    this.price = newPrice;
  }

  adjustStock(quantity: number) {
    const newStock = this.stock + quantity;
    if (newStock < 0)
      throw new InvalidProductError('negative resulting stock');
    this.stock = newStock;
  }
}
