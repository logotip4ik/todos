import styles from '../../styles/Utils/Header.module.scss';

import {
  useViewportScroll,
  useTransform,
  AnimatePresence,
  motion,
} from 'framer-motion';
import { useCallback, useState } from 'react';

const breakpoint = 100;

function Header({ filteringBy, onFilteringBy }) {
  const [shouldWrap, setShouldWrap] = useState(false);
  const { scrollY } = useViewportScroll();

  const height = useTransform(scrollY, [0, breakpoint], [200, 66]);
  const titleBottom = useTransform(scrollY, [0, breakpoint], [64, 17]);
  const titleLeft = useTransform(scrollY, [0, breakpoint], [12, -24]);
  const baseScale = useTransform(scrollY, [0, breakpoint], [1, 0.5]);

  scrollY.onChange((val) => setShouldWrap(val > breakpoint / 2));

  // idk, why but font size wont animate, so i used line height and scale

  const handleSetFilters = useCallback(
    (filterToDelete) => {
      const newFilters = filteringBy.filter(
        (filter) => filter !== filterToDelete,
      );
      onFilteringBy(newFilters);
    },
    [filteringBy, onFilteringBy],
  );

  return (
    <motion.header
      layout
      className={styles.header}
      style={{
        height: height,
      }}
    >
      <motion.h1
        className={styles.header__title}
        style={{
          scale: baseScale,
          bottom: titleBottom,
          left: titleLeft,
        }}
      >
        Todo
      </motion.h1>
      <AnimatePresence>
        {filteringBy.length > 0 && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, width: shouldWrap ? '75%' : '100%' }}
            exit={{ opacity: 0 }}
            transition={{ staggerChildren: 0.3 }}
            layout
            className={styles.header__tags}
          >
            {filteringBy.map((filter, i) => (
              <motion.li
                layout
                key={`${filter}-${i}`}
                className={styles.header__tags__tag}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSetFilters(filter)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filter}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
