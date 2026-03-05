import datetime
from pathlib import Path
import re

ROOT = Path('/home/user/workspace/website/adawaty-site')
SRC = ROOT / 'src'
PUBLIC = ROOT / 'public'

# Extract site.url from src/lib/content.ts
content_ts = (SRC / 'lib' / 'content.ts').read_text('utf-8')
m = re.search(r"url:\s*\"([^\"]+)\"", content_ts)
site_url = m.group(1).rstrip('/') if m else 'https://adawaty.net'

# Route sources
# Use IDs from content.ts directly (light parsing)

def extract_array_ids(var_name: str, key: str):
    pattern = rf"export const {var_name}:[^=]*=\s*\[([\s\S]*?)\n\];"
    mm = re.search(pattern, content_ts)
    if not mm:
        return []
    block = mm.group(1)
    return re.findall(rf"{key}:\s*\"([^\"]+)\"", block)

service_ids = extract_array_ids('services', 'id')
industry_ids = extract_array_ids('industries', 'id')
case_slugs = extract_array_ids('caseStudies', 'slug')
persona_slugs = extract_array_ids('personas', 'slug')
solution_slugs = extract_array_ids('solutions', 'slug')
audience_ids = extract_array_ids('audiences', 'id')

# glossary slugs
from importlib.util import spec_from_file_location, module_from_spec
spec = spec_from_file_location('glossary', str(SRC / 'lib' / 'glossary.ts'))
# Can't import TS; parse instead

glossary_ts = (SRC / 'lib' / 'glossary.ts').read_text('utf-8')
glossary_slugs = re.findall(r"slug:\s*\"([^\"]+)\"", glossary_ts)

routes = set()

# Core
for r in [
    '/',
    '/services',
    '/solutions',
    '/industries',
    '/work',
    '/about',
    '/contact',
    '/ai-visibility-audit',
    '/pricing-calculator',
    '/glossary',
    '/for',
]:
    routes.add(r)

# Dynamic
for sid in service_ids:
    routes.add(f'/services/{sid}')

for slug in solution_slugs:
    routes.add(f'/solutions/{slug}')

for iid in industry_ids:
    routes.add(f'/industries/{iid}')

for slug in case_slugs:
    routes.add(f'/work/{slug}')

for slug in persona_slugs:
    routes.add(f'/for/{slug}')

for slug in glossary_slugs:
    routes.add(f'/glossary/{slug}')

# Build sitemap.xml (static, one language canonical; hreflang handled via SeoHead)
now = datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')

urls = []
for path in sorted(routes):
    loc = f"{site_url}{path}"
    urls.append(f"  <url>\n    <loc>{loc}</loc>\n    <lastmod>{now}</lastmod>\n  </url>")

xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" \
      "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n" + \
      "\n".join(urls) + "\n</urlset>\n"

PUBLIC.mkdir(parents=True, exist_ok=True)
(PUBLIC / 'sitemap.xml').write_text(xml, 'utf-8')

robots = f"User-agent: *\nAllow: /\n\nSitemap: {site_url}/sitemap.xml\n"
(PUBLIC / 'robots.txt').write_text(robots, 'utf-8')

print('site_url', site_url)
print('routes', len(routes))
print('wrote', PUBLIC / 'sitemap.xml')
print('wrote', PUBLIC / 'robots.txt')
