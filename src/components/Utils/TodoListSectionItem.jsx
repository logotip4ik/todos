import styles from '../../styles/Utils/TodoListSectionItem.module.scss';

import { motion } from 'framer-motion';

function TodoListSectionItem({ todo }) {
  return (
    <motion.li layout className={styles.todo}>
      <button
        className={`${styles.todo__button} ${
          todo.completed ? styles['todo__button--completed'] : ''
        }`}
        onClick={() => {}}
      ></button>
      <p className={styles.todo__text}>{todo.data}</p>
    </motion.li>
  );
}

export default TodoListSectionItem;
