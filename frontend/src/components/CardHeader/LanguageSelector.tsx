import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Globe } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/Popover";
import { useLocale } from "@/src/context/LocaleContext";

const languages = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
] as const;

export function LanguageSelector() {
    const { locale, setLocale, t } = useLocale();

    const selected = languages.find(l => l.code === locale) || languages[0];

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button size="sm" variant="ghost" className="rounded-full">
                <Globe className="h-4 w-4" />
                <span>{selected.label}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-40 p-1 bg-background opacity-100">
                {languages.map((lang) => (
                <Button
                    key={lang.code}
                    variant="ghost"
                    className="w-full justify-between"
                    onClick={() => setLocale(lang.code)}
                >
                    {lang.label}
                    {locale === lang.code && <Check className="h-4 w-4" />}
                </Button>
                ))}
            </PopoverContent>
        </Popover>
    );
}