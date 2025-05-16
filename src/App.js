import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AcceptReferees from './pages/AcceptReferees';
import EventsPage from './pages/EventsPage';
import Schedule from './pages/Schedule';
import AdminPage from './pages/AdminPage';
import CreateTournament from './pages/CreateTournament';
import TournamentLadder from './pages/TournamentLadder';
import VenuesPage from './pages/VenuesPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/referees" element={<AcceptReferees />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/venues" element={<VenuesPage />} />
                <Route path="/schedule" element={<Schedule/>} />
                <Route path="/admin" element={<AdminPage/>} />
                <Route path="/create-tournament" element={<CreateTournament/>} />
                <Route path="/tournament" element={<TournamentLadder
                    name = {"Example Tournament Ladder"}
                    place = {"Hala AGH"}
                    date = {"09.05.2025"}
                />} 
                />
            </Routes>
        </Router>
    );
}

export default App;
