import "./App.css";
import { Banner } from "./componentes/Banner";
import { FormularioDeFilme } from "./componentes/FormularioDeFilme";
import { useState } from "react";

function App() {
  const [filmes, setFilmes] = useState([]);

  function adicionarFilme(filme) {
    setFilmes([...filmes, filme]);
  }
  console.log(filmes);

  return (
    <main>
      <header>
        <h1>CINELOG</h1>
      </header>
      <Banner />
      <FormularioDeFilme aoSubmeter={adicionarFilme} />
    </main>
  );
}

export default App;
