"use client";

import { LucideIcon } from "lucide-react";
import {
  PanelsLeftBottom,
  Activity,
  BusFront,
  Package,
  BedDouble,
  Ticket,
  Camera,
  Star,
  Map,
  DollarSign,
  CalendarDays,
  Puzzle,
  MapPin,
  FileText,
  Settings,
  Building2,
  Funnel,
} from "lucide-react";

// Importa os tipos de chave de tradução que criamos
import { TranslationKey } from "@/src/lib/i18n";

// ==================== TIPOS AUXILIARES ====================
type MenuItem = {
  icon: LucideIcon;
  label: TranslationKey; // Agora só aceita labels que têm tradução!
  href: string;
};

type MenuGroup = {
  title: TranslationKey; // Títulos dos grupos também traduzidos
  items: MenuItem[];
};

type Company = {
  icon: LucideIcon;
  name: TranslationKey; // Só aceita "Pass" | "Allinsys" | "Google" (ou qualquer outra que tenha no translations)
};

type TableButton = {
  icon: LucideIcon;
  label: TranslationKey;
};

type CardMenuItem = {
  name: TranslationKey;
};

// ==================== DADOS ====================
export const menuSection: MenuGroup[] = [
  {
    title: "Principal",
    items: [
      { icon: PanelsLeftBottom, label: "Painel", href: "/painel" },
      { icon: Activity, label: "Atividade", href: "/atividade" },
    ],
  },
  {
    title: "Serviços",
    items: [
      { icon: BusFront, label: "Transfer", href: "/" },
      { icon: Package, label: "Combo", href: "/combo" },
      { icon: BedDouble, label: "Hospedagem", href: "/hospedagem" },
      { icon: Ticket, label: "Ingresso", href: "/ingresso" },
      { icon: Camera, label: "Passeio", href: "/passeio" },
      { icon: Star, label: "Experiência", href: "/experiencia" },
      { icon: Map, label: "Circuito", href: "/circuito" },
    ],
  },
  {
    title: "Comercial",
    items: [
      { icon: DollarSign, label: "Tarifário", href: "/tarifario" },
      { icon: CalendarDays, label: "Disponibilidade", href: "/disponibilidade" },
    ],
  },
  {
    title: "Complementos",
    items: [
      { icon: Puzzle, label: "Slots", href: "/slots" },
      { icon: MapPin, label: "Perímetros", href: "/perimetros" },
      { icon: FileText, label: "Diretrizes", href: "/diretrizes" },
    ],
  },
  {
    title: "Organização",
    items: [
      { icon: Settings, label: "Configurações", href: "/configuracao" },
    ],
  },
];

export const companySection: Company[] = [
  {
    icon: Building2,
    name: "Pass",
  },
  {
    icon: Building2,
    name: "Allinsys",
  },
  {
    icon: Building2,
    name: "Google",
  },
];

export const passApss = [
  { image: "images/workspace.webp", name: "Workspace" },
  { image: "images/transfer.webp", name: "Transfer" },
  { image: "images/marketplace.webp", name: "Marketplace" },
  { image: "images/flow.webp", name: "Flow" },
  { image: "images/balance.webp", name: "Balance" },
  { image: "images/office.webp", name: "Office" },
  { image: "images/channel.webp", name: "Channel" },
  { image: "images/connect.webp", name: "Connect" },
];

export const tableButtons: TableButton[] = [
  { icon: Funnel, label: "Modo" },
  { icon: Funnel, label: "Status" },
];

export const cardMenu: CardMenuItem[] = [
  { name: "Atualizar" },
  { name: "Exportar" },
  { name: "Adicionar" },
];