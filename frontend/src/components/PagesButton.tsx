import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import { Check } from "lucide-react";

interface Props {
  itemsPerPage: number;
  onChange: (value: number) => void;
}

export function PagesButton({ itemsPerPage, onChange }: Props) {
    const options = [5, 10, 15, 20];

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="">
                    {itemsPerPage} / página
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto text-left p-0 m-0">
                <div className="flex flex-col gap-1 justify-start">
                    {options.map((option) => {
                        const isSelected = option === itemsPerPage;

                        return (
                            <Button
                                key={option}
                                size="sm"
                                variant="ghost"
                                onClick={() => onChange(option)}
                                className="pl-0 ml-0"
                            >
                                <span>{option} / página</span>

                                {isSelected && (
                                    <Check className="h-4 w-4" />
                                )}
                            </Button>
                        );
                    })}  
                </div>           
            </PopoverContent>
        </Popover>
    )
}