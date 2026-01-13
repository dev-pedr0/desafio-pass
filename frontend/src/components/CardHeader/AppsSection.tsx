import { Button } from "@/components/ui/button";
import { Grip } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/Tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { passApss } from "../../data/content";

export function AppsSection() {
    return (
        <div>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="rounded-full cursor-pointer
                                        data-[state=open]:bg-sidebar-accent
                                        data-[state=open]:text-foreground"
                                >
                                    <Grip className="h-4 w-4" />
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-auto">
                                <div className="grid grid-cols-3 gap-4 p-2">
                                    {passApss.map((app, index) => (
                                        <div key={index} className="hover:bg-sidebar-accent hover:rounded-md p-2">
                                            <a href="/" className="flex flex-col justify-center items-center gap-2">
                                                <img alt={app.name} src={app.image} className="w-10 h-10"/>
                                                <span className="text-xs">{app.name}</span>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </TooltipTrigger>

                <TooltipContent side="bottom">
                    Pass Apps
                </TooltipContent>
            </Tooltip>
        </div>
    );
}