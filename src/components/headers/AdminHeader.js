import { User, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import TopHeader from './TopHeader';

const AdminHeader = ({ title }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleButtonClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/admin', label: 'Strona główna' },
    { path: '/admin/algorithm', label: 'Uruchom scheduling' },
    { path: '/admin/schedule', label: 'Pokaż Harmonogram'},
    { path: '/admin/events', label: 'Zarządzaj wydarzeniami' },
    { path: '/admin/referees', label: 'Zarządzaj sędziami' },
    { path: '/admin/venues', label: 'Zarządzaj obiektami' },
  ];

  return (
    <header>
      <TopHeader 
        title={title}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Navigation - three different layouts based on screen size */}
      <nav className={`
        ${isMenuOpen ? 'flex' : 'hidden'} 
        lg:flex flex-col md:flex-row flex-wrap
        w-full mt-4 gap-2
      `}>
        <div className="w-full lg:hidden grid grid-cols-2 gap-2">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleButtonClick(item.path)}
              className={`
                py-2 px-2 text-sm md:text-base rounded text-center
                transition-colors duration-200
                ${item.isActive 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop navigation - horizontal row */}
        <div className="hidden lg:flex flex-row gap-3 justify-center">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleButtonClick(item.path)}
              className={`
                py-2 px-4 text-base rounded text-center
                transition-colors duration-200
                ${item.isActive 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
                }
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default AdminHeader;