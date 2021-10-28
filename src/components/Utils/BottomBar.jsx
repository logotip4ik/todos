import styles from '../../styles/Utils/BottomBar.module.scss';
import { useCallback } from 'react';
import { motion } from 'framer-motion';

import constants from '../../constants';

function BottomBar({ appState, onClickCreate }) {
  const handleCreate = useCallback(() => {
    if (appState === constants.IDLE) return onClickCreate(constants.CREATING);
    return onClickCreate(constants.IDLE);
  }, [appState, onClickCreate]);

  return (
    <div className={styles.bottomBar}>
      <button className={styles.bottomBar__add} onClick={handleCreate}>
        <motion.svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          style={{ originX: '50%', originY: '50%' }}
          animate={{ rotate: appState === constants.CREATING ? 135 : 0 }}
        >
          <g fill="none">
            <path
              d="M12 4a1 1 0 0 1 1 1v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5a1 1 0 0 1 1-1z"
              fill="currentColor"
            ></path>
          </g>
        </motion.svg>
      </button>
    </div>
  );
}

export default BottomBar;
