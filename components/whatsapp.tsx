"use client";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFab(){
  return (
    <Link
      href="https://wa.me/971500000000?text=Hi%20Decimal%20Builders!%20I%20have%20a%20question."
      target="_blank"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full brand-bg text-white shadow-lg"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Link>
  );
}
