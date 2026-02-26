import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  const user = useSelector((state) => state.auth.user);
  const role = user?.role ?? "guest";
  return (
    <div className="footer">
      {role !== "admin" && (
        <div className="footer-top">
          <div className="footer-content">
            <div className="footer-section">
              <h4>About Evara</h4>
              <p>
                Evara is a brand that brings you timeless fashion, lifestyle
                product and everything from basic need to luxury items at
                affordable price. We are committed to delivering quality pieces
                that elevate your lifestyle.
              </p>
            </div>
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li>
                  <Link to="/faq">FAQ</Link>
                </li>
                <li>
                  <Link to="/contact">Contact-us</Link>
                </li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Follow us</h4>
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      )}
      <div className="footer-bottom">
        <p>Made with love by Team Evara</p>
      </div>
    </div>
  );
}
