import styles from '../../styles/Utils/TodoList.module.scss';

import { useMemo } from 'react';
import { motion, AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import { format, register } from 'timeago.js';
import TodoListSection from './TodoListSection';
import TodoCard from './TodoCard';

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

const getSummaryDate = (values, key) => {
  let dateTime = 0;

  for (const value of values) {
    dateTime += new Date(value[key]).getTime();
  }

  return new Date(dateTime / values.length);
};

const dateLength = 16;

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
