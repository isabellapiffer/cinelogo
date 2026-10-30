import { buscarFilmes } from "./tmdb";

export async function recomendarFilmes(pedido) {
  const resposta = await fetch(
    `/api/recomendar?pedido=${encodeURIComponent(pedido)}`
  );
  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.erro);
  }

  const buscas = dados.filmes.map((nome) => buscarFilmes(nome));
  const resultados = await Promise.all(buscas);

  return resultados.map((lista) => lista[0]).filter(Boolean);
}
