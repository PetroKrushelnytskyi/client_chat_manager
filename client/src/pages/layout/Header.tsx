import { useContext } from 'react';
import { UserContext } from '../../../contexts/User';
const Header = () => {
  const { logout, currentAccount } = useContext(UserContext);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-blue-400 text-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg sm:text-xl font-semibold">Мій Сайт</h1>
        <div className="flex gap-2 sm:gap-4">
          {currentAccount && (
            <button
              onClick={() => {
                logout();
              }}
              className="bg-white text-blue-600 px-3 sm:px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Вийти
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
