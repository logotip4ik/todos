import styles from '../../styles/Utils/TodoListSection.module.scss';

import { motion, AnimatePresence } from 'framer-motion';
import { useCallback, useState } from 'react';
import { format, register } from 'timeago.js';
import TodoListSectionItem from './TodoListSectionItem';

const timeagoLocale = (number, index, totalSec) => {
  // number: the time ago / time in number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  return [
    ['Today'],
    ['Today'],
    ['Today'],
    ['Today'],
    ['Today'],
    ['Today'],
    ['Yesterday'],
    ['%s days ago'],
    ['1 week ago'],
    ['%s weeks ago'],
    ['1 month ago'],
    ['%s months ago'],
    ['1 year ago'],
    ['%s years ago'],
  ][index];
};
register('simple_Locale', timeagoLocale);

const headerTextVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

function TodoListSection({
  date,
  todos,
  selectedTodo,
  onSelectTodo,
  onDeleteTodo,
}) {
  const [isShowingTimeAgo, setIsShowingTimeAgo] = useState(true);

  const toggleShowingTimeAgo = useCallback(() => {
    onSelectTodo(null);
    setIsShowingTimeAgo((bool) => !bool);
  }, [onSelectTodo]);

  return (
    <motion.li layout className={styles.section}>
      <AnimatePresence exitBeforeEnter>
        {isShowingTimeAgo ? (
          <motion.h2
            initial="initial"
            animate="animate"
            exit="initial"
            variants={headerTextVariants}
            className={styles.section__header}
            key="1"
            onClick={toggleShowingTimeAgo}
          >
            {format(date, 'simple_Locale')}
          </motion.h2>
        ) : (
          <motion.h2
            initial="initial"
            animate="animate"
            exit="initial"
            variants={headerTextVariants}
            className={styles.section__header}
            key="2"
            onClick={toggleShowingTimeAgo}
          >
            {date}
          </motion.h2>
        )}
      </AnimatePresence>
      <motion.ul layout className={styles.section__todos}>
        {todos
          .sort((todo) => todo.completed)
          .map((todo) => (
            <TodoListSectionItem
              key={todo.id}
              todo={todo}
              selectedTodo={selectedTodo}
              onSelectTodo={(todoEv) => onSelectTodo(todoEv)}
              onDeleteTodo={(todoEv) => onDeleteTodo(todoEv)}
            />
          ))}
      </motion.ul>
    </motion.li>
  );
}

export default TodoListSection;
