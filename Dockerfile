# ---------- Etapa base: dependencias ----------
FROM node:24.22.2-alpine3.24 AS base
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# ---------- Etapa test: ejecuta las pruebas unitarias dentro del contenedor ----------
FROM base AS test
COPY . .
CMD ["npm", "run", "test:coverage"]

# ---------- Etapa build: compila TypeScript ----------
FROM base AS build
COPY . .
RUN npm run build

# ---------- Etapa runtime: imagen final minima ----------
FROM node:24.22.2-alpine3.24 AS runtime
WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force
COPY --from=build /usr/src/app/dist ./dist
USER node
CMD ["node", "dist/index.js"]
