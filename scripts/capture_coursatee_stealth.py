from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path(__file__).resolve().parents[1] / 'src' / 'assets' / 'portfolio' / 'client-coursatee.png'

url = 'https://www.coursatee.com/'

ua = (
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
  'AppleWebKit/537.36 (KHTML, like Gecko) '
  'Chrome/121.0.0.0 Safari/537.36'
)

with sync_playwright() as p:
  browser = p.chromium.launch(headless=True)
  ctx = browser.new_context(
    viewport={"width": 1440, "height": 900},
    device_scale_factor=2,
    user_agent=ua,
    locale='en-US',
  )
  page = ctx.new_page()
  page.add_init_script("Object.defineProperty(navigator, 'webdriver', {get: () => undefined});")

  page.goto(url, wait_until='networkidle', timeout=60000)
  page.wait_for_timeout(2000)
  page.screenshot(path=str(OUT), full_page=False)

  page.close()
  ctx.close()
  browser.close()

print('saved', OUT)
