/* eslint-disable react/no-array-index-key */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMemo, useRef, useState } from 'react';

// useRef serve para armazenar variáveis comuns no qual mesmo que seu valor altere o componente não é re-renderizado.
// E mesmo que o componente re-renderize por algum evento seu valor do useRef não é alterado

// Outra aplicabilidade do useRef é o acesso dos elementos direto pela DOM conforme o exemplo abaixo
export function UseRefExample() {
  const inputPasswordRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const emailLength = useMemo(() => {
    return email.length * 1000;
  }, [email.length]);

  const handleEntrar = () => {
    console.log(email);
    console.log(password);
  };

  return (
    <div>
      <form>
        <p>Quantidade de caracteres no email: {emailLength}</p>

        <label>
          <span>Email</span>
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            onKeyDown={e => (e.key === 'Enter' ? inputPasswordRef.current?.focus() : undefined)}
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            type="password"
            value={password}
            ref={inputPasswordRef}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleEntrar}>
          Entrar
        </button>
      </form>
    </div>
  );
}
