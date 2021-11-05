import styles from '../../styles/Pages/Settings.module.scss';

import { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Select from 'react-select';

const cardVariants = {
  initial: { y: '120%' },
  animate: { y: '0%' },
};

const sortByOptions = {
  createdAt: { value: 'createdAt', label: 'Created' },
  updatedAt: { value: 'updatedAt', label: 'Updated' },
};

const sortingOrderOptions = {
  asc: { value: 'asc', label: 'Ascending' },
  desc: { value: 'desc', label: 'Descending' },
};

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

function Settings({
  isOpened,
  sortBy,
  sortingOrder,
  onSortBy,
  onSortingOrder,
}) {
  const handleSortByChange = useCallback(
    (val) => onSortBy(val.value),
    [onSortBy],
  );

  const handleSortingOrderChange = useCallback(
    (val) => onSortingOrder(val.value),
    [onSortingOrder],
  );

  return (
    <AnimatePresence>
      {isOpened && (
        <motion.div
          initial="initial"
          animate="animate"
          exit="initial"
          variants={cardVariants}
          className={styles.card}
          transition={{ type: 'spring', mass: 0.5 }}
        >
          <div className={styles.card__item}>
            <p className={styles.card__item__header}>White Mode</p>
            <p className={styles.card__item__value}>Coming soon...</p>
          </div>
          <div className={styles.card__item}>
            <p className={styles.card__item__header}>Sort by</p>
            <Select
              styles={selectStyles}
              value={sortByOptions[sortBy]}
              options={Object.values(sortByOptions)}
              className={`${styles.card__item__value} ${styles['card__item__value--select']}`}
              onChange={handleSortByChange}
            ></Select>
          </div>
          <div className={styles.card__item}>
            <p className={styles.card__item__header}>Sorting order</p>
            <Select
              styles={selectStyles}
              value={sortingOrderOptions[sortingOrder]}
              options={Object.values(sortingOrderOptions)}
              className={`${styles.card__item__value} ${styles['card__item__value--select']}`}
              onChange={handleSortingOrderChange}
            ></Select>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Settings;
