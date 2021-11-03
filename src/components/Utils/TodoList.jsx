import styles from '../../styles/Utils/TodoList.module.scss';

import { useMemo, useState } from 'react';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import TodoListSection from './TodoListSection';
import TodoCard from './TodoCard';

const dateLength = 16;

function TodoList({
  rawTodos,
  isShowingDetails,
  onDeleteTodo,
  onIsShowingDetails,
}) {
  const [selectedTodo, setSelectedTodo] = useState(null);

  const todos = useMemo(() => {
    const todosArray = Object.values(rawTodos);

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
    <AnimateSharedLayout type="crossfade">
      <motion.ol layout className={styles.list}>
        {todosDates.map((date) => (
          <TodoListSection
            key={date}
            date={date}
            todos={todos[date]}
            selectedTodo={selectedTodo}
            isShowingDetails={isShowingDetails}
            onSelectTodo={(todo) => setSelectedTodo(todo)}
            onDeleteTodo={(todo) => onDeleteTodo(todo)}
            onShowDetails={(ev) => onIsShowingDetails(ev)}
          />
        ))}
      </motion.ol>
      <AnimatePresence exitBeforeEnter>
        {isShowingDetails && selectedTodo && <TodoCard todo={selectedTodo} />}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}

export default TodoList;
