# Test results T1-T8 (identical inputs, "now" = 09:00, bookings 10:00-11:00 and 13:00-14:30)

| ID | Input (start / minutes / blocked) | Expected | Code-based observed | Low-code (Appsmith) observed |
|---|---|---|---|---|
| T1 | 11:30 / 60 / no | Available (ok) | PASS: Available, free 11:30-12:30 | PASS: "ok: Available: Room B-204 is free from 11:30 to 12:30." |
| T2 | 10:30 / 60 / no | Unavailable (overlap) | PASS: overlaps Algorithms seminar | PASS: "overlap: Unavailable: overlaps "Algorithms seminar" (10:00-11:00)." |
| T3 | 11:30 / 60 / yes | Unavailable (blocked) | PASS | PASS: "blocked: Unavailable: the room is blocked." |
| T4 | 11:30 / 0 / no | Validation error | PASS (invalid_duration) | PASS (invalid_duration) |
| T5 | 11:30 / 121 / no | Validation error | PASS (invalid_duration) | PASS (invalid_duration; same text as T4, input field showed 121) |
| T6 | 08:00 / 60 / no | Validation error (past) | PASS (invalid_past) | PASS (invalid_past, mentions 09:00) |
| T7 | 11:00 / 60 / no | Available (adjacent) | PASS | PASS: free 11:00-12:00 |
| T8 | after T1-T7 | Bookings unchanged | PASS (checked in engine + UI, data deep-frozen) | PASS (table identical after all runs; JS Object never writes to BOOKINGS) |

Score: code-based 8/8, low-code 8/8.
Extra tests, code-based only: 9 boundary/unit tests, 12 UI checks (responsive, XSS probe, no console/CSP errors), 33 baseline tests.
Low-code: run by hand in the editor canvas, then T1-T7 repeated in the published view (all matched). Run one at a time. No extra boundary tests and no narrow-screen check were run.
Evidence: evidence/*.txt, shots/code_*.png, shots/lowcode_*.jpg.
