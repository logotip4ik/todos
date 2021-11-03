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
  isShowingDetails,
  selectedTodo,
  onSelectTodo,
  onDeleteTodo,
  onShowDetails,
}) {
  const [isShowingTimeAgo, setIsShowingTimeAgo] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleShowingTimeAgo = useCallback(() => {
    onSelectTodo(null);
    setIsShowingTimeAgo((bool) => !bool);
  }, [onSelectTodo]);

  return (
    <motion.li layout className={styles.section}>
      <motion.div layout className={styles.section__header}>
        <AnimatePresence exitBeforeEnter>
          {isShowingTimeAgo ? (
            <motion.h2
              initial="initial"
              animate="animate"
              exit="initial"
              variants={headerTextVariants}
              className={styles.section__header__title}
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
              className={styles.section__header__title}
              key="2"
              onClick={toggleShowingTimeAgo}
            >
              {date}
            </motion.h2>
          )}
        </AnimatePresence>
        <motion.button
          className={styles.section__header__button}
          onClick={() => setIsCollapsed((bool) => !bool)}
          animate={{ rotate: isCollapsed ? 180 : 0 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width="20"
            height="32"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 10 16"
          >
            <path
              fillRule="evenodd"
              d="M5 11L0 6l1.5-1.5L5 8.25L8.5 4.5L10 6l-5 5z"
            ></path>
          </svg>
        </motion.button>
      </motion.div>
      <motion.ul layout className={styles.section__todos}>
        {todos
          .sort((todo) => todo.completed)
          .filter((todo) => !isCollapsed || !todo.completed)
          .map((todo) => (
            <TodoListSectionItem
              key={todo.id}
              todo={todo}
              selectedTodo={selectedTodo}
              isShowingDetails={isShowingDetails}
              onSelectTodo={(todoEv) => onSelectTodo(todoEv)}
              onDeleteTodo={(todoEv) => onDeleteTodo(todoEv)}
              onShowDetails={(ev) => onShowDetails(ev)}
            />
          ))}
      </motion.ul>
    </motion.li>
  );
}

export default TodoListSection;
