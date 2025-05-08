import { trpc } from './utils/trpc';

function App() {
  // Відправляємо текст "Frontend" на бекенд і отримуємо відповідь
  const { data, isLoading, error } = trpc.hello.useQuery('Frontend');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Response from server:</h1>
      <p>{data?.message}</p>
    </div>
  );
}

export default App;