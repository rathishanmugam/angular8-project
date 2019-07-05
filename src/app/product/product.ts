export interface IProduct {
  id: number;
  productName: string;
  productCode: string;
  category?: string;
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
  tags?: string[];
}
export interface ProductResolved {
  product: IProduct;
  error?: any;
}
