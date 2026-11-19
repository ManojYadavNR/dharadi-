import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div>
      <h4 className="font-medium text-sm tracking-widest uppercase mb-3 text-brand-gold">
        Newsletter
      </h4>
      <p className="text-brand-cream/75 text-sm mb-5">
        Join our community for wellness tips and exclusive offers.
      </p>
      {submitted ? (
        <p className="text-brand-gold text-sm">Thank you for subscribing!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="flex-1 px-4 py-3 rounded-2xl bg-brand-cream/10 border border-brand-cream/20 text-brand-cream placeholder:text-brand-cream/50 text-sm focus:outline-none focus:border-brand-gold"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-2xl bg-brand-gold text-brand-dark text-sm font-medium hover:bg-brand-cream transition-colors shrink-0"
          >
            Join
          </button>
        </form>
      )}
    </div>
  );
}
