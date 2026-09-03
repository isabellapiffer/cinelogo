import "./listasuspensa.css";

export function ListaSuspensa({ children, itens, name, obrigatorio }) {
  return (
    <div className="campo-form">
      <label className="labelFormulario"> {children} </label>
      <select
        className="opcoesFormulario"
        defaultValue=""
        name={name}
        required={obrigatorio}
      >
        <option value="" disabled>
          Selecione uma opção
        </option>
        {itens.map(function (item) {
          return <option key={item}>{item}</option>;
        })}
      </select>
    </div>
  );
}
