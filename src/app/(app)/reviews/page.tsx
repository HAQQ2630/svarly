import { ReviewsClient } from "@/components/reviews-client";
import { getReviewStats, getReviews } from "@/lib/queries";

export default async function ReviewsPage() {
  const [stats, reviews] = await Promise.all([getReviewStats(), getReviews()]);
  return <ReviewsClient reviews={reviews} stats={stats} />;
}
