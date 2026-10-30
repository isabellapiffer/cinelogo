import { BotaoEnviar } from "../Botao";
import "./formulariodefilme.css";
import { ListaSuspensa } from "../ListaSuspensa";
import { BuscaFilme } from "../BuscaFilme";
import { useState } from "react";
import { generoDoFilme } from "../../servicos/tmdb";

export function FormularioDeFilme({
  aoSubmeter,
  generos,
  aberto,
  aoAlternar,
}) {
  const plataformas = [
    "Netflix",
    "Prime Video",
    "Disney+",
    "AdoroCinema",
    "Outros",
  ];

  const cias = ["Família", "Amigos", "Namorado"];
  const [filmeSelecionado, setFilmeSelecionado] = useState(null);
  const [texto, setTexto] = useState("");

  const [plataforma, setPlataforma] = useState("");
  const [genero, setGenero] = useState("");
  const [cia, setCia] = useState("");
  const [resetKey, setResetKey] = useState(0);

  function aoSelecionarFilme(filme) {
    setFilmeSelecionado(filme);
    if (filme) {
      setGenero(generoDoFilme(filme.genre_ids));
    }
  }

  function aoFormSubmetido(formData) {
    const nome = filmeSelecionado ? filmeSelecionado.title : texto.trim();
    if (nome === "") return;

    const poster = filmeSelecionado?.poster_path
      ? `https://image.tmdb.org/t/p/w500${filmeSelecionado.poster_path}`
      : "";

    const filme = {
      nome,
      poster,
      plataforma: plataforma,
      genero: genero,
      cias: cia,
    };
    aoSubmeter(filme);

    setFilmeSelecionado(null);
    setTexto("");
    setPlataforma("");
    setGenero("");
    setCia("");

    setResetKey(resetKey + 1);
  }

  return (
    <form
      className={`formulario ${aberto ? "" : "formulario-recolhido"}`}
      action={aoFormSubmetido}
    >
      <button
        type="button"
        className="formulario-abrir"
        aria-expanded={aberto}
        onClick={aoAlternar}
      >
        Adicione um filme à sua lista {aberto ? "▴" : "▾"}
      </button>

      <h2>Adicione um filme à sua lista</h2>

      <div className="campo">
        <BuscaFilme
          aoSelecionar={aoSelecionarFilme}
          aoMudarTexto={setTexto}
          key={resetKey}
        />
        <ListaSuspensa
          name="plataforma"
          itens={plataformas}
          valor={plataforma}
          aoMudar={(e) => setPlataforma(e.target.value)}
        >
          Plataforma:
        </ListaSuspensa>
        <ListaSuspensa
          name="genero"
          itens={generos}
          obrigatorio
          valor={genero}
          aoMudar={(e) => setGenero(e.target.value)}
        >
          Gênero:
        </ListaSuspensa>
        <ListaSuspensa
          name="cia"
          itens={cias}
          valor={cia}
          aoMudar={(e) => setCia(e.target.value)}
        >
          Assistir com:
        </ListaSuspensa>
      </div>
      <BotaoEnviar> Cadastrar </BotaoEnviar>
    </form>
  );
}
