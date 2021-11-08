import styles from '../../styles/Utils/TodoCard.module.scss';
import { motion } from 'framer-motion';

function TodoCard({ todo, onDeselectTodo }) {
  return (
    <motion.div
      onClick={onDeselectTodo}
      className={styles.card}
      key={`todo-card-${todo.id}`}
      layoutId={`todo-container-${todo.id}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {todo.tags.length > 0 && (
        <motion.ul
          layoutId={`todo-tags-${todo.id}`}
          className={styles.card__tags}
        >
          {todo.tags.map(({ label }, i) => (
            <motion.li
              layoutId={`todo-tag-${todo.id}`}
              key={`${todo.id}-${i}`}
              className={styles.card__tags__tag}
            >
              {label}
            </motion.li>
          ))}
        </motion.ul>
      )}
      <motion.p layoutId={`todo-text-${todo.id}`} className={styles.card__text}>
        {todo.data}
      </motion.p>
    </motion.div>
  );
}

export default TodoCard;
