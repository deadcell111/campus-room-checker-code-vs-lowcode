# Appsmith build steps (low-code track)

Widgets (names matter, the JS Object refers to them):
| Widget | Name | Settings |
|---|---|---|
| Text | Text_Title | "Smart Campus Room Availability Checker - low-code (Appsmith). Fictional data, check only." |
| Table | Table_Bookings | Table data `{{JSObject1.bookingsRows()}}`; no editing, no add-row; header "Room B-204 - existing bookings (now 09:00)" |
| Input | Input_Start | Data type Text, placeholder 11:30, label "Start time (HH:MM)" |
| Input | Input_Duration | Data type Text, placeholder 60, label "Duration (minutes, 1-120)" |
| Switch | Switch_Blocked | label "Room is blocked (demo flag)", default off |
| Button | Button_Check | "Check availability"; onClick `{{JSObject1.run()}}` |
| Text | Text_Result | `{{ appsmith.store.result ? (appsmith.store.result.available ? "AVAILABLE" : (appsmith.store.result.code.startsWith("invalid_") ? "CHECK YOUR INPUT" : "UNAVAILABLE")) + " [" + appsmith.store.result.code + "] " + appsmith.store.result.message : "Enter a start time and a duration, then press Check." }}` |
