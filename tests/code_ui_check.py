"""Runs the shared T1-T8 cases through the real code-based UI in headless Chrome and saves screenshots.
Run: python3 -I tests/code_ui_check.py"""
import json, pathlib, sys
from playwright.sync_api import sync_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
URL = (ROOT / "code-based" / "index.html").as_uri()
spec = json.loads((ROOT / "shared" / "test_cases.json").read_text())
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
HEAD = {"ok": "Available", "overlap": "Unavailable", "blocked": "Unavailable"}   # invalid_* -> "Check your input"
results, errors = [], []
def check(name, cond, detail=""):
    results.append(bool(cond)); print("PASS" if cond else "FAIL", name, ("-> " + str(detail)) if detail else "")
with sync_playwright() as p:
    b = p.chromium.launch(executable_path=CHROME, headless=True)
    pg = b.new_page(viewport={"width": 375, "height": 800}); pg.on("pageerror", lambda e: errors.append(str(e))); pg.on("console", lambda m: m.type == "error" and errors.append(m.text))
    pg.goto(URL); bookings_before = pg.inner_text("#bookings")
    for c in spec["cases"]:
        if c.get("type") == "bookings_unchanged":
            check(f'{c["id"]} {c["name"]}', pg.inner_text("#bookings") == bookings_before, pg.inner_text("#bookings").replace("\n", " | ")); continue
        pg.set_checked("#blocked", c["blocked"]); pg.fill("#start", c["start"]); pg.fill("#duration", c["duration"]); pg.click("button[type=submit]")
        code = pg.get_attribute("#result", "data-code"); big = pg.inner_text("#result .big"); why = pg.inner_text("#result .why")
        want_big = HEAD.get(c["code"], "Check your input")
        check(f'{c["id"]} {c["name"]}', code == c["code"] and big == want_big, f"{big} [{code}] {why}")
        pg.screenshot(path=str(ROOT / f'shots/code_{c["id"]}_mobile.png'), full_page=True)
    pg.set_viewport_size({"width": 1100, "height": 800}); pg.set_checked("#blocked", False); pg.fill("#start", "10:30"); pg.fill("#duration", "60"); pg.click("button[type=submit]")
    pg.screenshot(path=str(ROOT / "shots/code_desktop_overlap.png"), full_page=True)
    check("responsive: no horizontal scroll at 1100px", pg.evaluate("document.documentElement.scrollWidth") <= 1100)
    pg.set_viewport_size({"width": 375, "height": 800}); check("responsive: no horizontal scroll at 375px", pg.evaluate("document.documentElement.scrollWidth") <= 375)
    # XSS probe: markup typed into the time field must stay inert and be reported as an input error
    pg.fill("#start", '<img src=x onerror="window.__xss=1">'); pg.fill("#duration", "60"); pg.click("button[type=submit]")
    check("security: markup in input is not executed/rendered", pg.evaluate("window.__xss === undefined") and pg.query_selector("#result img") is None and pg.get_attribute("#result", "data-code") == "invalid_start")
    check("no console/page errors (incl. CSP violations)", not errors, errors)
    b.close()
print("code-based UI checks:", sum(results), "/", len(results)); sys.exit(0 if all(results) else 1)
