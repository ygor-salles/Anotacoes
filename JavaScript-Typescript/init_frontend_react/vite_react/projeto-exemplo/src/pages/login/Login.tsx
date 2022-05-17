/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Form } from './styles';

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleNavigateDashboard = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (email && password) {
      navigate('/pagina-inicial');
    } else {
      alert('Formulário inválido');
    }
  };

  return (
    <Form onSubmit={handleNavigateDashboard}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />
      </label>
      <Button type="submit">Logar</Button>
    </Form>
  );
}
