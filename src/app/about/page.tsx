import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | Mirissa Kayak Safari Tours",
  description:
    "Learn about our story, our experienced guides, and our commitment to safe, authentic kayaking experiences in Mirissa, Sri Lanka.",
};

export default function AboutPage() {
  return <AboutClient />;
}
