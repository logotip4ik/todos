import styles from '../../styles/Utils/TodoList.module.scss';

import { useMemo } from 'react';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import { format } from 'timeago.js';
import TodoListSection from './TodoListSection';
import TodoCard from './TodoCard';

const dateLength = 16;

const getSummaryDate = (values, key) => {
  let dateTime = 0;

  for (const value of values) {
    dateTime += new Date(value[key]).getTime();
  }

  return new Date(dateTime / values.length);
};

function TodoList({
  appState,
  selectedTodo,
  rawTodos,
  tags,
  filteringBy,
  sortBy,
  sortingOrder,
  isShowingDetails,
  onSetSelectedTodo,
  onSetAppState,
  onDeleteTodo,
  onFilteringBy,
  onIsShowingDetails,
}) {
  const todos = useMemo(() => {
    let todosArray = Object.values(rawTodos);
    if (filteringBy.length > 0) {
      todosArray = todosArray.filter((todo) =>
        todo.tags.includes(filteringBy[0]),
      );
    }

    // this function is structuring date in a proper way
    // [{ id: 1, data: "hello world, createdAt: "Sat, 31 Oct 2021"}] ->
    // { "Sat, 31 Oct 2021": [{ id: 1, data: "hello world", createdAt: "Sat, 31 Oct 2021"}] }
    return todosArray.reduce((acc, todo) => {
      const timestamp = todo[sortBy].slice(0, dateLength);
      const t = format(timestamp, 'simple_Locale');
      return {
        ...acc,
        // [timestamp]: acc[timestamp] ? [...acc[timestamp], todo] : [todo],
        [t]: acc[t] ? [...acc[t], todo] : [todo],
      };
    }, {});
  }, [rawTodos, filteringBy, sortBy]);

  const todosDates = useMemo(() => {
    // this need to be entries to later on in reduce map from key value to only a key, but values used to calculate summary time
    const dates = Object.entries(todos);

    const sortedTodosDates = dates
      .sort(
        ([_, aValue], [__, bValue]) =>
          getSummaryDate(bValue, sortBy) - getSummaryDate(aValue, sortBy),
      )
      .reduce((acc, [key]) => [...acc, key], []);

    if (sortingOrder === 'desc') return sortedTodosDates.reverse();
    return sortedTodosDates;
  }, [todos, sortBy, sortingOrder]);

  return (
    <AnimateSharedLayout type="crossfade">
      <motion.ol layout className={styles.list}>
        {todosDates.map((date) => (
          <TodoListSection
            key={date}
            appState={appState}
            tags={tags}
            date={date}
            todos={todos[date]}
            filteringBy={filteringBy}
            selectedTodo={selectedTodo}
            isShowingDetails={isShowingDetails}
            onSetAppState={(state) => onSetAppState(state)}
            onSelectTodo={(todo) => onSetSelectedTodo(todo)}
            onDeleteTodo={(todo) => onDeleteTodo(todo)}
            onFilteringBy={(filters) => onFilteringBy(filters)}
            onShowDetails={(ev) => onIsShowingDetails(ev)}
          />
        ))}
      </motion.ol>
      <AnimatePresence exitBeforeEnter>
        {isShowingDetails && selectedTodo && <TodoCard todo={selectedTodo} />}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}

export default TodoList;
