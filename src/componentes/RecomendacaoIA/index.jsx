import { useEffect, useRef, useState } from "react";
import { recomendarFilmes } from "../../servicos/recomendacoes";
import { generoDoFilme } from "../../servicos/tmdb";
import "./recomendacaoia.css";

export function RecomendacaoIA({ aoAdicionar }) {
  const [aberto, setAberto] = useState(false);
  const [pedido, setPedido] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const fileiraRef = useRef(null);
  const [podeEsquerda, setPodeEsquerda] = useState(false);
  const [podeDireita, setPodeDireita] = useState(false);

  function atualizarSetas() {
    const el = fileiraRef.current;
    if (!el) return;
    setPodeEsquerda(el.scrollLeft > 0);
    setPodeDireita(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }

  useEffect(() => {
    atualizarSetas();
    window.addEventListener("resize", atualizarSetas);
    return () => window.removeEventListener("resize", atualizarSetas);
  }, [sugestoes, aberto]);

  function rolar(direcao) {
    const el = fileiraRef.current;
    const sugestao = el.querySelector(".sugestao");
    if (!sugestao) return;

    const gap = 14; // mesmo valor do gap no .recomendacao .fileira
    const larguraSugestao = sugestao.offsetWidth + gap;
    const quantosCabem = Math.max(
      1,
      Math.floor(el.clientWidth / larguraSugestao)
    );

    el.scrollBy({
      left: direcao * larguraSugestao * quantosCabem,
      behavior: "smooth",
    });
  }

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
    <>
      {aberto && (
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

          <div className="fileira-container">
            {podeEsquerda && (
              <button className="seta seta-esquerda" onClick={() => rolar(-1)}>
                ‹
              </button>
            )}

            <div className="fileira" ref={fileiraRef} onScroll={atualizarSetas}>
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

            {podeDireita && (
              <button className="seta seta-direita" onClick={() => rolar(1)}>
                ›
              </button>
            )}
          </div>
        </section>
      )}

      <button
        className="botao-ia"
        aria-label={aberto ? "Fechar sugestões da IA" : "Abrir sugestões da IA"}
        onClick={() => setAberto(!aberto)}
      >
        {aberto ? "×" : "IA"}
      </button>
    </>
  );
}
