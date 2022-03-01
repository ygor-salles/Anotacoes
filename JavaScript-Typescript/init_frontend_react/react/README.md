# Projeto frontend react

inicializando um projeto hellow world com react

### 1 - Inicializando projeto

```bash
yarn create react-app iniciando-react --template typescript
```

### 2 - excluir arquivos desnecessário do projeto

- Em `public` remover tudo exceto `index.html`

- Em `src` remover:

- `App.css`
- `App.test.tsx`
- `index.css`
- `logo.svg`
- `reportWebVitals.ts`
- `setupTests.ts`

### 3 - Em `public/index.html` dentro da tag head deixar somente: charset, viewport, title

### 4 - Em `src/index.tsx` deixar somente:

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <React.StricMode>
        <App />
    </React.StricMode>,
    document.getElementById('root');
);
```

### 5 - Deletar todas as importações dentro de `App.tsx`, e todo o conteúdo da função App deixando apenas

```tsx
import React from "react";

export function App() {
  return <h1>Hellow world</h1>;
}
```

### 6 - Pronto! Basta executar `yarn start` que o projeto já estará rodando na porta 3000

### OBS:

- Caso utilize variáveis de ambiente no projeto, utilize sempre com a nomeclatura `REACT_APP` na frente. Exemplo ao utilizar uma variavel de `.env`: `process.env.REACT_APP_BASE_URL`

---

## Adicionando ESLINT + PRETTIER para padronização de código

- Essa etapa é opcional, para caso queira deixar o seu código padronizado ou até mesmo para que várias pessoas desenvolvam seguindo o mesmo padrão de formatação no typescript tais  como: usar ou não usar ponto e vírgula, quebra de linhas, etc. 
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
  },
  "files.eol": "\n",
  "diffEditor.ignoreTrimWhitespace": false
}
```

- Note que nas configurações acima há um atributo `[typescript]` setado no vscode com uma configuração padrão para formatação de códigos typescript. Remova-a do JSON e salve, para que possa ser utilizado o padrão eslint e prettier que será configurado posteriormente em seu projeto.

- Verificar também se nesse arquivo JSON de configuração, o atributo `"editor.formatOnSave"` está setado para true. O mesmo deve estar setado para true para que quando for salvar o seu código typescript, automaticamente formate o código para o padrão eslint prettier configurado.

- Outro atributo importante que deve estar nesse aquivo `settings.json` é o `"files.eol: "\n"` e `"diffEditor.ignoreTrimWhitespace": false`, eles devem estar nesse arquivo para que os arquivos typescript do projeto estejam no formato LF. Após isso, salvar as alterações e fechar o arquivo `settings.json` do seu VSCode

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
- `Wich framework does your project use?`: `React`
- `Does your project use TypeScript`: `Yes`
- `Where does your code run? ...`: `* browser`
- `How would you like to define a style for you project? ...`: `Use a popular style guide`
- `Wich style guide do you want to follow? ...`: `Airbnb: https://github.com/airbnb/javascript`
- `What format do you want your config file to be in? ...`: `JSON`
- `Would you like to install them now with npm?`: `Yes`

- Como na última escolha `Would you like to install them now with npm?` clicamos em sim e estamos utilizando o projeto com o gerenaciador `yarn`, será necessário remover o arquivo `package-lock.json` do projeto

- Após remover este arquivo, executar o comando:

```bash
yarn
```

- Instalar as dependencias do eslint para resolver padrões de importações em ambiente de desenvolvimento:
```bash
yarn add eslint-plugin-import-helpers eslint-import-resolver-typescript -D
```

- Instalar as dependencias do prettier em ambiente de desenvolvimento:
```bash
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
```

- Após a instalação dessas dependências será gerado um arquivo na raiz do projeto chamado de `.eslintrc.json`, nele serão setadas todas as configurações de formatação do código e o que deve ou não ser usado como padrão como boas práticas de código. A personalização fica a critério, abaixo segue a personalização de código que utilizo no arquivo `.eslintrc.json`

```json
{
    "env": {
        "browser": true,
        "es2021": true,
        "jest": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint",
        "eslint-plugin-import-helpers",
        "prettier"
    ],
    "rules": {
        "linebreak-style":"off",
        "camelcase": "off",
        "import/no-unresolved": "error",
        "@typescript-eslint/naming-convention": [
            "error",
            {
                "selector": "interface",
                "format": [
                    "PascalCase"
                ],
                "custom": {
                    "regex": "^I[A-Z]",
                    "match": true
                }
            }
        ],
        "class-methods-use-this": "off",
        "import/prefer-default-export": "off",
        "no-shadow": "off",
        "no-console": "off",
        "no-useless-constructor": "off",
        "no-empty-function": "off",
        "lines-between-class-members": "off",
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "ts": "never",
                "tsx": "never"
            }
        ],
        "import-helpers/order-imports": [
            "warn",
            {
                "newlinesBetween": "always",
                "groups": [
                    "module",
                    "/^@shared/",
                    [
                        "parent",
                        "sibling",
                        "index"
                    ]
                ],
                "alphabetize": {
                    "order": "asc",
                    "ignoreCase": true
                }
            }
        ],
        "import/no-extraneous-dependencies": [
            "error",
            {
                "devDependencies": [
                    "**/*.spec.js"
                ]
            }
        ],
        "prettier/prettier": "error",
        "react/jsx-filename-extension": [
            1,
            {
                "extensions": [
                    ".jsx",
                    ".tsx"
                ]
            }
        ],
        "react/react-in-jsx-scope": "off",
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": [
            "error"
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
dist
coverage
**/*.js
node_modules
assets
```

- Pronto basta recarregar o VSCode que as configurações do prettier+eslint serão aplicadas ao seu projeto.
