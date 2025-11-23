import { PanelLeft } from "lucide-react";
import { ThemeToggleButton } from "./ThemeToggleButton";
import { SearchSection } from "./SearchSection";
import { LanguageSelector } from "./LanguageSelector";
import { AppsSection } from "./AppsSection";
import { UserSection } from "./UserSection";
import { useSidebar } from "../context/SideBarContext";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SideMenuTop } from "./SideMenu/SideMenuTop";
import { menuSection } from "../data/content";
import { SideMenuSection } from "./SideMenu/SideMenuSection";

export function CardTop() {
    const { toggleSidebar, isCollapsed } = useSidebar();

    return (
        <div className="text-muted-foreground flex items-center gap-3 border-b p-2">
            <Sheet>
                <SheetTrigger>
                    <button className="lg:hidden cursor-pointer p-2 hover:bg-sidebar-accent hover:text-foreground hover:rounded-full transition">
                        <PanelLeft className="h-4 w-4" />
                    </button>
                </SheetTrigger>
                <SheetContent 
                    side="left"
                    className="w-68 p-0 bg-card border-r-0 [&>button:first-of-type]:hidden"
                >
                    <SheetTitle className="hidden">Navegação do sistema</SheetTitle>
                    <div className="flex flex-col gap-5 my-2 mx-2">
                        <SideMenuTop forceExpanded />
                            {menuSection.map((section, index) => (
                                <SideMenuSection 
                                    key={index}
                                    title={section.title}
                                    items={section.items} 
                                    forceExpanded
                                />
                            ))}
                    </div>
                </SheetContent>
            </Sheet>

            <PanelLeft 
                    className="h-8 w-8 cursor-pointer hidden lg:block p-2 hover:bg-sidebar-accent hover:text-foreground hover:rounded-full transition"
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