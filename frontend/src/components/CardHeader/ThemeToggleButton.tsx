"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "../ui/Tooltip";
import { useState } from "react";


export function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();
    const [isAnimating, setIsAnimating] = useState(false);

    const toggleThemeWithEffect = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isAnimating) return;

        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        const ripple = document.createElement("div");
        ripple.className = "theme-ripple";
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.background = theme === "dark" 
        ? "radial-gradient(circle, hsl(0 0% 98%) 0%, hsl(0 0% 98%/0.9) 50%, transparent 100%)"
        : "radial-gradient(circle, hsl(240 5.9% 10%) 0%, hsl(240 5.9% 10%/0.9) 50%, transparent 100%)";
        document.body.appendChild(ripple);

        setIsAnimating(true);

        setTimeout(() => {
        toggleTheme();
        }, 150);

        setTimeout(() => {
        ripple.remove();
        setIsAnimating(false);
        }, 1600);
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                            <button
                                onClick={toggleThemeWithEffect}
                                disabled={isAnimating}
                                className="cursor-pointer p-2 rounded-full bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                            >
                                {theme === "dark" ? <Moon className="h-4 w-4 cursor-pointer hover:bg-sidebar-accent hover:text-foreground hover:rounded-full"/> : <Sun className="h-4 w-4 cursor-pointer hover:bg-sidebar-accent hover:text-foreground hover:rounded-full"/>}
                            </button>
                </TooltipTrigger>

                <TooltipContent side="bottom">
                    Alterar tema
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
  );
}