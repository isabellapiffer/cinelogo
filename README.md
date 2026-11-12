# 🎬 Cinelogo

Aplicação web para organizar os filmes que você quer assistir. Busque um filme, adicione à sua lista e acompanhe o que ainda falta ver — tudo salvo no navegador, sem precisar criar conta. Se não souber o que assistir, peça uma sugestão para a IA.

**🔗 Acesse:** https://cinelogo.vercel.app

<img width="1888" height="911" alt="Captura de tela 2026-09-09 121131" src="https://github.com/user-attachments/assets/67498bcf-7760-4d54-8a6a-e3f00c63dfe2" />

---

## Sobre o projeto

O Cinelogo nasceu de uma necessidade simples do dia a dia: guardar num lugar só aqueles filmes que a gente descobre e esquece antes de assistir.

A busca consome a API do **TMDB**, então os dados de cartaz, título e gênero vêm direto de uma base real e atualizada. A lista de cada pessoa fica salva no `localStorage` do navegador e continua lá ao fechar e reabrir a página, sem login.

O app também tem uma **recomendação com IA**: você descreve o que quer assistir (por exemplo, "comédia leve para ver com a família") e o **Google Gemini** sugere filmes, que aparecem com o cartaz do TMDB e podem ser adicionados à lista.

As chamadas ao TMDB e ao Gemini passam por funções serverless na Vercel (`api/buscar.js` e `api/recomendar.js`). Assim as chaves das APIs ficam só no servidor e não aparecem no navegador.

## Funcionalidades

- 🔍 Buscar filmes pela API do TMDB
- ➕ Adicionar filmes à lista pessoal
- 📋 Listar os filmes salvos com cartaz e informações
- 🗑️ Remover filmes da lista
- 🤖 Pedir sugestões de filmes para a IA (Google Gemini) e adicionar direto à lista
- 💾 Persistência no `localStorage` — a lista sobrevive ao recarregar a página
- 📱 Layout responsivo, funciona no celular

## Tecnologias

| Tecnologia | Para quê |
|---|---|
| **React 19** | Interface em componentes |
| **Vite** | Build e servidor de desenvolvimento |
| **TMDB API** | Base de dados dos filmes |
| **Google Gemini API** | Sugestões de filmes com IA |
| **Vercel Functions** | Funções serverless que chamam o TMDB e o Gemini sem expor as chaves |
| **CSS** | Estilização e layout responsivo |
| **localStorage** | Persistência dos dados no navegador |
| **Vercel** | Deploy |

## Conceitos praticados

Este projeto foi feito para consolidar, na prática, o que eu vinha estudando em React:

- **Componentização e props** — quebrar a interface em peças reaproveitáveis e passar dados entre elas
- **`useState`** — controlar o estado da busca, da lista e dos formulários
- **`useEffect`** — buscar dados na API e sincronizar a lista com o `localStorage`
- **`useRef`** — acessar elementos do DOM diretamente
- **Consumo de API REST** com `fetch` e tratamento de resposta assíncrona
- **Integração com IA**: chamada à API do Gemini pedindo a resposta em JSON (título e ano), depois buscando cada filme no TMDB
- **Funções serverless e variáveis de ambiente**: as chaves do TMDB e do Gemini ficam só no servidor da Vercel
- **Renderização de listas** e atualização imutável de estado
- **Deploy contínuo** — cada push na `main` publica uma nova versão

