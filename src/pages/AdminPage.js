import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';

const AdminPage = () => {
    const navigate = useNavigate();

    const handleButtonClick = (path) => {
        navigate(path);
    };

  return (
    <div className="flex flex-col min-h-screen bg-white-900 text-white">
      {/* Header with user icon */}
      <header className="bg-blue-900 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold pl-8">Tryb administratora</h1>
        <button className="p-2 rounded-full hover:bg-blue-800">
          <User size={24} />
        </button>
      </header>

      <div className="flex flex-wrap justify-center gap-4 px-8 pt-16">
        <button 
          onClick={() => handleButtonClick('/algorithm')}
          className="bg-blue-500 hover:bg-blue-600 p-4 rounded w-48 h-24 text-center flex flex-col items-center justify-center"
        >
          <div className="mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <span>Uruchom scheduling</span>
        </button>

        <button 
          onClick={() => handleButtonClick('/schedule')}
          className="bg-blue-500 hover:bg-blue-600 p-4 rounded w-48 h-24 text-center flex flex-col items-center justify-center"
        >
          <div className="mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <span>Pokaż Harmonogram</span>
        </button>

        <button 
          onClick={() => handleButtonClick('/add-event')}
          className="bg-blue-500 hover:bg-blue-600 p-4 rounded w-48 h-24 text-center flex flex-col items-center justify-center"
        >
          <div className="mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span>Zarządzaj wydarzeniami</span>
        </button>

        <button 
          onClick={() => handleButtonClick('/referees')}
          className="bg-blue-500 hover:bg-blue-600 p-4 rounded w-48 h-24 text-center flex flex-col items-center justify-center"
        >
          <div className="mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span>Zarządzaj sędziami</span>
        </button>

        <button 
          onClick={() => handleButtonClick('/venues')}
          className="bg-blue-500 hover:bg-blue-600 p-4 rounded w-48 h-24 text-center flex flex-col items-center justify-center"
        >
          <div className="mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span>Zarządzaj obiektami</span>
        </button>
      </div>
    </div>
  );
        
}

export default AdminPage;