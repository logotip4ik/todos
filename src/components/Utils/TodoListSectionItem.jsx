import styles from '../../styles/Utils/TodoListSectionItem.module.scss';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import useUser from '../../hooks/useUser';

function TodoListSectionItem({ todo }) {
  const { gunUser } = useUser();

  const toggleComplete = useCallback(() => {
    gunUser().get('todos').get(todo.id).get('completed').put(!todo.completed);
  }, [todo, gunUser]);

  return (
    <motion.li
      layout
      className={`${styles.todo} ${
        todo.completed ? styles['todo--completed'] : ''
      }`}
    >
      <motion.button
        className={`${styles.todo__button} ${
          todo.completed ? styles['todo__button--completed'] : ''
        }`}
        onClick={toggleComplete}
        whileTap={{ scale: 0.97 }}
        transition={{ ease: 'anticipate' }}
      ></motion.button>
      <p
        className={`${styles.todo__text} ${
          todo.completed ? styles['todo__text--completed'] : ''
        }`}
      >
        {todo.data}
      </p>
    </motion.li>
  );
}

export default TodoListSectionItem;
