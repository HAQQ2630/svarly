export type ReviewStatus = "new" | "pending" | "replied";

export type ReviewPlatform = "google" | "yelp" | "facebook" | "tripadvisor";

export interface Review {
  id: string;
  businessName: string;
  reviewerName: string;
  reviewerInitials: string;
  platform: ReviewPlatform;
  rating: 1 | 2 | 3 | 4 | 5;
  content: string;
  date: string;
  status: ReviewStatus;
  aiReply?: string;
}
