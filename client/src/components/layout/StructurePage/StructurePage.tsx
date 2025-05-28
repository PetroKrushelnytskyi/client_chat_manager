import { useNavigate } from 'react-router-dom';
import { useState } from 'react'; 

type Data = {
  id: number;
  name: string;
  unread: boolean;
  pathname?: string;
};

type StructurePageProps = {
  title: string;
  description: string;
  createCallback?: () => void;
  FiltersComponent?: React.ReactNode;
  filterTitle?: string;
  children?: React.ReactNode;
  afterRightTopBar?: () => React.ReactNode;
  isDisplayGoToHome?: boolean;
  data?: Data[];
  onSelect?: (id: number) => void;
  selectedId?: number;
};

const StructurePage = ({
  title,
  description,
  createCallback,
  children,
  data = [],
  onSelect,
  selectedId,
}: StructurePageProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleItemClick = (item: Data) => {
    if (onSelect) {
      onSelect(item.id);
    } else if (item.pathname) {
      navigate(item.pathname);
    }
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row w-full h-full">
      <div className="w-full md:w-1/4 p-4 border-r overflow-y-auto space-y-4 h-[calc(100vh-4rem)] border-gray-300 rounded-lg">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold">{title}</h1>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          {createCallback && (
            <button
              onClick={createCallback}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
            >
              +
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Пошук за ім'ям..."
            className="border border-gray-300 rounded px-3 py-2 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />
          <button className="bg-gray-200 p-2 rounded hover:bg-gray-300 transition">
            🔍
          </button>
        </div>

        <ul className="space-y-3">
          {filteredData.map((item) => (
            <li key={item.id} className="flex flex-col space-y-1">
              <div
                className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer ${
                  selectedId === item.id ? 'bg-blue-100' : 'hover:bg-gray-200'
                }`}
                onClick={() => handleItemClick(item)}
              >
                <span className="text-gray-800 text-lg">
                  {item.name}
                  {item.unread && <span className="ml-2 text-red-500">●</span>}
                </span>
              </div>
              <hr className="border-gray-300 mt-1" />
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full md:w-3/4 p-4 space-y-4">
        <div className="rounded p-4 min-h-[200px]">{children}</div>
      </div>
    </div>
  );
};

export default StructurePage;