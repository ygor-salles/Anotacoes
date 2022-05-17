import { createContext, useCallback, useEffect, useState } from 'react';

interface IUserSessionContextData {
  nameUser: string;
  logout: () => void;
}

export const UserSessionContext = createContext<IUserSessionContextData>(
  {} as IUserSessionContextData,
);

export default function UserSessionProvider({ children }: { children: React.ReactNode }) {
  const [name, setName] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setName('Ygor');
    }, 1000);
  }, []);

  const handleLogout = useCallback(() => {
    console.log('Logout executou');
  }, []);

  return (
    <UserSessionContext.Provider value={{ nameUser: name, logout: handleLogout }}>
      {children}
    </UserSessionContext.Provider>
  );
}
