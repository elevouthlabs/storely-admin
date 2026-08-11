
export type User = {
  id: string;
  fullName: string;
  email: string;
  role?: string;
  isVerified: boolean | string;
  phone: string | null;
  store: string;
  location: string;
  business:{ name: string, slug: string };
  createdAt: string;
  status: "PENDING" | "ACTIVE" | "SUSPENDED";
  lastLogin: string;
};

export type Session = {
  id: string;
  device: string;
  ip: string;
  location: string | null;
  createdAt: string;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type UsersResponse = {
  success: boolean;
  message: string;
  data: {
    users: User[];
    pagination: Pagination;
  };
};

export type SingleUserResponse = {
  success: boolean;
  message: string;
  data: User;
};

export type UserSessionResponse = {
  success: boolean;
  message: string;
    data: {
    sessions: Session[];
  };
};

export type UsersState = {
  users: User[];
  data: {
    sessions: Session[];
  };
  user: User | null;

  pagination: Pagination | null;

  isLoading: boolean;
  isFetchingOne: boolean;

  error: string | null;
};