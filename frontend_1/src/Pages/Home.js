import React, { useState } from "react";
import './Home.css';
import { Link } from "react-router-dom";
import cpuImg from '../assets/scroll_1.png';
import keyboardImg from '../assets/scroll_2.png';
import mouseImg from '../assets/scroll_3.png';
import knifeImg from '../assets/knife.png';
import excavatorImg from '../assets/excavator.png';
import tableImg from '../assets/table.png';
import copperImg from '../assets/copper.png';
import wheelImg from '../assets/wheel.png';
import boxImg from '../assets/box.png';
import { TbPlant } from "react-icons/tb";
import { PiDressBold } from "react-icons/pi";
import { RiCupLine } from "react-icons/ri";
import { GiLipstick } from "react-icons/gi";
import { IoCarSportSharp } from "react-icons/io5";
import { MdOutlineDiamond } from "react-icons/md";
import { GrBusinessService } from "react-icons/gr";
import { RiCustomerServiceLine } from "react-icons/ri";
import { FaHeadphones } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { IoBagHandleSharp } from "react-icons/io5";
import { RiBox2Fill } from "react-icons/ri";
import { FaTools } from "react-icons/fa";
import { TbMoodKid } from "react-icons/tb";
import searchImg from '../assets/search.png';
import identifyImg from '../assets/identify.png';
import payImg from '../assets/pay.png';
import fulfillImg from '../assets/fulfill.png';
import manageImg from '../assets/manage.png';
import founder from '../assets/founder.png';
import business from '../assets/business.png';
import map from '../assets/map.png';
import sky from '../assets/sky.jpeg';
import { AiOutlineAppstore } from "react-icons/ai";
import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { MdOutlineForwardToInbox } from "react-icons/md";
import { TbFileStack } from "react-icons/tb";
import bgImage from '../assets/background_1.avif';
import bg2 from '../assets/card_1.png';
import bg3 from '../assets/card_2.png';
import bg4 from '../assets/card_3.png';
import bg5 from '../assets/block_6.jpg';
import { useNavigate } from 'react-router-dom';

function Home() {
  const divStyle = {
    backgroundImage: `url(${bgImage})`,
  };
  const divStyle3 = {
    backgroundImage: `url(${bg2})`,
  };
  const divStyle4 = {
    backgroundImage: `url(${bg3})`,
  };
  const divStyle5 = {
    backgroundImage: `url(${bg4})`,
  };
 
 const divStyle2 = {
  backgroundImage: `url(${bg5})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
};


  const icons = [<TbPlant/>,<PiDressBold/>,<RiCupLine/>,<GiLipstick/>,<IoCarSportSharp/>,<MdOutlineDiamond/>,
  ,<RiCustomerServiceLine/>,<FaHeadphones/>,<CgGym/>,<IoBagHandleSharp/>,<RiBox2Fill/>,<FaTools/>,<TbMoodKid/>];
  const [currentIndex, setCurrentIndex] = React.useState(0);

const topRankingItems = [
  { title: "Most popular", subtitle: "CPUs For Desktop", image: cpuImg },
  { title: "Trending now", subtitle: "Mechanical Keyboards", image: keyboardImg },
  { title: "Hot pick", subtitle: "Gaming Mouse", image: mouseImg },
];

const [hoveredStep, setHoveredStep] = React.useState("search");

const stepImages = {
  search: searchImg,
  identify: identifyImg,
  pay: payImg,
  fulfill: fulfillImg,
  manage: manageImg,
};


React.useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % topRankingItems.length);
  }, 3000); // rotates every 3 seconds
  return () => clearInterval(interval);
}, []);

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
 const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to products page with query param (even empty is okay)
    navigate(`/products?search=${encodeURIComponent(query.trim())}`);
  };



  return (
    <div>
    <div className="block_1" style={divStyle}>
      <div className="main_1">
        <p>Learn about NiryatBazaar</p>
        <h1>The leading B2B ecommerce platform for global trade</h1>
      </div>
      
      <div className="search">
      <input
        type="text"
        className="bar"
        placeholder="home use beauty equipment"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="cam">📷</div>
      <button onClick={handleSearch} className="search_logo">🔍 search</button>
    </div>
  

      <div className="frequent">
        Frequently searched:
        <button className="one">purple brand jeans</button>
        <button className="two">spider hoodie</button>
        <button className="three">vending machine</button>
      </div>
    </div>
  <div className="block_2">
  <div className="info-card">
    <div className="card_b2" onClick={() => scrollToSection("block_3")}>
      <div className="icon-circle">< AiOutlineAppstore /></div>
      <h3>Millions of business offerings</h3>
      <p>Explore products and suppliers for your business from millions of offerings worldwide.</p>
    </div>
    <div className="card_b2" onClick={() => scrollToSection("block_6")}>
      <div className="icon-circle"><AiTwotoneSafetyCertificate/></div>
      <h3>Assured quality and transactions</h3>
      <p>Ensure production quality from verified suppliers, with your orders protected from payment to delivery.</p>
    </div>
    <div className="card_b2" onClick={() => scrollToSection("block_7")}>
      <div className="icon-circle"><MdOutlineForwardToInbox/></div>
      <h3>One-stop trading solution</h3>
      <p>Order seamlessly from product/supplier search to order management, payment, and fulfillment.</p>
    </div>
    <div className="card_b2" onClick={() => scrollToSection("block_8")}>
      <div className="icon-circle"><TbFileStack/></div>
      <h3>Tailored trading experience</h3>
      <p>Get curated benefits, such as exclusive discounts, enhanced protection, and extra support, to help grow your business every step of the way.</p>
    </div>
  </div>
</div>



      <div className="block_3" id="block_3">
  <div className="top-section">
    <div className="left-text">
      <h2>Explore millions of offerings tailored to your business needs</h2>
    </div>
    <div className="right-stats">
      <div><span className="highlight">200M+</span><br />products</div>
      <div><span className="highlight">5,900</span><br />product categories</div>
      <div><span className="highlight">200K+</span><br />suppliers</div>
      <div><span className="highlight">200+</span><br />countries and regions</div>
    </div>
  </div>

  <div className="category-grid">
    {[
      "Environment", "Apparel & Accessories", "Home & Garden", "Beauty", "Vehicle Parts & Accessories",
      "Jewelry, Eyewear", "Industrial Machinery", "Furniture", "Business Services", "Consumer Electronics",
      "Sports & Entertainment", "Commercial Equipment", "Packaging & Printing", "Tools & Hardware"
    ].map((category, i) => (
      <div className="category-item" key={i}>
          <div className="icon-placeholder">{icons[i]}</div>
        <div className="label">{category}</div>
      </div>
    ))}
  </div>
</div>
    <div className="block_4">
  <h2>Discover your next business opportunity</h2>
  <div className="business-grid">
   <div className="column top-ranking-carousel">
  <h3>Top ranking <span className="view">View more</span></h3>
  <div className="carousel-container">
    {topRankingItems.map((item, index) => (
      <div
        className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
        key={index}
      >
        <div className="ranking-number">#{index + 1}</div>
        <p className="subheading">{item.title}<br /><small>{item.subtitle}</small></p>
        <img src={item.image} alt={item.title} />
      </div>
    ))}
  </div>
</div>


    <div className="column">
      <h3>New arrivals <span className="view">View more</span></h3>
      <div className="box">
        <p>121,000+ products added today</p>
        <div className="image-grid">
          {/* replace with real image URLs */}
          <img src={knifeImg} alt="Knife" />
<img src={excavatorImg} alt="Excavator" />
<img src={tableImg} alt="Table" />
<img src={copperImg} alt="Copper" />


        </div>
      </div>
    </div>

    <div className="column">
      
      <h3>Top deals <span className="view">View more</span></h3>

{/* New horizontal deal card */}
<div className="deal-card">
  <img src={wheelImg} alt="Wheel" className="deal-image" />
  <p className="deal-text">180-day lowest price</p>
</div>

{/* New separate card for best sellers */}
<div className="deal-box">
  <p className="deal-subheading">Deals on best sellers</p>
  <img src={boxImg} alt="Box" className="deal-image-full" />
</div>

     
    </div>
  </div>
</div>
      <div className="block_5">
  <h2>Source direct-from-factory</h2>
  <div className="factory-cards">
    <div className="card_1" style={divStyle3}>
      <div className="card-title">Connect with top-ranking manufacturers</div>
      <div className="card-action">View more</div>
    </div>
    <div className="card_2" style={divStyle4}>
      <div className="card-title">Get samples</div>
      <div className="card-action ">View more</div>
    </div>
    <div className="card_3" style={divStyle5}>
      <div className="card-title">Take factory live tours</div>
      <div className="card-action">View LIVE</div>
    </div>
  </div>
</div>

    <div className="block_6" id="block_6" style={divStyle2}>
  <div className="overlay-text">
    <h2>Trade with confidence from production quality to purchase protection</h2>
  </div>
  <div className="trust-cards">
    <div className="trust-box">
      <h4>Ensure production quality with</h4>
      <h3 className="blue">✔ Verified Supplier</h3>
      <p>
        Connect with a variety of suppliers with third-party-verified credentials...
      </p>
      <div className="actions">
        <button>🎥 Watch video</button>
        <a href='/create'>Learn more</a>
      </div>
    </div>

    <div className="trust-box">
      <h4>Protect your purchase with</h4>
      <h3 className="orange">🛡 Trade Assurance</h3>
      <p>
        Source confidently with access to secure payment options...
      </p>
      <div className="actions">
        <button>🎥 Watch video</button>
        <a href='/create'>Learn more</a>
      </div>
    </div>
  </div>
</div>
<div className="block_7" id="block_7">
  <div className="left-section">
    <h2>Streamline ordering from search to fulfillment, all in one place</h2>

    <div className="step-item" onMouseEnter={() => setHoveredStep("search")}>
  <div className="step-icon">🔍</div>
  <div className="step-text">
    <h3>Search for matches</h3>
    <p>Search and filter from millions of product and supplier offerings...</p>
  </div>
</div>

<div className="step-item" onMouseEnter={() => setHoveredStep("identify")}>
  <div className="step-icon">✔️</div>
  <div className="step-text">Identify the right one</div>
</div>

<div className="step-item" onMouseEnter={() => setHoveredStep("pay")}>
  <div className="step-icon">💳</div>
  <div className="step-text">Pay with confidence</div>
</div>

<div className="step-item" onMouseEnter={() => setHoveredStep("fulfill")}>
  <div className="step-icon">🌐</div>
  <div className="step-text">Fulfill with transparency</div>
</div>

<div className="step-item" onMouseEnter={() => setHoveredStep("manage")}>
  <div className="step-icon">👤</div>
  <div className="step-text">Manage with ease</div>
</div>

  </div>

  <div className="right-section">
  <img src={stepImages[hoveredStep]} alt={hoveredStep} className="main-image" />
</div>

</div>
<div className="block_8" id="block_8">
  <h2>Get tailored discounts, services, and tools for your business stage.</h2>
  <p>
    Grow with curated benefits offered by the free NiryatBazaar.com Membership, whether you are a small
    business needing the essentials to start sourcing or a well-established enterprise looking for
    tools and solutions for more complex orders.
  </p>
  <a href='/create'>Learn more</a>

  <div className="testimonial-card">
    <button className="arrow left">&#8249;</button>
    <div className="testimonial-content">
      <img src={founder}></img>
      <div className="testimonial-text">
        <h4>Eva Jane</h4>
        <p className="subtitle">Founder of Eva Jane Beauty</p>
        <blockquote>
          “As an entrepreneur who is deeply involved in the Beauty industry, I have been very
          devoted to creating my original products. NiryatBazaar.com has been my trusted partner in this
          process.”
        </blockquote>
      </div>
    </div>
    <button className="arrow right">&#8250;</button>
  </div>
</div>
<div className="block_10" style={divStyle2}>
  <h2>Ready to get started?</h2>
  <p>Explore millions of products from trusted suppliers by signing up today!</p>
  <button className="signup-btn">Sign up</button>
</div>
<div className="block_9">
  <h2>Empowering businesses through global trade</h2>
  <p>
    NiryatBazaar.com offers one-stop B2B trading solutions for global small and medium-sized businesses,
    empowering them to transform through digital trade, grasp opportunities, and accelerate growth
    internationally.
  </p>
  <div className="cards">
    <div className="cards-1">
    
      <img src={business} alt="Mission" />
      <h4>OUR MISSION</h4>
    
  
    </div>
    <div className="cards-2">
    <div className="card">
      <img src={map} alt="Locations" />
      <h4>OUR LOCATIONS</h4>
  
    </div>
    <div className="card">
      <img src={sky} alt="ESG" />
      <h4>OUR ESG PROMISES</h4>
     
    </div>
    </div>
  </div>
</div>





    </div>
  );
}

export default Home;
