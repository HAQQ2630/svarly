import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  getValidAccessToken,
  listReviews,
  starRatingToNumber,
  initials,
} from "@/lib/google-gbp";
import { sendNewReviewEmail } from "@/lib/email";

// POST /api/google/sync
// Body: { locationName: string; locationTitle: string; accountName: string }
//
// Creates or updates the business row for this location, then upserts all
// reviews from Google into the `reviews` table. Returns a summary.

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as {
    locationName: string;
    locationTitle: string;
    accountName: string;
  };

  if (!body.locationName || !body.locationTitle) {
    return NextResponse.json({ error: "Missing locationName or locationTitle" }, { status: 400 });
  }

  try {
    const accessToken = await getValidAccessToken(user.id, supabase);

    // Upsert the business row keyed on google_location_name.
    // If a business for this location already exists, update it; otherwise create.
    const { data: existing } = await supabase
      .from("businesses")
      .select("id")
      .eq("owner_user_id", user.id)
      .eq("google_location_name", body.locationName)
      .maybeSingle();

    let businessId: string;

    if (existing) {
      businessId = existing.id;
    } else {
      const { data: created, error: createErr } = await supabase
        .from("businesses")
        .insert({
          owner_user_id: user.id,
          name: body.locationTitle,
          google_location_name: body.locationName,
          google_account_name: body.accountName,
        })
        .select("id")
        .single();

      if (createErr || !created) {
        throw new Error(`Failed to create business: ${createErr?.message}`);
      }
      businessId = created.id;
    }

    // Fetch reviews from Google.
    const reviews = await listReviews(accessToken, body.locationName);

    if (!reviews.length) {
      return NextResponse.json({ synced: 0, businessId });
    }

    const rows = reviews.map((r) => ({
      business_id: businessId,
      platform: "google" as const,
      google_review_name: r.name,
      reviewer_name: r.reviewer.displayName,
      reviewer_initials: initials(r.reviewer.displayName),
      rating: starRatingToNumber(r.starRating),
      content: r.comment ?? "",
      status: r.reviewReply ? ("replied" as const) : ("new" as const),
      ai_reply: r.reviewReply?.comment ?? null,
      posted_at: r.createTime,
    }));

    const { error: insertErr } = await supabase.from("reviews").upsert(rows, {
      onConflict: "business_id,platform,reviewer_name,posted_at",
      ignoreDuplicates: false,
    });

    if (insertErr) throw new Error(`Failed to save reviews: ${insertErr.message}`);

    // Send email for reviews that are new (not already replied).
    // Fire-and-forget — don't let email errors block the sync response.
    if (user.email) {
      const newReviews = rows.filter((r) => r.status === "new");
      for (const r of newReviews) {
        sendNewReviewEmail({
          to: user.email,
          businessName: body.locationTitle,
          reviewerName: r.reviewer_name,
          rating: r.rating,
          content: r.content,
          reviewsUrl: `${request.nextUrl.origin}/reviews`,
        }).catch((e) => console.error("[email]", e));
      }
    }

    return NextResponse.json({ synced: rows.length, businessId });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[google/sync]", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
