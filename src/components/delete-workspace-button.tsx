"use client";

import { Button } from "@/components/ui/button";

export function DeleteWorkspaceButton({ action }: { action: () => Promise<void> }) {
  function handleSubmit(e: React.FormEvent) {
    if (!confirm("Er du sikker? Dette sletter alle dine anmeldelser og svar permanent. Kan ikke fortrydes.")) {
      e.preventDefault();
    }
  }

  return (
    <form action={action} onSubmit={handleSubmit}>
      <Button type="submit" variant="destructive" size="sm">
        Slet
      </Button>
    </form>
  );
}
