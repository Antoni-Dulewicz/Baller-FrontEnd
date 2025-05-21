import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getPlayerMatches, getRefereeMatches, getVenue } from '../services/eventService';
import UserHeader from '../components/UserHeader';
import RefereeHeader from '../components/RefereeHeader';

const playerId = 4;
const refereeId = 7;

const timeSlotToHours = {   
  First: "8:00 - 8:45",
  Second: "9:00 - 9:45",
  Third: "10:00 - 10:45",
  Fourth: "11:00 - 11:45",
  Fifth: "12:00 - 12:45",
  Sixth: "13:00 - 13:45",
  Seventh: "14:00 - 14:45",
  Eighth: "15:00 - 15:45",
};

function getTimeRange(slot) {
  return timeSlotToHours[slot] || "Nieznana godzina";
}

function isFutureDate(dateStr) {
  const today = new Date();
  const date = new Date(dateStr);
  return date >= today;
}

const MatchList = () => {
  const location = useLocation();
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [venueMap, setVenueMap] = useState({});
  const [view, setView] = useState('upcoming');

  const isReferee = location.pathname.includes('/matches/referee');
  const userId = isReferee ? refereeId : playerId;

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setError(null);
      const data = isReferee
        ? await getRefereeMatches(userId)
        : await getPlayerMatches(userId);
      const uniqueVenueIds = [...new Set(data.map(m => m.venue_id))];

      const venueEntries = await Promise.all(uniqueVenueIds.map(async (id) => {
        try {
          const venue = await getVenue(id);
          return [id, venue];
        } catch {
          return [id, { name: `Obiekt ${id}`, location: 'Nieznana lokalizacja' }];
        }
      }));

      setVenueMap(Object.fromEntries(venueEntries));
      setMatches(data);
    } catch (err) {
      console.error('Błąd podczas pobierania meczów:', err);
      setError('Nie udało się pobrać meczów zawodnika.');
    }
  };

  const filteredMatches = matches.filter((match) => {
    const matchIsFuture = isFutureDate(match.day);
    return view === 'upcoming' ? (!match.winner && matchIsFuture) : (match.winner || !matchIsFuture);
  });

  return (
    <div>
        {isReferee ? (
          <RefereeHeader title="Lista meczy" />
        ) : (
          <UserHeader title="Lista meczy" />
        )}
        <div className="min-h-screen bg-white text-gray-900">
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {view === 'upcoming' ? 'Nadchodzące mecze' : 'Wyniki spotkań'}
            </h2>

            <div className="space-x-2">
              <button
                onClick={() => setView('upcoming')}
                className={`px-4 py-2 rounded ${view === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-white border border-blue-600 text-blue-600'} transition`}
              >
                Nadchodzące
              </button>
              <button
                onClick={() => setView('finished')}
                className={`px-4 py-2 rounded ${view === 'finished' ? 'bg-blue-600 text-white' : 'bg-white border border-blue-600 text-blue-600'} transition`}
              >
                Zakończone
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="grid gap-4">
            {filteredMatches.map((match) => {
              const venue = venueMap[match.venue_id] || { name: `Obiekt ${match.venue_id}`, location: '' };
              const playerName = (id) => {
                if (isReferee) return `Gracz ${id}`;
                return id === playerId ? 'Ty' : `Gracz ${id}`;
              };

              return (
                <div key={match.id} className="bg-white rounded shadow border border-gray-200">
                  <div className="flex justify-between items-center px-4 py-2 border-b border-gray-100 bg-gray-50">
                    <span className="text-sm text-gray-600">{venue.name} – {venue.location}</span>
                    {match.time_slot && (
                      <span className="text-sm text-gray-500">
                        {match.day} – {getTimeRange(match.time_slot)}
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <div className="flex justify-between px-4 py-2 bg-gray-400 text-white">
                      <span>{playerName(match.participants[0])}</span>
                      <span>{match.winner === match.participants[0] ? "Zwycięzca" : ''}</span>
                    </div>
                    <div className="flex justify-between px-4 py-2 bg-gray-500 text-white">
                      <span>{playerName(match.participants[1])}</span>
                      <span>{match.winner === match.participants[1] ? "Zwycięzca" : ''}</span>
                    </div>
                  </div>

              
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MatchList;
