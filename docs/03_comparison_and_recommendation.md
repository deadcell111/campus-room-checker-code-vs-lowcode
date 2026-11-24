# Comparison matrix

| Criterion | Code-based (HTML/JS, tested with Node + Playwright) | Low-code (Appsmith cloud, free plan) |
|---|---|---|
| Functional tests T1-T8 | 8/8 | 8/8 |
| Unresolved defects | 0 known | 0 known in T1-T8; narrow-screen layout and published view not checked |
| Setup time (measured) | ~4 s of tool time: folder + frozen baseline (reused A3/A4 code) | 4 min 38 s wall clock, mostly waiting for the user to sign in to an existing account |
| Build time (measured) | Logged as 0 s because all files were written by one command; the AI generation time itself was not timed (reused known rules) | 6 min 28 s: 7 widgets, JS Object, bindings |
| Debug / repair | 1 failing test, 10 s; the test was wrong, not the code | Editor code box inserted stray closing brackets (fixed by deleting them); widget drag-and-drop silently failed 4 times and needed waits; a Switch defaulted to ON |
| Test time | Suites run in about 1-2 s each | 56 s for 6 manual runs + 1 visual check, one by one |
| Customization | Full: layout, CSS, CSP header, accessibility attributes, responsive grid | Limited to widgets and their style panel; custom code only inside JS Objects and bindings |
| Security controls | Own input validation, textContent output, a strict Content-Security-Policy, no dependencies | Platform handles auth and hosting; app rendered by Appsmith widgets; no CSP or header control found; sharing/permissions set in UI |
| Versioning / portability | Plain files in git, diffable, reviewable | Edits are autosaved in the platform; "Connect Git" exists in the editor but I did not test it or whether the free plan allows it; JSON export not tried |
| Ongoing cost | None; free static hosting possible; we maintain the code | Free plan used, no purchase; update duty is Appsmith's for the platform, ours for the app |

Measured vs impression: the numbers above come from evidence/timing_log.txt. The code-based times are agent tool time on a rule set I already had, so they do not predict a new developer's effort. The low-code times include my failed drags. Statements about customization and cost are impressions, not measurements.

# Recommendation
For this small rule-driven checker, use the code-based version: it has stricter validation tests, edge-case coverage, a CSP, and clean git review. Use Appsmith when non-developers need a quick internal screen backed by real data sources, because the first working screen took under 7 minutes. For a real system, keep the rules in code (or a service) and let a low-code front end call them, so the rules stay testable.
