"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Location {
  name: string;
  title: string;
  accountName: string;
}

interface Props {
  onSynced: (count: number) => void;
}

export function GoogleLocationPicker({ onSynced }: Props) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/google/locations")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setLocations(data.locations);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleSelect(loc: Location) {
    setSyncing(loc.name);
    setError(null);
    try {
      const res = await fetch("/api/google/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locationName: loc.name,
          locationTitle: loc.title,
          accountName: loc.accountName,
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      onSynced(data.synced);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sync failed");
    } finally {
      setSyncing(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Henter dine Google-lokationer…
      </div>
    );
  }

  if (error) {
    return (
      <p className="py-4 text-sm text-destructive">
        Fejl: {error}
      </p>
    );
  }

  if (!locations.length) {
    return (
      <p className="py-4 text-sm text-muted-foreground">
        Ingen lokationer fundet på denne Google-konto.{" "}
        <a href="/api/auth/google/start" className="underline">
          Prøv en anden konto
        </a>
      </p>
    );
  }

  return (
    <div className="space-y-2 py-2">
      <p className="text-sm text-muted-foreground">
        Vælg hvilken lokation Svarly skal synkronisere anmeldelser fra:
      </p>
      <ul className="divide-y divide-border/60">
        {locations.map((loc) => (
          <li key={loc.name} className="flex items-center justify-between py-3">
            <span className="text-sm font-medium">{loc.title}</span>
            <Button
              size="sm"
              disabled={syncing === loc.name}
              onClick={() => handleSelect(loc)}
            >
              {syncing === loc.name ? (
                <>
                  <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                  Synkroniserer…
                </>
              ) : (
                "Vælg & synk"
              )}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
