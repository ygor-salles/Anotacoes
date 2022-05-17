/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-array-index-key */
import { useState, memo, useCallback } from 'react';

interface ITipos {
  todos: string[];
  addTodo: () => void;
}

const Todos = memo(({ todos, addTodo }: ITipos) => {
  console.log('child render');
  return (
    <>
      <h2>My Todos</h2>
      {todos.map((todo, index) => {
        return <p key={index}>{todo}</p>;
      })}
      <button onClick={addTodo}>Add Todo</button>
    </>
  );
});

// O render "filho" só será executado quando TODOS for alterado. Isso é possível com a função useCallback e memo, onde memo armazena na memória o componente
// e como um componente é uma função é necessário utilizar o useCallback. Basta ver os logs no navegador
export function UseCallbackExample() {
  console.log('parent render');
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState([]);

  const increment = () => {
    setCount(c => c + 1);
  };
  const addTodo = useCallback(() => {
    setTodos(t => [...t, 'New Todo']);
  }, [todos]);

  return (
    <>
      <Todos todos={todos} addTodo={addTodo} />
      <hr />
      <div>
        Count: {count}
        <button onClick={increment}>+</button>
      </div>
    </>
  );
}
