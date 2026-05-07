import type { SupabaseClient } from "@supabase/supabase-js";

// ─── Token management ────────────────────────────────────────────────────────

export async function getValidAccessToken(
  userId: string,
  supabase: SupabaseClient
): Promise<string> {
  const { data, error } = await supabase
    .from("google_connections")
    .select("access_token, refresh_token, expires_at")
    .eq("user_id", userId)
    .single();

  if (error || !data) throw new Error("Google account not connected");

  const expiresAt = new Date(data.expires_at).getTime();
  // Return current token if it has more than 5 minutes left.
  if (expiresAt - Date.now() > 5 * 60 * 1000) return data.access_token;

  if (!data.refresh_token) {
    throw new Error("Google token expired — user must reconnect");
  }

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: data.refresh_token,
      grant_type: "refresh_token",
    }),
  });

  if (!res.ok) throw new Error(`Token refresh failed: ${await res.text()}`);

  const refreshed = await res.json() as { access_token: string; expires_in: number };
  const newExpiresAt = new Date(Date.now() + refreshed.expires_in * 1000).toISOString();

  await supabase
    .from("google_connections")
    .update({ access_token: refreshed.access_token, expires_at: newExpiresAt, updated_at: new Date().toISOString() })
    .eq("user_id", userId);

  return refreshed.access_token;
}

// ─── GBP API helpers ─────────────────────────────────────────────────────────

async function gbpFetch(accessToken: string, url: string) {
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GBP API error ${res.status}: ${body}`);
  }
  return res.json();
}

export interface GbpAccount {
  name: string;
  accountName: string;
  type: string;
}

export interface GbpLocation {
  name: string;
  title: string;
  accountName: string;
}

export interface GbpReview {
  name: string;
  reviewId: string;
  reviewer: { displayName: string; profilePhotoUrl?: string };
  starRating: "ONE" | "TWO" | "THREE" | "FOUR" | "FIVE";
  comment?: string;
  createTime: string;
  updateTime: string;
  reviewReply?: { comment: string; updateTime: string };
}

export async function listAccounts(accessToken: string): Promise<GbpAccount[]> {
  const data = await gbpFetch(
    accessToken,
    "https://mybusinessaccountmanagement.googleapis.com/v1/accounts"
  );
  return data.accounts ?? [];
}

export async function listLocations(
  accessToken: string,
  accountName: string
): Promise<GbpLocation[]> {
  const data = await gbpFetch(
    accessToken,
    `https://mybusinessbusinessinformation.googleapis.com/v1/${accountName}/locations?readMask=name,title`
  );
  return (data.locations ?? []).map((l: { name: string; title: string }) => ({
    ...l,
    accountName,
  }));
}

export async function listReviews(
  accessToken: string,
  locationName: string
): Promise<GbpReview[]> {
  const data = await gbpFetch(
    accessToken,
    `https://mybusiness.googleapis.com/v4/${locationName}/reviews?pageSize=50`
  );
  return data.reviews ?? [];
}

export async function postReply(
  accessToken: string,
  reviewName: string,
  comment: string
): Promise<void> {
  const res = await fetch(
    `https://mybusiness.googleapis.com/v4/${reviewName}/reply`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ comment }),
    }
  );
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GBP reply failed ${res.status}: ${body}`);
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const STAR_MAP: Record<GbpReview["starRating"], number> = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
};

export function starRatingToNumber(rating: GbpReview["starRating"]): number {
  return STAR_MAP[rating] ?? 3;
}

export function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
