import { useParams } from 'react-router-dom';
import { trpc } from '../../../lib/trpc';
import { useNavigateTo, generateUrlParams } from '@client/utils/hooks/useNavigateTo';
import { homeUrl } from '@client/routers';
import { Page } from '@client/pages/layout/Page';
import StructurePage from '../layout/StructurePage/StructurePage';
import { useMessages } from '../../utils/hooks/useMessages';
import { useRef } from 'react';
import ScrollToBottomButton from '../layout/button/ScrollToBottomButton';

const Users = () => {
  const { id } = useParams();
  const navigateTo = useNavigateTo();
  const selectedUserId = id ? Number(id) : undefined;

  const { data: users, isLoading, isError } = trpc.users.list.useQuery();

  const messages = useMessages(selectedUserId);

  const handleUserSelect = (userId) =>
    navigateTo({ pathname: generateUrlParams({ url: homeUrl, id: userId }) });

  const messagesContainerRef = useRef(null);

  if (isLoading) return <div className="text-center text-gray-500">Завантаження...</div>;
  if (isError || !users) return <div className="text-center text-red-500">Помилка завантаження користувачів</div>;

  return (
    <Page>
      <StructurePage
        title="Користувачі"
        description="Список усіх користувачів системи"
        data={users.map((user) => ({
          id: user.id,
          name: user.name,
          pathname: generateUrlParams({ url: homeUrl, id: user.id }),
        }))}
        onSelect={handleUserSelect}
        selectedId={selectedUserId}
      >
        {selectedUserId && (
          <div className="space-y-4 p-4 relative">
            <div className="border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800">Чат з {users.find((user) => user.id === selectedUserId)?.name}</h2>
            </div>
            <div
              ref={messagesContainerRef}
              className="max-h-[500px] overflow-y-auto pr-2 relative"
            >
              <ul className="space-y-2">
                {messages.map((msg) => (
                  <li key={msg.id} className="rounded bg-white p-3 shadow-sm">
                    {msg.account ? (
                      <p className="text-xs text-gray-400">
                        {msg.account?.lastName} {msg.account?.firstName}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400">{msg.user?.name}</p>
                    )}
                    <p className="text-sm text-gray-700">{msg.message}</p>
                    <p className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleString()}</p>
                  </li>
                ))}
              </ul>
              <ScrollToBottomButton containerRef={messagesContainerRef} messages={messages} />
            </div>

            <div className="flex items-end space-x-2 ">
              <textarea
                placeholder="Введіть повідомлення"
                className="flex-1 min-h-[40px] max-h-[200px] resize-none overflow-y-auto border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={1}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                Надіслати
              </button>
            </div>
          </div>
        )}
      </StructurePage>
    </Page>
  );
};

export default Users;