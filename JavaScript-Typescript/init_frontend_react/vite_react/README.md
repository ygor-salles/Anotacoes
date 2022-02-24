# Projeto frontend vite-react

inicializando um projeto hellow world com vite-react

### 1 - Inicializando projeto

```bash
yarn create vite iniciando-react --template react-ts
```

### 2 - instalar as dependencias

```bash
yarn
```

### 3 - excluir arquivos desnecessário do projeto

- `App.css`
- `favicon.svg`
- `index.css`
- `logo.svg`

### 4 - Deletar todas as importações dentro de `App.tsx`, e todo o conteúdo da função App deixando apenas

```tsx
export function App() {
  return <h1>Hellow world</h1>;
}
```

### 5 - Em `main.tsx` remover a importação do index.css

### 6 - Pronto! Basta executar `yarn dev` que o projeto já estará rodando na porta 3000

### OBS:

- ao utilizar o VITE e caso seja necessário a utilização de variáveis de ambiente ao invés de utilizar por exemplo:
  `process.env.REACT_APP_BASE_URL`, utilize `import.meta.env.VITE_BASE_URL`.
  Atente-se que para utilizar variáveis de ambiente em projeto react tradicional era necessário a nomeclatura `REACT_APP`
  na frente da variável, para o React com o Vite é necessário a palavra `VITE`
