 type Order = {
  id: string;
  customerName: string;
  totalAmount: number;
  status: string;
  createdAt: string;
}

export type Pagination = {
  page: number;
  limit: number;
  total: number;
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
