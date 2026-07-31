# Documentação do myGlossary

## 1. Visão geral

O **myGlossary** é um glossário web público criado para organizar e apresentar termos técnicos de maneira simples, pesquisável e contextualizada.

Cada termo pode conter:

* nome principal;
* variações do nome;
* descrição curta;
* descrição completa;
* analogia(s) opcional(is);
* categoria;
* subcategoria;
* termos relacionados.

O projeto foi desenvolvido como uma aplicação full-stack de portfólio, com atenção à organização do código, responsividade, acessibilidade, segurança do banco de dados e facilidade de manutenção.

O MVP está funcionalmente concluído na versão `v1.0.0`.

---

## 2. Objetivos do projeto

Os principais objetivos do myGlossary são:

* facilitar a consulta rápida de conceitos técnicos;
* apresentar explicações mais acessíveis do que definições excessivamente formais;
* permitir a navegação entre conceitos relacionados;
* organizar termos por categorias e subcategorias;
* servir como ferramenta pessoal de referência;
* demonstrar a construção de uma aplicação web;
* permitir expansão gradual para centenas de termos, de áreas diversas.

---

## 3. Escopo do MVP

O MVP oferece:

* catálogo público de termos;
* pesquisa por nome;
* filtros múltiplos de categorias;
* filtros múltiplos de subcategorias;
* filtros conectados entre categoria e subcategoria;
* paginação;
* cards responsivos;
* páginas individuais para cada termo;
* termos relacionados;
* estados de carregamento;
* estados de erro;
* página de termo não encontrado;
* leitura pública dos dados;
* gerenciamento dos dados diretamente pelo Supabase.

Não existe, no MVP:

* login;
* painel administrativo próprio;
* criação ou edição de termos pelo site;
* contas de usuários;
* comentários;
* favoritos;
* formulário público de sugestões;
* tema claro;
* suporte a múltiplos idiomas.

---

## 4. Stack tecnológica

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* App Router

### Backend e banco de dados

* Supabase
* PostgreSQL
* Supabase Data API
* Row Level Security

### Infraestrutura

* Git
* GitHub
* Vercel
* Variáveis de ambiente

### Qualidade e desenvolvimento

* ESLint
* Build de produção do Next.js
* Conventional Commits
* Migrations SQL versionadas

---

## 5. Arquitetura geral

A aplicação utiliza uma arquitetura baseada no App Router do Next.js.

A página principal é responsável por carregar os dados resumidos do catálogo no servidor e enviá-los para o componente interativo.

```text
Supabase
   ↓
Server Component
   ↓
GlossaryCatalog
   ↓
Pesquisa, filtros e paginação
```

As páginas individuais recebem o `slug` da URL e buscam somente:

* o termo solicitado;
* sua subcategoria;
* sua categoria;
* suas relações;
* os termos relacionados.

```text
/terms/api
   ↓
slug: api
   ↓
Consulta do termo
   ↓
Consulta das relações
   ↓
Consulta dos relacionados
```

Os dados são carregados no servidor. Apenas os componentes que precisam de estado, eventos ou interação utilizam Client Components.

---

## 6. Estrutura principal do projeto

```text
src/
├── app/
│   ├── terms/
│   │   └── [slug]/
│   │       ├── page.tsx
│   │       ├── loading.tsx
│   │       ├── error.tsx
│   │       └── not-found.tsx
│   ├── error.tsx
│   ├── loading.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── glossary/
│   ├── layout/
│   └── terms/
├── config/
├── lib/
│   └── supabase/
└── types/

supabase/
└── migrations/

docs/
└── DOCUMENTATION.md
```

---

## 7. Modelo de dados

O banco possui quatro tabelas principais.

### `categories`

Representa as categorias principais do glossário.

Campos principais:

* `id`;
* `name`;
* `slug`;
* `color`.

A cor é armazenada como um valor hexadecimal e utilizada dinamicamente nos cards e páginas dos termos.

### `subcategories`

Representa uma subdivisão de uma categoria.

Campos principais:

* `id`;
* `category_id`;
* `name`;
* `slug`.

Cada subcategoria pertence obrigatoriamente a uma categoria.

### `terms`

Armazena os termos do glossário.

Campos principais:

* `id`;
* `subcategory_id`;
* `name`;
* `slug`;
* `name_variations`;
* `short_description`;
* `full_description`;
* `analogy`.

Cada termo pertence obrigatoriamente a uma subcategoria. A categoria é determinada por meio da subcategoria.

### `term_relations`

Armazena relações entre dois termos.

Campos principais:

* `term_a_id`;
* `term_b_id`.

A relação é interpretada como bidirecional, mesmo sendo armazenada apenas uma vez.

```text
API ↔ Endpoint
```

---

## 8. Regras de negócio

### 8.1 Categorias

* Toda categoria deve possuir nome.
* Toda categoria deve possuir `slug`.
* Toda categoria deve possuir uma cor hexadecimal válida.
* O nome da categoria não pode estar vazio.
* O `slug` da categoria deve ser único.
* O nome da categoria não pode se repetir, desconsiderando maiúsculas e espaços nas extremidades.

### 8.2 Subcategorias

* Toda subcategoria deve pertencer a uma categoria.
* O nome da subcategoria é obrigatório.
* O `slug` da subcategoria é obrigatório.
* O nome não pode estar vazio.
* O `slug` deve seguir um formato compatível com URLs.
* O nome deve ser único dentro da categoria.
* O `slug` deve ser único dentro da categoria.
* Uma categoria não pode ser excluída enquanto possuir subcategorias associadas.

### 8.3 Termos

* Todo termo deve pertencer a uma subcategoria.
* Todo termo deve possuir nome.
* Todo termo deve possuir `slug`.
* Todo termo deve possuir descrição curta.
* Todo termo deve possuir descrição completa.
* A analogia é opcional.
* As variações do nome são armazenadas em uma lista ordenada.
* O nome do termo deve ser único dentro da subcategoria.
* O mesmo nome pode existir em outra subcategoria.
* O `slug` do termo deve ser único em todo o glossário.
* Um termo sem analogia deve armazenar `null`, e não uma string vazia.
* Um termo sem variações deve armazenar uma lista vazia.

### 8.4 Relações entre termos

* Relacionamentos são opcionais.
* Um termo não pode ser relacionado a ele mesmo.
* Uma relação deve ser armazenada apenas uma vez.
* Relações invertidas duplicadas não são permitidas.

As relações abaixo representam o mesmo vínculo:

```text
API → Endpoint
Endpoint → API
```

Portanto, apenas uma delas deve existir no banco.

A aplicação interpreta a relação nos dois sentidos.

### 8.5 Pesquisa

A pesquisa do MVP considera apenas o nome principal do termo.

Ela:

* atualiza os resultados durante a digitação;
* ignora maiúsculas e minúsculas;
* ignora acentos;
* ignora espaços no começo e no final.

Exemplo:

```text
Pesquisa: variavel
Resultado: Variável
```

As variações, descrições e analogias não participam da pesquisa no MVP.

### 8.6 Filtros

* Categorias permitem múltipla seleção.
* Subcategorias permitem múltipla seleção.
* Quando nenhuma categoria está selecionada, todas as subcategorias ficam disponíveis.
* Quando categorias são selecionadas, apenas suas subcategorias ficam disponíveis.
* Ao remover uma categoria, suas subcategorias selecionadas também são removidas.
* Filtros selecionados aparecem como tags removíveis.
* Existe uma ação para limpar pesquisa e filtros.
* Alterar pesquisa ou filtros retorna a paginação para a primeira página.

### 8.7 Paginação

* O catálogo exibe até 20 termos por página.
* Os termos são ordenados alfabeticamente.
* A paginação possui botões de página anterior e próxima.
* Os botões ficam desabilitados quando a ação não é possível.
* Páginas intermediárias podem ser representadas por reticências.
* A quantidade de resultados e a página atual são informadas ao usuário.

### 8.8 Cards

Cada card exibe:

* nome do termo;
* descrição curta;
* categoria;
* subcategoria.

O card inteiro é clicável.

A descrição curta possui limite visual para manter os cards com alturas consistentes.

O card utiliza a cor da categoria em:

* hover;
* borda;
* sombra;
* tag da categoria;
* tag da subcategoria.

O título do termo utiliza a cor neutra da interface, e não a cor da categoria.

### 8.9 Página individual

Cada página individual apresenta:

* breadcrumb;
* nome do termo;
* variações do nome;
* descrição completa;
* analogia, quando existente;
* categoria;
* subcategoria;
* termos relacionados.

Se o termo não possuir analogia, a seção não aparece.

Se não possuir termos relacionados, a seção de relacionados não aparece.

Se o `slug` não existir, a página de termo não encontrado é exibida.

### 8.10 Segurança

O público pode apenas consultar os dados.

```text
SELECT: permitido
INSERT: bloqueado
UPDATE: bloqueado
DELETE: bloqueado
```

As tabelas utilizam:

* permissões do PostgreSQL;
* Row Level Security;
* políticas públicas somente de leitura.

A chave pública do Supabase pode ser utilizada pela aplicação, mas não concede permissão de escrita.

Chaves privadas, como `service_role`, não devem ser incluídas no frontend ou no repositório.

---

## 9. Sistema visual

A aplicação utiliza tema escuro.

As cores estruturais da interface estão centralizadas em variáveis CSS dentro de:

```text
src/app/globals.css
```

Entre os tokens utilizados estão:

* cor de fundo;
* cor das superfícies;
* cor das bordas;
* textos primários;
* textos secundários;
* textos suaves;
* cor principal de acento;
* variações transparentes do acento;
* brilho da cor de acento.

A cor principal da interface é:

```text
#c11956
```

As cores das categorias não fazem parte do tema global. Elas permanecem armazenadas no banco e são aplicadas dinamicamente.

O menu global apresenta:

```text
● myGlossary BETA
```

O rodapé apresenta uma bolinha da cor de acento antes da versão.

---

## 10. Estados da aplicação

### Carregamento

A aplicação utiliza skeletons que representam aproximadamente o formato do conteúdo final.

Existem estados de carregamento específicos para:

* catálogo;
* página individual.

### Erro

Erros de consulta ou renderização exibem uma mensagem amigável e um botão para tentar novamente.

A aplicação não utiliza mais dados simulados como fallback silencioso.

### Nenhum resultado

Quando uma pesquisa ou combinação de filtros não encontra termos, a aplicação informa que nenhum termo foi encontrado e oferece uma ação para limpar os filtros.

### Termo inexistente

Quando o banco é carregado corretamente, mas nenhum termo possui o `slug` solicitado, a página de termo não encontrado é exibida.

---

## 11. Consultas e desempenho

A consulta do catálogo busca apenas os campos necessários para os cards:

* identificador;
* nome;
* `slug`;
* descrição curta;
* subcategoria;
* categoria.

Ela não carrega:

* descrição completa;
* analogia;
* variações;
* relações.

A página individual busca somente:

* o termo correspondente ao `slug`;
* sua categoria;
* sua subcategoria;
* relações que envolvem o termo;
* dados resumidos dos termos relacionados.

A aplicação não carrega o glossário completo para abrir uma página individual.

Uma estratégia de cache mais complexa foi testada, mas removida porque prejudicou a experiência durante o desenvolvimento. Ela poderá ser reconsiderada depois do deploy, com base em medições reais.

---

## 12. Versionamento e Git

O projeto utiliza Conventional Commits.

Exemplos:

```text
feat: add glossary pagination
fix: revert glossary cache configuration
perf: optimize term detail data loading
refactor: centralize application color tokens
docs: add project readme
chore: configure Supabase environment
```

Durante o MVP, o desenvolvimento foi mantido diretamente na branch `main`.

Branches específicas poderão ser utilizadas depois da primeira versão pública.

---

# 13. Roadmap do projeto

## Fase 1 — Planejamento e modelagem ✅

- [x] definição do objetivo do glossário;
- [x] definição do público e do escopo inicial;
- [x] definição das informações de cada termo;
- [x] escolha entre página única e páginas individuais;
- [x] definição das relações entre categorias, subcategorias e termos;
- [x] definição das regras de pesquisa;
- [x] definição dos filtros;
- [x] definição da paginação;
- [x] definição do comportamento dos cards;
- [x] definição da página individual;
- [x] definição dos estados de erro e carregamento;
- [x] definição do rodapé;
- [x] escolha da stack.

---

## Fase 2 — Inicialização do projeto ✅

- [x] criação do projeto Next.js;
- [x] configuração do TypeScript;
- [x] configuração do App Router;
- [x] configuração do Tailwind CSS;
- [x] inicialização do Git;
- [x] criação do repositório no GitHub;
- [x] definição do fluxo de commits;
- [x] criação dos primeiros tipos do domínio;
- [x] criação dos dados simulados iniciais.

---

## Fase 3 — Interface inicial ✅

- [x] criação do card dos termos;
- [x] criação do grid responsivo;
- [x] criação da página individual;
- [x] criação dos cards de termos relacionados;
- [x] criação do breadcrumb;
- [x] criação da página de termo inexistente;
- [x] criação da pesquisa;
- [x] criação dos filtros de categoria e subcategoria;
- [x] criação das tags de filtros selecionados;
- [x] criação do estado de nenhum resultado;
- [x] criação da paginação;
- [x] criação do rodapé;
- [x] criação do menu global;
- [x] criação do selo visual BETA;
- [x] aplicação da identidade visual escura;
- [x] centralização das cores do tema.

---

## Fase 4 — Banco de dados ✅

- [x] criação do projeto no Supabase;
- [x] configuração das variáveis de ambiente;
- [x] criação do cliente do Supabase;
- [x] criação das tabelas;
- [x] criação das chaves estrangeiras;
- [x] criação das restrições de integridade;
- [x] criação dos índices;
- [x] configuração do Row Level Security;
- [x] criação das políticas públicas de leitura;
- [x] criação da carga inicial de dados;
- [x] versionamento das migrations;
- [x] validação dos relacionamentos;
- [x] integração da página principal com o banco;
- [x] integração da página individual com o banco;
- [x] remoção dos mocks.

---

## Fase 5 — Estados e otimizações ✅

- [x] criação do skeleton do catálogo;
- [x] criação do skeleton da página individual;
- [x] criação do estado de erro do catálogo;
- [x] criação do estado de erro da página individual;
- [x] criação da ação de tentar novamente;
- [x] separação entre erro e termo inexistente;
- [x] otimização da consulta do catálogo;
- [x] otimização da consulta da página individual;
- [x] remoção do carregamento desnecessário do glossário completo;
- [x] teste e remoção de uma estratégia de cache que piorou a experiência.

---

## Fase 6 — Documentação e preparação da release ⏳

- [x] criação de um README;
- [x] descrição das funcionalidades;
- [x] documentação da instalação;
- [x] documentação das variáveis de ambiente;
- [x] documentação do banco de dados;
- [x] documentação das decisões técnicas;
- [x] documentação das regras de negócio;
- [x] documentação do roadmap.
- [x] confirmar os links reais de GitHub, LinkedIn e e-mail;
- [ ] atualizar a versão exibida no rodapé para `v1.0.0`;
- [ ] executar a revisão final dos textos;
- [ ] executar `npm run lint`;
- [ ] executar `npm run build`;
- [ ] revisar o projeto em modo de produção;
- [ ] verificar se nenhum segredo aparece no Git;
- [ ] preparar as variáveis de ambiente na Vercel;
- [ ] publicar a aplicação;
- [ ] testar a URL pública;
- [ ] criar a tag ou release `v1.0.0` no GitHub.

---

## Fase 7 — Deploy da versão 1.0.0 ⏳

- [ ] Confirmar que o projeto compila:

```bash
npm run lint
npm run build
```

- [ ] Conectar o repositório à Vercel.

- [ ] Configurar na Vercel:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

- [ ] Publicar a aplicação.

- [ ] Validar em produção:

* página principal;
* pesquisa;
* filtros;
* paginação;
* cards;
* páginas individuais;
* termos relacionados;
* loading;
* erros;
* página inexistente;
* rodapé;
* links externos;
* versão mobile;
* versão desktop.

- [ ] Criar a release no GitHub.

---

# 14. Roadmap pós-MVP 

Os itens abaixo não fazem parte da versão `v1.0.0`, mas poderão ser desenvolvidos nas versões seguintes.

## Conteúdo ⏳

- [ ] ampliar o glossário para aproximadamente 500 termos;
- [ ] adicionar mais categorias e subcategorias;
- [ ] revisar e padronizar as descrições;
- [ ] criar um fluxo de importação em massa;
- [ ] validar automaticamente slugs e relações;
- [ ] adicionar mais termos relacionados.

## Administração ⏳

- [ ] criar autenticação;
- [ ] criar uma área administrativa;
- [ ] permitir criação de categorias;
- [ ] permitir criação de subcategorias;
- [ ] permitir criação e edição de termos;
- [ ] permitir gerenciamento de relações;
- [ ] invalidar dados após alterações administrativas.

## Sugestões da comunidade ⏳

- [ ] criar formulário público de sugestões;
- [ ] armazenar sugestões separadamente;
- [ ] criar fluxo de análise e aprovação;
- [ ] evitar publicação direta de conteúdo enviado por visitantes.

## Pesquisa ⏳

- [ ] pesquisar também por variações;
- [ ] pesquisar em descrições;
- [ ] adicionar sugestões durante a digitação;
- [ ] destacar o trecho pesquisado;
- [ ] considerar pesquisa textual do PostgreSQL.

## Experiência do usuário ⏳

- [ ] preservar pesquisa e filtros ao voltar de um termo;
- [ ] armazenar filtros na URL;
- [ ] adicionar favoritos;
- [ ] adicionar tema claro;
- [ ] permitir compartilhamento direto;
- [ ] adicionar botão de copiar link;
- [ ] adicionar histórico de termos visitados.
- [ ] ajustar paleta de cores do tema escuro.
- [ ] inserir opção de tema claro.
- [ ] inserir possibilidade de escolher entre conteúdo em inglês ou português.

## SEO ⏳

- [ ] criar metadados globais;
- [ ] criar metadados dinâmicos para cada termo;
- [ ] criar sitemap;
- [ ] criar robots.txt;
- [ ] adicionar favicon;
- [ ] adicionar imagem de compartilhamento;
- [ ] adicionar dados estruturados quando fizer sentido.

## Qualidade ⏳

- [ ] criar testes unitários;
- [ ] criar testes de componentes;
- [ ] criar testes de integração;
- [ ] criar testes ponta a ponta;
- [ ] automatizar lint e build no GitHub Actions;
- [ ] revisar acessibilidade;
- [ ] medir contraste;
- [ ] testar navegação completa por teclado.

## Monitoramento e desempenho ⏳

- [ ] adicionar analytics simples;
- [ ] monitorar erros em produção;
- [ ] medir o desempenho real das consultas;
- [ ] reconsiderar cache somente após obter métricas;
- [ ] investigar estratégias de revalidação após a criação do painel administrativo.

---

## 15. Critérios para considerar a versão 1.0.0 publicada

A versão `v1.0.0` estará concluída quando:

- [ ] o catálogo estiver disponível publicamente;
- [ ] os dados forem carregados do Supabase;
- [ ] pesquisa e filtros estiverem funcionando;
- [ ] as páginas individuais puderem ser acessadas;
- [ ] as relações bidirecionais estiverem funcionando;
- [ ] os estados de loading, erro e not found estiverem funcionando;
- [ ] o layout estiver responsivo;
- [ ] o README estiver atualizado;
- [ ] esta documentação estiver no repositório;
- [ ] a versão estiver atualizada;
- [ ] o build de produção estiver válido;
- [ ] a aplicação estiver publicada na Vercel;
- [ ] os fluxos principais tiverem sido testados na URL pública.
