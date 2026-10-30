const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

export async function buscarFilmes(termo, ano) {
  const filtroAno = ano ? `&primary_release_year=${ano}` : "";
  const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(termo)}&language=pt-BR${filtroAno}`;

  const resposta = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!resposta.ok) return [];

  const dados = await resposta.json();
  return dados.results;
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
