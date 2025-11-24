import { Search } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/Tooltip";

type Props = {
  inputClassName?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export function SearchSection({
  inputClassName = "",
  value,
  onChange,
  placeholder = "Pesquisar...",
}: Props) {
    return(
        <div className={`flex items-center ${inputClassName} gap-1`}>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
                bg-background border border-input rounded-md px-3 py-2 pr-10 text-sm
                placeholder:text-muted-foreground focus:outline-none focus:ring-2 
                focus:ring-ring focus:border-transparent transition
                min-w-64
                ${inputClassName}
                `}
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