import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getValidAccessToken, postReply } from "@/lib/google-gbp";

// POST /api/reviews/approve
// Body: { reviewId: string }
// Posts the ai_reply to Google, marks status → 'replied'.

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

  // Fetch the review (RLS ensures ownership via business).
  const { data: review, error: reviewErr } = await supabase
    .from("reviews")
    .select("id, ai_reply, google_review_name, platform, status")
    .eq("id", reviewId)
    .single();

  if (reviewErr || !review) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  if (!review.ai_reply) {
    return NextResponse.json({ error: "No reply to approve — generate one first" }, { status: 400 });
  }

  if (review.status === "replied") {
    return NextResponse.json({ error: "Already replied" }, { status: 400 });
  }

  // Post to Google only if we have the review resource name.
  if (review.platform === "google" && review.google_review_name) {
    try {
      const accessToken = await getValidAccessToken(user.id, supabase);
      await postReply(accessToken, review.google_review_name, review.ai_reply);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Google API error";
      console.error("[reviews/approve]", message);
      return NextResponse.json({ error: message }, { status: 502 });
    }
  }

  // Mark replied regardless (covers mock/non-Google reviews too).
  const { error: updateErr } = await supabase
    .from("reviews")
    .update({ status: "replied", replied_at: new Date().toISOString() })
    .eq("id", reviewId);

  if (updateErr) {
    return NextResponse.json({ error: updateErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
