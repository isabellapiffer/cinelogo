const BASE_URL = "https://api.themoviedb.org/3";

export default async function handler(req, res) {
  const { termo, ano } = req.query;

  if (!termo) {
    return res.status(400).json({ erro: "Informe o nome do filme." });
  }

  const filtroAno = ano ? `&primary_release_year=${encodeURIComponent(ano)}` : "";
  const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(termo)}&language=pt-BR${filtroAno}`;

  const resposta = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  });

  if (!resposta.ok) {
    console.error("Erro do TMDB:", resposta.status, await resposta.text());
    return res.status(502).json({ erro: "Não consegui buscar o filme." });
  }

  const dados = await resposta.json();
  res.status(200).json({ filmes: dados.results });
}
