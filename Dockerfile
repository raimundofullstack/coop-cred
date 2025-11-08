FROM node:20-slim

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

# Remove devDependencies na imagem final (opcional, recomendado em produção)
RUN yarn install --production --frozen-lockfile

EXPOSE 3000

CMD ["yarn", "start"]
