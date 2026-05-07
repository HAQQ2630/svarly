import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Business, Review } from "@/types/review";

type BusinessRow = {
  id: string;
  name: string;
  signature: string | null;
  brand_voice: string | null;
};

type ReviewRow = {
  id: string;
  business_id: string;
  platform: Review["platform"];
  reviewer_name: string;
  reviewer_initials: string | null;
  rating: 1 | 2 | 3 | 4 | 5;
  content: string;
  status: Review["status"];
  ai_reply: string | null;
  posted_at: string;
  replied_at: string | null;
};

function mapBusiness(row: BusinessRow): Business {
  return {
    id: row.id,
    name: row.name,
    signature: row.signature,
    brandVoice: row.brand_voice,
  };
}

function mapReview(row: ReviewRow, businessName: string): Review {
  return {
    id: row.id,
    businessId: row.business_id,
    businessName,
    platform: row.platform,
    reviewerName: row.reviewer_name,
    reviewerInitials: row.reviewer_initials,
    rating: row.rating,
    content: row.content,
    status: row.status,
    aiReply: row.ai_reply,
    postedAt: row.posted_at,
    repliedAt: row.replied_at,
  };
}

export async function getCurrentBusiness(): Promise<Business | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("businesses")
    .select("id, name, signature, brand_voice")
    .eq("owner_user_id", user.id)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("[getCurrentBusiness]", error.message);
    return null;
  }
  return data ? mapBusiness(data as BusinessRow) : null;
}

export async function getReviews(): Promise<Review[]> {
  const business = await getCurrentBusiness();
  if (!business) return [];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reviews")
    .select(
      "id, business_id, platform, reviewer_name, reviewer_initials, rating, content, status, ai_reply, posted_at, replied_at",
    )
    .eq("business_id", business.id)
    .order("posted_at", { ascending: false });

  if (error) {
    console.error("[getReviews]", error.message);
    return [];
  }
  return (data ?? []).map((row) => mapReview(row as ReviewRow, business.name));
}

export interface ReviewStats {
  total: number;
  newCount: number;
  pendingCount: number;
  repliedCount: number;
  avgRating: number;
}

export async function getReviewStats(): Promise<ReviewStats> {
  const reviews = await getReviews();
  const total = reviews.length;
  return {
    total,
    newCount: reviews.filter((r) => r.status === "new").length,
    pendingCount: reviews.filter((r) => r.status === "pending").length,
    repliedCount: reviews.filter((r) => r.status === "replied").length,
    avgRating:
      total === 0
        ? 0
        : reviews.reduce((sum, r) => sum + r.rating, 0) / total,
  };
}
