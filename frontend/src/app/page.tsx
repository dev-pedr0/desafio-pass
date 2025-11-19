// async function getVeiculos() {
//   const res = await fetch("https://desafio-pass-backend.onrender.com/veiculo/nomes", {
//     cache: "no-store"
//   });
//   return res.json();
// }

"use client";

import { CardTop } from "../components/CardTop";
import { SideMenuSection } from "../components/SideMenuSection";
import { SideMenuTop } from "../components/SideMenuTop";
import { VehicleTable } from "../components/VehicleTable";
import { menuSection } from "../data/content";

export default function Home() {
  
  return (
    <div className="bg-card flex h-dvh w-dvw">
      <div className="w-68 flex flex-col items-baseline my-2 mx-2 gap-5">
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
