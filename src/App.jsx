import "./App.css";
import { Banner } from "./componentes/Banner";
import { CardFilme } from "./componentes/CardFilme";
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
      <div className="conteudo">
        <FormularioDeFilme aoSubmeter={adicionarFilme} />
        <div className="lista-filmes">
          {filmes.map(function (filme) {
            return <CardFilme filme={filme} />;
          })}
        </div>
      </div>
    </main>
  );
}

export default App;
