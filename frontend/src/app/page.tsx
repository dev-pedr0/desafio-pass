// async function getVeiculos() {
//   const res = await fetch("https://desafio-pass-backend.onrender.com/veiculo/nomes", {
//     cache: "no-store"
//   });
//   return res.json();
// }

"use client";

import { SideMenuSection } from "../components/SideMenuSection";
import { SideMenuTop } from "../components/SideMenuTop";
import { menuSection } from "../data/content";

export default function Home() {
  
  return (
    <div className="bg-card flex h-dvh w-dvw">
      <div className="w-68 flex flex-col items-baseline my-2 mx-4 gap-6">
        <SideMenuTop/>
        {menuSection.map((section, index) => (
          <SideMenuSection key={index} title={section.title} items={section.items}/>
        ))}
      </div>
      <div className="bg-background w-full m-2 rounded-xl">
        bbbbbbb
      </div>
    </div>
  );
}
