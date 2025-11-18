import { Button } from "@/components/ui/button";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverTrigger } from "./ui/Popover";
import { PopoverContent } from "@radix-ui/react-popover";

const languages = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export function LanguageSelector() {
    const [selected, setSelected] = useState(languages[0]); // padrão: Português

    return(
        <Popover>
            <PopoverTrigger asChild>
                <Button size="sm" variant="ghost" className="rounded-full cursor-pointer focus:ring-2 focus:ring-ring">
                    <Globe className="h-4 w-4"/>
                    <span>{selected.label}</span>
                    <ChevronDown className="h-4 w-4 mt-0.5"/>
                </Button>
            </PopoverTrigger>

            <PopoverContent>
                <div className="flex flex-col gap-1 w-30 bg-black border rounded-md">
                    {languages.map((lang) => {
                        const isSelected = selected.label === lang.label;
                        return(
                            <Button
                            key={lang.code}
                            variant="ghost"
                            className="w-full flex justify-between cursor-pointer"
                            onClick={() => setSelected(lang)}
                            >
                                {lang.label}
                                {isSelected && (
                                    <Check className="h-6 w-6 text-primary" />
                                )}
                            </Button>
                        );
                    })}
                </div>
            </PopoverContent>
        </Popover>
    );
}