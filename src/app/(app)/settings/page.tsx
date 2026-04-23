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
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your business profile, voice and connected platforms.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Business profile</CardTitle>
          <CardDescription>
            Shown in AI-generated replies and on reports.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="business-name">Business name</Label>
            <Input id="business-name" defaultValue="Café Bella" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reply-signature">Reply signature</Label>
            <Input id="reply-signature" defaultValue="— Elena, owner" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="voice">Brand voice</Label>
            <Input
              id="voice"
              defaultValue="Warm, specific, never corporate. Short sentences."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Connected platforms</CardTitle>
          <CardDescription>
            Review sources Svarly will pull from.
          </CardDescription>
        </CardHeader>
        <CardContent className="divide-y divide-border/60">
          {[
            { name: "Google Business Profile", status: "Connected" },
            { name: "Yelp", status: "Connected" },
            { name: "Facebook", status: "Not connected" },
            { name: "TripAdvisor", status: "Connected" },
          ].map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div>
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  {p.status === "Connected"
                    ? "Last synced 2 minutes ago"
                    : "Link your account to pull reviews"}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  variant="outline"
                  className={
                    p.status === "Connected"
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : "border-border text-muted-foreground"
                  }
                >
                  {p.status}
                </Badge>
                <Button
                  size="sm"
                  variant={p.status === "Connected" ? "outline" : "default"}
                >
                  {p.status === "Connected" ? "Manage" : "Connect"}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Danger zone</CardTitle>
          <CardDescription>Permanent account actions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Sign out</p>
              <p className="text-xs text-muted-foreground">
                End your session on this device.
              </p>
            </div>
            <Button variant="outline" size="sm">
              Sign out
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-destructive">
                Delete workspace
              </p>
              <p className="text-xs text-muted-foreground">
                This removes all reviews and replies. Cannot be undone.
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
