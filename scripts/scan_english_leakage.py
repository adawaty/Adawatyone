import os, re, json

ROOT = '/home/user/workspace/website/adawaty-site/src'
TARGET_DIRS = ['pages', 'components']

latin_re = re.compile(r'[A-Za-z]')
jsx_text_re = re.compile(r'>([^<>\n]{2,})<')

hits = []

for d in TARGET_DIRS:
    base = os.path.join(ROOT, d)
    for dirpath, _, filenames in os.walk(base):
        for fn in filenames:
            if not fn.endswith(('.tsx', '.ts')):
                continue
            path = os.path.join(dirpath, fn)
            rel = os.path.relpath(path, ROOT)
            try:
                s = open(path, 'r', encoding='utf-8').read()
            except Exception:
                continue

            # Find plain JSX text nodes that include latin letters
            for m in jsx_text_re.finditer(s):
                txt = m.group(1).strip()
                if not txt:
                    continue
                if '{' in txt or '}' in txt:
                    continue
                if latin_re.search(txt):
                    # ignore obvious code-like or class-like
                    if len(txt) > 180:
                        txt = txt[:180] + '…'
                    hits.append({
                        'file': rel,
                        'kind': 'jsx_text',
                        'text': txt,
                    })

            # Find string literals in t("key")? ignore. Find english literals in JSX props like title="..."
            for sm in re.finditer(r'\b(title|description|label|placeholder)\s*=\s*"([^"]+)"', s):
                val = sm.group(2)
                if latin_re.search(val) and 't(' not in val:
                    if len(val) > 180:
                        val = val[:180] + '…'
                    hits.append({
                        'file': rel,
                        'kind': 'attr_literal',
                        'text': f"{sm.group(1)}=\"{val}\"",
                    })

# De-dupe
uniq = []
seen = set()
for h in hits:
    k = (h['file'], h['kind'], h['text'])
    if k in seen:
        continue
    seen.add(k)
    uniq.append(h)

out_path = '/home/user/workspace/english-leakage-report.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump({'count': len(uniq), 'hits': uniq}, f, ensure_ascii=False, indent=2)

print(out_path)
print('count', len(uniq))
