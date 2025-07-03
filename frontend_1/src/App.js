import React from 'react';
import './App.css';

import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import UserDashboard from './Pages/UserDashboard';
import EditProfile from './Pages/EditProfile';
import OrderHistory from './Pages/OrderHistory';
import AddressBook from './Pages/AddressBook';

import ProductList from './Pages/ProductList';
import MyEnquiries from './Pages/MyEnquiries';
import EnquiryForm from './Pages/EnquiryForm';
import Header from './components/Header';
import Home from './Pages/Home';
import Footer from './components/Footer';
import Create from './Pages/Create';
import Sign from './Pages/Sign';
import CartPage from './Pages/CartPage';  // <-- Import CartPage here

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:productId/enquire" element={<EnquiryForm />} />
        <Route path="/my-enquiries/:userId" element={<MyEnquiries />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="/order-history/:id" element={<OrderHistory />} />
        <Route path="/address-book/:id" element={<AddressBook />} />
  
        <Route path="/cart" element={<CartPage />} />  {/* <-- Add this route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
