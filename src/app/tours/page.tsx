import type { Metadata } from "next";
import ToursClient from "./ToursClient";

export const metadata: Metadata = {
  title: "Tour Packages | Mirissa Kayak Safari Tours",
  description:
    "Explore our range of kayaking tours - from sunrise paddles to full-day expeditions. Find the perfect adventure for your Sri Lanka trip.",
};

export default function ToursPage() {
  return <ToursClient />;
}
