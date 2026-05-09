"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Location {
  name: string;
  title: string;
  accountName: string;
}

type FetchErrorCode =
  | "quota_exhausted"
  | "unauthorized"
  | "forbidden"
  | "server_error"
  | "unknown";

type State =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "loaded"; locations: Location[] }
  | { phase: "error"; code: FetchErrorCode };

const SUPPORT_EMAIL = "support@svarly.io";

export function GoogleLocationPicker() {
  const router = useRouter();
  const [state, setState] = useState<State>({ phase: "idle" });
  const [syncing, setSyncing] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<FetchErrorCode | null>(null);

  async function fetchLocations() {
    setState({ phase: "loading" });
    try {
      const res = await fetch("/api/google/locations");
      const data = (await res.json()) as
        | { locations: Location[] }
        | { error: { code: FetchErrorCode } };
      if ("error" in data) {
        setState({ phase: "error", code: data.error.code });
        return;
      }
      setState({ phase: "loaded", locations: data.locations });
    } catch {
      setState({ phase: "error", code: "unknown" });
    }
  }

  async function handleSelect(loc: Location) {
    setSyncing(loc.name);
    setSyncError(null);
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
      const data = (await res.json()) as
        | { synced: number }
        | { error: { code: FetchErrorCode } };
      if ("error" in data) {
        setSyncError(data.error.code);
        return;
      }
      router.replace(`/settings?synced=${data.synced}`);
      router.refresh();
    } catch {
      setSyncError("unknown");
    } finally {
      setSyncing(null);
    }
  }

  if (state.phase === "idle") {
    return (
      <div className="space-y-3 py-3">
        <p className="text-sm text-muted-foreground">
          Hent dine Google-lokationer for at vælge hvilken Svarly skal bruge.
        </p>
        <Button size="sm" onClick={fetchLocations}>
          Hent dine lokationer
        </Button>
      </div>
    );
  }

  if (state.phase === "loading") {
    return (
      <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Henter dine Google-lokationer…
      </div>
    );
  }

  if (state.phase === "error") {
    return (
      <ErrorBlock code={state.code} onRetry={fetchLocations} />
    );
  }

  // state.phase === "loaded"
  if (!state.locations.length) {
    return (
      <EmptyBlock />
    );
  }

  return (
    <div className="space-y-2 py-2">
      <p className="text-sm text-muted-foreground">
        Vælg hvilken lokation Svarly skal synkronisere anmeldelser fra:
      </p>
      <ul className="divide-y divide-border/60">
        {state.locations.map((loc) => (
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
      {syncError && (
        <p className="pt-2 text-sm text-[#5C6B62]">
          {syncError === "quota_exhausted"
            ? "Google begrænser forbindelsen lige nu. Prøv igen om lidt."
            : "Sync mislykkedes. Prøv igen, eller kontakt support."}
        </p>
      )}
    </div>
  );
}

function EmptyBlock() {
  return (
    <div
      className="my-3 rounded-[14px] px-5 py-6"
      style={{ background: "#EFEDE7", border: "1px solid #E0DDD5" }}
    >
      <p
        className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: "#5C6B62" }}
      >
        Ingen lokationer
      </p>
      <h3
        className="mb-3 text-[20px]"
        style={{
          fontFamily: "var(--font-dm-serif), Georgia, serif",
          fontWeight: 400,
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          color: "#1F2A24",
        }}
      >
        Vi fandt ingen lokationer på denne konto.
      </h3>
      <p
        className="mb-4 text-[14px]"
        style={{ color: "#5C6B62", lineHeight: 1.6 }}
      >
        Tjek at du er logget ind med den rigtige Google-konto, og at virksomheden
        er verificeret i Google Business Profile.
      </p>
      <a
        href="/api/auth/google/start"
        className="inline-flex items-center gap-2 rounded-[10px] px-4 py-2 text-[13.5px] font-medium transition-colors"
        style={{
          background: "#2F4F3E",
          color: "#F8F9F7",
          boxShadow: "0 2px 12px rgba(47,79,62,0.32)",
        }}
      >
        Prøv en anden konto
      </a>
    </div>
  );
}

function ErrorBlock({
  code,
  onRetry,
}: {
  code: FetchErrorCode;
  onRetry: () => void;
}) {
  const isQuota = code === "quota_exhausted";
  const isAuth = code === "unauthorized" || code === "forbidden";

  const kicker = isQuota
    ? "Google er begrænset"
    : isAuth
      ? "Forbindelsen er udløbet"
      : "Vi kunne ikke hente";

  const headline = isQuota
    ? "Google begrænser forbindelsen lige nu."
    : isAuth
      ? "Forbindelsen til Google er udløbet."
      : "Vi kunne ikke hente lokationer lige nu.";

  const body = isQuota
    ? "Prøv igen om lidt, eller kontakt support hvis det fortsætter."
    : isAuth
      ? "Forbind din Google-konto igen for at hente lokationer."
      : "Prøv igen om lidt. Hvis det fortsætter, så sig til.";

  return (
    <div
      className="my-3 rounded-[14px] px-5 py-6"
      style={{ background: "#EFEDE7", border: "1px solid #E0DDD5" }}
    >
      <p
        className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: "#5C6B62" }}
      >
        {kicker}
      </p>
      <h3
        className="mb-3 text-[20px]"
        style={{
          fontFamily: "var(--font-dm-serif), Georgia, serif",
          fontWeight: 400,
          lineHeight: 1.2,
          letterSpacing: "-0.01em",
          color: "#1F2A24",
        }}
      >
        {headline}
      </h3>
      <p
        className="mb-5 text-[14px]"
        style={{ color: "#5C6B62", lineHeight: 1.6 }}
      >
        {body}
      </p>
      <div className="flex items-center gap-3 flex-wrap">
        {isAuth ? (
          <a
            href="/api/auth/google/start"
            className="inline-flex items-center gap-2 rounded-[10px] px-4 py-2 text-[13.5px] font-medium transition-colors"
            style={{
              background: "#2F4F3E",
              color: "#F8F9F7",
              boxShadow: "0 2px 12px rgba(47,79,62,0.32)",
            }}
          >
            Genforbind Google
          </a>
        ) : (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 rounded-[10px] px-4 py-2 text-[13.5px] font-medium transition-colors"
            style={{
              background: "#2F4F3E",
              color: "#F8F9F7",
              boxShadow: "0 2px 12px rgba(47,79,62,0.32)",
            }}
          >
            Prøv igen
          </button>
        )}
        {!isAuth && (
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-[13px] underline-offset-[6px] decoration-[1.5px] transition-colors hover:underline"
            style={{ color: "#1F2A24" }}
          >
            Kontakt support
          </a>
        )}
      </div>
    </div>
  );
}
