import styles from '../../styles/Utils/TodoList.module.scss';

import { useMemo } from 'react';
import { motion } from 'framer-motion';

const dateLength = 16;

function TodoList({ rawTodos }) {
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
        <motion.li key={date} layout className={styles.list__section}>
          <motion.h2 className={styles.list__section__header}>{date}</motion.h2>
          <motion.ul layout className={styles.list__section__todos}>
            {todos[date].map((todo) => (
              <motion.li
                key={todo.id}
                layout
                className={styles.list__section__todos__todo}
              >
                <button
                  className={`${styles.list__section__todos__todo__button} ${
                    todo.completed
                      ? styles['list__section__todos__todo__button--completed']
                      : ''
                  }`}
                  onClick={() => {}}
                ></button>
                <p className={styles.list__section__todos__todo__text}>
                  {todo.data}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.li>
      ))}
    </motion.ol>
  );
}

export default TodoList;
