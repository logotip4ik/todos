import { useState } from 'react';
import FormInput from './FormInput';
import FormLabel from './FormLabel';

function Form({ onLogin }) {
  const [user, setUser] = useState({ username: '', password: '' });

  return (
    <form onSubmit={(ev) => ev.preventDefault()}>
      <div>
        <FormLabel htmlFor={'username'}>Username</FormLabel>
        <FormInput
          id={'username'}
          value={user.username}
          onChange={(password) => setUser({ ...user, password })}
        />
      </div>
      <div>
        <FormLabel htmlFor={'password'}>Password</FormLabel>
        <FormInput
          id={'password'}
          type={'password'}
          value={user.username}
          onChange={(password) => setUser({ ...user, password })}
        />
      </div>
      <div>
        <button type={'submit'}>Login</button>
        <button type={'reset'}>Reset</button>
      </div>
    </form>
  );
}

export default Form;
