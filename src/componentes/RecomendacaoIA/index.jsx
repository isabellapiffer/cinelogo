import { useState } from "react";
import { recomendarFilmes } from "../../servicos/recomendacoes";
import { generoDoFilme } from "../../servicos/tmdb";
import "./recomendacaoia.css";

export function RecomendacaoIA({ aoAdicionar }) {
  const [pedido, setPedido] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function pedirSugestoes() {
    if (pedido.trim() === "") return;

    setCarregando(true);
    setErro("");
    setSugestoes([]);

    try {
      setSugestoes(await recomendarFilmes(pedido));
    } catch {
      setErro("Não consegui buscar sugestões. Tente de novo.");
    } finally {
      setCarregando(false);
    }
  }

  function adicionar(filme) {
    aoAdicionar({
      nome: filme.title,
      poster: filme.poster_path
        ? `https://image.tmdb.org/t/p/w500${filme.poster_path}`
        : "",
      plataforma: "",
      genero: generoDoFilme(filme.genre_ids),
      cias: "",
    });
    setSugestoes(sugestoes.filter((s) => s.id !== filme.id));
  }

  return (
    <section className="recomendacao">
      <h2>Peça uma sugestão à IA</h2>

      <form action={pedirSugestoes}>
        <input
          value={pedido}
          onChange={(e) => setPedido(e.target.value)}
          placeholder="Ex.: comédia leve para ver com a família"
        />
        <button disabled={carregando}>
          {carregando ? "Pensando..." : "Sugerir"}
        </button>
      </form>

      {erro && <p className="recomendacao-erro">{erro}</p>}

      <div className="fileira">
        {sugestoes.map((filme) => (
          <div className="sugestao" key={filme.id}>
            {filme.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${filme.poster_path}`}
                alt={filme.title}
              />
            )}
            <h3>{filme.title}</h3>
            <button onClick={() => adicionar(filme)}>Adicionar</button>
          </div>
        ))}
      </div>
    </section>
  );
}
