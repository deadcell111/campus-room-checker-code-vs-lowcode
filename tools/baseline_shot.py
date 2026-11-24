"""Baseline UI check + screenshot of the frozen A3 checker. Run: python3 -I tools/baseline_shot.py"""
import pathlib
from playwright.sync_api import sync_playwright
ROOT = pathlib.Path(__file__).resolve().parent.parent
URL = (ROOT / "baseline" / "index.html").as_uri()
with sync_playwright() as p:
    b = p.chromium.launch(executable_path="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless=True)
    pg = b.new_page(viewport={"width": 375, "height": 760}); pg.goto(URL)
    pg.fill("#start", "10:30"); pg.fill("#end", "11:30"); pg.click("button[type=submit]")
    print("baseline overlap 10:30-11:30 ->", pg.inner_text("#result .big"), "|", pg.inner_text("#result .why"))
    pg.screenshot(path=str(ROOT / "shots/baseline_a3_checker.png"), full_page=True); b.close()
