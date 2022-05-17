/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import { useMemo, useState } from 'react';

const expensiveCalculation = (num: number) => {
  console.log('Calculating...');
  for (let i = 0; i < 1000000000; i++) {
    num += 1;
  }
  return num;
};

// Note que expansive calculation é uma função custosa, e que não precisa ser executada quando o react remonta o componente a cada evento,
// e só será executada quando o react remontar o componente cujo evento estiver relacionada a ela q no caso é a alteração do estado count

// o exemplo pode ser facilmente compreendido em https://www.w3schools.com/react/react_usememo.asp
export function UseMemoExample() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);
  const calculation = useMemo(() => expensiveCalculation(count), [count]);

  const increment = () => {
    setCount(c => c + 1);
  };
  const addTodo = () => {
    setTodos(t => [...t, 'New Todo']);
  };

  return (
    <div>
      <div>
        <h2>My Todos</h2>
        {todos.map((todo, index) => {
          return <p key={index}>{todo}</p>;
        })}
        <button onClick={addTodo}>Add Todo</button>
      </div>
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
        <h2>Expensive Calculation</h2>
        {calculation}
      </div>
    </div>
  );
}
