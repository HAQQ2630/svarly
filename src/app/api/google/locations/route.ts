import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  getValidAccessToken,
  listAccounts,
  listLocations,
  GbpApiError,
} from "@/lib/google-gbp";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: { code: "unauthorized" } },
      { status: 401 },
    );
  }

  try {
    const accessToken = await getValidAccessToken(user.id, supabase);
    const accounts = await listAccounts(accessToken);

    if (!accounts.length) {
      return NextResponse.json({ locations: [] });
    }

    const locationGroups = await Promise.all(
      accounts.map((account) => listLocations(accessToken, account.name)),
    );

    const locations = locationGroups.flat();
    return NextResponse.json({ locations });
  } catch (err) {
    if (err instanceof GbpApiError) {
      console.error(
        "[google/locations] GBP error",
        err.status,
        err.code,
        err.body,
      );
      return NextResponse.json(
        { error: { code: err.code } },
        { status: err.status === 401 ? 401 : 503 },
      );
    }
    // Token-refresh / DB / unexpected
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[google/locations] unexpected", message);
    if (message.includes("not connected") || message.includes("must reconnect")) {
      return NextResponse.json(
        { error: { code: "unauthorized" } },
        { status: 401 },
      );
    }
    return NextResponse.json(
      { error: { code: "server_error" } },
      { status: 500 },
    );
  }
}
