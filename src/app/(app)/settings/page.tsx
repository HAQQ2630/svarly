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
import { createClient } from "@/lib/supabase/server";
import { GoogleLocationPicker } from "@/components/settings/google-location-picker";

async function getPageData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { googleConn: null, business: null };

  const [{ data: googleConn }, { data: business }] = await Promise.all([
    supabase
      .from("google_connections")
      .select("google_email, updated_at")
      .eq("user_id", user.id)
      .maybeSingle(),
    supabase
      .from("businesses")
      .select("id, name, google_location_name, signature, brand_voice")
      .eq("owner_user_id", user.id)
      .not("google_location_name", "is", null)
      .maybeSingle(),
  ]);

  return { googleConn, business };
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ google_connected?: string; google_error?: string; synced?: string }>;
}) {
  const params = await searchParams;
  const { googleConn, business } = await getPageData();
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
              defaultValue={business?.name ?? ""}
              placeholder="Café Bella"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reply-signature">Svar-signatur</Label>
            <Input
              id="reply-signature"
              defaultValue={business?.signature ?? ""}
              placeholder="— Elena, ejer"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="voice">Brand voice</Label>
            <Input
              id="voice"
              defaultValue={business?.brand_voice ?? ""}
              placeholder="Varm, konkret, aldrig corporate. Korte sætninger."
            />
          </div>
        </CardContent>
      </Card>

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

            {/* Location picker — shown after OAuth but before a location is selected */}
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
            <Button variant="outline" size="sm">
              Log ud
            </Button>
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
            <Button variant="destructive" size="sm">
              Slet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
