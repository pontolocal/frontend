type InputItem = {
  id: number;
  userId: number;
  product: Record<string, any>;
  createdAt: string;
};

type OutputItem = Record<string, any> & {
  createdAt: string;
};

export function transformProducts(arr: InputItem[]): OutputItem[] {
  return arr.map(({ product, createdAt }) => ({
    ...product,
    createdAt
  }));
}
