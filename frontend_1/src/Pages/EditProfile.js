import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EditProfile.css';

function EditProfile() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Only keep one loading state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);

  const API_BASE_URL = 'http://localhost:5000/api';

  // Fixed useEffect
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (!storedUser || !storedToken) {
        setError('Please log in to access your profile');
        navigate('/login');
        return;
      }

      const userData = JSON.parse(storedUser);
      
      if (!userData.id) {
        setError('Invalid user data');
        navigate('/login');
        return;
      }

      setUser(userData);
      
      // IMPORTANT: Set the form data with user information
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        password: '',
        confirmPassword: ''
      });
      
    } catch (err) {
      console.error('Error parsing user data:', err);
      setError('Invalid user data');
      navigate('/login');
    } finally {
      setLoading(false); // Set loading to false here
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    
    if (errorMessage) setErrorMessage('');
    if (successMessage) setSuccessMessage('');
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setSuccessMessage('');
  setErrorMessage('');

  if (formData.password && formData.password !== formData.confirmPassword) {
    setIsLoading(false);
    setErrorMessage('Passwords do not match!');
    return;
  }

  if (formData.password && formData.password.length < 6) {
    setIsLoading(false);
    setErrorMessage('Password must be at least 6 characters long');
    return;
  }

  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login');
    return;
  }

  try {
    let profileUpdated = false;
    let passwordChanged = false;

    // First, update profile if name or email changed
    if (formData.name.trim() !== user.name || formData.email.toLowerCase().trim() !== user.email) {
      const profileData = {
        name: formData.name.trim(),
        email: formData.email.toLowerCase().trim()
      };

      const profileResponse = await fetch(`${API_BASE_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      const profileResult = await profileResponse.json();

      if (profileResponse.ok && profileResult.success) {
        profileUpdated = true;
        // Update local user data
        const updatedUser = { ...user, ...profileResult.user };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
      } else {
        if (profileResponse.status === 401) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        setErrorMessage(profileResult.message || 'Failed to update profile');
        setIsLoading(false);
        return;
      }
    }

    // Then, change password if provided
    if (formData.password) {
      const currentPassword = prompt('Please enter your current password to change it:');
      if (!currentPassword) {
        setIsLoading(false);
        setErrorMessage('Current password is required to change password');
        return;
      }

      const passwordData = {
        currentPassword: currentPassword,
        newPassword: formData.password
      };

      const passwordResponse = await fetch(`${API_BASE_URL}/users/change-password`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwordData)
      });

      const passwordResult = await passwordResponse.json();

      if (passwordResponse.ok && passwordResult.success) {
        passwordChanged = true;
        // Clear password fields
        setFormData(prev => ({
          ...prev,
          password: '',
          confirmPassword: ''
        }));
      } else {
        if (passwordResponse.status === 401) {
          localStorage.removeItem('user');
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }
        setErrorMessage(passwordResult.message || 'Failed to change password');
        setIsLoading(false);
        return;
      }
    }

    // Show success message based on what was updated
    if (profileUpdated && passwordChanged) {
      setSuccessMessage('Profile and password updated successfully!');
    } else if (profileUpdated) {
      setSuccessMessage('Profile updated successfully!');
    } else if (passwordChanged) {
      setSuccessMessage('Password changed successfully!');
    }

    setTimeout(() => setSuccessMessage(''), 5000);

  } catch (error) {
    console.error('Error updating profile:', error);
    setErrorMessage('Network error. Please try again.');
  } finally {
    setIsLoading(false);
  }
};

  const handleReset = () => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        confirmPassword: ''
      });
    }
    setSuccessMessage('');
    setErrorMessage('');
  };

  // Show error if there's an error
  if (error) {
    return (
      <div className="edit-profile-container">
        <div className="edit-profile-card">
          <div className="error-message">{error}</div>
          <Link to="/login" className="btn btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  // Show loading only while loading is true
  if (loading) {
    return (
      <div className="edit-profile-container">
        <div className="edit-profile-card">
          <div className="loading-container">
            <div className="loading-spinner-large"></div>
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-card">
        <div className="profile-header">
          <Link to="/dashboard" className="back-link">
            <span className="back-arrow">←</span>
            Back to Dashboard
          </Link>
          <h2 className="profile-title">✏️ Edit Profile</h2>
          <p className="profile-subtitle">Update your personal information</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your full name"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter your email address"
              required
              disabled={isLoading}
            />
          </div>

          <div className="password-section">
            <h3 className="section-title">Change Password (Optional)</h3>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter new password (leave blank to keep current)"
                minLength="6"
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Confirm your new password"
                minLength="6"
                disabled={isLoading}
              />
            </div>
          </div>

          {errorMessage && (
            <div className="error-message">
              <span className="error-icon">❌</span>
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="success-message">
              <span className="success-icon">✅</span>
              {successMessage}
            </div>
          )}

          <div className="form-actions">
            <button
              type="button"
              onClick={handleReset}
              className="btn2 btn2-secondary"
              disabled={isLoading}
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn2 btn2-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  Updating...
                </>
              ) : (
                'Update Profile'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;