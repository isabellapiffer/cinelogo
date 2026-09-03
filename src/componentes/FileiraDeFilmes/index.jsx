import { CardFilme } from "../CardFilme";
import { useRef, useState, useEffect } from "react";
import "./fileiradefilme.css";

export function FileiraDeFilmes({ titulo, filmes }) {
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
  }, [filmes]);

  function rolar(direcao) {
    const el = fileiraRef.current;
    const card = el.querySelector(".card");
    if (!card) return;

    const gap = 24; // mesmo valor do gap no .fileira
    const larguraCard = card.offsetWidth + gap;
    const quantosCabem = Math.max(1, Math.floor(el.clientWidth / larguraCard));

    el.scrollBy({
      left: direcao * larguraCard * quantosCabem,
      behavior: "smooth",
    });
  }

  return (
    <section>
      <h2>{titulo}</h2>

      <div className="fileira-container">
        {podeEsquerda && (
          <button className="seta seta-esquerda" onClick={() => rolar(-1)}>
            ‹
          </button>
        )}

        <div className="fileira" ref={fileiraRef} onScroll={atualizarSetas}>
          {filmes.map(function (filme) {
            return <CardFilme filme={filme} key={filme.nome} />;
          })}
        </div>

        {podeDireita && (
          <button className="seta seta-direita" onClick={() => rolar(1)}>
            ›
          </button>
        )}
      </div>
    </section>
  );
}
