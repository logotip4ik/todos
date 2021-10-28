import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
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
  const { gunUser, loginUser, isLoggedIn, isUserLoading } = useUser();

  useEffect(() => {
    gunUser
      .get('todos')
      .map()
      .on((data) => setRawTodos((todos) => new Set([...todos, data])));
  }, []);

  useEffect(() => {
    console.log(rawTodos);
  }, [rawTodos]);

  return (
    <>
      <AnimatePresence exitBeforeEnter={true} initial={exit}>
        {isUserLoading ? (
          <motion.div initial={exit} animate={anim} exit={exit} key={1}>
            <Loader />
          </motion.div>
        ) : !isLoggedIn ? (
          <motion.div
            initial={exit}
            animate={anim}
            exit={exit}
            key={2}
            style={{ height: '100%' }}
          >
            <Form onLogin={loginUser}></Form>
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

      <Creating isOpened={appState === constants.CREATING} />
    </>
  );
}

export default App;
