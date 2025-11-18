import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/Tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import { Button } from "@/components/ui/button";
import { CircleUser, LogOut, Settings } from "lucide-react";

export function UserSection() {

    const fakeUser = {
        name: "Jonathan Doe",
        email: "johndoe@example.com"
    }

    const initials = fakeUser.name
        .split(" ")
        .map(word => word[0])
        .join("")
        .toUpperCase();

    return (
        <div className="bg-chart-1 p-1 px-2 rounded-full text-center cursor-pointer">
            <Tooltip>
                <TooltipTrigger asChild>
                    <div>
                        <Popover>
                            <PopoverTrigger>
                                <span className="text-foreground text-sm cursor-pointer">{initials}</span>
                            </PopoverTrigger>

                            <PopoverContent className="w-60 p-0 m-0">
                                <div className="w-full">
                                    <div className="border-b flex gap-1 items-center p-3 text-start">
                                        <span className="text-foreground text-sm bg-chart-1 p-2 rounded-full text-center">{initials}</span>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{fakeUser.name}</span>
                                            <span className="text-muted-foreground text-xs">{fakeUser.email}</span>
                                        </div>
                                    </div>
                                    <div className="border-b">
                                        <Button variant="ghost" className="cursor-pointer w-full justify-start text-left m-1">
                                            <CircleUser className="text-muted-foreground"/>
                                            <span className="text-xs">Conta</span>
                                        </Button>
                                        <Button variant="ghost" className="cursor-pointer w-full justify-start text-left m-1">
                                            <Settings className="text-muted-foreground"/>
                                            <span className="text-xs">Configurações</span>
                                        </Button>
                                    </div>
                                    <div className="text-destructive">
                                        <Button variant="ghost" className="cursor-pointer w-full justify-start text-left m-1 button-variant">
                                            <LogOut/>
                                            <span className="text-xs">Log out</span>
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </TooltipTrigger>

                <TooltipContent side="bottom">
                    Perfil
                </TooltipContent>
            </Tooltip>
        </div>
    );
}