import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact Us | Mirissa Kayak Safari Tours",
  description:
    "Get in touch with us via WhatsApp, phone, or email. We're happy to answer your questions and help you book your kayaking adventure.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
