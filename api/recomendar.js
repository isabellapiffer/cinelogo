const URL_GEMINI =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent";

function montarInstrucoes() {
  const anoAtual = new Date().getFullYear();

  return `Você recomenda filmes reais. Sugira 5 filmes que atendam a tudo o que a pessoa pediu.

Interprete o pedido assim:
- O gênero pedido é obrigatório. "Comédia romântica" são só comédias românticas, e "ação" são só filmes de ação.
- "Algo engraçado" significa comédia.
- "Algo para relaxar" significa um filme tranquilo e leve.
- "Filme novo" ou "recente" significa lançado entre ${anoAtual - 2} e ${anoAtual}, ou o mais perto disso que você conhecer.
- "Para adultos" significa classificação indicativa de 16 anos ou mais.
- "Para ver com criança" significa classificação livre.
- "Com criança acima de 12 anos" significa classificação livre até 12 anos.

Para cada filme, responda com o título original e o ano de lançamento.`;
}

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
        systemInstruction: { parts: [{ text: montarInstrucoes() }] },
        contents: [{ parts: [{ text: pedido }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                titulo: { type: "STRING" },
                ano: { type: "INTEGER" },
              },
              required: ["titulo", "ano"],
            },
          },
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
