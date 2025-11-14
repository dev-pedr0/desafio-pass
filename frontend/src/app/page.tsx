async function getVeiculos() {
  const res = await fetch("http://localhost:3001/veiculo/nomes", {
    cache: "no-store"
  });

  return res.json();
}

export default async function Home() {
  const veiculos = await getVeiculos();
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1>Lista de Veículos</h1>
      <ul>
        {veiculos.map((v: any, index: number) => (
          <li key={index}>{v.modelo}</li>
        ))}
      </ul>
    </div>
  );
}
