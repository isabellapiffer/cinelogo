import "./cardfilme.css";
import acao from "../../assets/generos/acao.jpg";
import besteirol from "../../assets/generos/besteirol.jpg";
import comedia from "../../assets/generos/comedia.jpg";
import terror from "../../assets/generos/terror.jpg";
import romance from "../../assets/generos/romance.jpg";
import drama from "../../assets/generos/drama.jpg";
import ficcao from "../../assets/generos/ficcao.jpg";
import outros from "../../assets/generos/outros.jpg";

export function CardFilme({ filme, aoDeletar }) {
  const postersPorGenero = {
    Ação: acao,
    Besteirol: besteirol,
    Comédia: comedia,
    Terror: terror,
    Romance: romance,
    Drama: drama,
    "Ficção Científica": ficcao,
    Outros: outros,
  };
  const imagemDoCard = filme.poster || postersPorGenero[filme.genero] || outros;

  return (
    <div className="card">
      <button className="btn-deletar" onClick={() => aoDeletar(filme.id)}>
        X
      </button>
      <img
        src={imagemDoCard}
        alt={filme.nome}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = postersPorGenero[filme.genero] || outros;
        }}
      />

      <div className="conteudo">
        {filme.plataforma && <p className="tag">{filme.plataforma}</p>}
        <p className="cia"> {filme.cias} </p>
        <h3 className="titulo">{filme.nome}</h3>
      </div>
    </div>
  );
}
