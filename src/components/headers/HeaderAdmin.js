import { User, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const HeaderAdmin = ({ title }) => {
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
    <header className="p-4 bg-white shadow-sm">
      {/* Top bar with title, menu toggle and user icon */}
       <div className="bg-blue-900 py-8 px-4 flex items-center justify-center relative">
        <h1 className="text-2xl text-white font-bold absolute left-1/2 transform -translate-x-1/2">
        {title}
        </h1>
        <div className="absolute right-4">
          <button className="p-2 rounded-full hover:bg-blue-800">
            <User size={24} color="white" />
          </button>
        </div>
        
        <div className="flex items-center gap-2">          
          {/* Mobile menu toggle */}
          <button 
            className="p-2 rounded-full hover:bg-gray-100 lg:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>   
        </div>
      </div>

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

export default HeaderAdmin;