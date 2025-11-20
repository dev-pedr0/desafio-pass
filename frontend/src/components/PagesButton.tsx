import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";

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

            <PopoverContent>
                <div className="flex flex-col gap-1">
                    {options.map((option) => (
                        <Button
                            key={option}
                            size="sm"
                            variant="ghost"
                            onClick={() => onChange(option)}
                        >
                            {option} / página
                        </Button>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}