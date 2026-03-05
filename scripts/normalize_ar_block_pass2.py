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
    ('تصديرs', 'تسليمات'),
    ('سير عملs', 'مسارات عمل'),
    ('CRM', 'إدارة علاقات العملاء'),
    ('SaaS', 'برمجيات كخدمة'),
    ('ERP-lite', 'نظام تشغيل خفيف'),
    ('ERP', 'نظام موارد'),
    ('SME', 'شركة متوسطة'),
    ('MVP', 'نسخة أولية'),
    ('FAQ', 'أسئلة شائعة'),
    ('CTA', 'زر دعوة'),
    ('CTR', 'نسبة النقر'),
    ('UTM', 'أكواد تتبّع'),
    ('Bounce rate', 'معدل الارتداد'),
    ('Drop-off', 'التسرب'),
    ('proof', 'إثبات'),
    ('Local تهيئة محركات البحث', 'تهيئة محركات البحث المحلي'),
    ('On-page تهيئة محركات البحث', 'تهيئة محركات البحث داخل الصفحة'),
    ('Audit', 'مراجعة'),
    ('Routing', 'توجيه'),
    ('routing', 'توجيه'),
    ('intake', 'استقبال الطلبات'),
    ('portal', 'بوابة'),
    ('Portals', 'بوابات'),
    ('onboarding', 'تهيئة المستخدم'),
    ('activation', 'التفعيل'),
    ('buffers', 'فواصل زمنية'),
    ('reminders', 'تذكيرات'),
    ('no-shows', 'غياب عن المواعيد'),
    ('booked → showed → converted', 'محجوز → حضر → تحوّل'),
    ('(as-is → to-be)', '(من الوضع الحالي للوضع المستهدف)'),
    ('Dashboards', 'لوحات متابعة'),
    ('Integrations', 'تكاملات'),
]

for a, b in replacements:
    ar_block = ar_block.replace(a, b)

# Manual targeted sentence cleanup
ar_block = ar_block.replace(
    'قوائم ليدز عالية النية تحت براندك: تارجتينج، إثراء بيانات، تحقق من الإيميلات، وتصديرs جاهزة للأوتريتش.',
    'قوائم ليدز عالية النية تحت براندك: تارجتينج، إثراء بيانات، تحقق من الإيميلات، وتسليمات جاهزة للتواصل المباشر.'
)

# Clean double "الـ" introduced by prior replace
ar_block = ar_block.replace('الـالذكاء الاصطناعي', 'الذكاء الاصطناعي')

path.write_text(prefix + ar_block + suffix, encoding='utf-8')
print('done')
