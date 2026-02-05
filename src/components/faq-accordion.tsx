"use client";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { getFaqs, FAQ } from "@/services/faq.service";

export function FAQAccordion() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFaqs()
      .then((data) => setFaqs(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 bg-background">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <Skeleton className="h-9 w-80 mx-auto" />
            <Skeleton className="h-5 w-[520px] mx-auto mt-4" />
          </div>

          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="rounded-lg border p-4">
                <Skeleton className="h-5 w-[85%]" />
                <Skeleton className="h-4 w-[70%] mt-3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-background">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know before your kayak adventure.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqs
            .filter((f) => f.isActive)
            .sort((a, b) => a.order - b.order)
            .map((faq) => (
              <AccordionItem key={faq._id} value={`item-${faq._id}`}>
                <AccordionTrigger className="text-base text-foreground text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </section>
  );
}
