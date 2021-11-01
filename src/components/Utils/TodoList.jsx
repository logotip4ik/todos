import styles from '../../styles/Utils/TodoList.module.scss';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import TodoListSection from './TodoListSection';

const dateLength = 16;

function TodoList({ rawTodos }) {
  const [selectedTodo, setSelectedTodo] = useState(null);

  const todos = useMemo(() => {
    const todosArray = Array.from(rawTodos);

    // this function is structuring date in a proper way
    // [{ id: 1, data: "hello world, createdAt: "Sat, 31 Oct 2021"}] ->
    // { "Sat, 31 Oct 2021": [{ id: 1, data: "hello world", createdAt: "Sat, 31 Oct 2021"}] }
    return todosArray.reduce((acc, todo) => {
      const createdAt = todo.createdAt.slice(0, dateLength);
      return {
        ...acc,
        [createdAt]: acc[createdAt] ? [...acc[createdAt], todo] : [todo],
      };
    }, {});
  }, [rawTodos]);

  const todosDates = useMemo(() => {
    const dates = Object.keys(todos);

    return dates.sort((a, b) => new Date(b) - new Date(a));
  }, [todos]);

  return (
    <motion.ol layout className={styles.list}>
      {todosDates.map((date) => (
        <TodoListSection
          key={date}
          date={date}
          todos={todos[date]}
          selectedTodo={selectedTodo}
          onSelectTodo={(id) => setSelectedTodo(id)}
        />
      ))}
    </motion.ol>
  );
}

export default TodoList;
