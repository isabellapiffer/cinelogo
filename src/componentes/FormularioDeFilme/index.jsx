import { BotaoEnviar } from "../Botao";
import "./formulariodefilme.css";
import { CampoDeEntrada } from "../CampoDeEntrada";
import { ListaSuspensa } from "../ListaSuspensa";
import { BuscaFilme } from "../BuscaFilme";
import { useState } from "react";

export function FormularioDeFilme({ aoSubmeter, generos }) {
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

  function aoFormSubmetido(formData) {
    const nome = filmeSelecionado ? filmeSelecionado.title : texto.trim();
    if (nome === "") return;

    const poster = filmeSelecionado
      ? `https://image.tmdb.org/t/p/w500${filmeSelecionado.poster_path}`
      : "";

    const filme = {
      nome,
      poster,
      plataforma: formData.get("plataforma"),
      genero: formData.get("genero"),
      cias: formData.get("cia"),
    };
    aoSubmeter(filme);
  }

  return (
    <form className="formulario" action={aoFormSubmetido}>
      <h2>Adicione um filme à sua lista</h2>

      <BuscaFilme aoSelecionar={setFilmeSelecionado} aoMudarTexto={setTexto} />

      <div className="campo">
        <ListaSuspensa name="plataforma" itens={plataformas}>
          Plataforma:
        </ListaSuspensa>
        <ListaSuspensa name="genero" itens={generos} obrigatorio>
          Gênero:
        </ListaSuspensa>
        <ListaSuspensa name="cia" itens={cias}>
          Assistir com:
        </ListaSuspensa>
      </div>
      <BotaoEnviar> Cadastrar </BotaoEnviar>
    </form>
  );
}
