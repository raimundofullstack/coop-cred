FROM node:20-slim

WORKDIR /app

# Copia apenas o que é necessário para instalar dependências
COPY package.json yarn.lock ./

# Instala dependências de produção (sem setar NODE_ENV ainda!)
RUN yarn install --frozen-lockfile --production=true

# Agora define a variável (após instalar)
ENV NODE_ENV=production

# Copia o restante do código
COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
