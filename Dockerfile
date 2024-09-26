# Etapa 1: Construção da aplicação
FROM node:18 AS build
WORKDIR /app

# Copia o package.json e instala as dependências
COPY package.json ./
RUN npm install

# Copia o restante dos arquivos da aplicação e faz o build
COPY ./ ./
RUN npm run build --prod

# Etapa 2: Servir a aplicação com o NGINX
FROM nginx:alpine
COPY --from=build /app/dist/arq-virtuais-ui /usr/share/nginx/html

# Expor a porta 80 para o NGINX servir a aplicação
EXPOSE 80
