import { useState, useEffect, useCallback } from 'react';
import constants from '../constants';

function useUser() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const loginUser = useCallback((username, password) => {
    const userObject = { username: username.trim(), password: password.trim() };
    window.localStorage.setItem(
      constants.DB_PREFIX + 'user',
      JSON.stringify(userObject),
    );
    setUser(userObject);
  }, []);

  useEffect(() => {
    const windowUser = localStorage.getItem(constants.DB_PREFIX + 'user');

    if (!windowUser) return setIsLoading(false);

    try {
      setUser(JSON.parse(windowUser));
    } catch (error) {}

    setIsLoading(false);
  }, []);

  return { user, loginUser, isUserLoading: isLoading };
}

export default useUser;
