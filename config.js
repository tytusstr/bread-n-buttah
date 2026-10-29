/*
  ============================================================
   BREAD N' BUTTAH — YOUR SETTINGS
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
  baker: "Zoë Strickland",

  // Where people can reach you. Leave "" to hide one.
  email: "zoedstrickland@gmail.com",
  phone: "(541) 280-8776",
  instagram: "bend_bread_n_buttah",   // shown as written (no @)
  instagramLink: "https://www.instagram.com/bend_bread_n_buttah/",

  // Pickup / delivery info (shown in the "How it works" section)
  pickupInfo: "Delivery & pick-up every Saturday. I’ll send you the details when you order!",

  // Extra ways to pay (optional). Leave "" to hide.
  venmo: "",                          // e.g. "Zoe-Strickland" (no @)
  cashapp: "",                        // e.g. "zoebakes" (no $)
  paypalMe: "",                       // e.g. "zoestrickland" → paypal.me/zoestrickland

  // What you sell. Add, remove, or edit as many as you like.
  // icon can be "bread", "sticker", or "shirt".
  menu: [
    {
      name: "100% Whole Wheat Bread",
      description: "A hearty loaf made with 100% whole wheat flour. Great for sandwiches, toast, and lots of butter.",
      price: "",                      // ← set your price, e.g. "$10" (blank = hidden)
      icon: "bread",
      payLink: ""                     // ← paste a Stripe/Square/PayPal link here
    },
    {
      name: "Bread n’ Buttah Sticker",
      description: "Show some love for your local baker! Perfect for water bottles and laptops.",
      price: "",
      icon: "sticker",
      payLink: ""
    },
    {
      name: "Bread n’ Buttah Shirt",
      description: "A comfy Bread n’ Buttah t-shirt. Ask about sizes when you order!",
      price: "",
      icon: "shirt",
      payLink: ""
    }
  ]
};
