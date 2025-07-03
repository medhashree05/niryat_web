import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MyEnquiries.css';

function MyEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [products, setProducts] = useState({});
  const [userId, setUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in and get user ID
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
      setIsLoggedIn(true);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch enquiries when userId is available
  useEffect(() => {
    if (userId && isLoggedIn) {
      fetchEnquiries();
    }
  }, [userId, isLoggedIn]);

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/enquiries/${userId}`);
      const enqs = res.data;
      setEnquiries(enqs);

      // Fetch each product using its ID
      const productMap = {};
      await Promise.all(
        enqs.map(async (enq) => {
          if (!productMap[enq.product_id]) {
            try {
              const prodRes = await axios.get(`https://fakestoreapi.com/products/${enq.product_id}`);
              productMap[enq.product_id] = prodRes.data;
            } catch (err) {
              console.error('Failed to fetch product', enq.product_id);
              // Set a fallback for failed product fetches
              productMap[enq.product_id] = {
                title: 'Product Unavailable',
                image: null,
                price: 0
              };
            }
          }
        })
      );
      setProducts(productMap);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return '#ffc107';
      case 'approved':
        return '#28a745';
      case 'rejected':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="my-enquiries-container">
        <h2>My Enquiries</h2>
        <p className="loading">Loading your enquiries...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="my-enquiries-container">
        <h2>My Enquiries</h2>
        <div className="not-logged-in">
          <p>Please log in to view your enquiries.</p>
          <button onClick={() => navigate('/login')} className="login-button">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-enquiries-container">
      <div className="header">
        <h2>My Enquiries</h2>
        <button onClick={() => navigate('/products')} className="back-button">
          Browse Products
        </button>
      </div>

      {enquiries.length === 0 ? (
        <div className="no-enquiries">
          <p>No enquiries found</p>
          <p>Start browsing products to make your first enquiry!</p>
          <button onClick={() => navigate('/products')} className="browse-button">
            Browse Products
          </button>
        </div>
      ) : (
        <div className="enquiries-list">
          {enquiries.map((enq) => {
            const product = products[enq.product_id];
            return (
              <div key={enq.id} className="enquiry-item">
                <div className="enquiry-content">
                  {product && (
                    <div className="product-info">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="product-image"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="product-details">
                        <h3 className="product-name">{product.title}</h3>
                        <p className="product-price">₹{Math.floor(product.price * 80)}</p>
                        <p className="product-id">Product ID: {enq.product_id}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="enquiry-details">
                    <div className="enquiry-message">
                      <h4>Your Message:</h4>
                      <p>{enq.message}</p>
                    </div>
                    
                    <div className="enquiry-meta">
                      <span 
                        className="enquiry-status"
                        style={{ backgroundColor: getStatusColor(enq.status) }}
                      >
                        {enq.status || 'Pending'}
                      </span>
                      {enq.created_at && (
                        <span className="enquiry-date">
                          {formatDate(enq.created_at)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="enquiry-actions">
                  <button 
                    onClick={() => navigate(`/products/${enq.product_id}/enquire`)}
                    className="enquire-again-button"
                  >
                    Enquire Again
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyEnquiries;