# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /backend

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# Stage 2: Run
FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /backend/package*.json ./
COPY --from=builder /backend/dist ./dist
RUN npm install --omit=dev

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/index.js"]
