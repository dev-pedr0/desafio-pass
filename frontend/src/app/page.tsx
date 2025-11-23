"use client";

import { CardTop } from "../components/CardTop";
import { SideMenuSection } from "../components/SideMenu/SideMenuSection";
import { SideMenuTop } from "../components/SideMenu/SideMenuTop";
import { VehicleTable } from "../components/VehicleTable";
import { useSidebar } from "../context/SideBarContext";
import { menuSection } from "../data/content";

export default function Home() {
  const { isCollapsed } = useSidebar();
  
  return (
    <div className="bg-card flex h-dvh w-dvw">
      <div
        className={`
          hidden lg:flex flex-col my-2 mx-2 transition-all duration-300 ease-in-out
          ${isCollapsed ? "w-10" : "w-68"} ${isCollapsed ? "gap-3" : "gap-8"}
        `}
      >
        <SideMenuTop/>
        {menuSection.map((section, index) => (
          <SideMenuSection key={index} title={section.title} items={section.items}/>
        ))}
      </div>
      <div className="bg-background m-2 rounded-xl w-full max-w-full overflow-x-hidden">
        <CardTop/>
        <div className="p-6">
          <VehicleTable/>
        </div>
      </div>
    </div>
  );
}
