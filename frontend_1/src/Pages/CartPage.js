import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

function CartPage() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch products from backend or supabase to get image URLs
  useEffect(() => {
    async function fetchProducts() {
      try {
        // Replace URL with your backend or Supabase endpoint to get all products
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to load product images');
      }
    }
    fetchProducts();
  }, []);

  // Function to get image URL by product name (case-insensitive)
  const getImageUrl = (name) => {
    const product = products.find(
      (p) => p.title.toLowerCase() === name.toLowerCase()
    );
    return product ? product.image_url || product.image : null;
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) return setError('Login required to place an order.');

    setLoading(true);
    try {
      const cleanedProducts = cart.map(item => ({
        id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const res = await fetch('http://localhost:5000/api/orders/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: user.id,
          products: cleanedProducts
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Order failed');

      localStorage.removeItem('cart');
      navigate(`/order-history/${user.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item, idx) => (
              <li key={idx} className="cart-item">
                {getImageUrl(item.name) ? (
                  <img
                    src={getImageUrl(item.name)}
                    alt={item.name}
                    className="cart-item-image"
                  />
                ) : (
                  <div className="cart-item-image placeholder">No Image</div>
                )}
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-qty-price">
                    Qty: {item.quantity} &nbsp;&nbsp; — &nbsp;&nbsp; ₹{item.price}
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="cart-total"><strong>Total:</strong> ₹{total}</p>
          {error && <p className="error">{error}</p>}
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="place-order-btn"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
