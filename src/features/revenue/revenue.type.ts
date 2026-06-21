 type Revenue = {
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

export type RevenueResponse = {
  success: boolean;
  message: string;
  data: {
    revenues: Revenue[];
    pagination: Pagination;
  };
};

export type SingleRevenueResponse = {
  success: boolean;
  message: string;
  data: Revenue;
};

export type RevenueState = {
  revenues: Revenue[];              
  revenue: Revenue | null;       

  pagination: Pagination;

  isLoading: boolean;           
  isFetchingOne: boolean;     
  isUpdating: boolean;         

  error: string | null;
}
