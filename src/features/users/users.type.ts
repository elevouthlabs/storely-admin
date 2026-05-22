
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
  date: string;
  device: string;
  IP: number;
  location: string
}

export type Pagination = {
  page: number;
  limit: number;
  total: number;
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
  data: Session[];
};

export type UsersState = {
  users: User[];
  session: Session[];
  user: User | null;

  pagination: Pagination;

  isLoading: boolean;
  isFetchingOne: boolean;

  error: string | null;
};