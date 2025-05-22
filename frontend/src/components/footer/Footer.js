import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <p>All Rights Reserved. &copy; 2024</p>
      </footer>
      <div className="footer-content">
        <h3>Our Contact Information
        <p>Fill the form or contact us via other channels listed below</p>
        </h3>
        <div
          className="icons"
          style={{ display: "flex", gap: "10px", flexDirection: "column" }}
        >
          <span>
            <FaPhoneAlt />
            <p>+91 8347774574</p>
          </span>
          <span>
            <FaEnvelope />
            <p>salon@gmail.com</p>
          </span>
          <span>
            <GoLocation />
            <p>Colombo</p>
          </span>
          <span>
            <FaTwitter />
            <p>@Salon</p>
          </span>
        </div>
      </div>
    </>
  );
};

export default Footer;
