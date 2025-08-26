"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CityContactForm({
  cityLabel,
  whatsappUrl,
}: {
  cityLabel: string;
  whatsappUrl: string;
}) {
  const [name, setName] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [message, setMessage] = useState("");

  // No backend: we’ll push them to WhatsApp with prefilled text
  const toWhatsApp = () => {
    const text = encodeURIComponent(
      `Hi Decimal Builders!\nCity: ${cityLabel}\nName: ${name}\nContact: ${phoneOrEmail}\nMessage: ${
        message || "(No message)"
      }`
    );
    const base = whatsappUrl.split("?")[0];
    const link = `${base}?text=${text}`;
    window.open(link, "_blank");
  };

  return (
    <form
      className="grid gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        toWhatsApp();
      }}
    >
      <div className="grid gap-1.5">
        <Label htmlFor="name" className="text-xs">
          Name
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="h-9 text-sm"
          required
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="contact" className="text-xs">
          Phone / Email
        </Label>
        <Input
          id="contact"
          value={phoneOrEmail}
          onChange={(e) => setPhoneOrEmail(e.target.value)}
          placeholder="e.g. +91 98xxx or you@email.com"
          className="h-9 text-sm"
          required
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="msg" className="text-xs">
          Message
        </Label>
        <Textarea
          id="msg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us a bit about your project…"
          className="min-h-[80px] text-sm"
        />
      </div>

      <div className="flex items-center justify-end gap-2 pt-1">
        <Button type="submit" size="sm" className="h-9 px-3 text-xs">
          Send on WhatsApp
        </Button>
      </div>
    </form>
  );
}
