// Extra boundary/robustness tests for the code-based engine. Run: node --test tests/code_unit_tests.js
const test = require("node:test"), assert = require("node:assert/strict");
const checker = require("../code-based/js/checker.js"), v = require("../code-based/js/validation.js"), a = require("../code-based/js/availability.js"), data = require("../code-based/js/data.js");
const code = (s, d, b = false) => checker.check(s, d, b).reasonCode;
test("AC1 start == now rejected, now+1 accepted", () => { assert.equal(code("09:00", "30"), "invalid_past"); assert.equal(code("09:01", "30"), "ok"); });
test("AC2 duration 1 and exactly 120 allowed, 0 and 121 rejected", () => { assert.equal(code("11:30", "1"), "ok"); assert.equal(code("14:30", "120"), "ok"); assert.equal(code("11:30", "0"), "invalid_duration"); assert.equal(code("11:30", "121"), "invalid_duration"); });
test("AC3 touching start and end do not overlap, 1 minute of overlap does", () => {
  assert.equal(code("11:00", "60"), "ok"); assert.equal(code("09:30", "30"), "ok"); assert.equal(code("10:59", "60"), "overlap"); assert.equal(code("09:31", "30"), "overlap"); assert.equal(code("09:30", "31"), "overlap");
  assert.equal(code("14:30", "60"), "ok"); assert.equal(code("14:29", "60"), "overlap");
});
test("AC4 blocked wins over a free slot but input errors are reported first", () => { assert.equal(code("11:30", "60", true), "blocked"); assert.equal(code("11:30", "0", true), "invalid_duration"); });
test("day boundary: ends exactly 24:00 ok, spills past midnight rejected", () => { assert.equal(code("23:00", "60"), "ok"); assert.equal(code("23:30", "60"), "invalid_range"); });
test("AC6 malformed input gets a specific input error", () => {
  for (const s of ["", "9:00", "24:00", "12:60", "abc", "11:30; DROP", "<img src=x onerror=alert(1)>", null, undefined]) assert.equal(code(s, "60"), "invalid_start", String(s));
  for (const d of ["", "abc", "-5", "1.5", "60 ", "1e2", "99999", null, undefined, NaN]) { const c = code("11:30", d); assert.ok(c === "invalid_duration" || (d === "60 " && c === "ok"), String(d) + " -> " + c); }
});
test("messages are non-empty and mention the reason", () => {
  assert.match(checker.check("10:30", "60", false).message, /Algorithms seminar/);
  assert.match(checker.check("11:30", "60", true).message, /blocked/);
  assert.match(checker.check("11:30", "121", false).message, /120/);
});
test("AC5 checks never modify the bookings (deep frozen, equal before/after)", () => {
  const before = JSON.stringify(data.bookings); for (let i = 0; i < 50; i++) checker.check("10:30", "60", false);
  assert.equal(JSON.stringify(data.bookings), before); assert.ok(Object.isFrozen(data.bookings) && data.bookings.every(Object.isFrozen));
});
test("availability() is pure and works on any booking list", () => {
  const list = [{title: "x", start: 100, end: 200}]; const snap = JSON.stringify(list);
  assert.equal(a.availability(150, 10, false, list).code, "overlap"); assert.equal(a.availability(200, 10, false, list).code, "ok"); assert.equal(JSON.stringify(list), snap);
});
