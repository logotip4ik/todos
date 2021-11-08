import pageStyles from '../../styles/Pages/Create.module.scss';
import formStyles from '../../styles/Form/Main.module.scss';
import CreatableSelect from 'react-select/creatable';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { AnimatePresence, motion } from 'framer-motion';

import Label from '../Form/Label';

const selectStyles = {
  menu: (provided) => ({
    ...provided,
    color: 'white',
    backgroundColor: '#333',
  }),

  option: (provided, state) => ({
    ...provided,
    color: 'white',
    backgroundColor: state.isSelected ? '#454545' : '#333',
  }),

  singleValue: (provided) => ({
    ...provided,
    color: 'white',
  }),

  input: (provided) => ({
    ...provided,
    color: 'white',
  }),

  control: (provided) => ({
    ...provided,
    color: 'white',
    backgroundColor: '#333',
    borderColor: '#444',
    boxShadow: '',
    ':hover': { borderColor: '#888' },
    ':focus-within': { borderColor: '#888' },
  }),
};

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

const makeTags = (tags) =>
  tags.reduce((acc, tag) => [...acc, { label: tag, value: tag }], []);

function Create({
  tags,
  isOpened,
  initialTodo = {},
  submitButtonText = 'Add',
  onCreate,
  onClose,
  ...props
}) {
  const textareaRef = useRef(null);
  const [todoText, setTodoText] = useState(initialTodo.data || '');
  // ! this will broke when updating todos, should be [{label: 'test', value: 'test'}], actually is ['test']
  const [todoTags, setTodoTags] = useState(initialTodo?.tags || []);

  const normalizedTags = useMemo(() => {
    if (!tags) return [];
    return makeTags(tags);
  }, [tags]);

  const resize = useCallback((target) => {
    target.style.height = 'auto';
    target.style.height = target.scrollHeight + 'px';
  }, []);

  const handleTodoTagsChange = useCallback((val) => {
    if (!val) setTodoTags([]);
    const newTags = val.reduce(
      (acc, { label, value }) => [...acc, { label, value }],
      [],
    );
    setTodoTags(newTags);
  }, []);

  const handleSubmit = useCallback(
    (ev) => {
      ev.preventDefault();

      const data = todoText.trim();

      if (data.length < 1) return;

      const newTodo = {
        id: nanoid(),
        completed: false,
        createdAt: new Date().toUTCString(),
        ...initialTodo,
        updatedAt: new Date().toUTCString(),
        data,
        tags: todoTags
          .reduce((acc, { label }) => [...acc, label], [])
          .join(','),
      };

      onCreate(newTodo);
      setTodoText('');
      setTodoTags([]);
    },
    [initialTodo, todoTags, todoText, onCreate],
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
    if (!initialTodo.data) return;
    setTodoText(initialTodo.data);
    setTodoTags(makeTags(initialTodo.tags));
  }, [initialTodo]);

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
                id={'data'}
                ref={textareaRef}
                value={todoText}
                onInput={(ev) => resize(ev.target)}
                onChange={({ target }) => setTodoText(target.value)}
                className={formStyles.form__item__input}
              />
            </div>
            <div className={formStyles.form__item}>
              <Label htmlFor="tags" className={formStyles.form__item__label}>
                Tags
              </Label>
              <CreatableSelect
                id={'tags'}
                styles={selectStyles}
                isMulti
                value={todoTags}
                options={normalizedTags}
                onChange={handleTodoTagsChange}
              />
            </div>
            <div
              className={`${formStyles.form__item} ${formStyles['form__item--actions']}`}
              style={{ justifyContent: 'flex-end' }}
            >
              <button type="submit">{submitButtonText}</button>
              <button type="reset">Reset</button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Create;
