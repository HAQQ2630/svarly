import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getValidAccessToken, listAccounts, listLocations } from "@/lib/google-gbp";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const accessToken = await getValidAccessToken(user.id, supabase);
    const accounts = await listAccounts(accessToken);

    if (!accounts.length) {
      return NextResponse.json({ locations: [] });
    }

    // Fetch locations for all accounts in parallel.
    const locationGroups = await Promise.all(
      accounts.map((account) => listLocations(accessToken, account.name))
    );

    const locations = locationGroups.flat();
    return NextResponse.json({ locations });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
