
export type Payment = {
    id: string;
    businessId: string;
    userId: string;
    totalAmount: number;
    paymentMethod: string;
    paymentStatus: string;
    createdAt: string;
}

export type Pagination = {
  page: number;
  limit: number;
  total: number;
};

export type PaymentsResponse = {
  success: boolean;
  message: string;
  data:{
    payments: Payment[];
    pagination: Pagination;
  }
};

export type SinglePaymentResponse = {
  success: boolean;
  message: string;
  data: Payment;
};

export type PaymentsState = {
  payments: Payment[];
  payment: Payment | null;
  pagination: Pagination;
  isLoading: boolean;
  isFetchingOne: boolean;
  error: string | null;
}