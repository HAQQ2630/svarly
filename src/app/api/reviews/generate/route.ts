import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateDanishReply } from "@/lib/ai-reply";

// POST /api/reviews/generate
// Body: { reviewId: string }
// Generates an AI reply, saves it, and sets status → 'pending'.

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { reviewId } = (await request.json()) as { reviewId: string };
  if (!reviewId) {
    return NextResponse.json({ error: "Missing reviewId" }, { status: 400 });
  }

  // Fetch review + parent business in one query (RLS ensures ownership).
  const { data: review, error: reviewErr } = await supabase
    .from("reviews")
    .select(
      `id, reviewer_name, rating, content, status,
       businesses ( name, signature, brand_voice )`
    )
    .eq("id", reviewId)
    .single();

  if (reviewErr || !review) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  const business = Array.isArray(review.businesses)
    ? review.businesses[0]
    : review.businesses;

  try {
    const aiReply = await generateDanishReply({
      reviewerName: review.reviewer_name,
      rating: review.rating,
      content: review.content,
      businessName: business?.name ?? "",
      brandVoice: business?.brand_voice ?? null,
      signature: business?.signature ?? null,
    });

    const { error: updateErr } = await supabase
      .from("reviews")
      .update({ ai_reply: aiReply, status: "pending" })
      .eq("id", reviewId);

    if (updateErr) throw new Error(updateErr.message);

    return NextResponse.json({ aiReply });
  } catch (err) {
    const message = err instanceof Error ? err.message : "AI generation failed";
    console.error("[reviews/generate]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
