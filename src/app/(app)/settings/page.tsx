import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { GoogleLocationPicker } from "@/components/settings/google-location-picker";
import { DeleteWorkspaceButton } from "@/components/delete-workspace-button";

async function saveBusinessProfile(formData: FormData) {
  "use server";
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const name = (formData.get("business-name") as string | null)?.trim() ?? "";
  const signature = (formData.get("reply-signature") as string | null)?.trim() || null;
  const brandVoice = (formData.get("voice") as string | null)?.trim() || null;

  const { data: existing } = await supabase
    .from("businesses")
    .select("id, name")
    .eq("owner_user_id", user.id)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("businesses")
      .update({ name: name || existing.name, signature, brand_voice: brandVoice })
      .eq("id", existing.id);
  } else if (name) {
    await supabase
      .from("businesses")
      .insert({ owner_user_id: user.id, name, signature, brand_voice: brandVoice });
  }

  redirect("/settings?saved=1");
}

async function signOut() {
  "use server";
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

async function deleteWorkspace() {
  "use server";
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  await supabase.from("businesses").delete().eq("owner_user_id", user.id);
  await supabase.auth.signOut();
  redirect("/login");
}

async function getPageData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { googleConn: null, business: null, subscription: null };

  const [{ data: googleConn }, { data: business }, { data: subscription }] =
    await Promise.all([
      supabase
        .from("google_connections")
        .select("google_email, updated_at")
        .eq("user_id", user.id)
        .maybeSingle(),
      supabase
        .from("businesses")
        .select("id, name, google_location_name, signature, brand_voice")
        .eq("owner_user_id", user.id)
        .maybeSingle(),
      supabase
        .from("subscriptions")
        .select("status, trial_end, current_period_end, stripe_customer_id")
        .eq("user_id", user.id)
        .maybeSingle(),
    ]);

  return { googleConn, business, subscription };
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ google_connected?: string; google_error?: string; synced?: string; saved?: string }>;
}) {
  const params = await searchParams;
  const { googleConn, business, subscription } = await getPageData();
  const isGoogleConnected = !!googleConn;
  const hasLocation = !!business?.google_location_name;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Indstillinger</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Administrer din virksomhedsprofil, brand voice og forbundne platforme.
        </p>
      </div>

      {params.saved && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Virksomhedsprofil gemt.
        </div>
      )}
      {params.google_connected && !hasLocation && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Google forbundet. Vælg nu hvilken lokation Svarly skal bruge.
        </div>
      )}
      {params.google_error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Google-forbindelsen mislykkedes: {params.google_error}
        </div>
      )}
      {params.synced && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {params.synced} anmeldelser hentet fra Google.
        </div>
      )}

      {/* Business profile */}
      <form action={saveBusinessProfile}>
        <Card>
          <CardHeader>
            <CardTitle>Virksomhedsprofil</CardTitle>
            <CardDescription>
              Vises i AI-genererede svar og i rapporter.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="business-name">Virksomhedsnavn</Label>
              <Input
                id="business-name"
                name="business-name"
                defaultValue={business?.name ?? ""}
                placeholder="Café Bella"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reply-signature">Svar-signatur</Label>
              <Input
                id="reply-signature"
                name="reply-signature"
                defaultValue={business?.signature ?? ""}
                placeholder="— Elena, ejer"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="voice">Brand voice</Label>
              <Input
                id="voice"
                name="voice"
                defaultValue={business?.brand_voice ?? ""}
                placeholder="Varm, konkret, aldrig corporate. Korte sætninger."
              />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" size="sm">Gem profil</Button>
            </div>
          </CardContent>
        </Card>
      </form>

      {/* Connected platforms */}
      <Card>
        <CardHeader>
          <CardTitle>Forbundne platforme</CardTitle>
          <CardDescription>
            Anmeldelseskilder Svarly henter fra.
          </CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-border/60">
          {/* Google Business Profile */}
          <div className="space-y-3 py-3 first:pt-0">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Google Business Profile</p>
                <p className="text-xs text-muted-foreground">
                  {isGoogleConnected
                    ? hasLocation
                      ? `Synkroniserer ${business!.name}`
                      : googleConn.google_email
                        ? `Forbundet som ${googleConn.google_email} — vælg lokation nedenfor`
                        : "Forbundet — vælg lokation nedenfor"
                    : "Tilføj din konto for at hente anmeldelser"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={
                    hasLocation
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : isGoogleConnected
                        ? "border-amber-200 bg-amber-50 text-amber-700"
                        : "border-border text-muted-foreground"
                  }
                >
                  {hasLocation ? "Aktiv" : isGoogleConnected ? "Vælg lokation" : "Ikke forbundet"}
                </Badge>
                <Link
                  href="/api/auth/google/start"
                  className={buttonVariants({
                    size: "sm",
                    variant: isGoogleConnected ? "outline" : "default",
                  })}
                >
                  {isGoogleConnected ? "Genforbind" : "Tilslut"}
                </Link>
              </div>
            </div>

            {isGoogleConnected && !hasLocation && (
              <GoogleLocationPicker
                onSynced={(count) => {
                  window.location.href = `/settings?synced=${count}`;
                }}
              />
            )}
          </div>

          {/* Trustpilot — coming soon */}
          <div className="flex items-center justify-between py-3 last:pb-0">
            <div>
              <p className="text-sm font-medium">Trustpilot</p>
              <p className="text-xs text-muted-foreground">
                Tilføj din konto for at hente anmeldelser
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-border text-muted-foreground">
                Ikke forbundet
              </Badge>
              <Button size="sm" disabled>
                Kommer snart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card>
        <CardHeader>
          <CardTitle>Abonnement</CardTitle>
          <CardDescription>Administrer din fakturering og plan.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">
                {subscription?.status === "active"
                  ? "Starter — 199 DKK/måned"
                  : subscription?.status === "trialing"
                    ? "Gratis prøveperiode"
                    : subscription
                      ? "Ingen aktiv plan"
                      : "Ingen aktiv plan"}
              </p>
              <p className="text-xs text-muted-foreground">
                {subscription?.status === "trialing" && subscription.trial_end
                  ? `Prøveperiode slutter ${new Date(subscription.trial_end).toLocaleDateString("da-DK", { day: "numeric", month: "long" })}`
                  : subscription?.status === "active" && subscription.current_period_end
                    ? `Næste fakturering ${new Date(subscription.current_period_end).toLocaleDateString("da-DK", { day: "numeric", month: "long" })}`
                    : "Start din gratis prøveperiode i dag"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={
                  subscription?.status === "active"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : subscription?.status === "trialing"
                      ? "border-amber-200 bg-amber-50 text-amber-700"
                      : "border-border text-muted-foreground"
                }
              >
                {subscription?.status === "active"
                  ? "Aktiv"
                  : subscription?.status === "trialing"
                    ? "Prøveperiode"
                    : "Inaktiv"}
              </Badge>
              {subscription?.stripe_customer_id ? (
                <Link
                  href="/api/stripe/portal"
                  className={buttonVariants({ size: "sm", variant: "outline" })}
                >
                  Administrer
                </Link>
              ) : (
                <Link
                  href="/api/stripe/checkout"
                  className={buttonVariants({ size: "sm" })}
                >
                  Opgrader
                </Link>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card>
        <CardHeader>
          <CardTitle>Farezone</CardTitle>
          <CardDescription>Permanente handlinger på kontoen.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Log ud</p>
              <p className="text-xs text-muted-foreground">
                Afslut din session på denne enhed.
              </p>
            </div>
            <form action={signOut}>
              <Button type="submit" variant="outline" size="sm">
                Log ud
              </Button>
            </form>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-destructive">
                Slet workspace
              </p>
              <p className="text-xs text-muted-foreground">
                Dette fjerner alle anmeldelser og svar. Kan ikke fortrydes.
              </p>
            </div>
            <DeleteWorkspaceButton action={deleteWorkspace} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
