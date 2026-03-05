import pathlib
import re

path = pathlib.Path('/home/user/workspace/website/adawaty-site/src/lib/contentLocalized.ts')
text = path.read_text(encoding='utf-8')

start = text.find('\n  ar: {')
brace_start = text.find('{', start)
level = 0
end = None
for i in range(brace_start, len(text)):
    ch = text[i]
    if ch == '{':
        level += 1
    elif ch == '}':
        level -= 1
        if level == 0:
            end = i + 1
            break

ar_block = text[brace_start:end]

# Find string literals with latin letters.
pattern = re.compile(r'"([^"\\]*(?:\\.[^"\\]*)*)"')

hits = []
for m in pattern.finditer(ar_block):
    s = m.group(1)
    if re.search(r'[A-Za-z]', s):
        # ignore URLs and emails
        if 'http' in s or '@' in s:
            continue
        hits.append(s)

print('string_literals_with_latin', len(hits))
uniq = []
for s in hits:
    if s not in uniq:
        uniq.append(s)
for s in uniq[:120]:
    print('-', s)
