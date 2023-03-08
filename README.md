# How to Clone and Setup Repo

## For SSH

```
git clone git@github.com:effiecient/effie-FE.git
cd effie-FE
git remote set-url origin --push --add git@gitlab.informatika.org:if3250-k1-g1/effie-FE.git
git remote set-url origin --push --add git@github.com:effiecient/effie-FE.git
cd ..

git clone git@github.com:effiecient/effie-BE.git
cd effie-BE
git remote set-url origin --push --add git@gitlab.informatika.org:if3250-k1-g1/effie-BE.git
git remote set-url origin --push --add git@github.com:effiecient/effie-BE.git
```

## For HTTPS

```
git clone https://github.com/effiecient/effie-FE.git
cd effie-FE
git remote set-url origin --push --add https://gitlab.informatika.org/if3250-k1-g1/effie-FE.git
git remote set-url origin --push --add https://github.com/effiecient/effie-FE.git
cd ..

git clone https://github.com/effiecient/effie-BE.git
cd effie-BE
git remote set-url origin --push --add https://gitlab.informatika.org/if3250-k1-g1/effie-BE.git
git remote set-url origin --push --add https://github.com/effiecient/effie-BE.git
```

# Conventions

-   Use `"` for strings
-   Use 2 spaces
-   Use `;`

# Project Description

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## setting up

add

```bash
127.0.0.1 www.example.com {username}.example.com
```

to your hosts file (usually located at `/etc/hosts`)

then access your app at `http://example.com:3000`

reason: to share cookies between different subdomains, we can't use `localhost` as the domain

(ideally we use effie.boo, but for some reason I don't understand, it doesn't work. It's redirected to https://effie.boo:3000/ when it should be http://effie.boo:3000/)
