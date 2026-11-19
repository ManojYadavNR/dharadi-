import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { PrimaryButton } from "../components/Button";
import AnimateSection from "../components/AnimateSection";
import { validateCheckoutDetails } from "../utils/validation";

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [placed, setPlaced] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validateCheckoutDetails(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setPlaced(true);
    clearCart();
  };

  if (items.length === 0 && !placed) {
    return (
      <main className="pt-32 pb-20 min-h-screen bg-brand-cream text-center px-5">
        <h1 className="font-heading text-3xl text-brand-dark mb-4">Your cart is empty</h1>
        <Link
          to="/shop"
          className="text-brand-green font-medium hover:text-brand-gold transition-colors"
        >
          Continue shopping →
        </Link>
      </main>
    );
  }

  if (placed) {
    return (
      <main className="pt-32 pb-20 min-h-screen bg-brand-cream flex items-center justify-center px-5">
        <AnimateSection className="text-center max-w-md">
          <h1 className="font-heading text-3xl text-brand-dark mb-4">Thank You!</h1>
          <p className="text-brand-muted mb-8">
            Your order has been received. We&apos;ll contact you shortly to confirm
            delivery details.
          </p>
          <PrimaryButton onClick={() => navigate("/")}>Back to Home</PrimaryButton>
        </AnimateSection>
      </main>
    );
  }

  return (
    <main className="pt-28 lg:pt-32 pb-20 bg-brand-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-5 lg:px-8">
        <h1 className="font-heading text-3xl sm:text-4xl text-brand-dark mb-10 text-center">
          Checkout
        </h1>
        <div className="grid lg:grid-cols-2 gap-10">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-3xl p-5 sm:p-8 border border-brand-green/10 space-y-5"
          >
            <h2 className="font-heading text-xl text-brand-dark mb-2">
              Delivery Details
            </h2>
            {[
              { name: "name", label: "Full Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "phone", label: "Phone", type: "tel" },
              { name: "address", label: "Address", type: "text" },
              { name: "city", label: "City", type: "text" },
              { name: "pincode", label: "Pincode", type: "text" },
            ].map((field) => (
              <div key={field.name}>
                <label htmlFor={`checkout-${field.name}`} className="block text-sm text-brand-muted mb-1.5">
                  {field.label}
                </label>
                <input
                  id={`checkout-${field.name}`}
                  type={field.type}
                  name={field.name}
                  required
                  maxLength={field.name === "email" ? 254 : field.name === "address" ? 200 : 80}
                  autoComplete={{ name: "name", email: "email", phone: "tel", address: "street-address", city: "address-level2", pincode: "postal-code" }[field.name]}
                  inputMode={field.name === "pincode" || field.name === "phone" ? "numeric" : undefined}
                  aria-invalid={Boolean(errors[field.name])}
                  aria-describedby={errors[field.name] ? `checkout-error-${field.name}` : undefined}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="w-full min-w-0 px-4 py-3 rounded-2xl border border-brand-green/15 bg-brand-cream/50 focus:outline-none focus:border-brand-green text-brand-dark text-sm"
                />
                {errors[field.name] && (
                  <p id={`checkout-error-${field.name}`} role="alert" className="mt-1.5 text-xs text-red-700">{errors[field.name]}</p>
                )}
              </div>
            ))}
            <PrimaryButton type="submit" className="w-full mt-4">
              Place Order — ₹{total}
            </PrimaryButton>
          </form>
          <div className="bg-white rounded-3xl p-5 sm:p-8 border border-brand-green/10 h-fit min-w-0">
            <h2 className="font-heading text-xl text-brand-dark mb-6">Order Summary</h2>
            <ul className="space-y-4 mb-6">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between gap-3 text-sm min-w-0">
                  <span className="text-brand-dark min-w-0 break-words">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-brand-green font-medium shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-heading text-xl text-brand-dark pt-4 border-t border-brand-green/10">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
