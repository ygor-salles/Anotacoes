# Projeto backend

Inicializando e configurando uma aplicação backend com typescript, express, typeorm e postgresql

## Configurações e dependencias iniciais na criação do projeto:

- Instalando o nodeJS

```bash
yarn init -y
```

- Instalando o typescript

```bash
yarn add typescript -D
```

- Instalando o arquivo de confirguração typescript

```bash
yarn tsc --init
```

- Em tsconfig.json definir o atributo strict como false

- Instalar ts-node para o javascript entender o typescript

```bash
yarn add ts-node-dev -D
```

## Variáveis de ambiente

- Criar na raiz do projeto um arquivo com o nome `.env`, nele serão colocadas as variáveis de ambiente
  que conterão dados sensíveis a aplicação, como credenciais do banco, senhas de criptografia, entre outros.

- abaixo segue um exemplo de um arquivo `.env`

```.env
PORT=4000

DATABASE_URL=postgresql://postgres:123456@localhost:5432/database_name
BD_USERNAME=postgres
BD_DATABASE=database_name
BD_PASSWORD=123456
BD_PORT=5432

JWT_SECRET=

GITHUB_CLIENT_SECRET=
GITHUB_CLIENT_ID=
```

## Instalando o framework de servidor web ExpressJS

- Instalando o expressJS

```bash
yarn add express
```

- Instalando os tipos(typescript) do expressJS

```bash
yarn add @types/express -D
```

- No package.json adicionar em baixo de license o script de startar servidor:

```json
"scripts": {
    "dev": "ts-node-dev --files --transpile-only --ignore-watch node_modules src/server.ts"
},
```

- As flags utilizadas no exemplo: `--files`, `--transpile-only` e `--ignore-watch node_modules` são opcionais, conforme evolução do projeto algumas delas serão essencias.
  Para mais informações sobre essas flags consulte a documentação oficial do nodeJS.

- Criar uma pasta src com arquivo server.ts - Escolher a porta que irá startar o server, neste exemplo será utilizado das variáveis de ambiente a variável `PORT`

```ts
import "dotenv/config";
import express from "express";

const app = express();

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server is running ${process.env.PORT || 4000}`)
);
```

- O projeto express já estará funcionando na porta conforme definido na variável de ambiente PORT, caso não exista essa variável em `.env` será startado como porta default a porta 4000. Basta rodar no terminal o comando:

```bash
yarn dev
```

## GITHUB, GITIGNORE

- Caso queira subir o projeto para o github ou qualquer outro repositório remoto, criar um arquivo na raiz do projeto com o nome .gitIgnore
- Dentro desse arquivo colocar: /node_modules (Para que não suba a pasta node_modules para o github).
- Caso utilize variáveis de ambiente colocar também o `.env` para que não suba no github

## Docker compose - subindo imagem do banco postgresql

- Caso não tenha o banco postgresql instalado na máquina basta criar uma imagem do banco postgresql pelo
  docker e executá-la. Para isso crie na raiz do projeto um arquivo `docker-compose.yml` com as seguintes configurações

```yml
version: "3.5"

services:
  postgres:
    container_name: app-example
    image: postgres:12.5
    environment:
      POSTGRES_USER: ${BD_USERNAME}
      POSTGRES_DB: ${BD_DATABASE}
      POSTGRES_PASSWORD: ${BD_PASSWORD}
    expose:
      - "${BD_PORT}"
    ports:
      - "${BD_PORT}:${BD_PORT}"
```

- Note que as variáveis `BD_USERNAME`, `BD_DATABASE`, `BD_PASSWORD` e `BD_PORT` são variáveis que devem
  estar setadas no arquivo `.env` com seus respectivos valores

- Basta agora executar o comando `docker-compose up` que uma nova imagem do docker com o banco postgresql estará executando para ser utilizada posteriormente na sua aplicação. Você poderá visualizar o schema do banco postgresql com algum database-studio como `dbeaver` ou `beekeeper` setando as mesmas credenciais definidas em `.env`

## Instalando ORM e dependencias para conectar ao banco

- Instalar o ORM, reflect-metadata e o driver de conexão com o postgresql

```bash
yarn add typeorm reflect-metadata pg
```

- Na raiz do projeto criar um arquivo com o nome de ormconfig.js, onde ficará as configurações com o banco de dados:

```js
require("dotenv").config();

module.exports = {
  type: "postgres",
  host: process.env.BD_HOST,
  port: process.env.BD_PORT || 5432,
  username: process.env.BD_USERNAME,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_DATABASE,
};
```

- No exemplo acima está utilizando as credencias definidas no arquivo `.env` para fazer a comunicação da aplicação com o banco de dados via TYPEORM

- Dentro de `src` criar o diretório `database/index.ts`, no `index.ts` colocar a seguinte configuração:

```ts
import { createConnection } from "typeorm";
createConnection();
```

- Em server.ts chamar o database e o reflect-metadata:

```ts
import "dotenv/config";
import "reflect-metadata";
import express from "express";
import "./database";
const app = express();

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server is running ${process.env.PORT || 4000}`)
);
```

- Dentro de `database` criar o diretório `migrations`

- Em package.json no objeto scripts, criar também o atributo typeorm o qual defini a CLI:

```json
"scripts": {
  "dev": "ts-node-dev --files --transpile-only --ignore-watch node_modules src/server.ts",
  "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"
},
```

- Dentro do arquivo ormconfig.js criar o CLI (ferramenta para criar migrations pelo terminal, e definir em que local será criado os arquivos .ts das migrations), e onde será rodado as migrations:

```js
require("dotenv").config();

module.exports = {
  type: "postgres",
  host: process.env.BD_HOST,
  port: process.env.BD_PORT || 5432,
  username: process.env.BD_USERNAME,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_DATABASE,
  synchronize: false,
  migrations: ["src/database/migrations/*.ts"],
  entities: ["src/entities/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};
```

- Outro atributo importante do typeorm é `synchronize`. Sempre que for utilizar migrations em seu projeto defina esse atributo como false, para que o banco de dados não reflita as models da sua aplicação mas sim as migrations.

- Para validar se a CLI do typeorm está funcionando, executar o comando:

```bash
yarn typeorm -help
```

## Configuração para utilização de decorators no typescript, necessário pois o typeorm utiliza-se dos decorators

- Dentro de tsconfig.json, descomentar as linhas:

```json
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```

- Ainda dentro de tsconfig.json descomentar tb a linha com o atributo strictPropertyInitialization e defini-lo como false, para que não dê erro na inicialização dos atributos dos objetos:

```json
"strictPropertyInitialization": false,
```

- Para que essas configurações funcionem talvez seja necessário reiniciar o vsCode

- Sucesso! O Projeto inicial backend com NodeJS, expressJS, Typeorm e postgreSQL já está configurado e pronto para ser evoluído.

---

## Adicionar a biblioteca uuid e os tipos do uuid, opcional. Para geração de IDs das tabelas dos bancos:

```bash
yarn add uuid
```

```bash
yarn add @types/uuid -D
```

## Comandos básicos para migrations

- Criando uma migration:

```bash
yarn typeorm migration:create -n nomeMigration
```

- Rodando migration

```bash
yarn typeorm migration:run
```

- Rollback de migration

```bash
yarn typeorm migration:revert
```

## Instalação das dependencias:

```bash
yarn
```

## Rodar o projeto:

```bash
yarn dev
```
