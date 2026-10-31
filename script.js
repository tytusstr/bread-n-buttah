// Builds the menu and contact info from config.js.
// You shouldn't need to edit this file — change config.js instead.
(function () {
  var b = window.BAKERY || {};
  var menu = b.menu || [];

  // Simple gold line drawings for each item
  var ICONS = {
    bread: '<path d="M10 30c0-10 8-16 22-16s22 6 22 16c0 3-2 5-4 5v13c0 2-1 3-3 3H17c-2 0-3-1-3-3V35c-2 0-4-2-4-5z"/><path d="M22 22l4 5M31 20l4 5M40 22l4 5"/>',
    sticker: '<circle cx="32" cy="32" r="20"/><path d="M45 47c-2-5-8-7-13-5"/><path d="M32 22l2.6 6.4 6.9.5-5.3 4.4 1.7 6.7L32 36.4 26.1 40l1.7-6.7-5.3-4.4 6.9-.5z"/>',
    butter: '<path d="M10 40l8-12h36v12z"/><path d="M10 40v8h44v-8"/><path d="M18 28l8-6h28v6"/>',
    bottle: '<path d="M27 8h10M28 8v10c0 3-8 6-8 14v22c0 2 1 3 3 3h18c2 0 3-1 3-3V32c0-8-8-11-8-14V8"/><path d="M20 36h24M20 46h24"/>',
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

  if (b.shopNotice) {
    var notice = document.getElementById("shop-notice");
    notice.textContent = b.shopNotice;
    notice.hidden = false;
  }

  // Note under the menu once any item takes payment online
  if (menu.some(function (item) { return item.payLink; })) document.getElementById("secure-note").hidden = false;

  // "Notify me" email sign-up
  var su = b.signup || {};
  // Turn a Google Form pre-filled link (…/viewform?…&entry.123=you@x.com)
  // into the form's submit address and its email field name.
  var gform = null;
  if (su.googleFormLink) {
    var m = String(su.googleFormLink).match(/^(https:\/\/docs\.google\.com\/forms\/(?:u\/\d+\/)?d\/e\/[\w-]+)\/[^?]*\?(?:.*&)?(entry\.\d+)=/);
    if (m) gform = { action: m[1] + "/formResponse", field: m[2] };
  }
  if (su.show && (gform || su.sendTo)) {
    var box = document.getElementById("signup");
    var form = document.getElementById("signup-form");
    var input = document.getElementById("signup-email");
    var msg = document.getElementById("signup-msg");
    if (su.title) document.getElementById("signup-title").textContent = su.title;
    document.getElementById("signup-text").textContent = su.text || "";
    box.hidden = false;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = input.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.textContent = "Please enter a valid email address."; input.focus(); return; }
      var button = form.querySelector("button");
      button.disabled = true;
      msg.textContent = "Sending…";
      var honey = form.elements._honey.value;
      if (honey) { form.hidden = true; msg.textContent = "Thank you!"; return; } // spam bot
      var fields = {};
      if (gform) fields[gform.field] = email;
      var send = gform
        // Google Forms can't send a readable reply to another site, so a
        // request that reaches it counts as success.
        ? fetch(gform.action, { method: "POST", mode: "no-cors", body: new URLSearchParams(fields) })
            .then(function () { return { success: "true" }; })
        : fetch("https://formsubmit.co/ajax/" + encodeURIComponent(su.sendTo), {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({
              email: email,
              _subject: "New Bread n’ Buttah sign-up",
              message: email + " wants to be notified when ordering opens.",
              _template: "table",
              _honey: honey
            })
          }).then(function (r) { return r.json(); });
      send.then(function (data) {
        if (String(data.success) !== "true") throw new Error(data.message || "failed");
        form.hidden = true;
        msg.textContent = "Thank you! You’re on the list. I’ll email you when ordering opens. 💛";
      }).catch(function () {
        button.disabled = false;
        msg.textContent = "";
        msg.appendChild(document.createTextNode("Sorry, that didn’t go through. You can also "));
        msg.appendChild(el("a", { href: "mailto:" + (su.sendTo || b.email) + "?subject=" + encodeURIComponent("Notify me when ordering opens") }, "email me"));
        msg.appendChild(document.createTextNode(" and I’ll add you."));
      });
    });
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

  // Keep --nav-h equal to the sticky header's exact height (it can change
  // when fonts load or the screen rotates) so menu links land right under it.
  var nav = document.querySelector(".nav");
  function setNavHeight() { document.documentElement.style.setProperty("--nav-h", nav.getBoundingClientRect().height + "px"); }
  setNavHeight();
  if (window.ResizeObserver) new ResizeObserver(setNavHeight).observe(nav);
  else window.addEventListener("resize", setNavHeight);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(setNavHeight);

  // Slide the striped separator as the page scrolls: left when scrolling
  // down, right when scrolling up. The stripes chase the scroll position with
  // a quick spring, so they build up speed, catch up, match the scroll, and
  // glide to a stop (or turn around) instead of jumping.
  var strips = document.querySelectorAll(".band-strip");
  if (strips.length) {
    var STRIPE = 62, RATE = 0.4, OMEGA = 22, DAMP = 0.7; // spring: ~0.15s to catch up, slight speed overshoot
    var lastY = window.pageYOffset, target = 0, pos = 0, vel = 0, lastT = 0, running = false;
    var draw = function () {
      var dpr = window.devicePixelRatio || 1;
      var x = Math.round(((((pos * RATE) % STRIPE) + STRIPE) % STRIPE) * dpr) / dpr; // whole screen pixels keep stripes even
      for (var i = 0; i < strips.length; i++) strips[i].style.transform = "translate3d(" + (-x) + "px,0,0)";
    };
    var step = function (now) {
      var dt = lastT ? Math.min(0.05, (now - lastT) / 1000) : 1 / 60;
      lastT = now;
      var y = window.pageYOffset;
      target += y - lastY;
      lastY = y;
      // springy chase toward the target (briefly faster to catch up)
      vel += (OMEGA * OMEGA * (target - pos) - 2 * DAMP * OMEGA * vel) * dt;
      pos += vel * dt;
      draw();
      if (Math.abs(target - pos) > 0.05 || Math.abs(vel) > 0.5) requestAnimationFrame(step);
      else { running = false; lastT = 0; vel = 0; }
    };
    window.addEventListener("scroll", function () {
      if (!running) { running = true; requestAnimationFrame(step); }
    }, { passive: true });
  }
})();
