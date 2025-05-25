import { trpc } from '../../../lib/trpc';
export default function Sidebar() {
  const { data: users = [], isLoading } = trpc.users.list.useQuery();
  return (
    <aside className="w-1/4 p-4 border-r overflow-y-auto h-[calc(100vh-4rem)] border-gray-300 rounded-lg">
      <h1 className="text-2xl font-semibold mb-7 text-center">Користувачі</h1>
      <hr className="border-gray-300 mt-1" />
      {isLoading ? (
        <p className="text-center text-gray-500">Завантаження...</p>
      ) : (
        <ul className="space-y-3">
          {users.map((user) => (
            <li key={user.id} className="flex flex-col space-y-1">
              <div className="flex items-center space-x-3 hover:bg-gray-200 p-2 rounded-md cursor-pointer">
                {/* <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" /> */}
                <span className="text-gray-800 text-lg">{user.name}</span>
              </div>
              <hr className="border-gray-300 mt-1" />
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}