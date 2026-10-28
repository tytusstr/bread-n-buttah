/*
  ============================================================
   🍞  BREAD N' BUTTAH — YOUR SETTINGS
  ============================================================
   This is the only file you need to edit to update the site.
   Change the text between the quotes, save, and push to GitHub.

   PAYMENTS: see README.md ("Setting up payments") for how to
   get a payment link from Stripe, Square, or PayPal. Paste it
   into `payLink` for each item. If an item has no payLink yet,
   its button will say "Ask to order" and open an email instead.
  ============================================================
*/

window.BAKERY = {
  name: "Bread n’ Buttah",
  baker: "Zoe Strickland",

  // Where people can reach you. Leave "" to hide one.
  email: "zoesbread@gmail.com",
  phone: "",                          // e.g. "(555) 123-4567"
  instagram: "",                      // e.g. "breadnbuttah" (no @)

  // Pickup / local info (shown in the "How it works" section)
  area: "your neighborhood",          // e.g. "East Portland"
  pickupInfo: "Order by Wednesday night, pick up fresh on Saturday morning. I’ll send you the pickup spot when you order!",

  // Extra ways to pay (optional). Leave "" to hide.
  venmo: "",                          // e.g. "Zoe-Strickland" (no @)
  cashapp: "",                        // e.g. "zoebakes" (no $)
  paypalMe: "",                       // e.g. "zoestrickland" → paypal.me/zoestrickland

  // Your bakes! Add, remove, or edit as many as you like.
  // emoji is just the little picture on each card.
  menu: [
    {
      name: "100% Whole Wheat Bread",
      description: "A hearty loaf made with 100% whole wheat flour. Great for sandwiches, toast, and lots of butter.",
      price: "",                      // ← set your price, e.g. "$10" (blank = hidden)
      emoji: "🍞",
      payLink: ""                     // ← paste a Stripe/Square/PayPal link here
    },
    {
      name: "Bread n’ Buttah Sticker",
      description: "Show some love for your local baker! Perfect for water bottles and laptops.",
      price: "",
      emoji: "✨",
      payLink: ""
    },
    {
      name: "Bread n’ Buttah Shirt",
      description: "A comfy Bread n’ Buttah t-shirt. Ask about sizes when you order!",
      price: "",
      emoji: "👕",
      payLink: ""
    }
  ]
};
