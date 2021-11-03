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
      <motion.p layoutId={`todo-text-${todo.id}`} className={styles.card__text}>
        {todo.data}
      </motion.p>
    </motion.div>
  );
}

export default TodoCard;
