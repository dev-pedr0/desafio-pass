import { PanelLeft } from "lucide-react";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { SearchSection } from "./SearchSection";

export function CardTop() {
    return (
        <div className="text-muted-foreground flex items-center gap-3 border-b p-2">
            <PanelLeft className="h-8 w-8 p-2 cursor-pointer hover:bg-sidebar-accent hover:text-foreground hover:rounded-full"/>
            <SearchSection/>
            <ThemeToggleButton/>
        </div>
    );
}