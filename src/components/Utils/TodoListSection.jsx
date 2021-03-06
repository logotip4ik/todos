import styles from '../../styles/Utils/TodoListSection.module.scss';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import TodoListSectionItem from './TodoListSectionItem';

let rotated = 0;

function TodoListSection({
  appState,
  date,
  tags,
  todos,
  filteringBy,
  isShowingDetails,
  selectedTodo,
  onSelectTodo,
  onDeleteTodo,
  onFilteringBy,
  onShowDetails,
  onSetAppState,
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.li layout className={styles.section}>
      <motion.div layout className={styles.section__header}>
        <AnimatePresence exitBeforeEnter>
          <motion.h2 className={styles.section__header__title}>
            {date}
          </motion.h2>
        </AnimatePresence>
        <motion.button
          className={styles.section__header__button}
          onClick={() => {
            setIsCollapsed((bool) => !bool);
            rotated += 180;
          }}
          animate={{ rotate: rotated }}
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
              appState={appState}
              tags={tags}
              filteringBy={filteringBy}
              selectedTodo={selectedTodo}
              isShowingDetails={isShowingDetails}
              onSelectTodo={(todoEv) => onSelectTodo(todoEv)}
              onDeleteTodo={(todoEv) => onDeleteTodo(todoEv)}
              onShowDetails={(ev) => onShowDetails(ev)}
              onSetAppState={(state) => onSetAppState(state)}
              onFilteringBy={(filters) => onFilteringBy(filters)}
            />
          ))}
      </motion.ul>
    </motion.li>
  );
}

export default TodoListSection;
