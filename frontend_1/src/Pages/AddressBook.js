import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AddressBook.css';

function AddressBook() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const API_BASE_URL = 'http://localhost:5000/api';

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (!storedUser || !storedToken) {
      setErrorMessage('Please sign in to access your address book.');
      navigate('/login');
      return;
    }

    try {
      const userData = JSON.parse(storedUser);
      if (!userData.id) throw new Error('Invalid user data');
      setUser(userData);
      fetchAddresses(userData.id, storedToken);
    } catch (err) {
      console.error('Error loading user data:', err);
      setErrorMessage('Invalid user data.');
      navigate('/login');
    }
  }, [navigate]);

  const fetchAddresses = async (userId, token) => {
    try {
      const res = await fetch(`${API_BASE_URL}/addresses/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.status === 401) {
        localStorage.clear();
        navigate('/login');
        return;
      }

      const data = await res.json();
      setAddresses(data);
    } catch (err) {
      console.error('Failed to fetch addresses:', err);
      setErrorMessage('Failed to fetch addresses. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (addressId) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/addresses/${addressId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        setAddresses(prev => prev.filter(addr => addr.id !== addressId));
      } else {
        console.error('Delete failed');
      }
    } catch (err) {
      console.error('Error deleting address:', err);
    }
  };

  if (loading) {
    return (
      <div className="address-book">
        <div className="loading-spinner-large"></div>
        <p>Loading your saved addresses...</p>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="address-book">
        <div className="error-message">{errorMessage}</div>
        <Link to="/login" className="btn">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="address-book">
      <h2>🏠 Your Saved Addresses</h2>
      {addresses.length === 0 ? (
        <p>No addresses found.</p>
      ) : (
        addresses.map(addr => (
          <div key={addr.id} className="address-card">
            <p><strong>Country:</strong> {addr.country}</p>
            <p><strong>Pincode:</strong> {addr.pincode}</p>
            <button onClick={() => handleDelete(addr.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default AddressBook;
