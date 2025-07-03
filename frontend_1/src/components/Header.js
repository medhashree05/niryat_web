import React from 'react';
import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import PopupCard from '../Pages/PopupCard'; // Import the PopupCard component
import { CiGlobe } from "react-icons/ci";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { MdFlag, MdWidthFull } from "react-icons/md";
import { GrCart } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaLinkedin } from "react-icons/fa";
import d1 from '../assets/d1.webp';
import d2 from '../assets/d2.jpeg';
import d3 from '../assets/d3.jpeg';
import d4 from '../assets/d4.jpeg';
import d5 from '../assets/d5.jpeg';
import d6 from '../assets/d6.jpeg';
import d7 from '../assets/d7.jpeg';
import d8 from '../assets/d8.jpeg';
import d9 from '../assets/d9.jpeg';
import d10 from '../assets/d10.jpeg';
import d11 from '../assets/d11.jpeg';
import d12 from '../assets/d12.jpeg';
import d13 from '../assets/d13.jpeg';
import d14 from '../assets/d14.jpeg';
import { FaMedal } from "react-icons/fa6";
import { FaTag } from "react-icons/fa6";
import { CiAlarmOn } from "react-icons/ci";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { RiShipFill } from "react-icons/ri";
import { FaTools } from "react-icons/fa";
import AI from '../assets/AI.png';
import helper from '../assets/helper.jpg';
import extension from '../assets/extension.png';
import Create from '../Pages/Create.js';
import Sign from '../Pages/Sign.js';
import bgImage from '../assets/background_1.avif';
import axios from 'axios';

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const [country, setCountry] = useState('United States');
  const [pincode, setPincode] = useState('');
  
  // Popup state management
  const [popup, setPopup] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    showConfirm: false,
    onConfirm: null
  });

  // Function to show popup
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

  // Function to close popup
  const closePopup = () => {
    setPopup(prev => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    // Read cart from localStorage and calculate total quantity
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
    setQuantity(totalQty);
  }, []);

  const handleGoToCart = () => {
    navigate('/cart');  // or your cart route
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // after login you must store this
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/'); // optional: redirect to home
  };

  const divStyle = {
    backgroundImage: `url(${bgImage})`,
  };

  const handleSaveAddress = async () => {
    if (!user) {
      showPopup(
        'Sign In Required',
        'Please sign in to save your address.',
        'warning'
      );
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/addresses', {
        user_id: user.id,
        pincode,
        country
      });
      showPopup(
        'Success!',
        'Your address has been saved successfully.',
        'success'
      );
    } catch (err) {
      console.error(err);
      showPopup(
        'Error',
        'Failed to save address. Please try again.',
        'error'
      );
    }
  };

  const images = [d1,d2,d3,d4,d5,d6,d7,d8,d9,d10,d11,d12,d13,d14];
  
  return (
    <div className='header-wrapper' style={divStyle}>
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

      {/* Sticky top navbar */}
      <div className="navbar-sticky">
        <div className="navbar_1">
          <div className="logo">
            <Link to="/">NiryatBazaar</Link>
          </div>
          <div className="navbar_right">

            {/* Country Selector */}
            <div className="menu-tab">
              <div className="tab-trigger">
                <MdFlag /> US
              </div>
              <div className="tab-dropdown">
                <div className='tr1'>
                  <h4>Specify your location</h4>
                  <p>Shipping options and fees vary based on your location</p>

                  {!user ? (
                    <>
                      <button className="btn-primary" style={{ color: 'black', backgroundColor: 'black' }}>
                        <Link to='https://login.NiryatBazaar/newlogin/icbuLogin.htm?defaultActive=signIn&return_url=https%3A%2F%2Fwww.NiryatBazaar%2F&_lang=en_US'>
                          Sign in to add address
                        </Link>
                      </button>
                      <div className="or-divider">Or</div>
                    </>
                  ) : null}

                  <select value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value="United States">United States</option>
                    <option value="India">India</option>
                    <option value="Netherlands">Netherlands</option>
                    {/* Add more countries */}
                  </select>

                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder='ZIP code "10011" or "10011-0043"'
                  />

                  <button className="btn-primary" onClick={handleSaveAddress}>Save</button>
                </div>
              </div>
            </div>

            {/* Language & Currency */}
            <div className="menu-tab">
              <div className="tab-trigger">
                <CiGlobe /> English-USD
              </div>
              <div className="tab-dropdown">
                <div className='tr1'>
                  <h4>Set language and currency</h4>
                  <p>Select your preferred language and currency.</p>
                  <label>Language</label>
                  <select>
                    <option>English</option>
                    {/* Other languages */}
                  </select>
                  <label>Currency</label>
                  <select>
                    <option>USD - US Dollar</option>
                    {/* Other currencies */}
                  </select>
                  <button className="btn-primary">Save</button>
                </div>
              </div>
            </div>

            {/* Shopping Cart */}
            <div className="menu-tab">
              <div className="tab-trigger">
                <FaShoppingCart />
              </div>
              <div className="tab-dropdown">
                <div className='tr1'>
                  <h4>Shopping cart</h4>
                  <div className='tab-trigger' style={{ position: 'relative', cursor: 'pointer' }} onClick={handleGoToCart}>
                    <GrCart style={{ color: 'black', fontSize: '24px' }} />
                    {quantity > 0 && (
                      <span style={{
                        position: 'absolute',
                        top: '-6px',
                        right: '-6px',
                        background: 'red',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '2px 7px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        lineHeight: '1',
                      }}>
                        {quantity}
                      </span>
                    )}
                  </div>

                  {quantity === 0 ? (
                    <p>Your cart is empty</p>
                  ) : (
                    <p>{quantity} item{quantity > 1 ? 's' : ''} in your cart</p>
                  )}

                  <button className="btn-outline" onClick={handleGoToCart}>
                    Go to cart
                  </button>
                </div>
              </div>
            </div>

            {/* Account */}
            <div className="menu-tab">
              {user ? (
                // ✅ Show Account dropdown if logged in
                <div className="tab-trigger">
                  <FaUser /> {user.name || 'Account'}
                  <div className="tab-dropdown">
                    <div className="tr1">
                      <h4>Hi, {user.name || 'User'}!</h4>
                      <ul className="signin-links">
                        <li><Link to="/dashboard">My NiryatBazaar</Link></li>
                        <li><Link to={`/order-history/${user.id}`}>Orders</Link></li>
                        <li><Link to={`/my-enquiries/${user.id}`}>RFQs</Link></li>
                        <li><Link to={`/edit-profile/${user.id}`}>Account</Link></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                // 🔻 Show Sign In if not logged in
                <>
                  <div className="tab-trigger">
                    <FaUser /> Sign in
                  </div>
                  <div className="tab-dropdown">
                    <div className="tr1">
                      <h4>Welcome to NiryatBazaar!</h4>
                      <button className="btn-primary" style={{color:'black',backgroundColor:'black'}}>
                        <Link to="/sign">Sign in</Link>
                      </button>
                      <p>Or, continue with:</p>
                      <div className="social-icons">
                        <FaFacebook style={{ color: 'black', fontSize: '24px' }} />
                        <FcGoogle style={{ fontSize: '24px' }} />
                        <FaLinkedin style={{ color: 'black', fontSize: '24px' }} />
                      </div>
                      <p className="agreement-text">
                        By signing in via social media, I agree to the
                        <a href="/create"> Membership Agreement</a> and
                        <a href="/create"> Privacy Policy</a>.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Create Account Button */}
            {!user && <Link to="/create" className="btn-create">Create account</Link>}
          </div>
        </div>
      </div>

      {/* Scrollable secondary navbar */}
      <div className="navbar_2">
        <div className="navbar2_left">
          <div className="menu-item ">
            All categories
            <div className="dropdown">
              <div className='d_1'>
                <div className="categories-left">
                  <ul>
                    <li>Beauty</li>
                    <li>Sports & Entertainment</li>
                    <li>MRO</li>
                    <li>Automotive Supplies & Tools</li>
                    <li>Industrial Machinery</li>
                    <li>Consumer Electronics</li>
                    <li>Jewelry, Eyewear & Watches</li>
                  </ul>
                </div>
                <div className="categories-right">
                  {[
                    "Safety Helmets",
                    "Inspection Camera",
                    "Notebooks",
                    "Laptops",
                    "Car Perfume",
                    "Gaming Laptops",
                    "Tactical Pouch",
                    "Used Laptops",
                    "Camping Tent",
                    "Televisions",
                    "Power Wrists",
                    "Fat Bike",
                    "PC",
                    "Graphics Cards",
                  ].map((item, index) => (
                    <div className="category-card" key={index}>
                      <img src={images[index]} alt={item} />
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className='menu-item '>
            Featured selections
            <div className='dropdown'>
              <div className='d_2'>
                <div className="featured-card">
                  <FaMedal style={{ color: 'black', fontSize: '24px' }}/>
                  <p>Top ranking</p>
                </div>
                <div className="featured-card">
                  <FaTag style={{ color: 'black', fontSize: '24px' }}/>
                  <p>New arrivals</p>
                </div>
                <div className="featured-card">
                  <CiAlarmOn style={{ color: 'black', fontSize: '24px' }}/>
                  <p>Top deals</p>
                </div>
                <div className='featured-card-4'style={{display:'flex',flexDirection:'column',gap:'24px'}}>
                  <p>Sample Center</p>
                  <p>Online Trade Show</p>
                  <p>Tips</p>
                  <p>LIVE</p>
                  <p>Global suppliers</p>
                </div>
              </div>
            </div>
          </div>

          <div className='menu-item'>
            Order protections
            <div className='dropdown'>
              <div className='d_3'>
                <div className="dropdown-card">
                  <AiOutlineSafetyCertificate/>
                  <h4>Safe & easy payments</h4>
                  <p>Secure payment methods to protect your transactions.</p>
                </div>
                <div className="dropdown-card">
                  <RiMoneyDollarCircleFill/>
                  <h4>Money-back policy</h4>
                  <p>Refunds available for qualified disputes.</p>
                </div>
                <div className="dropdown-card">
                  <RiShipFill/>
                  <h4>Shipping & logistics</h4>
                  <p>Reliable delivery options with tracking.</p>
                </div>
                <div className="dropdown-card">
                  <FaTools/>
                  <h4>After-sales protections</h4>
                  <p>Support after purchase for eligible orders.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="navbar2_right">
          <div className="menu-item">
            AI sourcing agent
            <div className="dropdown">
              <div className="dropdown-content">
                <img src={AI} alt="AI Sourcing Agent" className="dropdown-image" />
                <div className="dropdown-text">
                  <h2>Source smarter with <span style={{ color: '#004d99' }}>Accio</span></h2>
                  <p>Leverage AI to find the perfect product match in seconds</p>
                  <ul>
                    <li>
                      <strong>Matches from over 100 million products</strong><br/>
                      with precision
                    </li>
                    <li>
                      <strong>Handles queries 3 times as complex</strong><br/>
                      in half the time
                    </li>
                    <li>
                      <strong>Verifies and cross-validates</strong><br/>
                      product information
                    </li>
                  </ul>
                  <a href="/create" className="source-now-btn">Source now</a>
                </div>
              </div>
            </div>
          </div>

          <div className="menu-item">
            Buyer Central
            <div className="dropdown">
              <div className="dropdown-grid">
                <div>
                  <h4>Get started</h4>
                  <p><a href='/create'>What is NiryatBazaar</a></p>
                </div>
                <div>
                  <h4>Why NiryatBazaar</h4>
                  <p><a href="/create">How sourcing works</a></p>
                  <p><a href="/create">Membership program</a></p>
                </div>
                <div>
                  <h4>Trade services</h4>
                  <p><a href='/create'>Order protections</a></p>
                  <p><a href='/create'>Logistics Services</a></p>
                  <p><a href='/create'>NiryatBazaar Business Credit</a></p>
                  <p><a href='/create'>Inspection & Monitoring</a></p>
                </div>
                <div>
                  <h4>Resources</h4>
                  <p><a href='/create'>Success stories</a></p>
                  <p><a href='/create'>Blogs</a></p>
                  <p><a href='/create'>Industry reports</a></p>
                  <p><a href='/create'>Help Center</a></p>
                </div>
                <div>
                  <h4>Webinars</h4>
                  <p><a href='/create'>Overview</a></p>
                  <p><a href='/create'>Meet the peers</a></p>
                  <p><a href='/create'>Ecommerce Academy</a></p>
                  <p><a href='/create'>How to source</a></p>
                </div>
              </div>
            </div>
          </div>

          <div className="menu-item">
            Help Center
            <div className="dropdown">
              <div className="dropdown-content">
                <div className="dropdown-text">
                  <h2>Need help?</h2>
                  <p>Get support for your orders and resolve issues quickly</p>
                  <ul>
                    <li><strong>Open a dispute</strong><br/>Resolve product/order issues</li>
                    <li><strong>Report IPR infringement</strong><br/>Protect your brand & content</li>
                    <li><strong>Report abuse</strong><br/>Combat fraud and misconduct</li>
                  </ul>
                  <a href='/create' className="source-now-btn">Visit help center</a>
                </div>
                <img src={helper} alt="Help Center" className="dropdown-image" />
              </div>
            </div>
          </div>

          <div className="menu-item">
            App & Extension
            <div className="dropdown">
              <div className="dropdown-content">
                <img src={extension} alt="NiryatBazaar App" className="dropdown-image-ext" />
                <div className="dropdown-text">
                  <h2>Get the NiryatBazaar App</h2>
                  <p>Find products, chat with suppliers, and manage orders anywhere</p>
                  <ul>
                    <li><strong>App Store</strong><br/><a href='/create'>Download for iOS</a></li>
                    <li><strong>Google Play</strong><br/><a href='/create'>Download for Android</a></li>
                    <li><strong>NiryatBazaar Lens</strong><br/>Search visually with our Chrome extension</li>
                  </ul>
                  <a href='/create' className="source-now-btn">Explore tools</a>
                </div>
              </div>
            </div>
          </div>

          <div className='menu-item supplier' >
            <Link to='https://register.NiryatBazaar/reg/form.htm?entrance=buyerHome'>Become a supplier</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;