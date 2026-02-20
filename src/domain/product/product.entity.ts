export class Product {
  constructor(
    public id: number | null,
    public name: string,
    public price: number,
    public description?: string,
  ) {}

  updatePrice(newPrice: number) {
    if (newPrice < 0) {
      throw new Error('Price cannot be negative');
    }
    this.price = newPrice;
  }
}
