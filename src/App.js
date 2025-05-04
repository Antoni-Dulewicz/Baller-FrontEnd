import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AcceptReferees from './pages/AcceptReferees';
import AddEventForm from './pages/AddEventForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/referees" element={<AcceptReferees />} />
                <Route path="/add-event" element={<AddEventForm />} />
            </Routes>
        </Router>
    );
}

export default App;
