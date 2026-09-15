export interface Product {
  id: string;
  name: string;
  sku?: string;
  quantityInStock: number;
  costPrice: number;
  sellingPrice: number;
  minQuantityAlert: number;
  isActive: boolean;
}