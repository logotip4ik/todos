import styles from '../../styles/Form/Main.module.scss';

import { useCallback, useState } from 'react';
import Input from './Input';
import Label from './Label';

function Form({ onCreate, onLogin }) {
  const [user, setUser] = useState({ username: '', password: '' });

  const handleSubmit = useCallback(
    (ev) => {
      ev.preventDefault();
      const username = user.username.trim();
      const password = user.password.trim();

      if (!username || !password) return;
      if (username.length < 8 || password.length < 8) return;

      if (ev.nativeEvent.submitter.dataset.type === 'login')
        onLogin(username, password).catch((err) =>
          console.log('from login', err),
        );
      if (ev.nativeEvent.submitter.dataset.type === 'create')
        onCreate(username, password).catch((err) =>
          console.log('from creating', err),
        );
    },
    [user, onLogin, onCreate],
  );

  const handleReset = useCallback((ev) => {
    ev.preventDefault();
    setUser({ username: '', password: '' });
  }, []);

  return (
    <form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
      <div className={styles.form__item}>
        <Label htmlFor={'username'}>Username</Label>
        <Input
          id={'username'}
          value={user.username}
          onChange={(username) => setUser({ ...user, username })}
        />
      </div>
      <div className={styles.form__item}>
        <Label htmlFor={'password'}>Password</Label>
        <Input
          id={'password'}
          type={'password'}
          value={user.password}
          onChange={(password) => setUser({ ...user, password })}
        />
      </div>
      <div className={`${styles.form__item} ${styles['form__item--actions']}`}>
        <button type={'submit'} data-type="login">
          Login
        </button>
        <button type={'submit'} data-type="create">
          Create
        </button>
        <button type={'reset'}>Reset</button>
      </div>
    </form>
  );
}

export default Form;
