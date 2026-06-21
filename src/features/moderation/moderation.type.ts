
export type Moderation = {
  id: string;
  imageUrls: { url: string }[];
  price: number;
  storeName: string;
  itemName:string;
  plan: string;
  status: string;
  itemStatus: string
  createdAt: string;
};

export type ModerationResponse = {
  success: boolean;
  message: string;
  data: {
    moderations: Moderation[];
  };
};

export type SingleModerationResponse = {
  success: boolean;
  message: string;
  data: Moderation;
};

export type ModerationState = {
  moderations: Moderation[];
  moderation: Moderation | null;

  isLoading: boolean;
  isFetchingOne: boolean;

  error: string | null;
};
