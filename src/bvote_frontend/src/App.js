import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './home';
import Presiden from './presiden';
import NavigationBar from './Components/Navbar';
import Verify from './verify';

const App = () => {
  const user_id = localStorage.getItem('user_id'); // Periksa apakah user_id ada dalam local storage

  return (
    <Router>
      <NavigationBar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* Periksa apakah user_id ada dalam local storage */}
        {user_id ? (
          <Route path="/presiden" element={<Presiden />} />
        ) : (
          <Route path="/presiden" element={<Navigate to="/verify" />} />
        )}

        <Route path="/verify" element={<Verify />} />
      </Routes>
    </Router>
  );
};

export default App;
