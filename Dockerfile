# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .

# Stage 2: Production
FROM node:18
WORKDIR /app
COPY --from=builder /app .
EXPOSE 2704
ENV NODE_ENV=production
CMD ["node", "index.js"]