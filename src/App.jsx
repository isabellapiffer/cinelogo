import "./App.css";
import { Banner } from "./componentes/Banner";
import { FormularioDeFilme } from "./componentes/FormularioDeFilme";
import { useState, useEffect } from "react";
import { FileiraDeFilmes } from "./componentes/FileiraDeFilmes";
import { RecomendacaoIA } from "./componentes/RecomendacaoIA";

function App() {
  const [filmes, setFilmes] = useState(() => {
    try {
      const salvos = localStorage.getItem("cinelogo:filmes");
      return salvos ? JSON.parse(salvos) : [];
    } catch {
      return [];
    }
  });

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
    const novoFilme = { ...filme, id: crypto.randomUUID() };
    setFilmes([...filmes, novoFilme]);
  }

  function deletarFilme(id) {
    setFilmes(filmes.filter((filme) => filme.id !== id));
  }

  useEffect(() => {
    localStorage.setItem("cinelogo:filmes", JSON.stringify(filmes));
  }, [filmes]);

  return (
    <main>
      <header>
        <h1>CINELOGO</h1>
      </header>
      <Banner />
      <RecomendacaoIA aoAdicionar={adicionarFilme} />
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
                aoDeletar={deletarFilme}
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
