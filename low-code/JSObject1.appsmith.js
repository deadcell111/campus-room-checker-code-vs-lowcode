// Appsmith JS Object "JSObject1" - the ONLY custom code in the low-code build.
// Same rules and decision order as the code-based build (docs/01_requirements_and_acceptance_criteria.md).
export default {
  NOW: 540,            // 09:00 fixed
  MAX: 120,
  DAY: 1440,
  BOOKINGS: [
    { title: "Algorithms seminar", start: 600, end: 660 },
    { title: "Club meeting", start: 780, end: 870 }
  ],
  hhmm(m) { return String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"); },
  check() {
    const t = /^(\d{2}):(\d{2})$/.exec((Input_Start.text || "").trim());
    if (!t || +t[1] > 23 || +t[2] > 59) return { available: false, code: "invalid_start", message: "Input error: enter the start time as HH:MM, for example 11:30." };
    const raw = String(Input_Duration.text || "").trim();
    const dur = /^\d{1,4}$/.test(raw) ? Number(raw) : null;
    if (dur === null || dur <= 0 || dur > this.MAX) return { available: false, code: "invalid_duration", message: "Input error: duration must be a whole number of minutes, more than 0 and at most " + this.MAX + "." };
    const s = +t[1] * 60 + +t[2], e = s + dur;
    if (s <= this.NOW) return { available: false, code: "invalid_past", message: "Input error: the start time must be later than the current time (" + this.hhmm(this.NOW) + ")." };
    if (e > this.DAY) return { available: false, code: "invalid_range", message: "Input error: the booking must end by 24:00 on the same day." };
    if (Switch_Blocked.isSwitchedOn) return { available: false, code: "blocked", message: "Unavailable: the room is blocked." };
    const c = this.BOOKINGS.find(b => s < b.end && b.start < e);
    if (c) return { available: false, code: "overlap", message: "Unavailable: overlaps \"" + c.title + "\" (" + this.hhmm(c.start) + "-" + this.hhmm(c.end) + ")." };
    return { available: true, code: "ok", message: "Available: Room B-204 is free from " + this.hhmm(s) + " to " + this.hhmm(e) + "." };
  },
  run() { return storeValue("result", this.check()); },
  bookingsRows() { return this.BOOKINGS.map(b => ({ Title: b.title, Start: this.hhmm(b.start), End: this.hhmm(b.end) })); }
}
