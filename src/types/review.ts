export type ReviewStatus = "new" | "pending" | "replied";

export type ReviewPlatform =
  | "google"
  | "yelp"
  | "facebook"
  | "tripadvisor"
  | "trustpilot";

export interface Review {
  id: string;
  businessId: string;
  businessName: string;
  reviewerName: string;
  reviewerInitials: string | null;
  platform: ReviewPlatform;
  rating: 1 | 2 | 3 | 4 | 5;
  content: string;
  status: ReviewStatus;
  aiReply: string | null;
  postedAt: string;
  repliedAt: string | null;
}

export interface Business {
  id: string;
  name: string;
  signature: string | null;
  brandVoice: string | null;
}
