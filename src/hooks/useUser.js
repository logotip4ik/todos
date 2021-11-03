import { useState, useEffect } from 'react';
import Gun from 'gun/gun';
import 'gun/sea';
import constants from '../constants';

const hosts =
  process.env.NODE_ENV === 'production'
    ? [
        'https://gun-todos.herokuapp.com/gun',
        'https://flashy-toe-production.up.railway.app/gun',
      ]
    : ['http://192.168.88.16:8080/gun'];
const config = { peers: hosts, localStorage: true, radisk: false };
const gunInstance = Gun(config);
const gunInstanceUser = gunInstance.user();

const createUser = (username, password) =>
  new Promise((resolve, reject) => {
    gunInstanceUser.create(username, password, ({ err }) => {
      if (err) reject(err);

      window.localStorage.setItem(
        constants.DB_PREFIX + 'user',
        JSON.stringify({
          username,
          password,
        }),
      );
      resolve({ username, password });
    });
  });

const loginUser = (username, password) =>
  new Promise((resolve, reject) => {
    gunInstanceUser.auth(username, password, ({ err }) => {
      if (err) return reject(err);

      window.localStorage.setItem(
        constants.DB_PREFIX + 'user',
        JSON.stringify({
          username,
          password,
        }),
      );

      resolve({ username, password });
    });
  });

let triedToAuth = false;

function useUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (triedToAuth) return;
    triedToAuth = true;
    window.$gun = gunInstance;
    gunInstance.on('auth', () => setIsLoggedIn(true));
    const windowUser = localStorage.getItem(constants.DB_PREFIX + 'user');

    if (!windowUser) return setIsLoading(false);

    try {
      const parsedUser = JSON.parse(windowUser);
      loginUser(parsedUser.username, parsedUser.password)
        .then((userObj) => console.log('tried to authenticate user: ', userObj))
        .catch((err) => console.log(err))
        .finally(() => setIsLoading(false));
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  return {
    gun: () => gunInstance,
    gunUser: () => gunInstanceUser,
    createUser,
    loginUser,
    isUserLoading: isLoading,
    isUserLoggedIn: isLoggedIn,
  };
}

export default useUser;
