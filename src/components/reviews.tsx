"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTopReviews, type Reviews } from "@/services/reviews.service";
import { Skeleton } from "./ui/skeleton";

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          className={`${
            star <= rating
              ? "fill-primary text-primary"
              : "text-muted-foreground"
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function ExpandableReviewText({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > 150;

  return (
    <div>
      <p
        className={`text-foreground/80 ${!expanded && isLong ? "line-clamp-3" : ""}`}
      >
        {text}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-primary hover:underline text-sm font-medium mt-2"
          aria-expanded={expanded}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}

function ReviewSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3 space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-5 w-20 rounded-full" />
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-4 w-4 rounded-full" />
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-3 w-24 mt-4" />
      </CardContent>
    </Card>
  );
}

export function Reviews() {
  const [topReviews, setTopReviews] = useState<Reviews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const items = await getTopReviews(3);
        setTopReviews(items);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <section className="py-20 px-4 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What Our Guests Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it - hear from adventurers
            who&apos;ve experienced our tours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <ReviewSkeleton key={i} />
              ))
            : topReviews.map((review) => (
                <Card key={review.id} className="flex flex-col">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <CardTitle className="text-lg">{review.name}</CardTitle>
                        <Badge variant="secondary" className="mt-2">
                          {review.country}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-3">
                      <StarRating rating={review.rating} />
                    </div>
                  </CardHeader>

                  <CardContent className="flex-1 flex flex-col">
                    <ExpandableReviewText text={review.text} />

                    <p className="text-xs text-muted-foreground mt-4 pt-4 border-t">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </CardContent>
                </Card>
              ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/reviews">View All Reviews</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
