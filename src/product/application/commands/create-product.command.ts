export class CreateProductCommand {
  constructor(
    public readonly categoryId: string,
    public readonly name: string,
    public readonly priceCents: number,
  ) {}
}
