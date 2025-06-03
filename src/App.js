import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AcceptReferees from './pages/AcceptReferees';
import EventsPage from './pages/EventsPage';
import Schedule from './pages/Schedule';
import AdminPage from './pages/AdminPage';
import CreateTournament from './pages/CreateTournament';
import AdminLayout from './layouts/AdminLayout.js';
import TournamentLadder from './pages/TournamentLadder';
import VenuesPage from './pages/VenuesPage';
import MatchList from './pages/MatchList';
import UserPage from './pages/UserPage';
import EventRegistration from './pages/EventRegistration.js';
import RefereePage from './pages/RefereePage.js';
import { UploadMatchProtocol } from './pages/UploadMatchProtocol.js';
import EventDetails from './components/EventDetails.js'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminPage />} />
                    <Route path="protocol" element={<UploadMatchProtocol />} />
                    <Route path="events" element={<EventsPage />} />
                    <Route path="referees" element={<AcceptReferees />} />
                    <Route path="schedule" element={<Schedule />} />
                    <Route path="venues" element={<VenuesPage />} />
                </Route>
                <Route path="/referee" element={<RefereePage />} />
                <Route path="/create-tournament" element={<CreateTournament />} />
                {/* <Route
                    path="/tournament"
                    element={<TournamentLadder name={'Example Tournament Ladder'} place={'Hala AGH'} date={'09.05.2025'} />}
                /> */}
                <Route path="/matches/player" element={<MatchList />} />
                <Route path="/matches/referee" element={<MatchList />} />
                <Route path="/user" element={<UserPage />} />
                <Route path="/event-registration/player" element={<EventRegistration />} />
                <Route path="/event-registration/referee" element={<EventRegistration />} />
                <Route path="/event/:id" element={<EventDetails />} />

            </Routes>
        </Router>
    );
}

export default App;
