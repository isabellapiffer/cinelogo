# 🎬 Cinelogo

Aplicação web para organizar os filmes que você quer assistir. Busque um filme, adicione à sua lista e acompanhe o que ainda falta ver — tudo salvo no navegador, sem precisar criar conta.

**🔗 Acesse:** https://cinelogo.vercel.app

<img width="1888" height="911" alt="Captura de tela 2026-09-09 121131" src="https://github.com/user-attachments/assets/67498bcf-7760-4d54-8a6a-e3f00c63dfe2" />

---

## Sobre o projeto

O Cinelogo nasceu de uma necessidade simples do dia a dia: guardar num lugar só aqueles filmes que a gente descobre e esquece antes de assistir.

A busca consome a API do **TMDB**, então os dados de cartaz, título e sinopse vêm direto de uma base real e atualizada. A lista de cada pessoa fica salva no `localStorage` do navegador — ela continua lá ao fechar e reabrir a página, sem login e sem servidor.

## Funcionalidades

- 🔍 Buscar filmes pela API do TMDB
- ➕ Adicionar filmes à lista pessoal
- 📋 Listar os filmes salvos com cartaz e informações
- 🗑️ Remover filmes da lista
- 💾 Persistência no `localStorage` — a lista sobrevive ao recarregar a página
- 📱 Layout responsivo, funciona no celular

## Tecnologias

| Tecnologia | Para quê |
|---|---|
| **React 19** | Interface em componentes |
| **Vite** | Build e servidor de desenvolvimento |
| **TMDB API** | Base de dados dos filmes |
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
- **Renderização de listas** e atualização imutável de estado
- **Deploy contínuo** — cada push na `main` publica uma nova versão

