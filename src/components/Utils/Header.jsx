import styles from '../../styles/Utils/Header.module.scss';

import { useViewportScroll, useTransform, motion } from 'framer-motion';

const breakpoint = 200;

function Header() {
  const { scrollY } = useViewportScroll();

  const paddingTop = useTransform(scrollY, [0, breakpoint], [73.5, 12]);
  const basePadding = useTransform(scrollY, [0, breakpoint], [28, 12]);
  const baseScale = useTransform(scrollY, [0, breakpoint], [1, 0.5]);

  // idk, why but font size wont animate, so i used line height and scale

  return (
    <motion.header
      className={styles.header}
      style={{
        paddingTop,
        paddingLeft: basePadding,
        paddingRight: basePadding,
        paddingBottom: basePadding,
      }}
    >
      <motion.h1
        className={styles.header__title}
        style={{
          scale: baseScale,
          lineHeight: baseScale,
          transformOrigin: 'left center',
        }}
      >
        Todo
      </motion.h1>
    </motion.header>
  );
}

export default Header;
