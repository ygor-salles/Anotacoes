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
