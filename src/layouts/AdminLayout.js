import { Outlet } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'; 

export default function AdminLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-white-900 text-white">
      <header className="bg-blue-900 p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold pl-8">Tryb administratora</h1>
        <button className="p-2 rounded-full hover:bg-blue-800">
          <PersonIcon />
        </button>
      </header>

      <Breadcrumbs />

      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
}
