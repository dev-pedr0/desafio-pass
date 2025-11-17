"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

type Props = {
  title: string;
  items: MenuItem[];
}

export function SideMenuSection({ title, items }: Props) {
    const pathname = usePathname();
    
    return (
        <div className="text-muted-foreground font-medium w-full">
            <h3 className="text-xs">
                {title}
            </h3>

            <ul>
                {items.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href; 

                    return (
                        <li key={index} className="mb-0.5">
                            <Link 
                                href={item.href} 
                                className={`flex items-center gap-3 px-2 py-2 rounded-md transition text-sm
                                    ${isActive
                                        ? "bg-sidebar-accent text-foreground"
                                        : "text-muted-foreground hover:bg-accent hover:text-foreground"}
                                    `}
                                >
                                <Icon className="h-4 w-4" />
                                <span>
                                    {item.label}
                                </span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}