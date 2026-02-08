"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/ui/loader";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    console.log("token saved:", localStorage.getItem("admin_token"));


    if (!token) {
      router.replace("/");
      router.refresh();
      setReady(false);
      return;
    }

    setReady(true);
  }, [router]);

  if (!ready) return <Loader />;
  return <>{children}</>;
}
