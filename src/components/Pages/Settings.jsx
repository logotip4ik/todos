import styles from '../../styles/Pages/Settings.module.scss';

import { motion, AnimatePresence } from 'framer-motion';

const cardVariants = {
  initial: { y: '120%' },
  animate: { y: '0%' },
};

function Settings({ isOpened }) {
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
          <p>Hello from settings card</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Settings;
