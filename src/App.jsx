// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero'; // Your homepage or parent component
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
