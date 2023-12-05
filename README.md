![Barambo Logo](/public/logo.svg)

Barambo is a Georgian chocolate manufacturer, specializing in high-quality chocolates available in Georgia and various international markets, including the USA and China.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)

## Features

- Explore Barambo's history, certificates, and product offerings.
- Read the latest blog posts, news, and information about Corporate Social Responsibility (CSR).
- Access delicious recipes using Barambo products.
- Contact Barambo through email or integrated Facebook chat.

## Technologies Used

- [Next.js 14](https://nextjs.org/) - React framework (using RSC) ![Next.js](https://img.shields.io/badge/Next.js-14.0.3-blue?logo=next.js)

### Frontend

- [React Query](https://react-query.tanstack.com/) - For handling data fetching, including infinite scrolling and search functionality ![React Query](https://img.shields.io/badge/React%20Query-latest-blue?logo=react)
- [Swiper.js](https://swiperjs.com/) - Swiping carousel for slides.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework. ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-latest-blue?logo=tailwind-css)
- [Tailwind Merge](https://www.npmjs.com/package/tailwindcss-merge) - Merging Tailwind CSS styles.
- [TinyMCE](https://www.tiny.cloud/) - WYSIWYG editor for content creation.
- [React Hook Form](https://react-hook-form.com/) - Form handling in React ![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-^7.0-purple?logo=react)
- [React Player](https://cookpete.com/react-player/) - For displaying recipe videos.
- [Zod](https://github.com/colinhacks/zod) - Schema validation ![Zod](https://img.shields.io/badge/Zod-latest-purple)

### Backend

- [Express](https://expressjs.com/) - Serving images and additional backend functionality. ![Express](https://img.shields.io/badge/Express-latest-green?logo=express)
- [Drizzle ORM](https://github.com/kriasoft/node-drizzle) - MySQL ORM (Using Better SQLite3).
- [Axios](https://axios-http.com/) - HTTP client for making requests. ![Axios](https://img.shields.io/badge/Axios-latest-blue?logo=axios)
- [Sharp](https://sharp.pixelplumbing.com/) - Image optimization library.
- [Nodemailer](https://nodemailer.com/) - Sending emails. ![Nodemailer](https://img.shields.io/badge/Nodemailer-latest-blue?logo=nodemailer)

## Installation

## Clone the repository

```bash
git clone https://github.com/geo318/barambo.git
```

## Install dependencies

```bash
cd barambo
cd express
npm install
npm start
```

```bash
cd ..
npm install
npm run migrate
npm run db:push
```

## Usage

Set up the required environment variables.
Run the development server:

```bash
cd express
npm start

//then:
cd ..
npm run dev
Visit http://localhost:3200 to view the application.
```

## Project Structure

The structure of the project is organized as follows:

```
barambo/
├── .gitignore
├── .env
├── .env.local
├── package.json
├── tsconfig.json
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── favicon.ico
│   ├── globals.css (tw)
│   ├── admin/
│   ├── api/
│   │   ├── page.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── event/
│   │   │   ├── music/
│   ├── [lang]/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   │   ├── page.tsx
...
├── components/
├── config/
├── express/
│   ├── server.ts
├── hooks/
├── server/
│   ├── database/
│   ├── actions/
├── public/
├── schema/
├── types/
├── utils/
└── README.md

```

---

<span style="font-family: 'Courier New', monospace;">**_George Lomidze_**</span>
