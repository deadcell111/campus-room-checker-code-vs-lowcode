// Runs the shared T1-T8 cases against the code-based rule engine. Run: node tests/code_shared_cases.js
const fs = require("node:fs"), path = require("node:path");
const checker = require("../code-based/js/checker.js"), data = require("../code-based/js/data.js");
const spec = JSON.parse(fs.readFileSync(path.join(__dirname, "../shared/test_cases.json"), "utf8"));
const snapshot = () => JSON.stringify(data.bookings);
const before = snapshot();
let pass = 0, rows = [];
for (const c of spec.cases) {
  let ok, observed, expected;
  if (c.type === "bookings_unchanged") {
    ok = snapshot() === before && Object.isFrozen(data.bookings); observed = ok ? "bookings identical" : "CHANGED"; expected = "bookings identical";
  } else {
    const r = checker.check(c.start, c.duration, c.blocked);
    expected = `${c.available}/${c.code}`; observed = `${r.available}/${r.reasonCode}`; ok = expected === observed;
  }
  pass += ok; rows.push(`${ok ? "PASS" : "FAIL"} ${c.id} ${c.name}: expected ${expected}, observed ${observed}`);
}
console.log(rows.join("\n")); console.log(`code-based shared cases: ${pass}/${spec.cases.length}`);
process.exit(pass === spec.cases.length ? 0 : 1);
