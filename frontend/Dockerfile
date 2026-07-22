# --- сборка SPA ---
FROM node:22-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Vite инлайнит эти значения в бандл на этапе сборки. Пишем в .env.production,
# откуда Vite их гарантированно подхватывает в production-режиме.
ARG VITE_API_URL
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
RUN printf 'VITE_API_URL=%s\nVITE_SUPABASE_URL=%s\nVITE_SUPABASE_ANON_KEY=%s\n' \
	"$VITE_API_URL" "$VITE_SUPABASE_URL" "$VITE_SUPABASE_ANON_KEY" > .env.production

RUN npm run build

# --- раздача статики ---
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
