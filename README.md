# myGlossary

A simple web glossary for exploring terms related to areas of the future, through search, categories, filters, and related concepts.

## About

**myGlossary** is a public glossary created to make technical concepts easier to find and understand.

Each term includes a a detailed description, optional analogies, category information, and related concepts.

The project was also developed as a full-stack portfolio application, focusing on clean architecture, responsive design, accessibility, database security, and maintainability.

## Features

* Search terms by name
* Accent-insensitive and case-insensitive search
* Filter by multiple categories and subcategories
* Connected category and subcategory filters
* Active filter tags
* Pagination
* Responsive term cards
* Individual pages for each term
* Optional name variations and analogies
* Bidirectional related terms
* Loading, empty, error, and not-found states
* Public read-only access to glossary data

## Tech Stack

* [Next.js](https://nextjs.org/)
* [React](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Supabase](https://supabase.com/)
* PostgreSQL
* Vercel

## Getting Started

### Requirements

* Node.js
* npm
* A Supabase project

### Installation

Clone the repository:

```bash
git clone https://github.com/gabi-gms/myglossary.git
cd myglossary
```

Install the dependencies:

```bash
npm install
```

Create a local environment file based on the example:

```bash
cp .env.example .env.local
```

Add your Supabase credentials to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

Start the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run lint
```

Checks the project for linting problems.

```bash
npm run build
```

Creates and validates the production build.

```bash
npm start
```

Runs the production build locally.

## Database

The PostgreSQL database contains four main tables:

* `categories`
* `subcategories`
* `terms`
* `term_relations`

Database migrations and initial seed data are stored in:

```text
supabase/migrations
```

Public users have read-only access. Insert, update, and delete operations are protected through PostgreSQL permissions and Supabase Row Level Security policies.

## Project Status

The MVP is complete and is being prepared for new improvements.

Current version:

```text
v1.0.0
```

## Documentation

More information about the architecture, business rules, completed work, and future roadmap is available in the project documentation.

## Author

Developed by Gabi Rodrigues.
