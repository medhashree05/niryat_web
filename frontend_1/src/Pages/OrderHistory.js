import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderHistory.css';

function OrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (!token) throw new Error('Authentication token missing.');
        if (!storedUser) throw new Error('User data not found.');

        const userData = JSON.parse(storedUser);
        const userId = userData.user_id || userData.id;
        
        if (!userId) {
          throw new Error('User ID not found in stored user data.');
        }

        console.log('UserId from localStorage:', userId);

        const res = await fetch(`http://localhost:5000/api/orders/user/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch orders.');

        setOrders(data.orders || []);
        setError('');
      } catch (err) {
        setError(err.message);
        if (err.message.includes('token')) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleProductClick = (productId) => {
    // Navigate to product details page
    navigate(`/products/${productId}`);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return '#27ae60';
      case 'shipped':
        return '#3498db';
      case 'processing':
        return '#f39c12';
      case 'cancelled':
        return '#e74c3c';
      default:
        return '#7f8c8d';
    }
  };

  if (loading) {
    return (
      <div className="order-history-container">
        <div className="loading-spinner"></div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-history-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="order-history-container">
      <h2>📦 Your Orders</h2>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found.</p>
          <button 
            className="browse-products-btn"
            onClick={() => navigate('/products')}
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>Order #{order.id}</h3>
                <span 
                  className="order-status"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status}
                </span>
              </div>
              
              <div className="order-meta">
                <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                <p><strong>Total:</strong> <span className="total-amount">₹{order.total}</span></p>
              </div>

              <div className="order-items">
                <h4>Items ({order.items?.length || 0})</h4>
                <div className="items-grid">
                  {order.items?.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="item-card"
                      onClick={() => handleProductClick(item.product_id)}
                    >
                      <div className="item-image">
                        {item.image ? (
                          <img 
                            src={item.image} 
                            alt={item.name || 'Product'}
                            onError={(e) => {
                              e.target.src = '/api/placeholder/80/80';
                            }}
                          />
                        ) : (
                          <div className="image-placeholder">
                            <span>📦</span>
                          </div>
                        )}
                      </div>
                      <div className="item-details">
                        <h5>{item.name || 'Product Name'}</h5>
                        <p className="item-quantity">Qty: {item.quantity}</p>
                        <p className="item-price">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="order-footer">
                <button 
                  className="order-details-btn"
                  onClick={() => navigate(`/order/${order.id}`)}
                >
                  View Details
                </button>
                {order.status?.toLowerCase() === 'delivered' && (
                  <button 
                    className="reorder-btn"
                    onClick={() => {
                      // Handle reorder logic
                      console.log('Reorder:', order.id);
                    }}
                  >
                    Reorder
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;