# NOVA Admin

A simple admin panel built with React, Vite and TypeScript.

It has login, product and user pages, search and add forms. It also supports Persian, English, dark mode and light mode.

## Requirements

- Node.js 22.12 or newer
- npm

## Run the project

```bash
git clone https://github.com/hassan-attari/nova-admin.git
cd nova-admin
npm install
```

Create `.env.local` from `.env.example` and then run:

```bash
npm run dev
```

Open `http://127.0.0.1:5173` in your browser.

## Environment

The API URL is set in `.env.local`:

```env
VITE_API_BASE_URL=https://fakestoreapi.com
```

## Pages

- `/login` – Login page
- `/products` – Product list and search
- `/products/new` – Add product
- `/users` – User list and search
- `/users/new` – Add user

You need to log in to access the panel pages.

## Project structure

- `src/Pages` – Main pages
- `src/Components` – Layout, sidebar and header
- `src/Shared` – Shared components
- `src/Routes` – App routes
- `src/Redux` – App state
- `src/Utils` – API and services
- `src/Validations` – Form validation
- `src/Dictionary` – Persian and English translations
- `src/Storage` – Theme and language settings
- `src/types` – TypeScript types

## Main technologies

- React and TypeScript
- Redux Toolkit
- Axios
- Formik and Yup
- Styled Components
- Lucide React

## Notes

This project uses FakeStoreAPI for products, users and login. It is a demo API, so new products and users are not permanently saved.

The project uses localStorage for language and theme settings. Login information is kept in memory, so after refreshing the page you need to log in again.

## Development time

9 hours.