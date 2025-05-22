import { User, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const RefereeHeader = ({ title }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleButtonClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/user', label: 'Strona główna' },
    { path: '/matches/referee', label: 'Lista Meczy' },
    { path: '/event-registration/referee', label: 'Rejestracja'}
  ];

  return (
    <header className="p-4 bg-blue-900 shadow-sm">
      {/* Top bar with title, menu toggle and user icon */}
      <div className="w-full flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold text-white">{title}</h1>
        
        <div className="flex items-center gap-2">          
          {/* Mobile menu toggle */}
          <button 
            className="p-2 rounded-full hover:bg-gray-100 lg:hidden" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* User icon - always visible */}
          <button className="p-2 rounded-full hover:bg-gray-100">
            <User size={24} />
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

export default RefereeHeader;