import { Search } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/Tooltip";

type Props = {
  inputClassName?: string;
};

export function SearchSection({ inputClassName = "" }: Props) {
    return(
        <div className={`flex items-center ${inputClassName} gap-1`}>
            <input
                type="text"
                placeholder="Pesquisar..."
                className={
                    `bg-transparent border border-input 
                    rounded-md px-2 py-1 pr-9 text-sm 
                    placeholder:text-muted-foreground 
                    focus:outline-none focus:ring-2 
                    focus:ring-ring ${inputClassName}`
                }
            />
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Search className="h-8 w-8 p-2 cursor-pointer hover:bg-sidebar-accent hover:text-foreground hover:rounded-full" />
                    </TooltipTrigger>

                    <TooltipContent side="bottom">
                        Buscar
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}