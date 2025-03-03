import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importing pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import AddItems from './pages/AddItems';
import RemoveItems from './pages/RemoveItems';
import TodoList from './pages/TodoList';
import AllItems from './pages/AllItems';
import ItemDetails from './pages/ItemDetails';
import Cart from './pages/Cart';
import UserProfile from './pages/UserProfile';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Payment from './pages/Payment';
import ItemSearch from './pages/ItemSearch';
import Service from './pages/Service';


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
          <Route path="/todoList" element={<TodoList />} />
          <Route path="/items" element={<AllItems />} />
          <Route path="/items/:id" element={<ItemDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/search" element={<ItemSearch />} />
          <Route path="/service" element={<Service />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;