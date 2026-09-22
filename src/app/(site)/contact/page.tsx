import type { Metadata } from "next";
import { ContactHero } from "@/components/contact-hero";

export const metadata: Metadata = { title: "Contact" };

// Field set and destination confirmed with the client (Zoe, SME Partners):
// name, company, phone, email, message, all routing to one inbox with no
// per-market split. hello@cladyfoodgroup.co.uk is not live yet, so the form
// posts as a mailto: for now - swap the <form> action for a proper handler
// (API route + email provider) once the inbox is set up, before launch.
// (Field definitions and the bold-aware form styling now live in
// contact-hero.tsx, since the form is part of the theme-aware hero.)

export default function ContactPage() {
  return <ContactHero />;
}
