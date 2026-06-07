export type Room =
  | "living-room"
  | "bedroom"
  | "dining-room"
  | "office"
  | "outdoor";
export type Category =
  | "sofas"
  | "chairs"
  | "tables"
  | "storage"
  | "lighting"
  | "rugs"
  | "decor";
export type Condition = "New" | "Like New" | "Good" | "Fair" | "Poor";
export type Status = "available" | "sold" | "rented" | "reserved";
export type ProductType =
  | "chair"
  | "table"
  | "sofa"
  | "dresser"
  | "lamp"
  | "rug"
  | "decor";

export type Product = {
  canRent?: boolean;
  category: Category;
  condition?: Condition;
  cost?: number;
  createdAt?: string;
  description: string;
  id: string;
  images: string[];
  isFeatured?: boolean;
  isSale?: boolean;
  marketplaceUrl?: string;
  material?: string;
  name: string;
  price: number;
  room: Room;
  salePrice?: number;
  soldFor?: number;
  status: Status;
  tags?: string[];
  type: ProductType;
};
