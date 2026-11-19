export const WHATSAPP_NUMBER = "919164873661";

export const WHATSAPP_ORDER_MESSAGE = encodeURIComponent(
  "Hello Dharadi! I would like to place an order. Please share availability and delivery details."
);

export function whatsappOrderUrl(message = WHATSAPP_ORDER_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}
