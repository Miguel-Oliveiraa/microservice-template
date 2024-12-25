# Etapa 1: Construção
FROM node:22 AS builder

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar os arquivos de configuração necessários para instalar dependências e compilar
COPY package*.json ./
COPY tsconfig.json ./
COPY jest.config.ts ./

# Instalar as dependências
RUN npm install

# Copiar o código-fonte para o container
COPY src ./src
COPY prisma ./prisma

# Executar os testes
RUN npm run test

# Compilar o código TypeScript
RUN npm run build

# Etapa 2: Imagem final
FROM node:22

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar as dependências instaladas (node_modules) e o código compilado
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

# Expor a porta da aplicação
EXPOSE 3000

# Comando para executar as migrations e iniciar a aplicação
CMD npx prisma migrate dev && npm run start
