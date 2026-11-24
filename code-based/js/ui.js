// UI layer: the only file that touches the DOM. Text is set with textContent (no innerHTML -> no XSS).
(function (C) {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const {hhmm} = C.messages;

  function renderBookings() {
    const ul = $("bookings"); ul.textContent = "";
    for (const b of C.data.bookings) {
      const li = document.createElement("li"), t = document.createElement("span"), r = document.createElement("span");
      t.textContent = b.title; r.textContent = hhmm(b.start) + "-" + hhmm(b.end);
      li.append(t, r); ul.append(li);
    }
  }
  function show(res) {
    const box = $("result"), kind = res.available ? "available" : res.reasonCode.startsWith("invalid_") ? "invalid" : "unavailable";
    box.className = kind;
    box.textContent = "";
    const big = document.createElement("span"), why = document.createElement("span");
    big.className = "big"; why.className = "why";
    big.textContent = kind === "available" ? "Available" : kind === "invalid" ? "Check your input" : "Unavailable";
    why.textContent = res.message; box.append(big, why);
    box.dataset.code = res.reasonCode;
    $("start").setAttribute("aria-invalid", String(res.reasonCode === "invalid_start" || res.reasonCode === "invalid_past" || res.reasonCode === "invalid_range"));
    $("duration").setAttribute("aria-invalid", String(res.reasonCode === "invalid_duration"));
  }
  $("roomLabel").textContent = "Room " + C.data.room;
  $("nowText").textContent = hhmm(C.data.now);
  renderBookings();
  $("blocked").addEventListener("change", (e) => { $("status").textContent = e.target.checked ? "Blocked" : "Open"; $("status").className = "badge " + (e.target.checked ? "blocked" : "open"); });
  $("form").addEventListener("submit", (ev) => {
    ev.preventDefault();
    show(C.checker.check($("start").value, $("duration").value, $("blocked").checked));
  });
})(globalThis.Campus);
