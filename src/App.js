import { AnimatePresence, motion } from 'framer-motion';
import useUser from './hooks/useUser';

import Form from './components/Form';

const exit = { opacity: 0 };
const anim = { opacity: 1 };

function App() {
  const { user, loginUser, isLoggedIn, isUserLoading } = useUser();

  return (
    <AnimatePresence exitBeforeEnter={true} initial={false}>
      {isUserLoading ? (
        <motion.h1 initial={exit} animate={anim} exit={exit}>
          Loading...
        </motion.h1>
      ) : !isLoggedIn ? (
        <motion.div initial={exit} animate={anim} exit={exit}>
          <Form onLogin={loginUser}></Form>
        </motion.div>
      ) : (
        <motion.div initial={exit} animate={anim} exit={exit}>
          This will be main todo app
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
