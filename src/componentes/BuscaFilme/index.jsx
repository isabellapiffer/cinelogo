import { buscarFilmes } from "../../servicos/tmdb";
import { useState, useEffect } from "react";

export function BuscaFilme({ aoSelecionar, aoMudarTexto }) {
  const [termo, setTermo] = useState("");
  const [resultados, setResultados] = useState([]);

  const [ignorarBusca, setIgnorarBusca] = useState(false);

  useEffect(() => {
    if (ignorarBusca) return;
    if (termo.trim() === "") {
      setResultados([]);
      return;
    }
    const timer = setTimeout(async () => {
      const filmes = await buscarFilmes(termo);
      setResultados(filmes);
    }, 400);
    return () => clearTimeout(timer);
  }, [termo, ignorarBusca]);

  function selecionar(filme) {
    aoSelecionar(filme);
    setTermo(filme.title);
    setResultados([]);
    setIgnorarBusca(true);
  }

  return (
    <div className="busca-filme">
      <label className="labelFormulario">Nome:</label>
      <div className="busca-linha">
        <input
          className="inputDoFormulario"
          value={termo}
          onChange={(e) => {
            setTermo(e.target.value);
            setIgnorarBusca(false);
            aoSelecionar(null);
            aoMudarTexto(e.target.value);
          }}
          placeholder="Ex: Cidade de Deus"
        />
      </div>

      <ul className="busca-resultados">
        {resultados.map((filme) => (
          <li key={filme.id} onClick={() => selecionar(filme)}>
            <span>
              {filme.title} ({filme.release_date?.slice(0, 4)})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
