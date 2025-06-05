import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUpcomingEvents, registerToEvent, registerRefereeToEvent } from '../services/eventService';
import { AlertCircle, CalendarCheck } from 'lucide-react';
import { Box, Button,Collapse } from '@mui/material';
import UserHeader from '../components/headers/UserHeader';
import RefereeHeader from '../components/headers/RefereeHeader';

const userId = 4;
const refereeId = 7;

const EventRegistration = () => {
  const location = useLocation();
  const [events, setEvents] = useState([]);
  const [eventsEnrolledTo, setEventsEnrolledTo] = useState([]);
  const [eventsNotEnrolledTo, setEventsNotEnrolledTo] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isTableOpen, setIsTableOpen] = useState(false);

  const isReferee = location.pathname.includes('/event-registration/referee');


  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setError(null);
      const data = await getUpcomingEvents();
      const dataEnrolledTo = data.filter(event => event.participants.includes(userId));
      const dataNotEnrolledTo = data.filter(event => !event.participants.includes(userId));
      setEvents(data);
      setEventsEnrolledTo(dataEnrolledTo);
      setEventsNotEnrolledTo(dataNotEnrolledTo);

      console.log(data);
    } catch (err) {
      setError('Nie udało się załadować dostępnych wydarzeń.');
    }
  };

  const handleRegister = async (eventId) => {
    try {
      setError(null);
      setSuccess(null);
      if (isReferee) {
        await registerRefereeToEvent(eventId, refereeId);
        setSuccess(`Zarejestrowano sędziego do wydarzenia`);
      } else {
        await registerToEvent(eventId, userId);
        setSuccess(`Zarejestrowano zawodnika do wydarzenia`);
      }
      loadEvents();
    } catch (err) {
      setError(`Nie udało się zapisać: ${err.message}`);
    }
  };

  const toggleTable = () => {
        setIsTableOpen(!isTableOpen);
    };

  return (
    <div>
        {isReferee ? (
          <RefereeHeader title="Rejestracja do turniejów" />
        ) : (
          <UserHeader title="Rejestracja do turniejów" />
        )}
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

            {eventsNotEnrolledTo.length === 0 ? (
            <p className="text-gray-700">Brak dostępnych turniejów do rejestracji.</p>
            ) : (
            <div className="grid gap-4 md:grid-cols-2">
                {eventsNotEnrolledTo.map(event => (
                <div
                    key={event.id}
                    className="border border-gray-300 rounded-xl p-6 shadow-sm flex flex-col justify-between"
                >
                    <div>
                    <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                    <p className="text-sm text-gray-600">Od: {event.start_date} &nbsp; | &nbsp;Do: {event.end_date}</p>
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
            
            <div style={{ padding: '2rem' }}>
              <h2>Moje wydarzenia</h2>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem' }}>
                  <Button 
                      variant="contained" 
                      color="primary" 
                      onClick={toggleTable}
                  >
                      {isTableOpen ? 'Zwiń' : 'Rozwiń'}
                  </Button>
              </Box>
              <Collapse in={isTableOpen}>
                {eventsEnrolledTo.length === 0 ? (
                  <p className="text-gray-700">Brak dostępnych turniejów do rejestracji.</p>
                  ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                      {eventsEnrolledTo.map(event => (
                      <div
                          key={event.id}
                          className="border border-gray-300 rounded-xl p-6 shadow-sm flex flex-col justify-between"
                      >
                        <div>
                        <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                        <p className="text-sm text-gray-600">Od: {event.start_date} &nbsp; | &nbsp;Do: {event.end_date}</p>
                        </div>
                      </div>
                      ))}
                  </div>
                  )}
              </Collapse>
            </div>

            
        </main>
        </div>
    </div>
  );
};

export default EventRegistration;
