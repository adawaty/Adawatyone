/*
Language switcher — minimal, premium, accessible
*/

import { useI18n, type Lang } from "@/contexts/I18nContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const options: { lang: Lang; label: string; native: string }[] = [
  { lang: "en", label: "English", native: "English" },
  { lang: "fr", label: "French", native: "Français" },
  { lang: "es", label: "Spanish", native: "Español" },
  { lang: "de", label: "German", native: "Deutsch" },
  { lang: "ar", label: "Egyptian Arabic", native: "مصري" },
];

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const current = options.find((o) => o.lang === lang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          className="bg-white/6 hover:bg-white/10 h-9 px-3 rounded-full"
          aria-label={t("lang.label")}
        >
          {current?.native ?? "EN"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {options.map((o) => (
          <DropdownMenuItem key={o.lang} onClick={() => setLang(o.lang)}>
            <span className="flex-1">{o.native}</span>
            <span className="text-xs text-muted-foreground">{o.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
