import { motion } from 'framer-motion';

const size = 2;

const boxStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '175px',
  listStyleType: 'none',
};

const circleStyles = {
  width: `${size}rem`,
  height: `${size}rem`,
  borderRadius: '50%',
  backgroundColor: '#ccc',
};

const loadingContainerVariants = {
  start: { transition: { staggerChildren: 0.5 } },
  end: { transition: { staggerChildren: 0.5 } },
};
const loadingCirclesVariants = {
  start: { opacity: 1 },
  end: { opacity: 0.25 },
};
const loadingCirclesTransition = {
  duration: 0.75,
  yoyo: Infinity,
  ease: 'easeIn',
};

function Loader() {
  return (
    <motion.div
      style={boxStyles}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <motion.span
        variants={loadingCirclesVariants}
        transition={loadingCirclesTransition}
        style={circleStyles}
      ></motion.span>
      <motion.span
        variants={loadingCirclesVariants}
        transition={loadingCirclesTransition}
        style={circleStyles}
      ></motion.span>
      <motion.span
        variants={loadingCirclesVariants}
        transition={loadingCirclesTransition}
        style={circleStyles}
      ></motion.span>
    </motion.div>
  );
}

export default Loader;
