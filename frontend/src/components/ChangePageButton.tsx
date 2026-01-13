import { Button } from "@/components/ui/button";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
  onFirst: () => void;
  onPrev: () => void;
  onNext: () => void;
  onLast: () => void;
}

export function ChangePageButton({
  currentPage,
  totalPages,
  onFirst,
  onPrev,
  onNext,
  onLast,
}: Props) {
    return (
        <div className="flex items-center gap-1">
            <Button 
                size="sm" 
                variant="outline" 
                onClick={onFirst}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
            >
                <ChevronFirst className="h-4 w-4" />
            </Button>
            <Button 
                size="sm" 
                variant="outline" 
                onClick={onPrev}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
                size="sm" 
                variant="outline" 
                onClick={onNext}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
            <Button 
                size="sm" 
                variant="outline" 
                onClick={onLast}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
            >
                <ChevronLast className="h-4 w-4" />
            </Button>
        </div>
    );
}