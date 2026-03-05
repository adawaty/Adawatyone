import pathlib
import re

path = pathlib.Path('/home/user/workspace/website/adawaty-site/src/lib/contentLocalized.ts')
text = path.read_text(encoding='utf-8')

start = text.find('\n  ar: {')
if start == -1:
    raise SystemExit('Could not find ar block start')

# Find the opening brace for ar block
brace_start = text.find('{', start)

# Walk to matching closing brace
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

if end is None:
    raise SystemExit('Could not find ar block end')

prefix = text[:brace_start]
ar_block = text[brace_start:end]
suffix = text[end:]

replacements = [
    ('AI', 'الذكاء الاصطناعي'),
    ('DFY', 'تنفيذ كامل'),
    ('SEO/AEO/LLMSEO', 'تهيئة محركات البحث + الظهور في إجابات الذكاء الاصطناعي'),
    ('SEO', 'تهيئة محركات البحث'),
    ('AEO', 'تهيئة للإجابات'),
    ('LLMSEO', 'تهيئة الظهور في إجابات الذكاء الاصطناعي'),
    ('UX', 'تجربة الاستخدام'),
    ('UI', 'واجهة المستخدم'),
    ('end-to-end', 'من أولها لآخرها'),
    ('Analytics', 'تحليلات'),
    ('tracking', 'تتبّع'),
    ('workflow', 'سير عمل'),
    ('Workflows', 'مسارات عمل'),
    ('layout', 'تخطيط'),
    ('Brand guidelines', 'دليل البراند'),
    ('Roadmap', 'خارطة طريق'),
    ('VIP', 'كبار العملاء'),
    ('B2B', 'بي تو بي'),
    ('ICP', 'العميل المثالي'),
    ('Enrichment', 'إثراء بيانات'),
    ('Export', 'تصدير'),
    ('Exports', 'ملفات تسليم'),
    ('Deliverability', 'قابلية وصول الإيميل'),
    ('mentions/citations', 'الإشارات والاستشهادات'),
    ('prompt kits', 'حِزم برومبت'),
]

# Apply replacements with a little care to avoid re-replacing newly inserted Arabic phrases.
for a, b in replacements:
    ar_block = ar_block.replace(a, b)

# Safety: if any latin letters remain in ar_block, report a sample.
latin = re.findall(r'[A-Za-z]{2,}', ar_block)

path.write_text(prefix + ar_block + suffix, encoding='utf-8')

print('done')
print('latin_tokens_remaining_count', len(latin))
if latin:
    uniq = []
    for t in latin:
        if t not in uniq:
            uniq.append(t)
        if len(uniq) >= 30:
            break
    print('sample', uniq)
