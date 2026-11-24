# Shared requirements and acceptance-criteria sheet (used by BOTH implementations)

Student: Talgat Kozhakhmetov | ID: 24B031852 | Practice #12 - code-based vs low-code
Scenario: Smart Campus Room Availability Checker. One fictional room, fixed fictional bookings, no login, no payment,
no real personal data, no production database. The optional Practice #11 explanation feature is NOT included.

## User story
As a student, I want to enter a future start time and a duration for the campus room and see "Available" or
"Unavailable" with a clear reason, so that I know whether I can plan to use the room - without changing any booking.

## Fixed data (identical in both solutions)
| Item | Value |
|---|---|
| Room | B-204 |
| Current time ("now"), fixed for reproducible tests | 09:00 (540 minutes after midnight) |
| Existing booking 1 | Algorithms seminar 10:00-11:00 |
| Existing booking 2 | Club meeting 13:00-14:30 |
| Maximum duration | 120 minutes |
| End of day | 24:00 (a request may not run past midnight) |

## Acceptance criteria
| ID | Criterion |
|---|---|
| AC1 | The start time must be in the future: strictly later than now (09:00). Start == now is rejected. |
| AC2 | The duration must be greater than zero and at most 120 minutes (whole minutes; exactly 120 is allowed). |
| AC3 | A request that overlaps an existing booking is Unavailable. Intervals that only touch (end == start) do not overlap. |
| AC4 | If the room is blocked, every request is Unavailable. |
| AC5 | The page shows a clear decision (Available / Unavailable / input error) and never changes the existing bookings. |
| AC6 | Invalid input (empty, malformed, out of range) gets an understandable message, not a crash or a silent result. |

## Inputs and outputs (the common contract)
| Inputs | Type / format |
|---|---|
| startTime | text "HH:MM", 00:00-23:59 |
| duration | whole number of minutes (entered as text/number) |
| blocked | boolean (room blocked flag) |
| bookings | fixed fictional list above (not editable by the user) |

| Outputs | Meaning |
|---|---|
| available | boolean: true only when the request is valid, the room is not blocked and nothing overlaps |
| reasonCode | `ok`, `invalid_start`, `invalid_duration`, `invalid_past`, `invalid_range`, `blocked`, `overlap` |
| message | visible text for the student (decision + reason) |

Decision order (same in both): 1) start format -> 2) duration -> 3) start in the future -> 4) day boundary -> 5) blocked -> 6) overlap -> ok.
`available` is false for every code except `ok`. Codes starting with `invalid_` are input errors ("validation error"), not "Unavailable".

## Common test set (defined BEFORE implementation, stored in shared/test_cases.json)
| ID | Start | Duration | Blocked | Expected available | Expected reasonCode | Purpose |
|---|---|---|---|---|---|---|
| T1 | 11:30 | 60 | no | true | ok | valid free interval (11:30-12:30) |
| T2 | 10:30 | 60 | no | false | overlap | overlaps Algorithms seminar |
| T3 | 11:30 | 60 | yes | false | blocked | blocked room, otherwise valid |
| T4 | 11:30 | 0 | no | false | invalid_duration | duration = 0 |
| T5 | 11:30 | 121 | no | false | invalid_duration | duration = 121 |
| T6 | 08:00 | 60 | no | false | invalid_past | start before now |
| T7 | 11:00 | 60 | no | true | ok | adjacent: starts exactly when the seminar ends |
| T8 | (any) | (any) | - | - | - | booking data identical before and after running T1-T7 |

Extra boundary tests (code-based suite only): start == now, 1-minute and exactly-120-minute duration, end exactly 24:00, spill past midnight,
non-numeric / decimal / empty inputs, markup in the time field.

## Out of scope
Login, payments, real data, creating or editing bookings, multiple rooms, time zones, optional AI explanation (Practice #11).
