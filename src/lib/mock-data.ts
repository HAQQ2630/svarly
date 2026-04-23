import type { Review } from "@/types/review";

export const mockReviews: Review[] = [
  {
    id: "r_1",
    businessName: "Café Bella",
    reviewerName: "Sarah Lindqvist",
    reviewerInitials: "SL",
    platform: "google",
    rating: 5,
    content:
      "Absolutely loved the oat flat white and the ambience. The barista took the time to explain their single-origin beans — rare to find that kind of care. Will be back every week.",
    date: "2026-04-22T09:14:00Z",
    status: "new",
  },
  {
    id: "r_2",
    businessName: "Café Bella",
    reviewerName: "Marcus Holm",
    reviewerInitials: "MH",
    platform: "google",
    rating: 2,
    content:
      "Ordered a cappuccino that arrived lukewarm and the pastry case was mostly empty at 10am on a Saturday. The staff were kind but the experience felt rushed.",
    date: "2026-04-21T15:42:00Z",
    status: "pending",
    aiReply:
      "Hi Marcus, thank you for taking the time to share this — I'm sorry the cappuccino wasn't up to temperature and that the pastry selection was thin when you visited. We're reviewing our Saturday morning prep with the team. I'd love to make it right on your next visit, please ask for Elena at the counter.",
  },
  {
    id: "r_3",
    businessName: "Luna Nails Studio",
    reviewerName: "Priya Nair",
    reviewerInitials: "PN",
    platform: "yelp",
    rating: 5,
    content:
      "Best manicure I've had in years. Clean, calm studio and the nail art detail was unreal. Booking again for next month already.",
    date: "2026-04-21T11:03:00Z",
    status: "replied",
    aiReply:
      "Priya, this made our whole team smile — thank you! See you in May, and feel free to bring reference photos so we can dream up something even better next time.",
  },
  {
    id: "r_4",
    businessName: "Luna Nails Studio",
    reviewerName: "Emma Davis",
    reviewerInitials: "ED",
    platform: "google",
    rating: 4,
    content:
      "Lovely service and the chrome finish lasted two full weeks. Only reason it's not 5 stars is the wait — I booked online but still waited 20 minutes past my slot.",
    date: "2026-04-20T16:28:00Z",
    status: "new",
  },
  {
    id: "r_5",
    businessName: "Northside Bistro",
    reviewerName: "James O'Connor",
    reviewerInitials: "JO",
    platform: "tripadvisor",
    rating: 5,
    content:
      "The scallop starter alone is worth the trip. Anniversary dinner, perfectly paced, and the sommelier's pinot pick was exactly right. A proper neighborhood gem.",
    date: "2026-04-20T20:11:00Z",
    status: "replied",
    aiReply:
      "James, congratulations again on the anniversary — so glad we got to be part of it. I'll pass your note along to Tomas (the scallop defender-in-chief) and Clara behind the wine list. We'll save you a table for the next one.",
  },
  {
    id: "r_6",
    businessName: "Northside Bistro",
    reviewerName: "Anna Weber",
    reviewerInitials: "AW",
    platform: "facebook",
    rating: 1,
    content:
      "Reservation was given away after we arrived 10 minutes late. Host was dismissive, no apology, no attempt to seat us. Not the welcome you'd expect from a place charging these prices.",
    date: "2026-04-19T19:55:00Z",
    status: "new",
  },
  {
    id: "r_7",
    businessName: "Café Bella",
    reviewerName: "David Chen",
    reviewerInitials: "DC",
    platform: "yelp",
    rating: 4,
    content:
      "Solid neighborhood coffee spot. Wifi is fast and the corner seats are perfect for a couple of hours of writing. Wish they had a few more savory options.",
    date: "2026-04-18T08:22:00Z",
    status: "pending",
    aiReply:
      "Thanks David — really glad the corner seat is working out for the writing sessions. We're actually testing two new savory items next month, so keep an eye out and let us know what you think.",
  },
  {
    id: "r_8",
    businessName: "Luna Nails Studio",
    reviewerName: "Rachel Kim",
    reviewerInitials: "RK",
    platform: "google",
    rating: 3,
    content:
      "Technician was skilled but the studio smelled strongly of acetone the whole visit. Ventilation would make a real difference.",
    date: "2026-04-17T13:40:00Z",
    status: "new",
  },
];

export function getReviewStats(reviews: Review[] = mockReviews) {
  const total = reviews.length;
  const newCount = reviews.filter((r) => r.status === "new").length;
  const pendingCount = reviews.filter((r) => r.status === "pending").length;
  const repliedCount = reviews.filter((r) => r.status === "replied").length;
  const avgRating =
    total === 0
      ? 0
      : reviews.reduce((sum, r) => sum + r.rating, 0) / total;
  return { total, newCount, pendingCount, repliedCount, avgRating };
}
