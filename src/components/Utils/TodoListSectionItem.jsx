import styles from '../../styles/Utils/TodoListSectionItem.module.scss';

import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import useUser from '../../hooks/useUser';
import Create from '../Pages/Create';

const actionsVariants = {
  initial: { opacity: 0, scale: 1, y: '-130%' },
  animate: { opacity: 1, scale: 1.025, y: '0%' },
};

function TodoListSectionItem({
  todo,
  isShowingDetails,
  selectedTodo,
  onSelectTodo,
  onDeleteTodo,
  onShowDetails,
}) {
  const { gunUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);

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

  const handleDoubleClick = useCallback(() => {
    onSelectTodo(todo);
    onShowDetails(true);
  }, [onShowDetails, onSelectTodo, todo]);

  const handleEdit = useCallback(
    (todoEv) => {
      gunUser()
        .get('todos')
        .get(todoEv.id)
        .get('data')
        .put(todoEv.data)
        .back()
        .get('updatedAt')
        .put(todoEv.updatedAt);

      setIsEditing(false);
    },
    [gunUser],
  );

  const handleDelete = useCallback(
    (ev) => {
      ev.stopPropagation();
      onDeleteTodo(todo);
      gunUser()
        .get('todos')
        .get(todo.id)
        .put(null, () => toast('Deleted todo', { icon: '⚠' }));
    },
    [gunUser, todo, onDeleteTodo],
  );

  // TODO idk, why but buttons is not under the card, try ti fix later
  return (
    <>
      <motion.li
        layout
        className={styles.todo__wrapper}
        animate={{
          marginBottom: selectedTodo?.id === todo.id ? '3.25rem' : '0rem',
          opacity: 1,
        }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          layoutId={`todo-container-${todo.id}`}
          className={`${styles.todo} ${
            todo.completed ? styles['todo--completed'] : ''
          } ${selectedTodo?.id === todo.id ? styles['todo--selected'] : ''}`}
          onClick={handleSelect}
          whileTap={selectedTodo?.id !== todo.id ? { scale: 0.98 } : {}}
          onDoubleClick={handleDoubleClick}
        >
          <motion.button
            className={`${styles.todo__button} ${
              todo.completed ? styles['todo__button--completed'] : ''
            }`}
            layout
            onClick={toggleComplete}
            whileTap={{ scale: 0.97 }}
            transition={{ ease: 'anticipate' }}
          ></motion.button>
          <motion.p
            className={`${styles.todo__text} ${
              todo.completed ? styles['todo__text--completed'] : ''
            }`}
            layoutId={`todo-text-${todo.id}`}
          >
            {todo.data}
          </motion.p>
          {todo.tags.length > 0 && (
            <motion.ul
              className={styles.todo__tags}
              layoutId={`todo-tags-${todo.id}`}
            >
              {todo.tags.map((tag, i) => (
                <motion.li
                  className={styles.todo__tags__tag}
                  key={`${todo.id}-${i}`}
                  layoutId={`todo-tag-${todo.id}`}
                >
                  {tag.label}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </motion.div>
        <AnimatePresence>
          {selectedTodo?.id === todo.id && !isShowingDetails && (
            <motion.div
              className={styles.todo__actions}
              initial="initial"
              animate="animate"
              exit="initial"
              variants={actionsVariants}
              onClick={() => setIsEditing((bool) => !bool)}
            >
              <motion.button layout className={styles.todo__actions__button}>
                Edit
              </motion.button>
              <motion.button
                layout
                className={styles.todo__actions__button}
                onClick={handleDelete}
              >
                Delete
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.li>
      <Create
        isOpened={isEditing}
        initialTodo={todo}
        onCreate={handleEdit}
        submitButtonText="Update"
        onClose={() => setIsEditing(false)}
      />
    </>
  );
}

export default TodoListSectionItem;
