import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { Toaster, ToastBar, toast } from 'react-hot-toast';
import useUser from './hooks/useUser';
import constants from './constants';

import Form from './components/Form';
import Loader from './components/Loader';
import Clock from './components/Utils/Clock';
import Header from './components/Utils/Header';
import TodoList from './components/Utils/TodoList';
import BottomBar from './components/Utils/BottomBar';

import CreatingPage from './components/Pages/Create';
import SettingsPage from './components/Pages/Settings';

const exit = { opacity: 0 };
const anim = { opacity: 1 };

function App() {
  const [appState, setAppState] = useState(constants.IDLE);
  const [rawTodos, setRawTodos] = useState({});
  const tags = useMemo(() => {
    const todos = Object.values(rawTodos);
    const rawTags = new Set();

    for (const todo of todos)
      if (Array.isArray(todo.tags) && todo.tags.length > 0)
        rawTags.add(...todo.tags);

    return Array.from(rawTags);
  }, [rawTodos]);
  const [isShowingDetails, setIsShowingDetails] = useState(false);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortingOrder, setSortingOrder] = useState('asc');
  const { gunUser, loginUser, createUser, isUserLoggedIn, isUserLoading } =
    useUser();

  const handleBottomBarSettingsClick = useCallback(() => {
    const newState =
      appState === constants.SETTINGS ? constants.IDLE : constants.SETTINGS;
    setAppState(newState);
    setIsShowingDetails(false);
  }, [appState]);

  const handleBottomBarCreateClick = useCallback(() => {
    const newState =
      appState === constants.CREATING ||
      appState === constants.SETTINGS ||
      isShowingDetails
        ? constants.IDLE
        : constants.CREATING;
    setAppState(newState);
    setIsShowingDetails(false);
  }, [appState, isShowingDetails]);

  const handleSetSortBy = useCallback(
    (value) => gunUser().get('sortBy').put(value),
    [gunUser],
  );

  const handleSetSortingOrder = useCallback(
    (value) => gunUser().get('sortingOrder').put(value),
    [gunUser],
  );

  const handleCreate = useCallback(
    (todo) => {
      gunUser()
        .get('todos')
        .get(todo.id)
        .put(todo)
        .once(() => toast('Created new todo!', { icon: '✅' }));

      setAppState(constants.IDLE);
    },
    [gunUser],
  );

  const handleDelete = useCallback(
    (todo) => {
      const todos = Object.values(rawTodos).filter((val) => val.id !== todo.id);
      setRawTodos(todos.reduce((acc, val) => ({ ...acc, [val.id]: val }), {}));
    },
    [rawTodos],
  );

  useEffect(() => {
    document.body.style.overflow = isShowingDetails ? 'hidden' : 'auto';
  }, [isShowingDetails]);

  useEffect(() => {
    if (!isUserLoggedIn) return;

    gunUser()
      .get('todos')
      .map()
      .on((todo) => {
        if (!todo) return;
        setRawTodos((todos) => {
          const todoToPut = {
            ...todo,
            tags: todo.tags
              ? todo.tags
                  .split(',')
                  .reduce(
                    (acc, text) => [...acc, { label: text, value: text }],
                    [],
                  )
              : [],
          };

          return { ...todos, [todoToPut.id]: todoToPut };
        });
      });

    gunUser()
      .get('sortBy')
      .on((data) => setSortBy(data || 'createdAt'));

    gunUser()
      .get('sortingOrder')
      .on((data) => setSortingOrder(data || 'asc'));
    // eslint-disable-next-line
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
            <Clock
              isShowingDetails={
                isShowingDetails || appState === constants.SETTINGS
              }
            />
            <TodoList
              rawTodos={rawTodos}
              sortBy={sortBy}
              sortingOrder={sortingOrder}
              isShowingDetails={isShowingDetails}
              onDeleteTodo={(todo) => handleDelete(todo)}
              onIsShowingDetails={(bool) => setIsShowingDetails(bool)}
            />
            <BottomBar
              isViewingSettings={appState === constants.SETTINGS}
              isCreating={
                appState === constants.CREATING ||
                appState === constants.SETTINGS ||
                isShowingDetails
              }
              onClickViewSettings={handleBottomBarSettingsClick}
              onClickCreate={handleBottomBarCreateClick}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <CreatingPage
        tags={tags}
        isOpened={appState === constants.CREATING}
        onCreate={(todo) => handleCreate(todo)}
        onClose={() => setAppState(constants.IDLE)}
      />

      <SettingsPage
        isOpened={appState === constants.SETTINGS}
        sortBy={sortBy}
        sortingOrder={sortingOrder}
        onSortingOrder={handleSetSortingOrder}
        onSortBy={handleSetSortBy}
        onClose={() => setAppState(constants.IDLE)}
      />

      <Toaster
        position="bottom-left"
        containerStyle={{ bottom: '6rem' }}
        toastOptions={{
          style: {
            background: '#333',
            color: 'var(--ff-color)',
          },
        }}
      >
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible
                ? 'toast-enter 1s ease'
                : 'toast-exit 1s ease',
            }}
          />
        )}
      </Toaster>
    </>
  );
}

export default App;
