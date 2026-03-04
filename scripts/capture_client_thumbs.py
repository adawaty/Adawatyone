import os
from pathlib import Path
from playwright.sync_api import sync_playwright

CLIENTS = [
  ("meteory", "https://www.meteory-eg.com/"),
  ("sparx", "https://sparx-engineering.com/"),
  ("altawfeek", "https://altawfeek-engineering.com/"),
  ("dnc", "https://www.drhaninaiem.com/"),
  ("3a", "https://3a-international.co/"),
  ("tawplast", "http://tawplast.com/"),
  ("crownycup", "http://crownycup.com/"),
  ("el-etehad", "http://el-etehad.com/"),
  ("egyspring", "http://egyspring.com/"),
  ("nextsupply", "https://www.nextsupplytd.com/"),
  ("hostocta", "http://hostocta.com/"),
  ("bello-food", "https://www.bello-food.com/"),
  ("coursatee", "https://www.coursatee.com/"),
]

OUT_DIR = Path(__file__).resolve().parents[1] / "src" / "assets" / "portfolio"
OUT_DIR.mkdir(parents=True, exist_ok=True)

VIEWPORT = {"width": 1440, "height": 900}

results = []

with sync_playwright() as p:
  browser = p.chromium.launch()
  ctx = browser.new_context(viewport=VIEWPORT, device_scale_factor=2)

  for cid, url in CLIENTS:
    out = OUT_DIR / f"client-{cid}.png"
    page = ctx.new_page()
    ok = True
    err = ""
    try:
      page.goto(url, wait_until="domcontentloaded", timeout=45000)
      page.wait_for_timeout(1500)
      page.screenshot(path=str(out), full_page=False)
    except Exception as e:
      ok = False
      err = str(e)[:220]
    finally:
      page.close()

    results.append((cid, url, ok, err, str(out)))

  ctx.close()
  browser.close()

print("written", len(results))
for cid, url, ok, err, out in results:
  print(f"{cid}\t{ok}\t{out}\t{'' if ok else err}")
