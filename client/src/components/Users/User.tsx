import { useParams } from 'react-router-dom';
import { trpc } from '../../../lib/trpc';
import { useNavigateTo, generateUrlParams } from '@client/utils/hooks/useNavigateTo';
import { homeUrl } from '@client/routers';
import { Page } from '@client/pages/layout/Page';
import StructurePage from '../layout/StructurePage/StructurePage';
import { useMessages } from '../../utils/hooks/useMessages';
import { useRef, useState, useEffect } from 'react';
import ScrollToBottomButton from '../layout/button/ScrollToBottomButton';
import { useContext } from 'react';
import { UserContext } from '../../../contexts/User';
import Loading from '../Loading/Loading';

const Users = () => {
  const { id } = useParams();
  const { currentAccount } = useContext(UserContext);

  const navigateTo = useNavigateTo();
  const selectedUserId = id ? Number(id) : undefined;

  const [messageText, setMessageText] = useState('');

  const { data: users, isLoading } = trpc.users.list.useQuery();
  const markMessagesAsRead = trpc.users.markMessagesAsRead.useMutation();
  const endChatMutation = trpc.bot.endChatAndRequestRating.useMutation();

  const handleEndChat = async () => {
    const user = users.find((u) => u.id === selectedUserId);  
    await endChatMutation.mutateAsync({ userId: user.id, accountId: currentAccount.account.id });
  };
  useEffect(() => {
    if (selectedUserId) {
      markMessagesAsRead.mutate({ userId: selectedUserId });
    }
  }, [selectedUserId]);

  const messages = useMessages(selectedUserId);

  const messagesContainerRef = useRef(null);

  const sendMessageMutation = trpc.users.sendingMesseg.useMutation({
    onSuccess: () => {
      setMessageText('');
    },
  });

  const handleSendMessage = async () => {
    await sendMessageMutation.mutateAsync({
      accountId: currentAccount.account.id,
      userId: selectedUserId,
      messeg: messageText,
      type: 'MENEGER',
    });
  };
  
  const handleUserSelect = (userId: number) =>
    navigateTo({ pathname: generateUrlParams({ url: homeUrl, id: userId }) });

  if (isLoading) return <Loading />;
  return (
    <Page>
      <StructurePage
        title="Користувачі"
        description="Список усіх користувачів системи"
        data={users.map((user) => ({
          id: user.id,
          name: user.name,
          unread: user.unread,
          pathname: generateUrlParams({ url: homeUrl, id: user.id }),
        }))}
        onSelect={handleUserSelect}
        selectedId={selectedUserId}
      >
        {selectedUserId && (
          <div className="flex flex-col h-[650px] space-y-4 p-4 relative">
            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Чат з {users.find((user) => user.id === selectedUserId)?.name}
              </h2>
            </div>

            <div
              ref={messagesContainerRef}
              className="flex-1 max-h-[550px] overflow-y-auto pr-2 relative"
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
                    <p className="text-xs text-gray-400">
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
              <ScrollToBottomButton containerRef={messagesContainerRef} messages={messages} />
            </div>

            <div className="sticky bottom-0 bg-white pt-2">
              <div className="flex items-end space-x-2">
                <textarea
                  placeholder="Введіть повідомлення"
                  className="flex-1 min-h-[40px] max-h-[200px] resize-none overflow-y-auto border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={1}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = `${target.scrollHeight}px`;
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                >
                  Надіслати
                </button>
                <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition" onClick={handleEndChat}>
                  Заверишити чат
                </button>
              </div>
            </div>
          </div>
        )}
      </StructurePage>
    </Page>
  );
};

export default Users;
