 type OrderItem = {
  itemName: string;
  quantity: number;
  subtotal: number;
  unitPrice: number;
};
 type Business = {
  name: string;
  slug: string;
};

 export type Order = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string
  totalAmount: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
  business: Business;
  businessId: string;
}

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type OrdersResponse = {
  success: boolean;
  message: string;
  data: {
    orders: Order[];
    pagination: Pagination;
  };
};

export type SingleOrderResponse = {
  success: boolean;
  message: string;
  data: Order;
};

export type OrdersState = {
  orders: Order[];              
  order: Order | null;       

  pagination: Pagination;

  isLoading: boolean;           
  isFetchingOne: boolean;     
  isUpdating: boolean;         

  error: string | null;
}
