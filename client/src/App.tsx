import 'tailwindcss/tailwind.css';
import './App.css';
import { useState } from 'react';
import { createTRPCClient, trpc } from '../lib/trpc';
import { UserContextProvider } from '../contexts/User';
import { getJWT } from '@client/components/utility/localStorage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRoutes } from '../src/routers/AppRoutes';
import { BrowserRouter } from 'react-router-dom'; // 👈 додано

function App() {
  const [queryClient, setQueryClient] = useState(() => new QueryClient());
  const [trpcClient, setTRPCClient] = useState(createTRPCClient(getJWT()));

  const refreshTRPCClient = async () => {
    setQueryClient(new QueryClient());
    setTRPCClient(createTRPCClient(getJWT()));
    await new Promise((resolve) => setTimeout(resolve, 0));
  };

  return (
    <BrowserRouter> {/* 👈 Додано */}
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider refreshTRPCClient={refreshTRPCClient}>
            <AppRoutes />
          </UserContextProvider>
        </QueryClientProvider>
      </trpc.Provider>
    </BrowserRouter>
  );
}

export default App;