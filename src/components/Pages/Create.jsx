import styles from '../../styles/Pages/Create.module.scss';
import { useCallback, useState } from 'react';
import { nanoid } from 'nanoid';
import { AnimatePresence, motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    translateY: '0%',
  },
  animate: {
    opacity: 1,
    scale: 1,
    translateY: '0%',
    transition: {
      duration: 0.1,
    },
  },
  exit: {
    opacity: 1,
    translateY: '150%',
    transition: {
      duration: 0.4,
    },
  },
};

function Create({ isOpened, onCreate, ...props }) {
  const [todoText, setTodoText] = useState('');

  const handleSubmit = useCallback(
    (ev) => {
      ev.preventDefault();

      const data = todoText.trim();

      if (data.length < 1) return;

      const newTodo = {
        id: nanoid(),
        data,
        completed: false,
        createdAt: new Date().toUTCString(),
      };

      onCreate(newTodo);
    },
    [todoText, onCreate],
  );

  const handleReset = useCallback((ev) => {
    ev.preventDefault();
    setTodoText('');
  }, []);

  // [ ] add error handling and show it to user

  return (
    <AnimatePresence>
      {isOpened && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className={styles.form__wrapper}
          {...props}
        >
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className={styles.form}
          >
            <div className={styles.form__item}>
              <label htmlFor="data" className={styles.form__item__label}>
                Text
              </label>
              <textarea
                value={todoText}
                onChange={({ target }) => setTodoText(target.value)}
                className={styles.form__item__input}
              />
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Create;
