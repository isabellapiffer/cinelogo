import { buscarFilmes } from "./tmdb";

async function acharFilme({ titulo, ano }) {
  const comAno = await buscarFilmes(titulo, ano);
  if (comAno.length > 0) return comAno[0];

  const semAno = await buscarFilmes(titulo);
  return semAno[0];
}

export async function recomendarFilmes(pedido) {
  const resposta = await fetch(
    `/api/recomendar?pedido=${encodeURIComponent(pedido)}`
  );
  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.erro);
  }

  const resultados = await Promise.all(dados.filmes.map(acharFilme));

  return resultados.filter(Boolean);
}
