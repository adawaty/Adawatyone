import pathlib

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

prefix = text[:brace_start]
ar_block = text[brace_start:end]
suffix = text[end:]

replacements = [
    (' system ', ' نظام '),
    ('Content Engine', 'محرك محتوى'),
    ('Bio Pages', 'صفحات تعريف شخصية'),
    ('Bio hub', 'مركز تعريف شخصي'),
    ('Bio page', 'صفحة تعريف شخصية'),
    ('Credibility stack', 'حزمة الثقة'),
    ('Trust stack', 'حزمة الثقة'),
    ('Tracking', 'تتبّع'),
    ('handoffs', 'تسليمات بين الناس'),
    ('Workflow mapping', 'رسم مسار العمل'),
    ('Client بوابة', 'بوابة عملاء'),
    ('حجز + Intake', 'حجز + استقبال طلبات'),
    ('(LMS  SIS  QMS)', '(نظام إدارة تعلم + نظام معلومات طلبة + نظام جودة)'),
]

for a, b in replacements:
    ar_block = ar_block.replace(a, b)

path.write_text(prefix + ar_block + suffix, encoding='utf-8')
print('done')
