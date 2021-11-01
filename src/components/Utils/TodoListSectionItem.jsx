import styles from '../../styles/Utils/TodoListSectionItem.module.scss';

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useUser from '../../hooks/useUser';

const actionsVariants = {
  initial: { opacity: 0, scale: 1, y: '-100%' },
  animate: { opacity: 1, scale: 1.1, y: '0%' },
};

function TodoListSectionItem({ todo, selectedTodo, onSelectTodo }) {
  const { gunUser } = useUser();

  const toggleComplete = useCallback(
    (ev) => {
      ev.stopPropagation();
      gunUser().get('todos').get(todo.id).get('completed').put(!todo.completed);
    },
    [todo, gunUser],
  );

  const handleSelect = useCallback(
    (ev) => {
      ev.preventDefault();
      onSelectTodo(selectedTodo?.id === todo.id ? null : todo);
    },
    [onSelectTodo, selectedTodo, todo],
  );

  // TODO idk, why but buttons is not under the card, try ti fix later
  return (
    <motion.li
      layout
      className={styles.todo__wrapper}
      animate={{
        marginBottom: selectedTodo?.id === todo.id ? '3.25rem' : '0rem',
      }}
    >
      <motion.div
        layout
        className={`${styles.todo} ${
          todo.completed ? styles['todo--completed'] : ''
        } ${selectedTodo?.id === todo.id ? styles['todo--selected'] : ''}`}
        onClick={handleSelect}
        animate={selectedTodo?.id === todo.id ? { scale: 1.1 } : {}}
        whileTap={selectedTodo?.id !== todo.id ? { scale: 0.98 } : {}}
      >
        <motion.button
          className={`${styles.todo__button} ${
            todo.completed ? styles['todo__button--completed'] : ''
          }`}
          onClick={toggleComplete}
          whileTap={{ scale: 0.97 }}
          transition={{ ease: 'anticipate' }}
        ></motion.button>
        <motion.p
          className={`${styles.todo__text} ${
            todo.completed ? styles['todo__text--completed'] : ''
          }`}
        >
          {todo.data}
        </motion.p>
      </motion.div>
      <AnimatePresence>
        {selectedTodo?.id === todo.id && (
          <motion.div
            className={styles.todo__actions}
            initial="initial"
            animate="animate"
            exit="initial"
            variants={actionsVariants}
          >
            <motion.button layout className={styles.todo__actions__button}>
              Edit
            </motion.button>
            <motion.button layout className={styles.todo__actions__button}>
              Delete
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export default TodoListSectionItem;
