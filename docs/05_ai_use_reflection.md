# AI-use reflection
Tool: Claude Code, model Sonnet 5.5 (claude-sonnet-5-5), plus Claude in Chrome to drive Appsmith.
AI wrote the shared spec, the code-based solution, the tests and the Appsmith JS Object, and operated the Appsmith editor and ran T1-T8.
Checks on AI output: all 8 shared cases, boundary tests, and reading the Appsmith screenshots myself. One AI error was caught by a test (a wrong expected value in a test, not in the code). The browser drag failures were a tool limit, and the user helped by dragging widgets by hand.
Limits: time numbers are agent tool time, not a human's effort. The user must review everything and confirm the class time, demo link and any publish step before sending.
