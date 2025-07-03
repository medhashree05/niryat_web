import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './UserDashboard.css';

function UserDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [debugInfo, setDebugInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      try {
        // Get all localStorage data for debugging
        const allKeys = Object.keys(localStorage);
        const allLocalStorage = {};
        allKeys.forEach(key => {
          allLocalStorage[key] = localStorage.getItem(key);
        });

        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        
        // Set debug info
        setDebugInfo({
          allLocalStorageKeys: allKeys,
          allLocalStorage: allLocalStorage,
          storedUser: storedUser,
          storedToken: storedToken ? `EXISTS (${storedToken.length} chars)` : 'MISSING',
          timestamp: new Date().toISOString()
        });

        console.log('=== DEBUG INFO ===');
        console.log('All localStorage keys:', allKeys);
        console.log('All localStorage data:', allLocalStorage);
        console.log('Stored user:', storedUser);
        console.log('Stored token exists:', !!storedToken);
        console.log('Stored token length:', storedToken ? storedToken.length : 'N/A');
        
        if (!storedUser) {
          throw new Error(`User data missing - User: ${!!storedUser}`);
        }
        
        // Token check - warn but don't fail
        if (!storedToken) {
          console.warn('⚠️ Token is missing - some features may not work properly');
        }

        if (storedToken && storedToken.trim() === '') {
          console.warn('⚠️ Token is empty string');
        }

        let userData;
        try {
          userData = JSON.parse(storedUser);
          console.log('Parsed user data:', userData);
        } catch (parseError) {
          console.error('JSON Parse Error:', parseError);
          throw new Error('Invalid user data format: ' + parseError.message);
        }
        
        if (!userData || typeof userData !== 'object') {
          throw new Error('Invalid user data structure');
        }

        if (!userData.id) {
          throw new Error('User ID missing from user data');
        }

        if (!userData.name || !userData.email) {
          throw new Error('Incomplete user data (missing name or email)');
        }

        console.log('✅ Authentication successful for user:', userData.name);
        setUser(userData);
        setError('');
        
      } catch (err) {
        console.error('❌ Authentication check failed:', err.message);
        setError(err.message);
        setUser(null);
        
        // DON'T auto-redirect, let's see what's happening first
        
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    
    // Also check every 5 seconds to see if data changes
    const interval = setInterval(() => {
      const currentUser = localStorage.getItem('user');
      const currentToken = localStorage.getItem('token');
      console.log('Periodic check - User exists:', !!currentUser, 'Token exists:', !!currentToken);
    }, 5000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleLinkClick = (e) => {
    if (e.currentTarget && e.currentTarget.style) {
      e.currentTarget.style.transform = 'scale(0.95)';
      setTimeout(() => {
        if (e.currentTarget && e.currentTarget.style) {
          e.currentTarget.style.transform = '';
        }
      }, 150);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
  setUser(null);
  navigate('/');
  };

  const handleManualRefresh = () => {
    window.location.reload();
  };

  const handleClearAndRetry = () => {
    localStorage.clear();
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="userdash-container">
        <div className="userdash-card">
          <div className="loading-spinner">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="userdash-container">
        <div className="userdash-card">
          <div className="error-message">
            <h3>Authentication Error</h3>
            <p>{error}</p>
          </div>
          
          <div className="debug-info" style={{
            background: '#f5f5f5',
            padding: '15px',
            margin: '10px 0',
            borderRadius: '5px',
            fontSize: '12px',
            fontFamily: 'monospace'
          }}>
            <h4>Debug Information:</h4>
            <p><strong>All localStorage keys:</strong> {debugInfo.allLocalStorageKeys?.join(', ') || 'None'}</p>
            <p><strong>User data:</strong> {debugInfo.storedUser || 'None'}</p>
            <p><strong>Token:</strong> {debugInfo.storedToken || 'None'}</p>
            <p><strong>Timestamp:</strong> {debugInfo.timestamp}</p>
          </div>

          <div className="auth-actions">
            <button onClick={handleManualRefresh} className="userdash-link" style={{
              background: '#007bff',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
              margin: '5px'
            }}>
              Refresh Page
            </button>
            
            <button onClick={handleClearAndRetry} className="userdash-link" style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              cursor: 'pointer',
              margin: '5px'
            }}>
              Clear Storage & Retry
            </button>
            
            <Link to="/" className="userdash-link" style={{
              display: 'inline-block',
              background: '#28a745',
              color: 'white',
              textDecoration: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              margin: '5px'
            }}>
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="userdash-container">
        <div className="userdash-card">
          <div className="error-message">User data unavailable</div>
          <Link to="/" className="userdash-link">
            Go to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="userdash-container">
      <div className="userdash-card">
        <div className="userdash-header">
          <h2 className="userdash-title">Welcome, {user.name}!</h2>
         
        </div>
        
        <div className="debug-info" style={{
          background: '#e8f5e8',
          padding: '10px',
          margin: '10px 0',
          borderRadius: '5px',
          fontSize: '12px'
        }}>
          <p>✅ Logged in as: {user.name} ({user.email})</p>
          <p>User ID: {user.id}</p>
        </div>
        
        <ul className="userdash-links">
          <li>
            <Link 
              to={`/edit-profile/${user.id}`}
              className="userdash-link"
            >
              <span className="link-emoji">✏️</span>
              <span className="link-text">Edit Profile</span>
            </Link>
          </li>
          <li>
            <Link 
              to={`/order-history/${user.id}`}
              onClick={handleLinkClick}
              className="userdash-link"
            >
              <span className="link-emoji">📦</span>
              <span className="link-text">Order History</span>
            </Link>
          </li>
          <li>
            <Link 
              to={`/address-book/${user.id}`}
              onClick={handleLinkClick}
              className="userdash-link"
            >
              <span className="link-emoji">🏠</span>
              <span className="link-text">Address Book</span>
            </Link>
          </li>
          
        </ul>
      </div>
    </div>
  );
}

export default UserDashboard;