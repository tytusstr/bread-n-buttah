// Builds the menu and contact info from config.js.
// You shouldn't need to edit this file — change config.js instead.
(function () {
  var b = window.BAKERY || {};
  var menu = b.menu || [];

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    for (var k in attrs || {}) node.setAttribute(k, attrs[k]);
    if (text) node.textContent = text;
    return node;
  }

  // Baker name wherever it appears
  if (b.baker) {
    document.querySelectorAll('[data-bakery="baker"]').forEach(function (n) {
      n.textContent = n.closest("h2") ? b.baker.split(" ")[0] : b.baker;
    });
  }

  if (b.pickupInfo) document.getElementById("pickup-info").textContent = b.pickupInfo;

  // Menu cards
  var grid = document.getElementById("menu-grid");
  menu.forEach(function (item) {
    var card = el("article", { class: "card" });
    card.appendChild(el("div", { class: "card-emoji", "aria-hidden": "true" }, item.emoji || "🍞"));
    var top = el("div", { class: "card-top" });
    top.appendChild(el("h3", null, item.name));
    if (item.price) top.appendChild(el("span", { class: "price" }, item.price));
    card.appendChild(top);
    card.appendChild(el("p", null, item.description));

    var btn;
    if (item.payLink) {
      btn = el("a", { class: "btn btn-primary", href: item.payLink, target: "_blank", rel: "noopener" }, "Order & pay");
    } else if (b.email) {
      var subject = encodeURIComponent("Order: " + item.name);
      btn = el("a", { class: "btn btn-ghost", href: "mailto:" + b.email + "?subject=" + subject }, "Ask to order");
    } else {
      btn = el("span", { class: "btn btn-ghost disabled" }, "Coming soon");
    }
    card.appendChild(btn);
    grid.appendChild(card);
  });

  // Other ways to pay
  var extras = [];
  if (b.venmo) extras.push({ label: "Venmo", href: "https://venmo.com/u/" + b.venmo });
  if (b.cashapp) extras.push({ label: "Cash App", href: "https://cash.app/$" + b.cashapp });
  if (b.paypalMe) extras.push({ label: "PayPal", href: "https://paypal.me/" + b.paypalMe });
  if (extras.length) {
    var p = document.getElementById("pay-extras");
    p.appendChild(document.createTextNode("You can also pay with "));
    extras.forEach(function (x, i) {
      if (i > 0) p.appendChild(document.createTextNode(i === extras.length - 1 ? " or " : ", "));
      p.appendChild(el("a", { href: x.href, target: "_blank", rel: "noopener" }, x.label));
    });
    p.appendChild(document.createTextNode(" — just add a note with what you ordered!"));
    p.hidden = false;
  }

  // Contact links
  var contact = document.getElementById("contact-links");
  if (b.email) contact.appendChild(el("a", { class: "chip", href: "mailto:" + b.email }, "✉️ " + b.email));
  if (b.phone) contact.appendChild(el("a", { class: "chip", href: "tel:" + b.phone.replace(/[^\d+]/g, "") }, "📞 " + b.phone));
  if (b.instagram) contact.appendChild(el("a", { class: "chip", href: "https://instagram.com/" + b.instagram, target: "_blank", rel: "noopener" }, "📸 @" + b.instagram));

  document.getElementById("year").textContent = new Date().getFullYear();
})();
