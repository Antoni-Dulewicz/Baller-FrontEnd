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
import MatchList from './pages/MatchList';
import UserPage from './pages/UserPage';
import EventRegistration from './pages/EventRegistration.js';
import RefereePage from './pages/RefereePage.js';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/referees" element={<AcceptReferees />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/venues" element={<VenuesPage />} />
                <Route path="/schedule" element={<Schedule/>} />
                <Route path="/admin" element={<AdminPage/>} />
                <Route path="/referee" element={<RefereePage/>} />
                <Route path="/create-tournament" element={<CreateTournament/>} />
                <Route path="/tournament" element={<TournamentLadder
                    name = {"Example Tournament Ladder"}
                    place = {"Hala AGH"}
                    date = {"09.05.2025"}
                />} 
                />
                <Route path="/matches/player" element={<MatchList />} />
                <Route path="/matches/referee" element={<MatchList />} />
                <Route path="/user" element={<UserPage/>} />
                <Route path="/event-registration/player" element={<EventRegistration />} />
                <Route path="/event-registration/referee" element={<EventRegistration />} />
            </Routes>
        </Router>
    );
}

export default App;
