"use client";

import { PanelsLeftBottom, Activity, BusFront, Package, BedDouble, Ticket, Camera, Star, Map, DollarSign, CalendarDays, Puzzle, MapPin, FileText, Settings } from "lucide-react";

export const menuSection = [
    {
        title: "Principal",
        items: [
            {icon: PanelsLeftBottom, label: "Painel", href: "/painel"},
            { icon: Activity, label: "Atividade", href: "/atividade" },
        ],
    },
    {
        title: "Serviços",
        items: [
            {icon: BusFront, label: "Transfer", href: "/"},
            { icon: Package, label: "Combo", href: "/combo" },
            {icon: BedDouble, label: "Hospedagem", href: "/hospedagem"},
            { icon: Ticket, label: "Ingresso", href: "/ingresso" },
            {icon: Camera, label: "Passeio", href: "/passeio"},
            { icon: Star, label: "Experiência", href: "/experiencia" },
            {icon: Map, label: "Circuito", href: "/circuito"},
        ],
    },
    {
        title: "Comercial",
        items: [
            {icon: DollarSign, label: "Tarifário", href: "/tarifario"},
            { icon: CalendarDays, label: "Disponibilidade", href: "/disponibilidade" },
        ],
    },
    {
        title: "Complementos",
        items: [
            {icon: Puzzle, label: "Slots", href: "/slots"},
            { icon: MapPin, label: "Perímetros", href: "/perimetros" },
            { icon: FileText, label: "Diretrizes", href: "/diretrizes" },
        ],
    },
    {
        title: "Organização",
        items: [
            {icon: Settings, label: "Configurações", href: "/configuracao"},
        ],
    },
]

