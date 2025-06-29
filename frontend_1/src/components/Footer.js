import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
     
      <div className="country-section">
        <h3>Find suppliers by country or region</h3>
        <div className="countries">
          {[
            { name: "Italy", flag: "🇮🇹" },
            { name: "Türkiye", flag: "🇹🇷" },
            { name: "Malaysia", flag: "🇲🇾" },
            { name: "South Korea", flag: "🇰🇷" },
            { name: "Vietnam", flag: "🇻🇳" },
            { name: "Russia", flag: "🇷🇺" },
            { name: "Thailand", flag: "🇹🇭" },
          ].map((c, i) => (
            <div key={i} className="country">
              <div className="flag">{c.flag}</div>
              <p>{c.name}</p>
            </div>
          ))}
        </div>
      <Link to="/create">
       View more →
       </Link>  
       </div>  
        
     

      <div className="links-section">
        <div className="column_1">
          <h4>Get support</h4>
          <ul>
            <li>Help Center</li>
            <li>Live chat</li>
            <li>Check order status</li>
            <li>Refunds</li>
            <li>Report abuse</li>
          </ul>
        </div>
        <div className="column_1">
          <h4>Payments and protections</h4>
          <ul>
            <li>Safe and easy payments</li>
            <li>Business Edge Credit Card</li>
            <li>Money-back policy</li>
            <li>On-time shipping</li>
            <li>After-sales protections</li>
            <li>Product monitoring</li>
          </ul>
        </div>
        <div className="column_1">
          <h4>Source on NiryatBazaar</h4>
          <ul>
            <li>Request for Quotation</li>
            <li>Membership program</li>
            <li>NiryatBazaar Logistics</li>
            <li>Sales tax and VAT</li>
            <li>NiryatBazaar Reads</li>
          </ul>
        </div>
        <div className="column_1">
          <h4>Sell on NiryatBazaar</h4>
          <ul>
            <li>Start selling</li>
            <li>Seller Central</li>
            <li>Become a Verified Supplier</li>
            <li>Partnerships</li>
            <li>Supplier App</li>
          </ul>
        </div>
        <div className="column_1">
          <h4>Get to know us</h4>
          <ul>
            <li>About NiryatBazaar</li>
            <li>Corporate responsibility</li>
            <li>News center</li>
            <li>Careers</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-icons">
          <i className="fab fa-facebook-f" />
          <i className="fab fa-linkedin-in" />
          <i className="fab fa-twitter" />
          <i className="fab fa-instagram" />
          <i className="fab fa-youtube" />
          <i className="fab fa-tiktok" />
        </div>

        <div className="apps">
          <p>Trade on the go with the <Link to="/create">NiryatBazaar app</Link></p>
          <img src="appstore.png" alt="App Store" />
          <img src="googleplay.png" alt="Google Play" />
        </div>

        <p className="brands">
          AliExpress | 1688.com | Tmall Taobao World | Alipay | Lazada | Taobao Global | Trendyol | Europages
        </p>
      </div>
    </footer>
  );
}

export default Footer;
