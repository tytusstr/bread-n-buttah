// Builds the menu and contact info from config.js.
// You shouldn't need to edit this file — change config.js instead.
(function () {
  var b = window.BAKERY || {};
  var menu = b.menu || [];

  // Simple gold line drawings for each item
  var ICONS = {
    bread: '<path d="M10 30c0-10 8-16 22-16s22 6 22 16c0 3-2 5-4 5v13c0 2-1 3-3 3H17c-2 0-3-1-3-3V35c-2 0-4-2-4-5z"/><path d="M22 22l4 5M31 20l4 5M40 22l4 5"/>',
    sticker: '<circle cx="32" cy="32" r="20"/><path d="M45 47c-2-5-8-7-13-5"/><path d="M32 22l2.6 6.4 6.9.5-5.3 4.4 1.7 6.7L32 36.4 26.1 40l1.7-6.7-5.3-4.4 6.9-.5z"/>',
    shirt: '<path d="M24 12l-12 7 5 10 6-3v26h18V26l6 3 5-10-12-7c-1 4-4 6-8 6s-7-2-8-6z"/>'
  };

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    for (var k in attrs || {}) node.setAttribute(k, attrs[k]);
    if (text) node.textContent = text;
    return node;
  }

  // Baker name wherever it appears
  if (b.baker) {
    document.querySelectorAll('[data-bakery="baker"]').forEach(function (n) { n.textContent = b.baker; });
    document.querySelectorAll('[data-bakery="first"]').forEach(function (n) { n.textContent = b.baker.split(" ")[0]; });
  }

  if (b.pickupInfo) document.getElementById("pickup-info").textContent = b.pickupInfo;

  // Menu cards
  var grid = document.getElementById("menu-grid");
  menu.forEach(function (item) {
    var card = el("article", { class: "card" });
    var icon = el("div", { class: "card-icon", "aria-hidden": "true" });
    icon.innerHTML = '<svg viewBox="0 0 64 64">' + (ICONS[item.icon] || ICONS.bread) + "</svg>";
    card.appendChild(icon);
    card.appendChild(el("h3", null, item.name));
    if (item.price) card.appendChild(el("p", { class: "price" }, item.price));
    card.appendChild(el("p", { class: "desc" }, item.description));

    var btn;
    if (item.payLink) {
      btn = el("a", { class: "btn btn-solid", href: item.payLink, target: "_blank", rel: "noopener" }, "Order & pay");
    } else if (b.email) {
      var subject = encodeURIComponent("Order: " + item.name);
      btn = el("a", { class: "btn btn-line", href: "mailto:" + b.email + "?subject=" + subject }, "Ask to order");
    } else {
      btn = el("span", { class: "btn btn-line disabled" }, "Coming soon");
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
    p.appendChild(document.createTextNode(". Just add a note with what you ordered!"));
    p.hidden = false;
  }

  // Contact lines (business-card style)
  var lines = document.getElementById("contact-lines");
  if (b.phone) {
    var pp = el("p");
    pp.appendChild(el("a", { href: "tel:" + b.phone.replace(/[^\d+]/g, "") }, b.phone));
    lines.appendChild(pp);
  }
  if (b.email) {
    var pe = el("p");
    pe.appendChild(el("a", { href: "mailto:" + b.email }, b.email));
    lines.appendChild(pe);
  }
  if (b.instagram) {
    var ig = document.getElementById("ig-line");
    ig.appendChild(document.createTextNode("Instagram"));
    ig.appendChild(el("br"));
    ig.appendChild(b.instagramLink
      ? el("a", { href: b.instagramLink, target: "_blank", rel: "noopener" }, "@" + b.instagram)
      : document.createTextNode("@" + b.instagram));
    ig.hidden = false;
  }

  document.getElementById("year").textContent = new Date().getFullYear();

  // Slide the striped separator to the left as the page scrolls.
  // Most browsers do this in CSS (styles.css). This is the fallback for
  // the rest: it eases toward the scroll position every frame so it glides.
  var strips = document.querySelectorAll(".band-strip");
  var supportsScrollTimeline = window.CSS && CSS.supports && CSS.supports("animation-timeline: scroll()");
  if (strips.length && !supportsScrollTimeline) {
    var STRIPE = 62, SPEED = 0.8, current = null, running = false;
    var render = function () {
      var target = (window.pageYOffset || document.documentElement.scrollTop || 0) * SPEED;
      current = current === null ? target : current + (target - current) * 0.25;
      if (Math.abs(target - current) < 0.1) current = target;
      var x = current % STRIPE;
      for (var i = 0; i < strips.length; i++) strips[i].style.transform = "translate3d(" + (-x) + "px,0,0)";
      running = current !== target;
      if (running) requestAnimationFrame(render);
    };
    window.addEventListener("scroll", function () {
      if (!running) { running = true; requestAnimationFrame(render); }
    }, { passive: true });
    render();
  }
})();
