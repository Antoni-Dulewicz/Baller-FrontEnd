import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = ({title}) => {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <header className="p-4 bg-white flex justify-between items-center">
      {/* Tytuł */}
      <h1 className="text-2xl font-bold pl-8">{title}</h1>

      {/* Nawigacja */}
      <div className="flex gap-4 items-center">
        <button
          onClick={() => handleButtonClick('/admin')}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Strona główna
        </button>
        <button
          onClick={() => handleButtonClick('/algorithm')}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Uruchom scheduling
        </button>
        {/* font-bold */}
        
        <button 
          onClick={() => handleButtonClick('/schedule')}
          className="bg-blue-600 hover:bg-blue-600 px-4 py-2 rounded">
          Pokaż Harmonogram
        </button>
        <button
          onClick={() => handleButtonClick('/add-event')}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Zarządzaj wydarzeniami
        </button>
        <button
          onClick={() => handleButtonClick('/referees')}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Zarządzaj sędziami
        </button>
        <button
          onClick={() => handleButtonClick('/venues')}
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
        >
          Zarządzaj obiektami
        </button>

        {/* Ikona użytkownika */}
        <button className="p-2 rounded-full hover:bg-blue-600">
          <User size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
