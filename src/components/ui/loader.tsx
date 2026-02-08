"use client";

import { Loader2 } from "lucide-react";

export function Loader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex items-center gap-3 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    </div>
  );
}
