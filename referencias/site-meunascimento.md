# Referência de design — meunascimento.com.br

Anotações do que foi observado no site, pra usar como inspiração em projetos futuros de portfólio.

## Estrutura e layout

- Landing page com navegação horizontal simples no topo (logo + menu).
- Seções: Hero, funcionalidades, galeria de templates, depoimentos, institucional, FAQ.
- Footer com links institucionais, redes sociais e selos de segurança.

## Visual

- **Paleta reduzida e coerente**: roxo/lilás (#8B8EE8) + branco, repetido em todo componente — não só em botões.
- **Ilustrações temáticas em SVG**: elementos gráficos animados relacionados ao tema (nesse caso, bebês), no lugar de fotos genéricas. Dá personalidade sem depender de banco de imagens.

## Recursos técnicos

- Imagens otimizadas em WebP e SVG inline (base64).
- Integração de pagamento com certificação PCI-DSS (Pagar.me).
- Textos `alt` descritivos nas imagens.
- Carrossel interativo na galeria de templates.

## Estratégias de conversão

- **CTA repetido**: o botão principal ("Criar minha lista de presentes!") aparece várias vezes ao longo da página, não só uma.
- **Prova social**: depoimentos com avatar, nome e verificação (Instagram) — contexto real, não só elogio genérico.
- **Selos de confiança** no rodapé (Google, Pagar.me, SSL, AWS).

## O que aplicar em projetos futuros

1. Definir 2-3 cores fixas e reaproveitar em todo componente, não improvisar cor por cor.
2. Usar ilustrações/SVG temáticos ao invés de imagens de banco (ex.: claquete, pipoca, rolo de filme pra um app de filmes).
3. Repetir o botão de ação principal em pontos estratégicos da página.
4. Se o projeto tiver "prova social" (depoimentos, casos de uso), dar contexto real em vez de texto genérico.
5. Cuidar da otimização de imagem (WebP, SVG inline) — detalhe que mostra atenção a performance.
