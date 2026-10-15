"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [ready, setReady] = useState(false);
  function enquire(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const text = `Hello Royalty Travel,\n\n${values.get("message")}\n\nName: ${values.get("firstName")} ${values.get("lastName")}\nEmail: ${values.get("email")}\nPhone: ${values.get("phone") || "Not supplied"}`;
    window.open(`https://wa.me/263774489958?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setReady(true);
  }
  return (
    <form onSubmit={enquire} className="contact-form">
      <div className="form-row">
        <label>First name <span aria-hidden="true">*</span><input name="firstName" autoComplete="given-name" required maxLength={100} /></label>
        <label>Last name<input name="lastName" autoComplete="family-name" maxLength={100} /></label>
      </div>
      <div className="form-row">
        <label>Email <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" required maxLength={200} /></label>
        <label>Phone<input name="phone" type="tel" autoComplete="tel" maxLength={50} /></label>
      </div>
      <label>Write a message <span aria-hidden="true">*</span><textarea name="message" rows={4} required maxLength={3000} /></label>
      <p className="form-note">Continue to WhatsApp to review and send your enquiry.</p>
      <button className="button" type="submit">Enquire on WhatsApp</button>
      <p role="status" className="form-note">{ready ? "Your enquiry is ready in WhatsApp. Send it there to contact our team. If no window opened, please use the phone or email links." : ""}</p>
    </form>
  );
}
