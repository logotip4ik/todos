import styles from '../../styles/Utils/Clock.module.scss';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const getTime = () =>
  Intl.DateTimeFormat('en', {
    hour: '2-digit',
    hourCycle: 'h23',
    minute: '2-digit',
  }).format(new Date());

const xOffset = 14;

function Clock({ isShowingDetails }) {
  const [time, setTime] = useState(getTime());

  useEffect(() => setInterval(() => setTime(getTime()), 1000), []);

  return (
    <motion.button
      className={styles.clock}
      style={{ width: 81, height: 45 }}
      animate={{ top: isShowingDetails ? 24 : 85 }}
    >
      <AnimatePresence>
        {time.split('').map((val, i) => {
          return (
            <motion.span
              style={{ width: xOffset }}
              initial={{ top: '-120%', left: i * xOffset + 5 }}
              animate={{ top: '15%', left: i * xOffset + 5 }}
              exit={{ top: '120%', left: i * xOffset + 5 }}
              key={val + i}
              className={styles.clock__number}
            >
              {val}
            </motion.span>
          );
        })}
      </AnimatePresence>
    </motion.button>
  );
}

export default Clock;
