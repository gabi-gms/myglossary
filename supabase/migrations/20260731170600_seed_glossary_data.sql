begin;

-- =========================================================
-- Categories
-- =========================================================

insert into public.categories (
  id,
  name,
  slug,
  color
)
values
  (
    '11111111-1111-4111-8111-111111111111',
    'Desenvolvimento de Software',
    'desenvolvimento-de-software',
    '#7c8cff'
  ),
  (
    '22222222-2222-4222-8222-222222222222',
    'Banco de Dados',
    'banco-de-dados',
    '#57b8a6'
  ),
  (
    '33333333-3333-4333-8333-333333333333',
    'Inteligência Artificial',
    'inteligencia-artificial',
    '#c97c91'
  );

  -- =========================================================
-- Subcategories
-- =========================================================

insert into public.subcategories (
  id,
  category_id,
  name,
  slug
)
values
  (
    '11111111-1111-4111-8111-111111111101',
    '11111111-1111-4111-8111-111111111111',
    'Fundamentos de Programação',
    'fundamentos-de-programacao'
  ),
  (
    '11111111-1111-4111-8111-111111111102',
    '11111111-1111-4111-8111-111111111111',
    'Backend',
    'backend'
  ),
  (
    '22222222-2222-4222-8222-222222222201',
    '22222222-2222-4222-8222-222222222222',
    'Fundamentos',
    'fundamentos'
  ),
  (
    '33333333-3333-4333-8333-333333333301',
    '33333333-3333-4333-8333-333333333333',
    'Machine Learning',
    'machine-learning'
  );

  -- =========================================================
-- Terms
-- =========================================================

insert into public.terms (
  id,
  subcategory_id,
  name,
  slug,
  name_variations,
  short_description,
  full_description,
  analogy
)
values
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
    '11111111-1111-4111-8111-111111111101',
    'Algoritmo',
    'algoritmo',
    array[]::text[],
    'Sequência organizada de passos utilizada para resolver um problema.',
    'Um algoritmo é uma sequência finita e organizada de instruções criada para executar uma tarefa ou resolver um problema. Ele descreve o que deve acontecer e em qual ordem.',
    'Pode ser comparado a uma receita, que apresenta os passos necessários para preparar um prato.'
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2',
    '11111111-1111-4111-8111-111111111101',
    'Variável',
    'variavel',
    array[]::text[],
    'Espaço identificado usado para armazenar um valor durante a execução de um programa.',
    'Uma variável permite que um programa armazene e utilize informações. Seu valor pode permanecer igual ou mudar durante a execução.',
    'Pode ser comparada a uma caixa etiquetada na qual guardamos uma informação.'
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
    '11111111-1111-4111-8111-111111111102',
    'API',
    'api',
    array[
      'Application Programming Interface',
      'Interface de Programação de Aplicações'
    ]::text[],
    'Interface que permite a comunicação entre diferentes sistemas.',
    'Uma API define regras, formatos e operações que permitem que uma aplicação solicite dados ou funcionalidades de outra aplicação.',
    'Pode ser comparada a um atendente que recebe uma solicitação e retorna com a resposta.'
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa4',
    '11111111-1111-4111-8111-111111111102',
    'Endpoint',
    'endpoint',
    array[
      'Ponto de acesso'
    ]::text[],
    'Endereço específico por meio do qual uma API recebe uma solicitação.',
    'Um endpoint representa um ponto de comunicação disponibilizado por uma API. Cada endpoint normalmente possui um endereço e uma operação específica.',
    null
  ),
  (
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb1',
    '22222222-2222-4222-8222-222222222201',
    'Banco de dados relacional',
    'banco-de-dados-relacional',
    array[
      'Relational Database'
    ]::text[],
    'Banco de dados que organiza informações em tabelas relacionadas.',
    'Um banco de dados relacional organiza informações em tabelas compostas por linhas e colunas. As tabelas podem ser conectadas por meio de identificadores e relacionamentos.',
    'Pode ser comparado a várias planilhas conectadas por informações em comum.'
  ),
  (
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2',
    '22222222-2222-4222-8222-222222222201',
    'Chave primária',
    'chave-primaria',
    array[
      'Primary Key'
    ]::text[],
    'Campo que identifica de forma única cada registro de uma tabela.',
    'Uma chave primária é um campo, ou conjunto de campos, usado para diferenciar cada registro de uma tabela. Seu valor não deve se repetir dentro da mesma tabela.',
    'Pode ser comparada ao número de um documento que identifica uma pessoa de maneira única.'
  ),
  (
    'cccccccc-cccc-4ccc-8ccc-ccccccccccc1',
    '33333333-3333-4333-8333-333333333301',
    'Modelo de machine learning',
    'modelo-de-machine-learning',
    array[
      'Machine Learning Model'
    ]::text[],
    'Estrutura treinada para reconhecer padrões e produzir previsões.',
    'Um modelo de machine learning é produzido a partir de dados e de um processo de treinamento. Ele utiliza os padrões aprendidos para gerar resultados.',
    'Pode ser comparado a alguém que aprende a reconhecer padrões após observar muitos exemplos.'
  ),
  (
    'cccccccc-cccc-4ccc-8ccc-ccccccccccc2',
    '33333333-3333-4333-8333-333333333301',
    'Treinamento de modelo',
    'treinamento-de-modelo',
    array[
      'Model Training'
    ]::text[],
    'Processo no qual um modelo aprende padrões a partir de dados.',
    'Durante o treinamento, um algoritmo analisa exemplos e ajusta seus parâmetros para reduzir erros e melhorar sua capacidade de produzir resultados.',
    null
  );

  -- =========================================================
-- Term relations
-- =========================================================

insert into public.term_relations (
  term_a_id,
  term_b_id
)
values
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa1',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa2'
  ),
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa3',
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaa4'
  ),
  (
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb1',
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbb2'
  ),
  (
    'cccccccc-cccc-4ccc-8ccc-ccccccccccc1',
    'cccccccc-cccc-4ccc-8ccc-ccccccccccc2'
  );

commit;