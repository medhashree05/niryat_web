import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import PopupCard from './PopupCard'; // Import the PopupCard component
import './EnquiryForm.css';

function EnquiryForm() {
  const [userId, setUserId] = useState('');
  const [productId, setProductId] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Popup states
  const [popup, setPopup] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    showConfirm: false,
    onConfirm: null
  });
  
  const navigate = useNavigate();
  const { productId: urlProductId } = useParams();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
      setIsLoggedIn(true);
    }

    // Set product ID from URL parameter
    if (urlProductId) {
      setProductId(urlProductId);
      // Fetch product details from API
      fetchProductDetails(urlProductId);
    } else {
      setLoading(false);
    }
  }, [urlProductId]);

  const fetchProductDetails = async (id) => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
      showPopup('Error', 'Error loading product details', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showPopup = (title, message, type = 'info', showConfirm = false, onConfirm = null) => {
    setPopup({
      isOpen: true,
      title,
      message,
      type,
      showConfirm,
      onConfirm
    });
  };

  const closePopup = () => {
    setPopup(prev => ({ ...prev, isOpen: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      showPopup('Login Required', 'Please log in to submit an enquiry.', 'warning');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/enquiries', {
        userId,
        productId,
        message,
      });

      showPopup(
        'Success', 
        'Enquiry submitted successfully!', 
        'success',
        false,
        () => {
          setMessage('');
          navigate('/products');
        }
      );
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      showPopup('Error', 'Failed to submit enquiry. Please try again.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="enquiry-form-container">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="enquiry-form-container">
        <h2>Please log in to submit an enquiry</h2>
        <p>You need to be logged in to submit product enquiries.</p>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="enquiry-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Enquire about a Product</h2>
        
        {/* Show selected product details if available */}
        {selectedProduct && (
          <div className="selected-product">
            <img src={selectedProduct.image} alt={selectedProduct.title} />
            <div>
              <h3>{selectedProduct.title}</h3>
              <p>₹{Math.floor(selectedProduct.price * 80)}</p>
            </div>
          </div>
        )}

        {/* Display logged in user */}
        <div className="user-info">
          <label>Logged in as User ID: {userId}</label>
        </div>

        {/* Product ID input - read-only since it comes from URL */}
        <div className="form-group">
          <label>Product ID:</label>
          <input
            type="text"
            value={productId}
            readOnly
            className="readonly-input"
          />
        </div>

        {/* Message textarea */}
        <div className="form-group">
          <label>Your Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
            rows="5"
            required
          />
        </div>

        <div className="form-buttons">
          <button 
            type="button" 
            onClick={() => navigate('/products')}
            className="cancel-button"
          >
            Back to Products
          </button>
          <button type="submit" className="enquiry-button">
            Submit Enquiry
          </button>
        </div>
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

export default EnquiryForm;