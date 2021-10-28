import { AnimatePresence, motion } from 'framer-motion';
import useUser from './hooks/useUser';

import Form from './components/Form';
import Loader from './components/Loader';

const exit = { opacity: 0 };
const anim = { opacity: 1 };

function App() {
  const { user, loginUser, isLoggedIn, isUserLoading } = useUser();

  return (
    <AnimatePresence exitBeforeEnter={true} initial={exit}>
      {isUserLoading ? (
        <motion.div initial={exit} animate={anim} exit={exit} key={1}>
          <Loader />
        </motion.div>
      ) : !isLoggedIn ? (
        <motion.div initial={exit} animate={anim} exit={exit} key={2}>
          <Form onLogin={loginUser}></Form>
        </motion.div>
      ) : (
        <motion.div initial={exit} animate={anim} exit={exit} key={3}>
          This will be main todo app
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
