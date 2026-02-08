"use client";

import { useEffect, useState } from "react";
import { getFaqsAdmin } from "@/services/faq.service";

export default function FaqListClient() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getFaqsAdmin();
        setFaqs(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {faqs.map((f) => (
        <div key={f.id}>{f.question}</div>
      ))}
    </div>
  );
}
