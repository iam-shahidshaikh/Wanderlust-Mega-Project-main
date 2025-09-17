# Stage 1: Build frontend
FROM node:21 AS frontend-builder

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production image
FROM node:21-slim

WORKDIR /app
COPY --from=frontend-builder /app ./

EXPOSE 3000
CMD ["npm", "start"]
