import type {
  Category,
  Subcategory,
  Term,
  TermRelation,
} from "@/types/glossary";

export const categories: Category[] = [
  {
    id: "category-software",
    name: "Desenvolvimento de Software",
    slug: "desenvolvimento-de-software",
    color: "#7C8CFF",
  },
  {
    id: "category-database",
    name: "Banco de Dados",
    slug: "banco-de-dados",
    color: "#57B8A6",
  },
  {
    id: "category-ai",
    name: "Inteligência Artificial",
    slug: "inteligencia-artificial",
    color: "#C97C91",
  },
];

export const subcategories: Subcategory[] = [
  {
    id: "subcategory-programming-fundamentals",
    categoryId: "category-software",
    name: "Fundamentos de Programação",
    slug: "fundamentos-de-programacao",
  },
  {
    id: "subcategory-backend",
    categoryId: "category-software",
    name: "Backend",
    slug: "backend",
  },
  {
    id: "subcategory-database-fundamentals",
    categoryId: "category-database",
    name: "Fundamentos",
    slug: "fundamentos",
  },
  {
    id: "subcategory-machine-learning",
    categoryId: "category-ai",
    name: "Machine Learning",
    slug: "machine-learning",
  },
];

export const terms: Term[] = [
  {
    id: "term-algorithm",
    subcategoryId: "subcategory-programming-fundamentals",
    name: "Algoritmo",
    slug: "algoritmo",
    nameVariations: [],
    shortDescription:
      "Sequência organizada de passos utilizada para resolver um problema.",
    fullDescription:
      "Um algoritmo é uma sequência finita e organizada de instruções criada para executar uma tarefa ou resolver um problema. Ele descreve o que deve acontecer e em qual ordem.",
    analogy:
      "Pode ser comparado a uma receita, que apresenta os passos necessários para preparar um prato.",
  },
  {
    id: "term-variable",
    subcategoryId: "subcategory-programming-fundamentals",
    name: "Variável",
    slug: "variavel",
    nameVariations: [],
    shortDescription:
      "Espaço identificado usado para armazenar um valor durante a execução de um programa.",
    fullDescription:
      "Uma variável permite que um programa armazene e utilize informações. Seu valor pode permanecer igual ou mudar durante a execução, dependendo das regras do sistema.",
    analogy:
      "Pode ser comparada a uma caixa etiquetada na qual guardamos uma informação.",
  },
  {
    id: "term-api",
    subcategoryId: "subcategory-backend",
    name: "API",
    slug: "api",
    nameVariations: [
      "Application Programming Interface",
      "Interface de Programação de Aplicações",
    ],
    shortDescription:
      "Interface que permite a comunicação entre diferentes sistemas.",
    fullDescription:
      "Uma API define regras, formatos e operações que permitem que uma aplicação solicite dados ou funcionalidades de outra aplicação.",
    analogy:
      "Pode ser comparada a um atendente que recebe uma solicitação e retorna com a resposta.",
  },
  {
    id: "term-endpoint",
    subcategoryId: "subcategory-backend",
    name: "Endpoint",
    slug: "endpoint",
    nameVariations: ["Ponto de acesso"],
    shortDescription:
      "Endereço específico por meio do qual uma API recebe uma solicitação.",
    fullDescription:
      "Um endpoint representa um ponto de comunicação disponibilizado por uma API. Cada endpoint normalmente possui um endereço e uma operação específica.",
    analogy: null,
  },
  {
    id: "term-relational-database",
    subcategoryId: "subcategory-database-fundamentals",
    name: "Banco de dados relacional",
    slug: "banco-de-dados-relacional",
    nameVariations: ["Relational Database"],
    shortDescription:
      "Banco de dados que organiza informações em tabelas relacionadas.",
    fullDescription:
      "Um banco de dados relacional organiza informações em tabelas compostas por linhas e colunas. As tabelas podem ser conectadas por meio de identificadores e relacionamentos.",
    analogy:
      "Pode ser comparado a várias planilhas conectadas por informações em comum.",
  },
  {
    id: "term-primary-key",
    subcategoryId: "subcategory-database-fundamentals",
    name: "Chave primária",
    slug: "chave-primaria",
    nameVariations: ["Primary Key"],
    shortDescription:
      "Campo que identifica de forma única cada registro de uma tabela.",
    fullDescription:
      "Uma chave primária é um campo, ou conjunto de campos, usado para diferenciar cada registro de uma tabela. Seu valor não deve se repetir dentro da mesma tabela.",
    analogy:
      "Pode ser comparada ao número de um documento que identifica uma pessoa de maneira única.",
  },
  {
    id: "term-machine-learning-model",
    subcategoryId: "subcategory-machine-learning",
    name: "Modelo de machine learning",
    slug: "modelo-de-machine-learning",
    nameVariations: ["Machine Learning Model"],
    shortDescription:
      "Estrutura treinada para reconhecer padrões e produzir previsões.",
    fullDescription:
      "Um modelo de machine learning é produzido a partir de dados e de um processo de treinamento. Ele utiliza os padrões aprendidos para classificar informações, gerar previsões ou apoiar decisões.",
    analogy:
      "Pode ser comparado a alguém que aprende a reconhecer padrões após observar muitos exemplos.",
  },
  {
    id: "term-model-training",
    subcategoryId: "subcategory-machine-learning",
    name: "Treinamento de modelo",
    slug: "treinamento-de-modelo",
    nameVariations: ["Model Training"],
    shortDescription:
      "Processo no qual um modelo aprende padrões a partir de dados.",
    fullDescription:
      "Durante o treinamento, um algoritmo analisa exemplos e ajusta seus parâmetros para reduzir erros e melhorar sua capacidade de produzir resultados.",
    analogy: null,
  },
];

export const termRelations: TermRelation[] = [
  {
    termAId: "term-algorithm",
    termBId: "term-variable",
  },
  {
    termAId: "term-api",
    termBId: "term-endpoint",
  },
  {
    termAId: "term-relational-database",
    termBId: "term-primary-key",
  },
  {
    termAId: "term-machine-learning-model",
    termBId: "term-model-training",
  },
];