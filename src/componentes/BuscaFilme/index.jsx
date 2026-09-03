import { buscarFilmes } from "../../servicos/tmdb";
import { useState, useEffect, useRef } from "react";
import "./buscafilme.css";

export function BuscaFilme({ aoSelecionar, aoMudarTexto }) {
  const [termo, setTermo] = useState("");
  const [resultados, setResultados] = useState([]);
  const [ignorarBusca, setIgnorarBusca] = useState(false);
  const containerRef = useRef(null);

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

  useEffect(() => {
    function aoClicarFora(evento) {
      if (
        containerRef.current &&
        !containerRef.current.contains(evento.target)
      ) {
        setResultados([]);
      }
    }
    document.addEventListener("mousedown", aoClicarFora);
    return () => document.removeEventListener("mousedown", aoClicarFora);
  }, []);

  function selecionar(filme) {
    aoSelecionar(filme);
    setTermo(filme.title);
    setResultados([]);
    setIgnorarBusca(true);
  }

  return (
    <div className="busca-filme" ref={containerRef}>
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

      {resultados.length > 0 && (
        <ul className="busca-resultados">
          {resultados.map((filme) => (
            <li key={filme.id} onClick={() => selecionar(filme)}>
              <span>
                {filme.title} ({filme.release_date?.slice(0, 4)})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
