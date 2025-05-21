import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const RefereePage = () => {
    const navigate = useNavigate();

    const handleButtonClick = (path) => {
        navigate(path);
    };

  return (
    <div className="flex flex-col min-h-screen bg-white-900 text-white">
    {/* Header with user icon */}
    <header className="bg-blue-900 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold pl-8">Tryb sędziego</h1>
        <button className="p-2 rounded-full hover:bg-blue-800">
        <User size={24} />
        </button>
    </header>

    <div className="flex flex-wrap justify-center gap-4 px-8 pt-16">
        <button 
        onClick={() => handleButtonClick('/matches/referee')}
        className="bg-blue-500 hover:bg-blue-600 p-4 rounded w-48 h-24 text-center flex flex-col items-center justify-center"
        >
        <div className="mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
        </div>
        <span>Lista meczy</span>
        </button>
    
        <button 
        onClick={() => handleButtonClick('/event-registration/referee')}
        className="bg-blue-500 hover:bg-blue-600 p-4 rounded w-48 h-24 text-center flex flex-col items-center justify-center"
        >
        <div className="mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </div>
        <span>Rejestracja</span>
        </button>

    </div>
    </div>
  );
        
}

export default RefereePage;