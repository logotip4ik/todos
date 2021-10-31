import styles from '../../styles/Utils/TodoListSection.module.scss';

import { motion } from 'framer-motion';
import TodoListSectionItem from './TodoListSectionItem';

function TodoListSection({ date, todos }) {
  return (
    <motion.li layout className={styles.section}>
      <motion.h2 className={styles.section__header}>{date}</motion.h2>
      <motion.ul layout className={styles.section__todos}>
        {todos.map((todo) => (
          <TodoListSectionItem key={todo.id} todo={todo} />
        ))}
      </motion.ul>
    </motion.li>
  );
}

export default TodoListSection;
