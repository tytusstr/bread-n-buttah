# 🍞 Bread n’ Buttah

A cute little website for **Bread n’ Buttah**, a local one-person bakery run by **Zoe Strickland**.
It's plain HTML/CSS/JS — no build step — so it runs for free on GitHub Pages.

## ✏️ Editing the site

Almost everything lives in **`config.js`**:

- your email, phone, Instagram
- pickup info
- the menu (names, descriptions, prices, emoji)
- payment links

Edit it on GitHub (click the file → ✏️ pencil icon → **Commit changes**) and the site updates in a minute or two.

> The menu items and prices in `config.js` are starting examples — swap in your real bakes and prices before sharing the site.
> There are no reviews on the site. If you'd like to add real ones from customers later, ask them first and quote them word for word.

## 🚀 Putting it online (GitHub Pages)

1. Go to the repo on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment**, set **Source** to *Deploy from a branch*.
3. Choose branch **`main`** and folder **`/ (root)`**, then **Save**.
4. After a minute, your site will be live at
   `https://<your-github-username>.github.io/bread-n-buttah/`

Want a custom domain like `breadnbuttah.com`? Buy one from any registrar, then add it in **Settings → Pages → Custom domain**.

## 💳 Setting up payments

GitHub Pages can't process cards on its own, so the site uses **payment links** — a secure checkout page hosted by a payment company. You make one link per menu item and paste it into `payLink` in `config.js`. The button on that item then changes from **“Ask to order”** to **“Order & pay”**.

Pick **one** of these (all are free to set up and take a small fee per sale):

### Option A — Stripe Payment Links (recommended)
1. Sign up at <https://stripe.com> and finish account setup (bank account for payouts).
2. Go to **Payment Links** → **+ New**.
3. Add a product (e.g. "Classic Sourdough", $10). Turn on **Collect customers' names** and add a custom field like *"Pickup day / notes"* if you want.
4. Copy the link (looks like `https://buy.stripe.com/...`) and paste it into that item's `payLink`.

### Option B — Square Online Checkout
1. Sign up at <https://squareup.com>.
2. Go to **Online → Online Checkout → Create link**.
3. Copy the `https://square.link/...` link into `payLink`.
   (Handy if you also sell at a farmers market with a Square card reader!)

### Option C — PayPal
1. Use a PayPal **Business** account.
2. Go to **Pay Links and Buttons** → create a link for each item.
3. Paste the link into `payLink`.

### Extra: Venmo / Cash App / PayPal.me
Fill in `venmo`, `cashapp`, or `paypalMe` in `config.js` and a "You can also pay with…" line will show under the menu. These are best for friends and neighbors — card checkout (above) gives buyers more protection.

> 🔒 Never put passwords or secret API keys in this repo — it's public. Payment *links* are safe to share; that's what they're for.

## 🗂 Files

| File | What it is |
|---|---|
| `config.js` | Your settings — edit this one |
| `index.html` | Page layout and wording |
| `styles.css` | Colors, fonts, look & feel |
| `script.js` | Builds the menu from `config.js` (no need to touch) |

Made with flour, butter & love by Zoe Strickland. 💛
