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

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Indstillinger</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Administrer din virksomhedsprofil, brand voice og forbundne platforme.
        </p>
      </div>

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
          {[
            { name: "Google Business Profile", status: "Forbundet" },
            { name: "Yelp", status: "Forbundet" },
            { name: "Facebook", status: "Ikke forbundet" },
            { name: "TripAdvisor", status: "Forbundet" },
          ].map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  {p.status === "Forbundet"
                    ? "Sidst synkroniseret for 2 minutter siden"
                    : "Tilføj din konto for at hente anmeldelser"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={
                    p.status === "Forbundet"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-border text-muted-foreground"
                  }
                >
                  {p.status}
                </Badge>
                <Button
                  size="sm"
                  variant={p.status === "Forbundet" ? "outline" : "default"}
                >
                  {p.status === "Forbundet" ? "Administrer" : "Tilslut"}
                </Button>
              </div>
            </div>
          ))}
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
