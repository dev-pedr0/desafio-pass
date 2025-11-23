import { Button } from "@/components/ui/button";
import { useLocale } from "../context/LocaleContext";

type ButtonItem  = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
};

type Props = {
    items: ButtonItem[];
}

export function GenericButtons({items }: Props) {
    const { t } = useLocale();
    return (
        <div className="flex gap-2">
            {items.map((item, index) => {
                const Icon = item.icon;
                return (
                    <Button
                        key={index} 
                        size="sm" 
                        variant="outline" 
                        className="border border-dashed rounded-md cursor-pointer focus:ring-2 focus:ring-ring"
                        >
                        <Icon className="h-4 w-4"/>
                        <span className="text-md">{t(item.label)}</span>
                    </Button>
                );
            }
            )}
        </div>
    );
}