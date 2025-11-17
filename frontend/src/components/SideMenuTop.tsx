import { Building2, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";

export function SideMenuTop() {
    return (
        <div className="w-full">
        <Popover>
            <PopoverTrigger className="w-full">
                <div className="flex w-full items-center gap-2 p-2 rounded-t-md border-b cursor-pointer hover:bg-accent">
                    <Building2 className="h-8 w-8 bg-chart-1 p-2 rounded-md"/>
                    <p className="grow font-medium text-sm text-left">
                        Pass
                    </p>
                    <ChevronsUpDown className="h-4 w-4"/>
                </div>
            </PopoverTrigger>
            <PopoverContent side="right">Place content for the popover here.</PopoverContent>
        </Popover>  
        </div>
    );
}