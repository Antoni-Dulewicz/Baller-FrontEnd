import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AcceptReferees from './pages/AcceptReferees';
import AddEventForm from './pages/AddEventForm';
import Schedule from './pages/Schedule';
import AdminPage from './pages/AdminPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/referees" element={<AcceptReferees />} />
                <Route path="/add-event" element={<AddEventForm />} />
                <Route path="/schedule" element={<Schedule/>} />
                <Route path="/admin" element={<AdminPage/>} />

            </Routes>
        </Router>
    );
}

export default App;
