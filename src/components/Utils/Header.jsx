import styles from '../../styles/Utils/Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>Todo</h1>
    </header>
  );
}

export default Header;
