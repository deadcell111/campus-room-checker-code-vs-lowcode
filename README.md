# Practice #12 - Code-based vs low-code: Smart Campus room availability checker
Talgat Kozhakhmetov, 24B031852. Same user story, same AC1-AC6, same tests T1-T8 built twice.

- `docs/01...` shared requirements + acceptance criteria + test inputs
- `baseline/` frozen A3 checker (hashes in evidence/baseline_checksums.txt, 33 tests pass)
- `code-based/` HTML/JS solution (data, validation, availability, messages, checker, ui). Open `code-based/index.html`.
- `low-code/` Appsmith JS Object + widget list (the app itself lives in Appsmith)
- `tests/` `node tests/code_shared_cases.js`, `node --test tests/code_unit_tests.js`, `python3 -I tests/code_ui_check.py`
- `docs/02..05` test table, comparison matrix + recommendation, security checklist, AI-use reflection
- `shots/`, `evidence/` screenshots and raw logs

## Live demos
- Code-based: https://deadcell111.github.io/campus-room-checker-code-vs-lowcode/code-based/index.html
- Low-code (Appsmith, published, "Make application public" on): https://app.appsmith.com/app/my-first-application/page1-6b055da9328a2e186a87b579
- Repo: https://github.com/deadcell111/campus-room-checker-code-vs-lowcode

Status: both builds pass 8/8.
Labels: T1-T8 on Appsmith were run in the editor canvas; after publishing, only T2 was re-run in the published view (shots/lowcode_published_view_T2.jpg). Not done: Appsmith JSON export, Git sync, logged-out check of the public link.
