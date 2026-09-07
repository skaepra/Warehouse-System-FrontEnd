export type OrderItemType = {
  id: string | number;
  productName: string;
  color?: string[];
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

export type orderType = {
  id: string;
  Country: string;
  City: string;
  fullName: string;
  phone: string;
  email: string;
  building : string;
  dropoffLatitude: number;
  dropoffLongitude: number;
  paymentMethod: number; 
  Notes?: string;
  totalAmount: number; 
  paymentStatus: number;
  status: number; 
  createdAt: string;
  items: OrderItemType[];
};