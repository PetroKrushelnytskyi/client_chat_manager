import { useParams } from 'react-router-dom';
import { trpc } from '../../../lib/trpc';
import { useNavigateTo, generateUrlParams } from '@client/utils/hooks/useNavigateTo';
import { menegerUrl } from '@client/routers';
import { Page } from '@client/pages/layout/Page';
import StructurePage from '../layout/StructurePage/StructurePage';

import Loading from '../Loading/Loading';

const Meneger = () => {
  const { id } = useParams();

  const navigateTo = useNavigateTo();
  const selectedMenegerId = id ? Number(id) : undefined;

  const { data: meneger, isLoading } = trpc.meneger.list.useQuery();

  const handleUserSelect = (userId: number) =>
    navigateTo({ pathname: generateUrlParams({ url: menegerUrl, id: userId }) });

  if (isLoading) return <Loading />;
  return (
    <Page>
      <StructurePage
        title="Менеджери"
        description="Список усіх менеджерів"
        data={meneger.map((user) => ({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          pathname: generateUrlParams({ url: menegerUrl, id: user.id }),
        }))}
        onSelect={handleUserSelect}
        selectedId={selectedMenegerId}
      >
        {selectedMenegerId && (
          <div className="flex flex-col space-y-4 p-4 relative">
            <div className="border-b pb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Аналітика менеджера:
                {meneger.find((meneger) => meneger.id === selectedMenegerId)?.firstName}
              </h2>
            </div>
            {meneger.map((analytics) => (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-6 rounded-2xl shadow-md">
                <div className="flex flex-col items-center justify-center bg-blue-50 p-4 rounded-xl">
                  <span className="text-sm text-gray-500">Кількість повідомлень</span>
                  <span className="text-2xl font-semibold text-blue-700">
                    {analytics._count?.messages ?? 0}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center bg-blue-50 p-4 rounded-xl">
                  <span className="text-sm text-gray-500">Завершені чати</span>
                  <span className="text-2xl font-semibold text-blue-700">3</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-blue-50 p-4 rounded-xl">
                  <span className="text-sm text-gray-500">Оцінка менеджера</span>
                  <span className="text-2xl font-semibold text-blue-700">5</span>
                </div>
                <div className="md:col-span-3 flex justify-center mt-4">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
                    Проаналізувати менеджера з використанням AI
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </StructurePage>
    </Page>
  );
};

export default Meneger;
