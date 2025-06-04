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
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import EventDetails from './components/EventDetails.js'
import HomePage from './pages/HomePage.js';
import RoutingGuard from './components/RoutingGuard.js';
import { AuthProvider } from './context/AuthContext.js';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* <Route path="/" element={<HomePage />} />
                    <Route path="/referees" element={<AcceptReferees />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/venues" element={<VenuesPage />} />
                    <Route path="/schedule" element={<Schedule/>} />
                    <Route path="/admin" element={<AdminPage/>} />
                    <Route path="/referee" element={<RefereePage/>} />
                    <Route path="/create-tournament" element={<CreateTournament/>} /> */}
                    {/* <Route path="/tournament" element={<TournamentLadder
                        name = {"Example Tournament Ladder"}
                        place = {"Hala AGH"}
                        date = {"09.05.2025"}
                    />} 
                    /> */}
                    {/* <Route path="/matches/player" element={<MatchList />} />
                    <Route path="/matches/referee" element={<MatchList />} />
                    <Route path="/user" element={<UserPage/>} />
                    <Route path="/event-registration/player" element={<EventRegistration />} />
                    <Route path="/event-registration/referee" element={<EventRegistration />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/event/:id" element={<EventDetails />} /> */}
                    {/* Publiczne strony */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/venues" element={<VenuesPage />} />
                    <Route path="/event/:id" element={<EventDetails />} />

                    <Route path="/user" element={
                        <RoutingGuard allowedRoles={['player']}>
                            <MatchList />
                        </RoutingGuard>
                    } />
                    <Route path="/event-registration/player" element={
                        <RoutingGuard allowedRoles={['player']}>
                            <EventRegistration />
                        </RoutingGuard>
                    } />

                    {/* Sędzia */}
                    <Route path="/referee" element={
                        <RoutingGuard allowedRoles={['referee']}>
                            <RefereePage />
                        </RoutingGuard>
                    } />
                    <Route path="/matches/referee" element={
                        <RoutingGuard allowedRoles={['referee']}>
                            <MatchList />
                        </RoutingGuard>
                    } />
                    <Route path="/event-registration/referee" element={
                        <RoutingGuard allowedRoles={['referee']}>
                            <EventRegistration />
                        </RoutingGuard>
                    } />

                    {/* Admin */}
                    <Route path="/admin" element={
                        <RoutingGuard allowedRoles={['admin']}>
                            <AdminPage />
                        </RoutingGuard>
                    } />
                    <Route path="/referees" element={
                        <RoutingGuard allowedRoles={['admin']}>
                            <AcceptReferees />
                        </RoutingGuard>
                    } />
                    <Route path="/create-tournament" element={
                        <RoutingGuard allowedRoles={['admin']}>
                            <CreateTournament />
                        </RoutingGuard>
                    } />
                    <Route path="/schedule" element={
                        <RoutingGuard allowedRoles={['admin']}>
                            <Schedule />
                        </RoutingGuard>
                    } />
                    <Route path="/venues" element={
                        <RoutingGuard allowedRoles={['admin']}>
                            <Schedule />
                        </RoutingGuard>
                    } />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
