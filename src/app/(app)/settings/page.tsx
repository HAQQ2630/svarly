import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function getGoogleConnection() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("google_connections")
    .select("google_email, updated_at")
    .eq("user_id", user.id)
    .maybeSingle();

  return data;
}

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ google_connected?: string; google_error?: string }>;
}) {
  const params = await searchParams;
  const googleConn = await getGoogleConnection();
  const isGoogleConnected = !!googleConn;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Indstillinger</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Administrer din virksomhedsprofil, brand voice og forbundne platforme.
        </p>
      </div>

      {params.google_connected && (
        <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Google Business Profile er nu forbundet.
        </div>
      )}
      {params.google_error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          Google-forbindelsen mislykkedes: {params.google_error}
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
            <Input id="business-name" defaultValue="Café Bella" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reply-signature">Svar-signatur</Label>
            <Input id="reply-signature" defaultValue="— Elena, ejer" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="voice">Brand voice</Label>
            <Input
              id="voice"
              defaultValue="Varm, konkret, aldrig corporate. Korte sætninger."
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
          {/* Google Business Profile — real connection status */}
          <div className="flex items-center justify-between py-3 first:pt-0">
            <div>
              <p className="text-sm font-medium">Google Business Profile</p>
              <p className="text-xs text-muted-foreground">
                {isGoogleConnected
                  ? googleConn.google_email
                    ? `Forbundet som ${googleConn.google_email}`
                    : "Forbundet"
                  : "Tilføj din konto for at hente anmeldelser"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={
                  isGoogleConnected
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : "border-border text-muted-foreground"
                }
              >
                {isGoogleConnected ? "Forbundet" : "Ikke forbundet"}
              </Badge>
              {isGoogleConnected ? (
                <Link
                  href="/api/auth/google/start"
                  className={buttonVariants({ size: "sm", variant: "outline" })}
                >
                  Genforbind
                </Link>
              ) : (
                <Link
                  href="/api/auth/google/start"
                  className={buttonVariants({ size: "sm" })}
                >
                  Tilslut
                </Link>
              )}
            </div>
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
