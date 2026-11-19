// Client-side validation; any future backend must validate again independently.
export function validateCheckoutDetails(form) {
  const errors = {};
  const name = form.name.trim();
  const email = form.email.trim();
  const digits = form.phone.replace(/[^\d]/g, "");
  const phone = digits.length === 12 && digits.startsWith("91") ? digits.slice(2) : digits;
  const address = form.address.trim();
  const city = form.city.trim();
  const pincode = form.pincode.trim();

  if (name.length < 2 || name.length > 80 || !/^[\p{L}][\p{L}\p{M} .'-]*$/u.test(name))
    errors.name = "Enter a valid full name (2–80 letters).";
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Enter a valid email address.";
  if (!/^[6-9]\d{9}$/.test(phone))
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  if (address.length < 10 || address.length > 200)
    errors.address = "Enter a complete delivery address (10–200 characters).";
  if (city.length < 2 || city.length > 70 || !/^[\p{L}][\p{L}\p{M} .'-]*$/u.test(city))
    errors.city = "Enter a valid city name.";
  if (!/^[1-9]\d{5}$/.test(pincode))
    errors.pincode = "Enter a valid 6-digit Indian PIN code.";
  return errors;
}
