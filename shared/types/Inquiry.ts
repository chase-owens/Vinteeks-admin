// shared/types/Inquiry.ts

type BudgetRange =
  | "under-250"
  | "250-500"
  | "500-1000"
  | "1000-2000"
  | "2000-plus";

export type InquiryStatus = "new" | "reviewing" | "quoted" | "completed";

export type Inquiry = {
  budget?: BudgetRange;
  createdAt: string;
  categoryId?: string;
  email?: string;
  generalArea?: string;
  id: string;
  inquiryId?: string;
  imageKeys: string[];
  message?: string;
  name: string;
  phone?: string;
  photos?: File[];
  preferredContact: "call" | "email" | "text";
  productId?: string;
  roomId?: string;
  status: InquiryStatus;
};
