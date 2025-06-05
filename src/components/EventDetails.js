import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Users, MapPin, Clock, Trophy, Medal, ArrowLeft, Star } from 'lucide-react';
import { getEventInfo, getEventUpcomingMatches } from '../services/eventService';

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [eventInfo, setEventInfo] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData()
  }, [id]);

  const daysLeft = eventInfo.endDate ? Math.ceil((new Date(eventInfo.endDate) - new Date()) / (1000 * 60 * 60 * 24)) : 7;

  const completedMatches = [
    {
      id: 1,
      player1: "John Smith",
      player2: "Mike Johnson",
      score: "6-4, 6-3",
      winner: "John Smith",
      date: "2025-04-12",
      time: "14:00",
      round: "1/4 finału",
      court: "Kort 1"
    },
    {
      id: 2,
      player1: "Sarah Williams",
      player2: "Emma Davis",
      score: "6-2, 4-6, 6-4",
      winner: "Sarah Williams", 
      date: "2025-04-12",
      time: "15:30",
      round: "1/4 finału",
      court: "Kort 2"
    },
    {
      id: 3,
      player1: "David Lee",
      player2: "Tom Wilson",
      score: "6-1, 6-2",
      winner: "David Lee",
      date: "2025-04-11",
      time: "16:00",
      round: "1/8 finału",
      court: "Kort 3"
    },
    {
      id: 4,
      player1: "Anna Miller",
      player2: "Lisa Brown",
      score: "4-6, 6-3, 6-2",
      winner: "Anna Miller",
      date: "2025-04-11",
      time: "10:30",
      round: "1/8 finału", 
      court: "Kort 4"
    }
  ];

  const todaysMatches = [
    {
      id: 1,
      player1: "John Smith",
      player2: "Sarah Williams",
      time: "14:00",
      round: "Półfinał",
      court: "Kort 1",
      referee: "Michael Johnson"
    },
    {
      id: 2,
      player1: "David Lee", 
      player2: "Anna Miller",
      time: "16:00",
      round: "Półfinał",
      court: "Kort 2",
      referee: "Robert Brown"
    },
    {
      id: 3,
      player1: "Chris Taylor",
      player2: "Mark Anderson",
      time: "10:00",
      round: "1/4 finału",
      court: "Kort 3",
      referee: "Jennifer White"
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'In Progress': return 'bg-green-100 text-green-800';
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoundColor = (round) => {
    switch(round) {
      case 'Półfinał': return 'bg-purple-100 text-purple-800';
      case '1/4 finału': return 'bg-orange-100 text-orange-800';
      case '1/8 finału': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGoBackToUserPage = () => {
    navigate(`/user`);
  }

  const fetchData = async () => {
      try {
        const data = await getEventInfo(id);
        const matches = await getEventUpcomingMatches(id);
        setEventInfo(data);
        console.log("KURWAAAAAAAAA", matches);
      } catch (err) {
        setError("Nie udało się pobrać danych turnieju.");
        console.error(err); 
    };
  }
  
  

  if (!eventInfo.name) {
  return <div>Loading event info...</div>;
}

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Header */}
      <header className="bg-blue-900 border-b border-blue-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-4">
              <button className="p-2 text-blue-300 hover:text-white rounded-md">
                <ArrowLeft className="w-5 h-5" onClick={() => handleGoBackToUserPage()}/>
              </button>
              <h1 className="text-xl font-semibold text-white">Strona użytkownika</h1>
            </div>
            <nav className="flex space-x-6">
              <span className="text-blue-200">Szczegóły turnieju</span>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-blue-200 hover:text-white">Wyloguj</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* event Header */}
        <div className="bg-white rounded-lg shadow-lg border border-blue-200 p-6 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-blue-900 mb-2">{eventInfo.name}</h1>
              <p className="text-lg text-blue-600">{eventInfo.sport}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(eventInfo.status)}`}>
                {eventInfo.status}
              </span>
              <div className="text-6xl mt-2">🏆</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-900">{eventInfo.participants.length}</div>
              <div className="text-sm text-blue-600">Zarejestrowani gracze</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-900">{eventInfo.prize}</div>
              <div className="text-sm text-blue-600">Do wygrania</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-900">{eventInfo.venues.length}</div>
              <div className="text-sm text-blue-600">Liczba kortow</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-900">{daysLeft}</div>
              <div className="text-sm text-blue-600">Dni do końca</div>
            </div> 
          </div>
        </div>
          {/* TODOOOOOOO */}
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-blue-100 p-1 rounded-lg w-fit mb-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'overview' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-blue-700 hover:text-blue-900'
            }`}
          >
            Inf. ogólne
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'results' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-blue-700 hover:text-blue-900'
            }`}
          >
            Wyniki
          </button>
          <button
            onClick={() => setActiveTab('today')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'today' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'text-blue-700 hover:text-blue-900'
            }`}
          >
            Dzisiejsze mecze
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Basic Information */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg border border-blue-200 p-6 mb-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Informacje</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center text-blue-700">
                      <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-sm font-medium">Daty:</span>
                      <span className="ml-2 text-sm">{eventInfo.start_date} - {eventInfo.end_date}</span>
                    </div>
                    <div className="flex items-center text-blue-700">
                      <Users className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-sm font-medium">Liczba graczy:</span>
                      <span className="ml-2 text-sm">{eventInfo.participants.length}</span>
                    </div>
                    {/* <div className="flex items-center text-blue-700">
                      <Trophy className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-sm font-medium">Do wygrania:</span>
                      <span className="ml-2 text-sm">{eventInfo.prize}</span>
                    </div> */}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center text-blue-700">
                      <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-sm font-medium">Lokalizacja:</span>
                      <span className="ml-2 text-sm">Kraków</span>
                    </div>
                    <div className="flex items-center text-blue-700">
                      <Medal className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-sm font-medium">Liczba kortów:</span>
                      <span className="ml-2 text-sm">{eventInfo.venues.length}</span>
                    </div>
                    {/* <div className="flex items-center text-blue-700">
                      <Star className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-sm font-medium">Wpisowe:</span>
                      <span className="ml-2 text-sm">{eventInfo.registration_fee}</span>
                    </div> */}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-lg shadow-lg border border-blue-200 p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Opis</h2>
                <div className="prose prose-blue max-w-none">
                  {/* {eventInfo.description.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-blue-700 leading-relaxed mb-4">
                      {paragraph}
                    </p>
                  ))} */}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg border border-blue-200 p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Organizator</h3>
                <p className="text-blue-700">{eventInfo.organizer}</p>
              </div>

              <div className="bg-white rounded-lg shadow-lg border border-blue-200 p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Progres turnieju</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600">Rejestracja</span>
                    <span className="text-green-600 font-medium">Zakończono</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600">1/8 finału</span>
                    <span className="text-green-600 font-medium">Zakończono</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600">1/4 finału</span>
                    <span className="text-blue-600 font-medium">W trakcie</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600">Półfinał</span>
                    <span className="text-gray-500">Oczekuje</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-600">Finał</span>
                    <span className="text-gray-500">Oczekuje</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Tab */}
        {activeTab === 'results' && (
          <div>
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">Rozegrane mecze</h2>
            <div className="space-y-4">
              {completedMatches.map((match) => (
                <div key={match.id} className="bg-white rounded-lg shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoundColor(match.round)}`}>
                          {match.round}
                        </span>
                        <span className="text-blue-600 text-sm">{match.court}</span>
                      </div>
                      <div className="text-lg font-semibold text-blue-900">
                        <span className={match.winner === match.player1 ? 'text-green-600' : ''}>{match.player1}</span>
                        <span className="mx-2 text-blue-500">vs</span>
                        <span className={match.winner === match.player2 ? 'text-green-600' : ''}>{match.player2}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-900">{match.score}</div>
                      <div className="text-sm text-green-600 font-medium">Zwycięzca: {match.winner}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-blue-600 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {match.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {match.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Today's Matches Tab */}
        {activeTab === 'today' && (
          <div>
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">Dzisiejsze mecze - Maj 25, 2025</h2>
            <div className="space-y-4">
              {todaysMatches.map((match) => (
                <div key={match.id} className="bg-white rounded-lg shadow-lg border border-blue-200 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoundColor(match.round)}`}>
                          {match.round}
                        </span>
                        <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          {match.court}
                        </span>
                      </div>
                      <div className="text-lg font-semibold text-blue-900">
                        {match.player1} <span className="mx-2 text-blue-500">vs</span> {match.player2}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-blue-600">{match.time}</div>
                      <div className="text-sm text-blue-500">Dzisiaj</div>
                    </div>
                  </div>
                  <div className="text-sm text-blue-600">
                    <span className="font-medium">Sędzia:</span> {match.referee}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;




// import { User, Menu, X } from 'lucide-react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { getEvent, getParticipants } from '../services/eventService';
// import Header from '../components/Header';
// import { Button, Box, Collapse } from '@mui/material';
// import CustomTable from '../components/Table/Table';

// const Event = () => {
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [event, setEvent] = useState(null);
//   const [participants, setParticipants] = useState(null);
//   const [referees, setReferees] = useState(null);
//   const { id } = useParams();

//   const fetchEventData = async () => {
//       try {
//           console.log(window.location.hostname);
//           const eventData = await getEvent(id);
//           setEvent(eventData)
//           console.log('Fetched event:', eventData);

//           const participantsData = await getParticipants(eventData.participants);
//           setParticipants(participantsData)
//           console.log('Fetched participants:', participantsData);

//           // const refereesData = await getReferees(eventData.referees);
//           // setReferees(refereesData);
//           // console.log('Fetched referees:', refereesData);

//       } catch (error) {
//           console.error('Error fetching:', error);
//       }
//   };


//   useEffect(() => {
//     fetchEventData();
//   },[id]);

//   const handleBackClick = () => {
//     const path = '/events';
//     // console.log(path);
//     navigate(path);
//   };

//   // const navItems = [
//   //   { path: '/events', label: 'Powrót do wydarzeń' },
//   // ];

//   if (!event) return <div>Ładowanie danych wydarzenia...</div>;

//   const participantsColumns = [
//     { header: 'Imię i nazwisko', accessor: 'name' },
//     { header: 'Email', accessor: 'email' },
//   ];

//   return (
//     <div>
//       <Header title={event.name}/>

//       <Box sx={{ display: 'flex', justifyContent: 'flex-start', margin: '1rem' }}>
//           <Button 
//               variant="contained" 
//               color="primary" 
//               onClick={() => handleBackClick()}
//           >
//             Powrót
//           </Button>
//       </Box>

//       <div style={{ padding: '2rem' }}>
//           <h2>Uczestnicy</h2>
//           {participants ?
//             <CustomTable data={participants} columns={participantsColumns} /> 
//             : 
//             'Brak uczestnikow'}
          
//       </div>
//     </div>

//   );
// };

// export default Event;