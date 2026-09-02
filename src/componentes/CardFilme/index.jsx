import "./cardfilme.css";

export function CardFilme({ filme }) {
  return (
    <div className="card">
      <img src={filme.poster} alt={filme.nome} />

      <div className="conteudo">
        <p className="tag"> {filme.plataforma} </p>
        <p className="cia"> {filme.cias} </p>
        <h3 className="titulo">{filme.nome}</h3>
      </div>
    </div>
  );
}
