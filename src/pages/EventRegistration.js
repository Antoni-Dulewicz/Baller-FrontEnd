import React, { useEffect, useState } from 'react';
import { getUpcomingEvents, registerToEvent } from '../services/eventService';
import { AlertCircle, CalendarCheck } from 'lucide-react';
import UserHeader from '../components/UserHeader';

const userId = 4;

const EventRegistration = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setError(null);
      const data = await getUpcomingEvents();
      setEvents(data);
    } catch (err) {
      setError('Nie udało się załadować dostępnych wydarzeń.');
    }
  };

  const handleRegister = async (eventId) => {
    try {
      setError(null);
      await registerToEvent(eventId, userId);
      setSuccess(`Zapisano do wydarzenia #${eventId}`);
    } catch (err) {
      setError(`Nie udało się zapisać: ${err.message}`);
    }
  };

  return (
    <div>
        <UserHeader title = "Rejestracja do turniejów" />
        <div className="flex flex-col min-h-screen bg-white text-black">
        <main className="flex flex-col gap-6 px-8 py-12">
            {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded flex items-center gap-2">
                <AlertCircle size={20} />
                {error}
            </div>
            )}

            {success && (
            <div className="bg-green-100 text-green-700 p-4 rounded flex items-center gap-2">
                <CalendarCheck size={20} />
                {success}
            </div>
            )}

            {events.length === 0 ? (
            <p className="text-gray-700">Brak dostępnych turniejów do rejestracji.</p>
            ) : (
            <div className="grid gap-4 md:grid-cols-2">
                {events.map(event => (
                <div
                    key={event.id}
                    className="border border-gray-300 rounded-xl p-6 shadow-sm flex flex-col justify-between"
                >
                    <div>
                    <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                    <p className="text-sm text-gray-600">Od: {event.start_date} &nbsp; | &nbsp;Do: {event.end_date}</p>
                    <p className="text-sm mt-1 text-gray-500">ID wydarzenia: {event.id}</p>
                    </div>
                    <button
                    onClick={() => handleRegister(event.id)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                    Zapisz się
                    </button>
                </div>
                ))}
            </div>
            )}
        </main>
        </div>
    </div>
  );
};

export default EventRegistration;
