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
  email: "hello@example.com",        // ← change me!
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
      name: "Classic Sourdough",
      description: "Crackly crust, soft chewy middle. Made with my own starter and a lot of patience.",
      price: "$10",                   // ← set your real price
      emoji: "🍞",
      payLink: ""                     // ← paste a Stripe/Square/PayPal link here
    },
    {
      name: "Honey Butter Rolls",
      description: "A half dozen pillowy rolls brushed with honey butter. Dangerously easy to eat.",
      price: "$8",
      emoji: "🧈",
      payLink: ""
    },
    {
      name: "Cinnamon Swirl Loaf",
      description: "Soft sandwich bread with a ribbon of cinnamon sugar. Toast it. Trust me.",
      price: "$12",
      emoji: "🌀",
      payLink: ""
    },
    {
      name: "Focaccia",
      description: "Olive oil, flaky salt, dimpled by hand. Toppings change with the seasons.",
      price: "$11",
      emoji: "🫒",
      payLink: ""
    },
    {
      name: "Banana Bread",
      description: "Moist, cozy, and made with very ripe bananas — the way it should be.",
      price: "$9",
      emoji: "🍌",
      payLink: ""
    },
    {
      name: "Chocolate Chip Cookies",
      description: "A dozen chewy cookies with puddles of chocolate. Brown butter, of course.",
      price: "$10",
      emoji: "🍪",
      payLink: ""
    }
  ]
};
