FROM node:22-alpine AS build

WORKDIR /app

# Сначала зависимости — слой кешируется, пока package.json не менялся.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

# --- dev: то же окружение, но с tsx watch; исходники монтируются томом ---
FROM build AS dev

CMD ["npm", "run", "dev"]

# --- прод-рантайм: только результат сборки и прод-зависимости.
# Последняя стадия — она же цель по умолчанию при обычном docker build. ---
FROM node:22-alpine AS prod

WORKDIR /app

ENV NODE_ENV=production

# --omit=dev: TypeScript, tsx и линтеры в прод-образ не попадают.
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
