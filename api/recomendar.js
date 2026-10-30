export default function handler(req, res) {
  const temChave = Boolean(process.env.GEMINI_API_KEY);

  res.status(200).json({ funcionando: true, temChave });
}
