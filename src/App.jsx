import "./App.css";
import { Banner } from "./componentes/Banner";
import { FormularioDeFilme } from "./componentes/FormularioDeFilme";
import { useState } from "react";
import { FileiraDeFilmes } from "./componentes/FileiraDeFilmes";
import { buscarFilmes } from "./servicos/tmdb";

function App() {
  const [filmes, setFilmes] = useState([]);

  const generos = [
    "Ação",
    "Besteirol",
    "Comédia",
    "Terror",
    "Romance",
    "Drama",
    "Ficção Científica",
    "Outros",
  ];

  function adicionarFilme(filme) {
    setFilmes([...filmes, filme]);
  }
  console.log(filmes);

  return (
    <main>
      <header>
        <h1>CINELOGO</h1>
      </header>
      <Banner />
      <div className="colunas">
        <FormularioDeFilme aoSubmeter={adicionarFilme} generos={generos} />
        <div className="lista-filmes">
          {generos.map(function (genero) {
            const filmesDoGenero = filmes.filter(function (filme) {
              return filme.genero === genero;
            });

            if (filmesDoGenero.length === 0) {
              return null;
            }

            return (
              <FileiraDeFilmes
                titulo={genero}
                filmes={filmesDoGenero}
                key={genero}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default App;
