import api from "../../../shared/api/axiosInstance";


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

export interface CreateProductDto {
  name: string;
  sku?: string;
  initialQuantity: number;
  unitCostPrice: number;
  sellingPrice: number;
  minQuantityAlert: number;
}

export interface AddStockDto {
  quantity: number;
  unitCostPrice: number;
}

export const productService = {
  // جلب كافة المنتجات [HttpGet("api/products")]
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/api/products');
    return response.data;
  },

  createProduct: async (dto: CreateProductDto) => {
    const response = await api.post('/api/createProduct', dto);
    return response.data;
  },

  // تعديل سعر البيع لمنتج [HttpPatch("api/updateProduct/{id}/price")]
  updateSellingPrice: async (id: string, newSellingPrice: number) => {
    const response = await api.patch(`/api/updateProduct/${id}/price`, { newSellingPrice });
    return response.data;
  },

  addStock: async (productId: string, dto: AddStockDto) => {
    const response = await api.post(`/api/product/${productId}/add-stock`, dto);
    return response.data;
  }
};