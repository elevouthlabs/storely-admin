
export type StoreDirectory = {
  id: string;
  name: string;
  plan: string;
  status: string;
  slug: string;
  logoUrl: string;
  description: string;
  category: string;
  orders:{ count: string };
  business: {slug: string}
  createdAt: string;
  isActive: boolean;
};

export type StoreProduct = {
  id: string;
  name: string;
  price: number;
  slug: string;
  imageUrls:  { url: string }[]
  stockQuantity: number;
  status: string;
  createdAt: string;
};

export type OrderStatus = "NEW" | "PROCESSING" | "SHIPPED";

export type StoreOrders = {
  id: string;
  customerName: string;
  slug: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
};

export type StoreResponse = {
  success: boolean;
  message: string;
  data: {
    stores: StoreDirectory[];
    pagination: Pagination;
  };
};
export type StoreProductResponse = {
  success: boolean;
  message: string;
  data: StoreProduct[];
  pagination: Pagination; 
};
export type StoreOrderResponse = {
  success: boolean;
  message: string;
  data: StoreOrders[];
  pagination: Pagination; 
};

export type SingleStoreResponse = {
  success: boolean;
  message: string;
  data: StoreDirectory;
};

export type StoreState = {
  stores: StoreDirectory[];
  products: StoreProduct[];
  orders: StoreOrders[]
  store: StoreDirectory | null;

  pagination: Pagination;

  isLoading: boolean;
  isFetchingOne: boolean;

  error: string | null;
};
