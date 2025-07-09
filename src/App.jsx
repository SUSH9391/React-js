// App.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero'; // Your homepage or parent component
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main'; // Your main application component
import AddJournal from './components/Addjournal'; // Component for adding journals
import Calender from './components/Calender';


function App() {
    const [journals, setJournals] = useState([]);
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main journals={journals} />} />
        <Route path="/add-journal" element={<AddJournal setJournals={setJournals} />}/>
        <Route path="/calender" element={<Calender />} />
      </Routes>
    </Router>
  );
}

export default App;
