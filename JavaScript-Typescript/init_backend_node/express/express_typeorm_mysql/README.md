# Projeto backend typescript, express, typeorm, mysql, jest e deploy heroku 2021/2022

Inicializando e configurando uma aplicação backend com typescript, express, typeorm e mysql

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

- Em `tsconfig.json` definir o atributo `strict` como false

- Instalar ts-node para o javascript entender o typescript

```bash
yarn add ts-node-dev -D
```

## Variáveis de ambiente

- Para que o nodeJS consiga ler as variáveis de ambiente do arquivo `.env` é necessário instalar o lib dotenv:

```bash
yarn add dotenv
```

- Criar na raiz do projeto um arquivo com o nome `.env`, nele serão colocadas as variáveis de ambiente
  que conterão dados sensíveis a aplicação, como credenciais do banco, senhas de criptografia, entre outros.

- abaixo segue um exemplo de um arquivo `.env`

```.env
PORT=4000
NODE_ENV=development

BD_USERNAME=mysql
BD_DATABASE=database_name
BD_PASSWORD=123456
BD_PORT=3306

JWT_SECRET=
```

- Para uma boa prática crie também um arquivo na raíz do projeto com a nomeclatura `.env.example` para que quem baixe o repositório na máquina saiba quais as variáveis de ambiente estão sendo utilizadas no projeto, sem passar as credencias secretas é claro, apenas as chaves, exemplo:

```.env.example
PORT=
NODE_ENV=

BD_USERNAME=
BD_DATABASE=
BD_PASSWORD=
BD_PORT=

JWT_SECRET=
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

- No `package.json` adicionar em baixo de `license` o script de startar servidor:

```json
"scripts": {
    "dev": "ts-node-dev --files --transpile-only --ignore-watch node_modules src/server.ts"
},
```

- As flags utilizadas no exemplo: `--files`, `--transpile-only` e `--ignore-watch node_modules` são opcionais, conforme evolução do projeto algumas delas serão essencias.
  Para mais informações sobre essas flags consulte a documentação oficial do nodeJS.

- Criar uma pasta `src` com arquivo `server.ts` - Escolher a porta que irá startar o server, neste exemplo será utilizado das variáveis de ambiente a variável `PORT`

```ts
import "dotenv/config";
import express from "express";

const app = express();

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server is running ${process.env.PORT || 4000}`)
);
```

- O projeto express já estará funcionando na porta conforme definido na variável de ambiente `PORT`, caso não exista essa variável em `.env` será startado como porta default a porta 4000. Basta rodar no terminal o comando:

```bash
yarn dev
```

## GITHUB, GITIGNORE

- Caso queira subir o projeto para o github, criar um arquivo na raiz do projeto com o nome `.gitIgnore` nele será definido o que não será enviado para a repositório remoto, no caso o github
- Dentro desse arquivo colocar: /node_modules (Para que não suba a pasta node_modules para o github).
- Caso utilize variáveis de ambiente colocar também o `.env` para que não suba no github
- Segue um exemplo de um arquivo `.gitIgnore`:

```.gitIgnore
node_modules

.env

build

coverage
```

## Docker compose - subindo imagem do banco mysql

- Caso não tenha o banco mysql instalado na máquina basta criar uma imagem do banco mysql pelo
  docker e executá-la. Para isso crie na raiz do projeto um arquivo `docker-compose.yml` com as seguintes configurações

```yml
version: "3"

services:
  mysql:
    container_name: app-teste
    image: mysql:5.7
    environment:
      MYSQL_DATABASE: ${BD_DATABASE}
      MYSQL_ROOT_PASSWORD: ${BD_PASSWORD}
    expose:
      - "${BD_PORT}"
    ports:
      - "${BD_PORT}:${BD_PORT}"
```

- Note que as variáveis `BD_DATABASE`, `BD_PASSWORD` e `BD_PORT` são variáveis que devem
  estar setadas no arquivo `.env` com seus respectivos valores

- Verificar se nenhum processo ou outro banco esteja executando na mesma porta definida na variável de ambiente `BD_PORT`, caso não tenha basta agora executar o comando `docker-compose up` que uma nova imagem do docker com o banco mysql estará executando para ser utilizada posteriormente na sua aplicação. Você poderá visualizar o schema do banco mysql com algum database-studio como `dbeaver` ou `beekeeper` setando as mesmas credenciais definidas em `.env`

## Instalando ORM e dependencias para conectar ao banco

- Instalar o ORM, reflect-metadata e o driver de conexão com o mysql

```bash
yarn add typeorm reflect-metadata mysql
```

- Na raiz do projeto criar um arquivo com o nome de `ormconfig.js`, onde ficará as configurações com o banco de dados:

```js
require("dotenv").config();

module.exports = {
  type: "mysql",
  host: "localhost",
  port: +process.env.BD_PORT || 3306,
  username: process.env.BD_USERNAME,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_DATABASE,
};
```

- No exemplo acima está utilizando as credencias definidas no arquivo `.env` para fazer a comunicação da aplicação com o banco de dados via TYPEORM

- Dentro de `src` criar o diretório `database/index.ts`, no `index.ts` colocar a seguinte configuração:

```ts
import { createConnection } from "typeorm";

createConnection()
  .then(() => console.log("Database connection successful"))
  .catch((err) =>
    console.log("Database connection failed ->", err.message || err)
  );
```

- Em `server.ts` chamar o database e o reflect-metadata:

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

## Configuração de migrations

- Caso queira utilizar migrations em seu projeto siga as seguintes etapas. Dentro de `database` criar o diretório `migrations`

- Em `package.json` no objeto `scripts`, criar também o atributo `typeorm` o qual defini a CLI do typeorm para trabalhar com as migrations:

```json
"scripts": {
  "dev": "ts-node-dev --files --transpile-only --ignore-watch node_modules src/server.ts",
  "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"
},
```

- Dentro do arquivo `ormconfig.js` criar o CLI (ferramenta para criar migrations pelo terminal, e definir em que local será criado os arquivos .ts das migrations), e onde será rodado as migrations:

```js
require("dotenv").config();

module.exports = {
  type: "mysql",
  host: "localhost",
  port: process.env.BD_PORT || 3306,
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

- Dentro de `tsconfig.json`, descomentar as linhas:

```json
"experimentalDecorators": true,
"emitDecoratorMetadata": true,
```

- Ainda dentro de `tsconfig.json` descomentar tb a linha com o atributo `strictPropertyInitialization` e defini-lo como false, para que não dê erro na inicialização dos atributos dos objetos:

```json
"strictPropertyInitialization": false,
```

- Para que essas configurações funcionem talvez seja necessário reiniciar o vsCode

## Exemplo de criação de uma rota hellow world

- Dentro de `src` criar um arquivo `routes.ts` com a rota inicial retornando a mensagem Hellow world. Abaixo segue o arquivo routes.ts:

```ts
import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hellow world" });
});

export { router };
```

- A partir desse momento todas as novas rotas da aplicação poderão ser inseridas nesse arquivo `routes.ts`

- Para que os navegadores possam compartilhar recursos de diferentes origens é necessário a instalação de um mecanismo chamado `cors`, para isso instale o cors:

```bash
yarn add cors
```

- Instale os tipos do cors:

```bash
yarn add -D @types/cors
```

- Neste exemplo de api, as informações serão compartilhas via `JSON`, no caso será necessário configurar o exepress para que aceite formatos JSON. Para isso em `server.ts`
  é necessário importar o arquivo `routes.ts` e adicionar a configuração para que o express utilize-se do formato `JSON`. Segue a configuração do arquivo `server.ts`

```ts
import cors from "cors";
import "dotenv/config";
import "reflect-metadata";
import express from "express";
import "./database";
import { router } from "./routes";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server is running ${process.env.PORT || 4000}`)
);
```

- Basta rodar o projeto com `yarn dev` e abrir no navegador `http://localhost:4000` que verá a mensagem `hellow world`

- Sucesso! O Projeto inicial backend com NodeJS, expressJS, Typeorm e mysql já está configurado e pronto para ser evoluído.

- A Estrutura de pastas deve ser semelhante a isso:

<img src="https://raw.githubusercontent.com/ygor-salles/Anotacoes/master/assets/estrutura1.PNG" heigth="80%" width="80%" />

## Configurando eslint e prettier

- Essa etapa é opcional, para caso queira deixar o seu código padronizado ou até mesmo para que várias pessoas desenvolvam seguindo o mesmo padrão de formatação no typescript tais como: usar ou não usar ponto e vírgula, quebra de linhas, etc.
- Caso queira adicionar o prettier e eslint no seu projeto siga as seguintes etapas:
- Instalar no VSCode as extensões `Eslint`, `Prettier` e `EditorConfig for VS Code`:

<img src="https://raw.githubusercontent.com/ygor-salles/Anotacoes/master/assets/extens%C3%B5es.PNG" heigth="30%" width="30%" />

- Verificar se possui alguma formatação padrão em seu VSCode para códigos em typescript, o mesmo pode ser acessado pelo windows com `CTRL+SHIFT+P`, `Preferências: Abrir configurações (JSON)`. Abaixo segue um exemplo do arquivo de config do VSCode:

```json
{
  "python.languageServer": "Pylance",
  "workbench.editorAssociations": {
    "*.ipynb": "jupyter.notebook.ipynb"
  },
  "angular.experimental-ivy": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript"],
  "[dart]": {
    "editor.formatOnSave": true,
    "editor.formatOnType": true,
    "editor.rulers": [80],
    "editor.selectionHighlight": false,
    "editor.suggest.snippetsPreventQuickSuggestions": false,
    "editor.suggestSelection": "first",
    "editor.tabCompletion": "onlySnippets",
    "editor.wordBasedSuggestions": false
  },
  "[html]": {
    "editor.defaultFormatter": "vscode.html-language-features"
  },
  "typescript.updateImportsOnFileMove.enabled": "always",
  "[css]": {
    "editor.defaultFormatter": "aeschli.vscode-css-formatter"
  },
  "javascript.updateImportsOnFileMove.enabled": "always",
  "editor.formatOnSave": true,
  "editor.suggestSelection": "first",
  "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
  },
  "[typescript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  }
}
```

- Note que nas configurações acima há um atributo `[typescript]` setado no vscode com uma configuração padrão para formatação de códigos typescript. Remova-a do JSON e salve, para que possa ser utilizado o padrão eslint e prettier que será configurado posteriormente em seu projeto.

- Verificar também se nesse arquivo JSON de configuração, o atributo `"editor.formatOnSave"` está setado para true. O mesmo deve estar setado para true para que quando for salvar o seu código typescript, automaticamente formate o código para o padrão eslint prettier configurado. Após isso, salvar as alterações e fechar o arquivo `settings.json` do seu VSCode

- Clicar com o direito do mouse na raiz do projeto e selecionar a opção `Generate .editorconfig`. Será gerado um arquivo com o nome `.editorconfig` na raiz do projeto, nele é setado as configurações de formatação como espaçamento das identações de código. Aconselhado deixar as configurações do `.editorconfig` da seguinte forma:

```.editorconfig
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = false
```

- Instalar o eslint no projeto em ambiente de desenvolvimento:

```bash
yarn add -D eslint
```

- Inicializando a configuração do eslint:

```bash
yarn eslint --init
```

- Logo após rodar esse comando será feito algumas perguntas para inicializar a configuração eslint, a configuração é opcional, abaixo segue a configuração que utilizo:
- `How would you like to use ESLint?`: `To check sintax, find problems, and enforce code styles`
- `What type of modules does your project use?`: `JavaScript modules (import/export)`
- `Wich framework does your project use?`: `None of these`
- `Does your project use TypeScript`: `Yes`
- `Where does your code run? ...`: `* Node`
- `How would you like to define a style for you project? ...`: `Use a popular style guide`
- `Wich style guide do you want to follow? ...`: `Airbnb: https://github.com/airbnb/javascript`
- `What format do you want your config file to be in? ...`: `JSON`
- `Would you like to install them now with npm?`: `Yes`

- Como na última escolha `Would you like to install them now with npm?` clicamos em sim e estamos utilizando o projeto com o gerenaciador `yarn`, será necessário remover os arquivos `package-lock.json` e `yarn.lock` do projeto

- Após remover esses dois arquivos, executar o comando:

```bash
yarn
```

- Instalar o prettier e suas configurações em dependencias de desenvolvimento:

```bash
yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D
```

- Instalar o eslint-resolver em dependencias de desenvolvimento:

```bash
yarn add eslint-import-resolver-typescript -D
```

- Após a instalação dessas dependências será gerado um arquivo na raiz do projeto chamado de `.eslintrc.json`, nele serão setadas todas as configurações de formatação do código e o que deve ou não ser usado como padrão como boas práticas de código. A personalização fica a critério, abaixo segue a personalização de código que utilizo no arquivo `.eslintrc.json`

```json
{
  "env": {
    "es2021": true,
    "node": true,
    "jest": true
  },
  "extends": ["airbnb-base", "plugin:prettier/recommended"],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint", "prettier"],
  "rules": {
    "camelcase": "off",
    "import/prefer-default-export": "off",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "trailingComma": "all",
        "arrowParens": "avoid",
        "printWidth": 100
      }
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never"
      }
    ]
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
}
```

- Você pode escolher quais tipos de arquivos e diretórios que o eslint+prettier podem ignorar para realizar a formatação, pois a intenção é que o eslint+prettier só formatem os códigos de desenvolvimento. Para isso crie dois arquivos na raíz do projeto `.eslintignore` e `.prettierignore` passando as seguintes configurações:

```.eslintignore
# Ignore artifacts:
build
coverage
**/*.js
node_modules
assets

# Ignore all HTML files:
*.html
```

- Pronto basta recarregar o VSCode que as configurações do prettier+eslint serão aplicadas ao seu projeto. Abaixo segue como ficou as estrutura de pastas:

<img src="https://raw.githubusercontent.com/ygor-salles/Anotacoes/master/assets/estrutura1.1.PNG" heigth="80%" width="80%" />

## Adicionando testes automatizados para o backend - jest

- Instalar o jest e os tipos do jest em ambiente de desenvolvimento:

```bash
yarn add jest @types/jest -D
```

- Instalar a biblioteca ts-jest que é um preset para trabalhar com testes em typescript em ambiente de desenvolvimento:

```bash
yarn add ts-jest -D
```

- Criar o arquivo de configuração do jest:

```bash
yarn jest --init
```

- Após rodar o comando acima será solicitado que selecione as configurações desejadas, abaixo segue as configurações que uso:
- `Would you like to use Jest when running "test" script in "package.json"?`: `Y`
- `Would you like to use Typescript for the configuration file?`: `Y`
- `Choose the test environment that will be used for testing`: `node`
- `Do you want Jest to add coverage reports?`: `Y`
- `Which provider should be used to instrument code for coverage?`: `v8`
- `Automatically clear mock calls, instances and results before every test?`: `y`

- Será gerado um arquivo `jest.config.ts` na raíz do projeto contendo todas as configurações do jest. Como padrão para esse arquivo utilizo as seguintes configs:

```ts
/*

 * For a detailed explanation regarding each configuration property and type check, visit:

 * https://jestjs.io/docs/configuration

 */

export default {
  bail: false,

  clearMocks: true,

  collectCoverage: true,

  coverageDirectory: "coverage",

  coverageProvider: "v8",

  preset: "ts-jest",

  testMatch: ["**/__tests__/**/*.spec.ts"],
};
```

- Para utilizar testes de integração onde é possível testar diretamente pelo endpoint passando por todas as camadas até o banco de dados, será necessário a instalação da lib supertest em ambiente de desenvolvimento:

```bash
yarn add supertest @types/supertest -D
```

- Pronto. Basta criar dentro de `src` uma pasta `__tests__` e inserir todos os arquivos de testes dentro desse diretório. É necessário que o diretório tenha esse nome pois no arquivo `jest.config.ts` setamos o atributo `testMatch` para que reconheça somente os testes que estejam dentro desse diretório cuja extensão termina com `.spec.ts`.

- Para rodar os testes basta executar o comando:

```bash
yarn test
```

- Abaixo segue a nova estrutura do projeto e a execução de um caso de teste como exemplo:

<img src="https://raw.githubusercontent.com/ygor-salles/Anotacoes/master/assets/estrutura1.2.PNG" heigth="80%" width="80%" />

## Configurando aplicação para executar além dos testes unitários os testes de integração

- Para execução dos testes de integração utilizo um banco de dados apartado do banco de desenvolvimento, um banco de dados só para os testes. Além disso é necessário fazer alguns ajustes para manipulação da conexão com o banco de dados na execução dos testes e na execução da aplicação. Também mocko alguns dados no database de testes para serem utilizados durante a execução dos testes. Abaixo segue as alterações de alguns arquivos para a execução dos testes de integração:

- `.env`: é necessário adicionar as variáveis de ambiente do banco de dados de teste:

```.env
PORT=4000
NODE_ENV=development

DATABASE_URL=mysql://mysql:123456@localhost:3306/database_name
BD_USERNAME=mysql
BD_DATABASE=database_name
BD_PASSWORD=123456
BD_PORT=3306

BD_URL_TEST=mysql://mysql:123456@localhost:3306/database_name_test
BD_USERNAME_TEST=mysql
BD_DATABASE_TEST=database_name_test
BD_PASSWORD_TEST=123456
BD_PORT_TEST=3306

JWT_SECRET=sdfhskjdhf35987345jdk
```

- `.env.example`: atualizar também o .env.example:

```.env.example
PORT=
NODE_ENV=

DATABASE_URL=
BD_USERNAME=
BD_DATABASE=
BD_PASSWORD=
BD_PORT=

BD_USERNAME_TEST=
BD_DATABASE_TEST=
BD_PASSWORD_TEST=
BD_PORT_TEST=

JWT_SECRET=
```

- `ormconfig.js`: é necessário colocar a conexão do banco de dados de teste em ormconfig. A aplicação saberá para qual banco de dados deve apontar a partir da variável de ambiente NODE_ENV:

```js
require("dotenv").config();

let config = {};
if (process.env.NODE_ENV === "development") {
  config = {
    type: "mysql",
    host: "localhost",
    port: +process.env.BD_PORT || 3306,
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
} else if (process.env.NODE_ENV === "test") {
  config = {
    type: "mysql",
    host: "localhost",
    port: +process.env.BD_PORT_TEST || 3306,
    username: process.env.BD_USERNAME_TEST,
    password: process.env.BD_PASSWORD_TEST,
    database: process.env.BD_DATABASE_TEST,
    synchronize: false,
    migrations: ["src/database/migrations/*.ts"],
    entities: ["src/entities/*.ts"],
    cli: {
      migrationsDir: "./src/database/migrations",
    },
  };
}

module.exports = config;
```

- `src/database/index`: Ao invés de criar a conexão typeorm diretamente em index, iremos exportá-la para ser utilizada nos arquivos de testes e no arquivo de start do servidor:

```ts
import { createConnection, Connection } from "typeorm";

export default async (): Promise<Connection> => createConnection();
```

- Dentro de `src` criar um arquivo `app.ts` no qual passaremos toda a configuração de `server.ts` para ele, exceto o start do servidor:

```ts
import cors from "cors";
import "dotenv/config";
import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import "./database";
import { router } from "./routes";
import { ApiError } from "./validators/Exceptions/ApiError";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

// eslint-disable-next-line no-unused-vars
app.use(
  (
    err: ApiError | any,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (err instanceof ApiError) {
      if (err.message) {
        return response.status(err.code).json({
          message: err.message,
        });
      }

      return response.status(err.code).end();
    }

    return response.status(500).json({
      message: err.message || "Internal Server Error",
    });
  }
);

export { app };
```

- Note que foi adicionada uma biblioteca `express-async-errors` que captura e trata todos os erros ocasionados na requisição, fazendo isso não será necessário a utilização de try catchs nas controllers. Para instalar essa lib:

```bash
yarn add express-async-errors
```

- `server.ts`: Em server importar a configuração de app e a criação de conexão com o typeorm:

```ts
import { app } from "./app";
import createConnection from "./database/index";

createConnection()
  .then(async () => {
    console.log("Database connection successfully initialized");

    app.listen(process.env.PORT || 4000, () =>
      console.log(`Server is running ${process.env.PORT || 4000}`)
    );
  })
  .catch((error) => {
    console.log("TypeORM connection error: ", error.message);

    app.listen(process.env.PORT || 4000, () =>
      console.log(`Server is running ${process.env.PORT || 4000}`)
    );
  });
```

- `package.json`: no objeto scripts em package.json adicionar o atributo pretest que será o script utilizado antes da realização dos testes e o posttest que será o script utilizado após os testes.

```json
"scripts": {
    "dev": "ts-node-dev --files --transpile-only --ignore-watch node_modules src/server.ts",
    "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js",
    "pretest": "set NODE_ENV=test&&ts-node-dev src/scripts/Seeders.ts",
    "test": "jest",
    "posttest": "ts-node-dev src/scripts/afterAllTests.ts",
    "seed": "ts-node-dev src/scripts/Seeders.ts",
    "clean": "ts-node-dev src/scripts/afterAllTests.ts"
 },
```

- A ideia é que antes da execução de todos os testes deve setar a variavel de ambiente NODE_ENV para test e executar o script de seeder. O script seeder irá criar a conexão com o banco de dados de teste, verificará se existe dados nesse banco e se existir irá limpá-lo. Então executará as migrations e logo após os seeders, que mockarão alguns dados para serem utilizados nos testes. E após a execução de todos os testes será executado o script posttest o qual irá limpar o banco de dados de teste para que numa próxima execução de teste o banco ja esteja vazio. Para isso dentro de `src` crie uma pasta com nome `scripts` e dentro dela o arquivo `Seeders.ts` com a seguinte configuração:

```ts
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Connection } from 'typeorm';
import { DataSeed } from '../database/seeders/DataSeed';
import createConnection from '../database/index';
import 'dotenv/config';

class SeederRun {
  public static async run() {
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'development') {
      try {
        const connection = await createConnection();
        console.log('\n== [Database connection] ==');

        const entitiesExists = await DataSeed.verifyEntities();
        if (entitiesExists) {
          console.log('\n== Database is already populated ==\n');

          await this.queryDropTables(connection);
          console.log('== Database initialized ==\n');
        }

        await connection.runMigrations();
        console.log('\n== [Migrations run sucessfully] ==');

        await DataSeed.createUsers();
        console.log('\n== [Seeders run successfully] ==');

        await connection.close();
        console.log('\n== [Connection database close] ==\n');
      } catch (error) {
        console.log('\nError:', error);
      }
    } else {
      console.log('Seeders should only be run in local environments');
    }
  }

  private static async queryDropTables(connection: Connection): Promise<void> {
    await connection.query('SET FOREIGN_KEY_CHECKS = 0;');

    const listTables: { table_name: string }[] = await connection.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = '${process.env.BD_DATABASE_TEST}'`,
    );
    const listTableNames = listTables.map(table => table.table_name);

    for (const table of listTableNames) {
      await connection.query(`DROP TABLE ${process.env.BD_DATABASE_TEST}.${table}`);
      console.log(` * drop table: ${table}`);
    }

    await connection.query('SET FOREIGN_KEY_CHECKS = 1;');
  }
}

SeederRun.run();
```

- Note que no código acima é utilizado a classe `DataSeed`, o mesmo deve ser criado em `src/database/seeders/DataSeed.ts`. Será nesse arquivo que serão mockados os dados para o banco de teste. Abaixo segue um exemplo do arquivo `DataSeed.ts` contendo uma entidade users:

```ts
import { getCustomRepository } from "typeorm";
import { EnumRoleUser } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";

class DataSeed {
  public static async verifyEntities(): Promise<boolean> {
    const repositoryUser = getCustomRepository(UserRepository);
    try {
      const allUsers = await repositoryUser.find();
      return !!allUsers.length;
    } catch (error) {
      return false;
    }
  }

  public static async createUsers(): Promise<void> {
    const repository = getCustomRepository(UserRepository);
    const arrayUsers = [];

    arrayUsers.push(
      repository.create({
        name: "User 1",
        email: "user1@gmail.com",
        password: "123456",
        role: EnumRoleUser.SUPER,
      })
    );
    arrayUsers.push(
      repository.create({
        name: "User 2",
        email: "user2@gmail.com",
        password: "123456",
        role: EnumRoleUser.NORMAL,
      })
    );
    arrayUsers.push(
      repository.create({
        name: "User 3",
        email: "user3@gmail.com",
        password: "123456",
        role: EnumRoleUser.NORMAL,
      })
    );
    arrayUsers.push(
      repository.create({
        name: "User 4",
        email: "user4@gmail.com",
        password: "123456",
        role: EnumRoleUser.EMPLOYEE,
      })
    );

    await repository.save(arrayUsers);
  }
}

export { DataSeed };
```

- Dentro de `scripts` criar também o arquivo `afterAllTests` com a seguinte configuração:

```ts
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Connection } from 'typeorm';
import createConnection from '../database/index';
import 'dotenv/config';

class DropDatabase {
  public static async run(): Promise<string> {
    const connection = await createConnection();
    console.log('\n== [Database connection] ==');

    await this.queryDropTables(connection);
    console.log('\n== DROP TABLES SUCESSFULLY ==');

    await connection.close();
    console.log('\n== CONNECTION DATABASE CLOSE ==\n');

    return process.env.BD_DATABASE_TEST || '';
  }

  private static async queryDropTables(connection: Connection): Promise<void> {
    await connection.query('SET FOREIGN_KEY_CHECKS = 0;');

    const listTables: { table_name: string }[] = await connection.query(
      `SELECT table_name FROM information_schema.tables WHERE table_schema = '${process.env.BD_DATABASE_TEST}'`,
    );
    const listTableNames = listTables.map(table => table.table_name);

    for (const table of listTableNames) {
      await connection.query(`DROP TABLE ${process.env.BD_DATABASE_TEST}.${table}`);
      console.log(` * drop table: ${table}`);
    }

    await connection.query('SET FOREIGN_KEY_CHECKS = 1;');
  }
}

DropDatabase.run();
```

- Para cada arquivo de teste de integração será necessário que antes de executar todos os teste daquele arquivo primeiramente seja criado a conexão com o banco de dados, e após a execução de todos os testes essa conexão seja encerrada. Segue um exemplo da configuração de um arquivo de teste de integração:

```ts
import request from 'supertest';
import { getConnection, getCustomRepository } from 'typeorm';
import { app } from '../../app';
import createConnection from '../../database';

...

describe('Users', () => {
  beforeAll(async () => {
    await createConnection();
    const Login = await request(app).post('/signin').send(loginUser);
    token = Login.body.token;
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.close();
  });

  ...

});
```

## Configuração para o build da aplicação e deploy no Heroku

- Necessário a criação de um app na plataforma heroku e um banco mysql.
- Em `package.json` criar o script de `build` e `start`. Build para gerar o código javascript que será executado no servidor heroku, e o script start que apontará a execução do servidor para o código javascript:

```json
  "scripts": {
    "build": "tsc",
    "start": "node build/src/server",
    "dev": "ts-node-dev --files --transpile-only --ignore-watch node_modules src/server.ts",
    "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js",
    "pretest": "set NODE_ENV=test&&ts-node-dev src/scripts/Seeders.ts",
    "test": "jest",
    "posttest": "ts-node-dev src/scripts/afterAllTests.ts",
    "seed": "ts-node-dev src/scripts/Seeders.ts",
    "clean": "ts-node-dev src/scripts/afterAllTests.ts"
  },
```

- Em `tsconfig.json` informar a o diretório onde ficará o build da aplicação (pasta onde será transpilado o código de typescript para javascript). E informar o rootDir ou seja a partir de qual reposítório deve ser feito a transpilação de código. Basta apenas adicionar esses dois atributos em `tsconfig.json`

```json
"outDir": "build",
"rootDir": "./",
```

- Em `ormconfig.js` definir as variáveis de ambiente do banco de dados de produção criado no heroku.

```js
require("dotenv").config();

let config = {};
if (process.env.NODE_ENV === "development") {
  config = {
    type: "mysql",
    host: "localhost",
    port: +process.env.BD_PORT || 3306,
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
} else if (process.env.NODE_ENV === "test") {
  config = {
    type: "mysql",
    host: "localhost",
    port: +process.env.BD_PORT_TEST || 3306,
    username: process.env.BD_USERNAME_TEST,
    password: process.env.BD_PASSWORD_TEST,
    database: process.env.BD_DATABASE_TEST,
    synchronize: false,
    migrations: ["src/database/migrations/*.ts"],
    entities: ["src/entities/*.ts"],
    cli: {
      migrationsDir: "./src/database/migrations",
    },
  };
} else if (process.env.NODE_ENV === "production") {
  config = {
    type: "mysql",
    host: process.env.BD_HOST_PROD,
    port: +process.env.BD_PORT_PROD || 3306,
    username: process.env.BD_USERNAME_PROD,
    password: process.env.BD_PASSWORD_PROD,
    database: process.env.BD_DATABASE_PROD,
    synchronize: false,
    extra: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    migrations: ["build/src/database/migrations/*.js"],
    entities: ["build/src/entities/*.js"],
    cli: {
      migrationsDir: "build/src/database/migrations",
    },
  };
} else {
  console.log("NODE_ENV incorrect...");
}

module.exports = config;
```

- Não se esquecer de atualizar as variáveis de ambiente novas em `.env` e `.env.example`. As variáveis do banco de produção e as variáveis `PORT`, `NODE_ENV` e `JWT_SECRET` devem ser utilizadas no heroku também. Para rodar as tabelas do banco de dados no heroku, basta alterar a variável `NODE_ENV` para `production` e rodar a migration. Com as configurações que foram realizadas neste projeto será através da variável de ambiente `NODE_ENV` que defineremos para qual ambiente ou banco de dados a aplicação deve apontar.

- Por fim basta criar um arquivo com nome `ProcFile` dentro da raiz do projeto para que o heroku saiba qual comando deve ser iniciado, com o seguinte conteúdo nesse arquivo:

```ProcFile
web: npm start
```
---

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
