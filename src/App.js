import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import useUser from './hooks/useUser';
import constants from './constants';

import Form from './components/Form';
import Loader from './components/Loader';
import Header from './components/Utils/Header';
import TodoList from './components/Utils/TodoList';
import BottomBar from './components/Utils/BottomBar';

import Creating from './components/Pages/Create';

const exit = { opacity: 0 };
const anim = { opacity: 1 };

function App() {
  const [appState, setAppState] = useState(constants.IDLE);
  const [rawTodos, setRawTodos] = useState(new Set());
  const { gunUser, loginUser, createUser, isUserLoggedIn, isUserLoading } =
    useUser();

  const handleCreate = useCallback(
    (todo) => {
      gunUser().get('todos').set(todo);
      setAppState(constants.IDLE);
    },
    [gunUser],
  );

  useEffect(() => {
    if (!isUserLoggedIn) return;

    gunUser()
      .get('todos')
      .map()
      .on((todo) => setRawTodos((todos) => new Set([...todos, todo])));
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
            <TodoList rawTodos={rawTodos} />
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
