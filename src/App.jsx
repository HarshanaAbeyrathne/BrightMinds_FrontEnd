import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import AddItems from './pages/AddItems';
import RemoveItems from './pages/RemoveItems';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/add-item" element={<AddItems />} />
          <Route path="/remove-item" element={<RemoveItems />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
