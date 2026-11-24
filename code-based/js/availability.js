// Availability calculation (pure, no validation, no text). Never modifies the bookings it reads.
globalThis.Campus = globalThis.Campus || {};
(function (C) {
  // Half-open intervals [start, end): touching endpoints do NOT overlap (AC3).
  const overlaps = (aStart, aEnd, bStart, bEnd) => aStart < bEnd && bStart < aEnd;

  function availability(start, duration, blocked, bookings) {
    if (blocked) return {available: false, code: "blocked", conflict: null};                      // AC4
    const end = start + duration;
    for (const b of bookings)
      if (overlaps(start, end, b.start, b.end)) return {available: false, code: "overlap", conflict: b};
    return {available: true, code: "ok", conflict: null};
  }
  C.availability = {availability, overlaps};
})(globalThis.Campus);
if (typeof module !== "undefined") module.exports = globalThis.Campus.availability;
