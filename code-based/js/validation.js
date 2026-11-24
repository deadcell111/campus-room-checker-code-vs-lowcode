// Input validation (pure). Returns {ok:true, start, duration} or {ok:false, code}.
globalThis.Campus = globalThis.Campus || {};
(function (C) {
  if (!C.data && typeof require !== "undefined") require("./data.js");
  const {now, maxDuration, minutesPerDay} = C.data;

  function parseTime(text) {                       // "HH:MM" -> minutes, or null
    const m = /^(\d{2}):(\d{2})$/.exec(typeof text === "string" ? text.trim() : "");
    if (!m || Number(m[1]) > 23 || Number(m[2]) > 59) return null;
    return Number(m[1]) * 60 + Number(m[2]);
  }
  function parseDuration(value) {                  // whole minutes only, else null
    const s = String(value === undefined || value === null ? "" : value).trim();
    return /^\d{1,4}$/.test(s) ? Number(s) : null;
  }
  function validate(startText, durationValue) {
    const start = parseTime(startText);
    if (start === null) return {ok: false, code: "invalid_start"};
    const duration = parseDuration(durationValue);
    if (duration === null || duration <= 0 || duration > maxDuration) return {ok: false, code: "invalid_duration", duration};
    if (start <= now) return {ok: false, code: "invalid_past"};                       // AC1
    if (start + duration > minutesPerDay) return {ok: false, code: "invalid_range"};  // same-day assumption
    return {ok: true, start, duration};
  }
  C.validation = {parseTime, parseDuration, validate};
})(globalThis.Campus);
if (typeof module !== "undefined") module.exports = globalThis.Campus.validation;
