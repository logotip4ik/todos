import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import useUser from './hooks/useUser';
import constants from './constants';

import Form from './components/Form';
import Loader from './components/Loader';
import Clock from './components/Utils/Clock';
import Header from './components/Utils/Header';
import TodoList from './components/Utils/TodoList';
import BottomBar from './components/Utils/BottomBar';

import Creating from './components/Pages/Create';

const exit = { opacity: 0 };
const anim = { opacity: 1 };

function App() {
  const [appState, setAppState] = useState(constants.IDLE);
  const [rawTodos, setRawTodos] = useState({});
  const { gunUser, loginUser, createUser, isUserLoggedIn, isUserLoading } =
    useUser();

  const handleCreate = useCallback(
    (todo) => {
      gunUser().get('todos').get(todo.id).put(todo);
      setAppState(constants.IDLE);
    },
    [gunUser],
  );

  const handleDelete = useCallback(
    (todo) => {
      const todos = Array.from(rawTodos);
      setRawTodos(todos.filter(({ id }) => id !== todo.id));
    },
    [rawTodos],
  );

  useEffect(() => {
    if (!isUserLoggedIn) return;

    gunUser()
      .get('todos')
      .map()
      .on((todo) => {
        if (!todo) return;
        setRawTodos((todos) => ({ ...todos, [todo.id]: todo }));
      });
  }, [isUserLoggedIn]);

  return (
    <>
      <AnimatePresence exitBeforeEnter={true} initial={exit}>
        {isUserLoading ? (
          <motion.div initial={exit} animate={anim} exit={exit} key={1}>
            <Loader />
          </motion.div>
        ) : !isUserLoggedIn ? (
          <motion.div
            initial={exit}
            animate={anim}
            exit={exit}
            key={2}
            style={{ height: '100%' }}
          >
            <Form onLogin={loginUser} onCreate={createUser}></Form>
          </motion.div>
        ) : (
          <motion.div initial={exit} animate={anim} exit={exit} key={3}>
            <Header />
            <Clock />
            <TodoList
              rawTodos={rawTodos}
              onDeleteTodo={(todo) => handleDelete(todo)}
            />
            <BottomBar
              appState={appState}
              onClickCreate={(state) => setAppState(state)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Creating
        isOpened={appState === constants.CREATING}
        onCreate={(todo) => handleCreate(todo)}
        onClose={() => setAppState(constants.IDLE)}
      />
    </>
  );
}

export default App;
