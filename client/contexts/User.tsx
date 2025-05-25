import { RouterOutputs, trpc } from '../lib/trpc';
import { clearJWT, setJWT } from '../src/components/utility/localStorage';
import React, { useEffect, useState } from 'react';

export type UserContextType = {
  currentAccount: RouterOutputs['currentAccount'] | null;
  login: (jwt: string) => void;
  logout: () => void;
  refetch: () => void;
};

export const UserContext = React.createContext({
  currentAccount: null,
  login: () => {},
  logout: () => {},
  refetch: () => {}
} as UserContextType);

export const UserContextProvider = ({
  children,
  refreshTRPCClient
}: {
  children: React.ReactNode;
  refreshTRPCClient: () => void;
}) => {
  const [currentAccount, setcurrentAccount] = useState<
    RouterOutputs['currentAccount'] | null
  >(null);

  const currentAccountData = trpc.currentAccount.useQuery();

  useEffect(() => {
    if (!currentAccountData.isLoading) {
      setcurrentAccount(
        currentAccountData.data?.account ? currentAccountData.data : null
      );
    }
  }, [currentAccountData.data, currentAccountData.isLoading]);

  if (
    currentAccountData.isLoading ||
    (!currentAccount && currentAccountData.data?.account.id)
  ) {
    return null;
  }
  const login = async (jwt: string) => {
    setJWT(jwt);
    await refreshTRPCClient();
    currentAccountData.refetch();
  };

  const logout = async () => {
    clearJWT();
    await refreshTRPCClient();

    currentAccountData.refetch();
  };

  const refetch = async () => {
    currentAccountData.refetch();
  };

  return (
    <UserContext.Provider value={{ currentAccount, login, logout, refetch }}>
      {children}
    </UserContext.Provider>
  );
};
