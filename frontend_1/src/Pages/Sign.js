import React, { useState } from 'react';
import './Sign.css';
import axios from 'axios';
import PopupCard from './PopupCard'; // your popup component

function Sign() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Popup state
  const [popup, setPopup] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    showConfirm: false,
    onConfirm: null,
  });

  const showPopup = (title, message, type = 'info', showConfirm = false, onConfirm = null) => {
    setPopup({
      isOpen: true,
      title,
      message,
      type,
      showConfirm,
      onConfirm,
    });
  };

  const closePopup = () => {
    setPopup(prev => ({ ...prev, isOpen: false }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        email,
        password,
      });

      console.log('Login API response:', res.data);

      // Save user and token as before
      localStorage.setItem('user', JSON.stringify(res.data.user));

      if (res.data.token && res.data.token.trim() !== '') {
        localStorage.setItem('token', res.data.token);
      } else if (res.data.accessToken && res.data.accessToken.trim() !== '') {
        localStorage.setItem('token', res.data.accessToken);
      } else if (res.data.authToken && res.data.authToken.trim() !== '') {
        localStorage.setItem('token', res.data.authToken);
      } else if (res.data.jwt && res.data.jwt.trim() !== '') {
        localStorage.setItem('token', res.data.jwt);
      } else {
        console.warn('No token found in response');
      }

      // Show success popup with confirm button
      showPopup(
        'Welcome!',
        `Welcome ${res.data.user.name}`,
        'success',
        true,
        () => {
          // On popup confirm, close popup and redirect to dashboard
          closePopup();
          window.location.href = '/dashboard';
        }
      );

    } catch (err) {
      setLoading(false);
      console.error('Login error:', err);

      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
        showPopup('Login Failed', errorMessage, 'error');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSignIn} className="auth-form">
        <label>Email</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={errors.email ? 'error' : ''}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}

        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={errors.password ? 'error' : ''}
        />
        {errors.password && <span className="error-message">{errors.password}</span>}

        <button className="sign" type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      {/* PopupCard component */}
      <PopupCard
        isOpen={popup.isOpen}
        onClose={closePopup}
        title={popup.title}
        message={popup.message}
        type={popup.type}
        showConfirm={popup.showConfirm}
        onConfirm={popup.onConfirm}
      />
    </div>
  );
}

export default Sign;
