import pageStyles from '../../styles/Pages/Create.module.scss';
import formStyles from '../../styles/Form/Main.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { AnimatePresence, motion } from 'framer-motion';

import Label from '../Form/Label';

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.95,
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

function Create({ isOpened, onCreate, onClose, ...props }) {
  const textareaRef = useRef(null);
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

  const handleReset = useCallback(
    (ev) => {
      ev.preventDefault();
      onClose();
      setTodoText('');
    },
    [onClose],
  );

  useEffect(() => {
    if (!isOpened) return;
    setTimeout(() => textareaRef.current.focus(), 200);
  }, [isOpened]);

  // [ ] add error handling and show it to user

  return (
    <AnimatePresence>
      {isOpened && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
          className={pageStyles.form__wrapper}
          {...props}
        >
          <form
            onSubmit={handleSubmit}
            onReset={handleReset}
            className={pageStyles.form}
          >
            <div className={formStyles.form__item}>
              <Label htmlFor="data" className={formStyles.form__item__label}>
                Text
              </Label>
              <textarea
                ref={textareaRef}
                value={todoText}
                onChange={({ target }) => setTodoText(target.value)}
                className={formStyles.form__item__input}
              />
            </div>
            <div
              className={`${formStyles.form__item} ${formStyles['form__item--actions']}`}
              style={{ justifyContent: 'flex-end' }}
            >
              <button type="submit">Add</button>
              <button type="reset">Reset</button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Create;
