import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const userToken = sessionStorage.getItem('token');
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string | null) => {
    if (userToken) {
      sessionStorage.setItem('token', userToken);
    } else {
      sessionStorage.removeItem('token');
    }
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
