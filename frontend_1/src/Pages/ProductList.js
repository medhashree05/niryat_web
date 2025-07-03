import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import PopupCard from './PopupCard'; // Import the PopupCard component
import './ProductList.css';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const query = useQuery();
  const navigate = useNavigate();
  
  // Popup states
  const [popup, setPopup] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    showConfirm: false,
    onConfirm: null
  });

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

  // Initialize search term from URL params
  useEffect(() => {
    const urlSearch = query.get('search') || '';
    setSearchTerm(urlSearch);
  }, []);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error('API Error:', err);
        showPopup('Error', 'Failed to load products. Please try again later.', 'error');
      });
  }, []);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Optional: Update URL with search parameter
    const newUrl = e.target.value ? `?search=${encodeURIComponent(e.target.value)}` : '';
    window.history.replaceState({}, '', newUrl);
  };

  const handleEnquiry = (product) => {
    navigate(`/products/${product.id}/enquire`);
  };

  const handleAddToCart = (product) => {
    try {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      
      const existingIndex = cart.findIndex((item) => item.id === product.id);
      
      if (existingIndex !== -1) {
        // Increase quantity if already in cart
        cart[existingIndex].quantity += 1;
        showPopup(
          'Updated Cart', 
          `${product.title} quantity increased in cart.`, 
          'success'
        );
      } else {
        // Add new product to cart
        cart.push({
          id: product.id,
          name: product.title,
          price: Math.floor(product.price * 80),
          quantity: 1
        });
        showPopup(
          'Added to Cart', 
          `${product.title} has been added to your cart.`, 
          'success'
        );
      }
      
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error adding to cart:', error);
      showPopup('Error', 'Failed to add item to cart. Please try again.', 'error');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search product..."
      />
      <div className="product-grid">
        {filtered.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.title} />
            <h3>{p.title}</h3>
            <p>₹{Math.floor(p.price * 80)}</p>
            <div className="product-actions">
              <button
                onClick={() => handleEnquiry(p)}
                type="button"
                className="enquiry"
              >
                Enquire Now
              </button>
              <button
                onClick={() => handleAddToCart(p)}
                type="button"
                className="cart"
              >
                Add to Cart 🛒
              </button>
            </div>
          </div>
        ))}
      </div>

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

export default ProductList;