/* eslint-disable no-console */
/* eslint-disable no-alert */
import { useEffect, useState } from 'react';

export function UseEffectExample() {
  const [name, setName] = useState('');

  // com array de dependencias vazio, é executado o que está na função somente a primeira vez
  useEffect(() => {
    if (window.confirm('Você é homem?')) {
      console.log('Homem');
    } else {
      console.log('Mulher');
    }
  }, []);

  // com o estado no array de dependencias esse useEffect será executado quando inicializar o componente e quando o estado de name se alterar tb
  useEffect(() => {
    console.log(name);
  }, [name]);

  return (
    <form>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
    </form>
  );
}
