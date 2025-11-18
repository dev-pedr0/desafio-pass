"use client";

import { Building2, Check, ChevronsUpDown, Plus } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/Popover";
import { companySection } from "../data/content";
import { useState } from "react";

export function SideMenuTop() {
    const [selectedCompany, setSelectedCompany] = useState(companySection[0]);
    
    return (
        <div className="w-full">
        <Popover>
            <PopoverTrigger className="w-full">
                <div className="flex w-full items-center gap-2 p-2 rounded-t-md border-b cursor-pointer hover:bg-accent">
                    <Building2 className="h-8 w-8 bg-chart-1 p-2 rounded-md"/>
                    <p className="grow font-medium text-sm text-left">
                        {selectedCompany.name}
                    </p>
                    <ChevronsUpDown className="h-4 w-4"/>
                </div>
            </PopoverTrigger>
            <PopoverContent side="right" align="start" className="w-56 p-0 flex flex-col">
                <p className="text-xs text-muted-foreground pt-2 pl-4">
                    Empresas
                </p>
                <div className="flex flex-col gap-1 p-2">
                    {companySection.map((company, index) => {
                        const Icon = company.icon;
                        const isSelected = selectedCompany.name === company.name;

                        return (
                            <button
                                    key={index}
                                    className={`flex text-sm items-center gap-2 p-2 cursor-pointer rounded-md hover:bg-accent w-full text-left ${
                                        isSelected ? "bg-accent" : "text-muted-foreground"
                                    }`}
                                    onClick={() => setSelectedCompany(company)}
                                >
                                <Icon className="h-6 w-6 border p-1 rounded-md"/>
                                <span className="font-medium text-foreground grow">{company.name}</span>
                                {isSelected && (
                                    <Check className="h-6 w-6 border p-1 rounded-md text-primary bg-card" />
                                )}
                            </button>
                        );
                    })}
                </div>
                <button className="border-t text-muted-foreground flex text-sm gap-2 items-center p-2 pl-4 cursor-pointer hover:bg-accent w-full text-left">
                    <Plus className="h-6 w-6 border p-1 rounded-md"/>
                    <span className="font-medium">Adicionar Organização</span>
                </button>
            </PopoverContent>
        </Popover>  
        </div>
    );
}