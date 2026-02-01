"use client";

import { useState, useMemo } from "react";
import { Star } from "lucide-react";
import { reviews as allReviews } from "@/lib/site-config";
import { Header } from "@/components/header/header";
import { Footer } from "@/components/footer/footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Review {
  id: number;
  name: string;
  country: string;
  rating: number;
  text: string;
  date: string;
}

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

function RatingBar({
  rating,
  count,
  total,
}: {
  rating: number;
  count: number;
  total: number;
}) {
  const percentage = (count / total) * 100;

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium min-w-fit">{rating} stars</span>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${percentage}%` }}
          aria-label={`${count} reviews with ${rating} star rating`}
        />
      </div>
      <span className="text-sm text-muted-foreground min-w-fit">{count}</span>
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
          onClick={() => setExpanded(!expanded)}
          className="text-primary hover:underline text-sm font-medium mt-2"
          aria-expanded={expanded}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}

export default function ReviewsPage() {
  const [ratingFilter, setRatingFilter] = useState<string>("all");
  const [countryFilter, setCountryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");

  // Calculate stats
  const totalReviews = allReviews.length;
  const averageRating = (
    allReviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
  ).toFixed(1);
  const ratingCounts = {
    5: allReviews.filter((r) => r.rating === 5).length,
    4: allReviews.filter((r) => r.rating === 4).length,
    3: allReviews.filter((r) => r.rating === 3).length,
    2: allReviews.filter((r) => r.rating === 2).length,
    1: allReviews.filter((r) => r.rating === 1).length,
  };

  // Get unique countries
  const countries = Array.from(
    new Set(allReviews.map((r) => r.country)),
  ).sort();

  // Filter and sort reviews
  const filteredReviews = useMemo(() => {
    let filtered = allReviews.filter((review) => {
      const ratingMatch =
        ratingFilter === "all" || review.rating === parseInt(ratingFilter);
      const countryMatch =
        countryFilter === "all" || review.country === countryFilter;
      return ratingMatch && countryMatch;
    });

    // Sort reviews
    filtered.sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "highest") {
        return (
          b.rating - a.rating ||
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      } else if (sortBy === "lowest") {
        return (
          a.rating - b.rating ||
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      }
      return 0;
    });

    return filtered;
  }, [ratingFilter, countryFilter, sortBy]);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
          {/* Page Title */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Customer Reviews
            </h1>
            <p className="text-lg text-foreground/60">
              See what our guests say about their Mirissa kayaking adventures
            </p>
          </div>

          {/* Summary Section */}
          <Card className="mb-12 bg-card">
            <CardHeader>
              <CardTitle>Review Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Average Rating */}
                <div className="flex flex-col items-center justify-center p-6 bg-background rounded-lg">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {averageRating}
                  </div>
                  <StarRating
                    rating={Math.round(parseFloat(averageRating))}
                    size={20}
                  />
                  <p className="text-sm text-foreground/60 mt-2">
                    Based on {totalReviews} reviews
                  </p>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <RatingBar
                      key={rating}
                      rating={rating}
                      count={ratingCounts[rating as keyof typeof ratingCounts]}
                      total={totalReviews}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Filters and Sorting */}
          <div className="mb-8 space-y-4 lg:flex lg:gap-4 lg:space-y-0">
            <div className="flex-1">
              <label
                htmlFor="rating-filter"
                className="block text-sm font-medium mb-2"
              >
                Filter by Rating
              </label>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger id="rating-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label
                htmlFor="country-filter"
                className="block text-sm font-medium mb-2"
              >
                Filter by Country
              </label>
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger id="country-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((country) => (
                    <SelectItem key={country} value={country}>
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1">
              <label htmlFor="sort" className="block text-sm font-medium mb-2">
                Sort By
              </label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="highest">Highest Rating</SelectItem>
                  <SelectItem value="lowest">Lowest Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reviews Grid */}
          {filteredReviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReviews.map((review: Review) => (
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
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-foreground/60">
                No reviews match your filters. Try adjusting your selection.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
