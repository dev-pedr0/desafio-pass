"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "./ui/Tooltip";


export function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                            <button
                                onClick={toggleTheme}
                                className="cursor-pointer p-2 rounded-full bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                            >
                                {theme === "dark" ? <Moon/> : <Sun/>}
                            </button>
                </TooltipTrigger>

                <TooltipContent side="bottom">
                    Alterar tema
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

  );
}