// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero'; // Your homepage or parent component
import Login from './components/Login';
import Signup from './components/Signup';
import Main from './components/Main'; // Your main application component
import Calender from './components/Calender';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/main' element={<Main />}/>
        <Route path="/calender" element={<Calender />} />
      </Routes>
    </Router>
  );
}

export default App;
