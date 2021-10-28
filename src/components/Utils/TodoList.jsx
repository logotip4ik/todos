import { useMemo } from 'react';

function TodoList({ rawTodos }) {
  const todos = useMemo(() => Array.from(rawTodos), [rawTodos]);

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.data}</li>
      ))}
    </ul>
  );
}

export default TodoList;
