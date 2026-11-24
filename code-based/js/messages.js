// Visible text for each reason code (presentation only).
globalThis.Campus = globalThis.Campus || {};
(function (C) {
  if (!C.data && typeof require !== "undefined") require("./data.js");
  const {maxDuration, now} = C.data;
  const hhmm = (m) => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
  function message(code, ctx) {
    switch (code) {
      case "ok": return "Available: Room " + C.data.room + " is free from " + hhmm(ctx.start) + " to " + hhmm(ctx.start + ctx.duration) + ".";
      case "overlap": return "Unavailable: overlaps \"" + ctx.conflict.title + "\" (" + hhmm(ctx.conflict.start) + "-" + hhmm(ctx.conflict.end) + ").";
      case "blocked": return "Unavailable: the room is blocked.";
      case "invalid_start": return "Input error: enter the start time as HH:MM, for example 11:30.";
      case "invalid_duration": return "Input error: duration must be a whole number of minutes, more than 0 and at most " + maxDuration + ".";
      case "invalid_past": return "Input error: the start time must be later than the current time (" + hhmm(now) + ").";
      case "invalid_range": return "Input error: the booking must end by 24:00 on the same day.";
      default: return "Input error: invalid request.";
    }
  }
  C.messages = {message, hhmm};
})(globalThis.Campus);
if (typeof module !== "undefined") module.exports = globalThis.Campus.messages;
