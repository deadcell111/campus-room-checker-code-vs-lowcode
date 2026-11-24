// Public API: validation -> availability -> message. Returns {available, reasonCode, message}.
globalThis.Campus = globalThis.Campus || {};
(function (C) {
  if (typeof require !== "undefined") ["./data.js", "./validation.js", "./availability.js", "./messages.js"].forEach((f) => require(f));
  function check(startText, durationValue, blocked, bookings = C.data.bookings) {
    const v = C.validation.validate(startText, durationValue);
    if (!v.ok) return {available: false, reasonCode: v.code, message: C.messages.message(v.code, v)};
    const a = C.availability.availability(v.start, v.duration, Boolean(blocked), bookings);
    return {available: a.available, reasonCode: a.code, message: C.messages.message(a.code, {start: v.start, duration: v.duration, conflict: a.conflict})};
  }
  C.checker = {check};
})(globalThis.Campus);
if (typeof module !== "undefined") module.exports = globalThis.Campus.checker;
