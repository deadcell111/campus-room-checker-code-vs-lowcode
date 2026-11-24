// Fixed fictional data (identical to docs/01_requirements...). Times are minutes after midnight.
globalThis.Campus = globalThis.Campus || {};
globalThis.Campus.data = Object.freeze({
  room: "B-204",
  now: 540,                 // 09:00
  maxDuration: 120,
  minutesPerDay: 1440,
  bookings: Object.freeze([
    Object.freeze({title: "Algorithms seminar", start: 600, end: 660}),
    Object.freeze({title: "Club meeting", start: 780, end: 870}),
  ]),
});
if (typeof module !== "undefined") module.exports = globalThis.Campus.data;
