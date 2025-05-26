import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, MapPin, Trophy, Medal, Clock } from 'lucide-react';
import { Alert } from '@mui/material';
import { getRefereeMatches, getEvents, getVenues } from '../services/eventService';

const RefereePage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('matches');
    const [events, setEvents] = useState([]);
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [pastMatches, setPastMatches] = useState([]);
    const [venues, setVenues] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [uploadSuccess, setUploadSuccess] = useState(false);
    // const [eventsEnrolledTo, setEventsEnrolledTo] = useState([]);
    // const [eventsNotEnrolledTo, setEventsNotEnrolledTo] = useState([]);
    const [error, setError] = useState(null);
    


    const refereeId = 7;

    const fetchEvents = async () => {
        try {
            setError(null)
            const data = await getEvents();
            console.log(data)
            // const dataEnrolledTo = data.filter(event => event.participants.includes(userId));
            // const dataNotEnrolledTo = data.filter(event => !event.participants.includes(userId));
            setEvents(data);
            // setEventsEnrolledTo(dataEnrolledTo);
            // setEventsNotEnrolledTo(dataNotEnrolledTo);
            
            
        } catch (err) {
            setError('Nie udało się załadować dostępnych wydarzeń.');
        }

    };


    const fetchRefereeMatches = async () => {
        try {
            setError(null)
            const [upcomingMatches, pastMatches] = await getRefereeMatches(refereeId);
            setUpcomingMatches(upcomingMatches);
            setPastMatches(pastMatches);
            console.log(upcomingMatches);
            console.log(pastMatches);
            
        } catch (err) {
            setError('Nie udało się załadować dostępnych wydarzeń.');
        }
    };

    const fetchVenues = async () => {
        try {
            setError(null)
            const data = await getVenues();
            setVenues(data);
            console.log(data);
            
        } catch (err) {
            setError('Nie udało się załadować dostępnych obiektow.');
        }
    };

    useEffect(() => {
        fetchEvents();
        fetchRefereeMatches();
        fetchVenues();
    }, [])

    // const handleButtonClick = (path) => {
    //     navigate(path);
    // };

    const getStatusColor = (status) => {
        switch(status) {
        case 'In Progress': return 'bg-green-100 text-green-800';
        case 'Upcoming': return 'bg-blue-100 text-blue-800';
        case 'Completed': return 'bg-gray-100 text-gray-800';
        default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleOpenEventPage = (eventId) => {
        navigate(`/event/${eventId}`);
    }

    return (
        <div className="min-h-screen bg-blue-50">
        <header className="bg-blue-900 border-b border-blue-800 px-6 py-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-8">
                <h1 className="text-xl font-semibold text-white">BallerIO</h1>
                <nav className="flex space-x-6">
                <span className="text-blue-200">Moje wydarzenia</span>
                </nav>
            </div>
            <div className="flex items-center space-x-4">
                <button className="p-2 text-blue-300 hover:text-white">
                </button>
                <button className="text-blue-200 hover:text-white">Wyloguj</button>
            </div>
            </div>
        </header>

        <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-6">Ekran sędziego</h1>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-blue-100 p-1 rounded-lg w-fit">
                <button
                onClick={() => setActiveTab('matches')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'matches' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-blue-700 hover:text-blue-900'
                }`}
                >
                Moje mecze
                </button>
                <button
                onClick={() => setActiveTab('tournaments')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'tournaments' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-blue-700 hover:text-blue-900'
                }`}
                >
                Moje Zawody
                </button>
                <button
                    onClick={() => setActiveTab('documents')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'documents' 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'text-blue-700 hover:text-blue-900'
                    }`}
                >
                    Prześlij dokumenty
                </button>
            </div>
            </div>

            {activeTab === 'tournaments' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {events.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">{event.name}</h3>
                        {/* <p className="text-sm text-blue-600 mb-3">{event.sport}</p> */}
                    </div>
                    <div className="flex flex-col items-end">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status}
                        </span>
                        <div className="text-6xl mt-2">{event.image}</div>
                    </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-blue-700">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                        Od {event.start_date} do {event.end_date}
                    </div>
                    <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-blue-500" />
                        Liczba graczy: {event.participants.length}
                    </div>
                    {/* <div className="flex items-center">
                        <Trophy className="w-4 h-4 mr-2 text-blue-500" />
                        {event.prize}
                    </div> */}
                    <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                        {event.venues?.length > 0 && venues[event.venues[0]] 
                            ? venues[event.venues[0]].location 
                            : "Brak lokalizacji"}
                    </div>

                    <div className="flex items-center">
                        <Medal className="w-4 h-4 mr-2 text-blue-500" />
                        Liczba obiektów: {event.venues.length}
                    </div>
                    </div>
                    
                    <button 
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
                        onClick={() => handleOpenEventPage(event.id)}
                    >
                        Zobacz szczegóły
                    </button>
                </div> 
                ))}
            </div>
            )}

            {activeTab === 'matches' && (
            <div className="space-y-8">
                {/* Upcoming Matches */}
                <div>
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Przyszłe mecze</h2>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {upcomingMatches.map((match) => (
                    <div key={match.id} className="bg-white rounded-lg shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-blue-900 mb-1">{match.tournament}</h3>
                            <p className="text-blue-600">{match.participants_names}</p>
                        </div>
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                            {venues[match.venue_id]["name"]}
                        </span>
                        </div>
                        
                        <div className="space-y-2 text-sm text-blue-700">
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                            {match.day}
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-blue-500" />
                            {match.time_slot}
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                            {venues.find(v => v.id === match.venue_id)?.location || "Nieznany obiekt"}
                        </div>
                        <div className="text-blue-500">
                            Referees: {match.referees_names.map(name => name + " ")}
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>

                {/* Past Matches */}
                <div>
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Zakończone mecze</h2>
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {pastMatches.map((match) => (
                    <div key={match.id} className="bg-white rounded-lg shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <h3>
                                {venues.find(v => v.id === match.venue_id)?.name || "Nieznany obiekt"}
                            </h3>
                            <p className="text-blue-600">{match.participants_names}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium`}>
                            {match.result}
                        </span>
                        </div>
                        
                        <div className="space-y-2 text-sm text-blue-700">
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                            {match.day}
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-blue-500" />
                            {match.time_slot}
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                            {venues.find(v => v.id === match.venue_id)?.location || "Nieznany obiekt"}
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
            )}

            {activeTab === 'documents' && (
                <div className="bg-white rounded-lg shadow-md border border-blue-200 p-6 max-w-xl mx-auto">
                    <h2 className="text-xl font-semibold text-blue-900 mb-4">Prześlij skany dokumentów</h2>
                    <p className="text-sm text-blue-700 mb-4">Załaduj pliki w formacie PDF, JPG lub PNG. Maksymalny rozmiar: 10MB.</p>
                    
                    {uploadSuccess && (
                        <Alert severity="success" sx={{ mb: 3 }}>
                            Dokumenty zostały przesłane pomyślnie.
                        </Alert>
                    )}
                    
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setUploadSuccess(true);
                            setSelectedFiles([]);
                            e.target.reset();
                            setTimeout(() => setUploadSuccess(false), 3000);
                    }}
                    >
                    <input 
                        type="file" 
                        accept=".pdf,.jpg,.jpeg,.png" 
                        multiple
                        onChange={(e) => {
                            setSelectedFiles(Array.from(e.target.files));
                            setUploadSuccess(false);
                        }}
                        className="block w-full text-sm text-blue-900
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-600 file:text-white
                                hover:file:bg-blue-700"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors mt-4"
                    >
                        Prześlij
                    </button>
                    
                    </form>
                </div>
                )}
        </div>
        </div>
    );

//   return (
//     <div className="flex flex-col min-h-screen bg-white-900 text-white">
//     {/* Header with user icon */}
//     <header className="bg-blue-900 p-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold pl-8">Tryb sędziego</h1>
//         <button className="p-2 rounded-full hover:bg-blue-800">
//         <User size={24} />
//         </button>
//     </header>

//     <div className="flex flex-wrap justify-center gap-4 px-8 pt-16">
//         <button 
//         onClick={() => handleButtonClick('/matches/referee')}
//         className="bg-blue-500 hover:bg-blue-600 p-4 rounded w-48 h-24 text-center flex flex-col items-center justify-center"
//         >
//         <div className="mb-2">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
//             </svg>
//         </div>
//         <span>Lista meczy</span>
//         </button>
    
//         <button 
//         onClick={() => handleButtonClick('/event-registration/referee')}
//         className="bg-blue-500 hover:bg-blue-600 p-4 rounded w-48 h-24 text-center flex flex-col items-center justify-center"
//         >
//         <div className="mb-2">
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
//             <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
//             </svg>
//         </div>
//         <span>Rejestracja</span>
//         </button>

//     </div>
//     </div>
//   );
        
}

export default RefereePage;