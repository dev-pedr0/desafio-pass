import { PanelLeft } from "lucide-react";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { SearchSection } from "./SearchSection";
import { LanguageSelector } from "./LanguageSelector";
import { AppsSection } from "./AppsSection";
import { UserSection } from "./UserSection";
import { useSidebar } from "../context/SideBarContext";

export function CardTop() {
    const {toggleSidebar} = useSidebar();

    return (
        <div className="text-muted-foreground flex items-center gap-3 border-b p-2">
            <PanelLeft 
                    className="h-8 w-8 p-2 cursor-pointer hover:bg-sidebar-accent hover:text-foreground hover:rounded-full"
                    onClick={toggleSidebar}
                />
            <SearchSection inputClassName="grow"/>
            <ThemeToggleButton/>
            <LanguageSelector/>
            <AppsSection/>
            <UserSection/>
        </div>
    );
}