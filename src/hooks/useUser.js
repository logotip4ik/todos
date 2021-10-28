import { useState, useEffect, useCallback } from 'react';
import Gun from 'gun/gun';
import 'gun/sea';
import constants from '../constants';

const hosts = ['http://192.168.88.16:8080/gun'];
const config = { peers: hosts, localStorage: true, radisk: false };
const gunInstance = Gun(config);

function useUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const loginUser = useCallback((username, password) => {
    setIsLoading(true);
    const userObject = { username, password };
    window.localStorage.setItem(
      constants.DB_PREFIX + 'user',
      JSON.stringify(userObject),
    );

    const gunUser = gunInstance.user();

    gunUser.create(username, password, ({ err }) => {
      // todo: add better error handling
      console.log(err);
      if (err !== 'User already created!' || !err) return setIsLoading(false);

      gunUser.auth(username, password, ({ err }) => {
        console.log(err);
        if (err) return setIsLoading(false);

        setUser(userObject);
        setIsLoading(false);
      });
    });
  }, []);

  useEffect(() => {
    const windowUser = localStorage.getItem(constants.DB_PREFIX + 'user');

    if (!windowUser) return setIsLoading(false);

    try {
      const parsedUser = JSON.parse(windowUser);
      loginUser(parsedUser.username, parsedUser.password);
    } catch (error) {
      setIsLoading(false);
    }
  }, []);

  return {
    gun: gunInstance,
    gunUser: gunInstance.user,
    user,
    loginUser,
    isUserLoading: isLoading,
    isLoggedIn: user?.username && user?.password,
  };
}

export default useUser;
