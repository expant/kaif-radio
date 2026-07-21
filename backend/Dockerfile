FROM node:22-alpine

WORKDIR /app

# Сначала зависимости — слой кешируется, пока package.json не менялся.
COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 3000

# Dev-режим: tsx следит за файлами и перезапускает при изменениях.
CMD ["npm", "run", "dev"]
