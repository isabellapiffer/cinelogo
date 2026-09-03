const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

export async function buscarFilmes(termo) {
  const url = `${BASE_URL}/search/movie?query=${termo}&language=pt-BR`;

  const resposta = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  const dados = await resposta.json();
  return dados.results;
}
