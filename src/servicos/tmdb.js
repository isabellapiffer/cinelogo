export async function buscarFilmes(termo, ano) {
  const filtroAno = ano ? `&ano=${ano}` : "";

  const resposta = await fetch(
    `/api/buscar?termo=${encodeURIComponent(termo)}${filtroAno}`
  );

  if (!resposta.ok) return [];

  const dados = await resposta.json();
  return dados.filmes;
}

const GENEROS_TMDB = {
  28: "Ação",
  35: "Comédia",
  27: "Terror",
  10749: "Romance",
  18: "Drama",
  878: "Ficção Científica",
};

export function generoDoFilme(genreIds) {
  for (const id of genreIds || []) {
    if (GENEROS_TMDB[id]) {
      return GENEROS_TMDB[id];
    }
  }
  return "Outros";
}
