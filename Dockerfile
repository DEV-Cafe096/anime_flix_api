# Use a imagem base oficial do Node.js
FROM node:20
# É a versão do Node.js que vamos instalar dentro do nosso contêiner, para que consigamos instalar as dependências e executar os comandos

# Crie e defina o diretório de trabalho dentro do container
WORKDIR /app 
# É o diretório de trabalho do contêiner, o sistema operacional do contêiner é Linux, então os caminhos dentro do Linux são assim, eles começam com / diferente do Windows que é C:

# Copie o package.json e o package-lock.json (se existir)
COPY package.json . 
# Copia o arquivo de dependências para dentro o contêiner e o . significa o diretório atual, pois o arquivo Dockerfile está no mesmo nível do package.json

# Instale as dependências
RUN npm install 
# Instala as dependências necessárias para que o projeto possa funcionar com todas as bibliotecas que tem instaladas nele

# Copie o restante do código da aplicação
COPY . . 
# Copia todo o código para dentro do contêiner, o . serve para referenciar o diretório atual

# Exponha a porta da aplicação
EXPOSE 3000 
# Expõe a porta que a aplicação usa

# Comando para rodar a aplicação
CMD ["npm", "start"] 
# É o comando para iniciar/rodar a nossa aplicação
