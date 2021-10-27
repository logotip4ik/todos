import styles from '../../styles/Form/Main.module.scss';

import { useState } from 'react';
import Input from './Input';
import Label from './Label';

function Form({ onLogin }) {
  const [user, setUser] = useState({ username: '', password: '' });

  return (
    <form
      className={styles.form}
      onSubmit={(ev) => ev.preventDefault()}
      onReset={(ev) => ev.preventDefault()}
    >
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
        <button type={'submit'}>Login</button>
        <button type={'reset'}>Reset</button>
      </div>
    </form>
  );
}

export default Form;
