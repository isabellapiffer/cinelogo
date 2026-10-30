const URL_GEMINI =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent";

export default async function handler(req, res) {
  const { pedido } = req.query;

  if (!pedido) {
    return res.status(400).json({ erro: "Descreva o que você quer assistir." });
  }

  try {
    const resposta = await fetch(URL_GEMINI, {
      method: "POST",
      signal: AbortSignal.timeout(25000),
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: `Sugira 5 filmes para este pedido: ${pedido}` }] },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: { type: "ARRAY", items: { type: "STRING" } },
        },
      }),
    });

    if (!resposta.ok) {
      console.error("Erro do Gemini:", resposta.status, await resposta.text());
      return res
        .status(502)
        .json({ erro: "A IA não respondeu. Tente de novo." });
    }

    const dados = await resposta.json();
    const texto = dados.candidates[0].content.parts[0].text;

    res.status(200).json({ filmes: JSON.parse(texto) });
  } catch (erro) {
    console.error("Falha ao chamar o Gemini:", erro);
    res.status(502).json({ erro: "A IA não respondeu. Tente de novo." });
  }
}
