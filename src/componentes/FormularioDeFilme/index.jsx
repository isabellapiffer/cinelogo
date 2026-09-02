import { BotaoEnviar } from "../Botao";
import "./formulariodefilme.css";
import { CampoDeEntrada } from "../CampoDeEntrada";
import { ListaSuspensa } from "../ListaSuspensa";

export function FormularioDeFilme({ aoSubmeter }) {
  const plataformas = [
    "Netflix",
    "Prime Video",
    "Disney+",
    "AdoroCinema",
    "Outros",
  ];

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

  const cias = ["Família", "Amigos", "Namorado"];

  function aoFormSubmetido(formData) {
    const filme = {
      nome: formData.get("nome"),
      poster: formData.get("poster"),
      plataforma: formData.get("plataforma"),
      genero: formData.get("genero"),
      cias: formData.get("cia"),
    };
    aoSubmeter(filme);
  }
  return (
    <form className="formulario" action={aoFormSubmetido}>
      <h2>Adicione um filme à sua lista</h2>
      <div className="campo">
        <CampoDeEntrada name="nome" placeholder="Digite o nome">
          Nome:
        </CampoDeEntrada>
        <CampoDeEntrada name="poster" placeholder="https://....">
          Pôster(url):
        </CampoDeEntrada>
        <ListaSuspensa name="plataforma" itens={plataformas}>
          Plataforma:
        </ListaSuspensa>
        <ListaSuspensa name="genero" itens={generos}>
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
