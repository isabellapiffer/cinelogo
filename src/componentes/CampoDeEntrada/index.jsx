import "./campodeentrada.css";

export function CampoDeEntrada({
  children,
  type = "text",
  placeholder,
  name,
  obrigatorio,
}) {
  return (
    <div className="campo-form">
      <label className="labelFormulario"> {children} </label>
      <input
        type={type}
        className="inputDoFormulario"
        placeholder={placeholder}
        name={name}
        required={obrigatorio}
      />
    </div>
  );
}
