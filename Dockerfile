FROM node:20.3.0-alpine as builder

WORKDIR /app
COPY package.json .
RUN npm install --global typescript ts-node
RUN npm install
COPY . .
RUN npm run build



FROM node:20.3.0-alpine

WORKDIR /app
COPY package.json .
ENV PORT=3080
ENV NODE_ENV=Production
RUN npm install
COPY --from=builder /app/dist /app/dist
COPY .env .
EXPOSE ${PORT}

CMD ["node", "dist/main.js"]