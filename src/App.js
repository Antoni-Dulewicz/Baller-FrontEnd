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
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import { UploadMatchProtocol } from './pages/UploadMatchProtocol.js';
import EventDetails from './components/EventDetails.js'
import HomePage from './pages/HomePage.js';
import RoutingPersonalRules from './components/RoutingPersonalRules.js';
import { AuthProvider } from './context/AuthContext.js';
import RoutingLoginRules from './components/RoutingLoginRules.js';

function App() {
    return (
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
                    <Route path="/tournament" element={<TournamentLadder
                        name = {"Example Tournament Ladder"}
                        place = {"Hala AGH"}
                        date = {"09.05.2025"}
                    />} 
                    />
                    {/* <Route path="/matches/player" element={<MatchList />} />
                    <Route path="/matches/referee" element={<MatchList />} />
                    <Route path="/user" element={<UserPage/>} />
                    <Route path="/event-registration/player" element={<EventRegistration />} />
                    <Route path="/event-registration/referee" element={<EventRegistration />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/event/:id" element={<EventDetails />} /> */}
                    

                    {/* NEW ROUTES */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={
                        <RoutingLoginRules>
                            <LoginPage />
                        </RoutingLoginRules>
                    } />
                    <Route path="/register" element={
                        <RoutingLoginRules>
                            <RegisterPage />
                        </RoutingLoginRules>
                    } />
                    <Route path="/events" element={<EventsPage />} />
                    <Route path="/venues" element={<VenuesPage />} />
                    <Route path="/event/:id" element={<EventDetails />} />

                    <Route path="/user" element={
                        <RoutingPersonalRules allowedRoles={['player']}>
                            <UserPage />
                        </RoutingPersonalRules>
                    } />
                    <Route path="/event-registration/player" element={
                        <RoutingPersonalRules allowedRoles={['player']}>
                            <EventRegistration />
                        </RoutingPersonalRules>
                    } />

                    <Route path="/referee" element={
                        <RoutingPersonalRules allowedRoles={['referee']}>
                            <RefereePage />
                        </RoutingPersonalRules>
                    } />
                    <Route path="/matches/referee" element={
                        <RoutingPersonalRules allowedRoles={['referee']}>
                            <MatchList />
                        </RoutingPersonalRules>
                    } />
                    <Route path="/event-registration/referee" element={
                        <RoutingPersonalRules allowedRoles={['referee']}>
                            <EventRegistration />
                        </RoutingPersonalRules>
                    } />

                    <Route path="/admin" element={
                        <RoutingPersonalRules allowedRoles={['admin']}>
                            <AdminPage />
                        </RoutingPersonalRules>
                    } />
                    <Route path="/admin/referees" element={
                        <RoutingPersonalRules allowedRoles={['admin']}>
                            <AcceptReferees />
                        </RoutingPersonalRules>
                    } />
                    <Route path="/admin/create-tournament" element={
                        <RoutingPersonalRules allowedRoles={['admin']}>
                            <CreateTournament />
                        </RoutingPersonalRules>
                    } />
                    <Route path="/admin/schedule" element={
                        <RoutingPersonalRules allowedRoles={['admin']}>
                            <Schedule />
                        </RoutingPersonalRules>
                    } />
                    <Route path="/admin/venues" element={
                        <RoutingPersonalRules allowedRoles={['admin']}>
                            <VenuesPage />
                        </RoutingPersonalRules>
                    } />
                    <Route path="/admin/events" element={
                        <RoutingPersonalRules allowedRoles={['admin']}>
                            <EventsPage />
                        </RoutingPersonalRules>
                    } />
                </Routes>
            </Router>
    );
}

export default App;
