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
        </h3>
        <p className="footer-about-description" style={{ marginTop: "18px" }}>
          <h5>our details:</h5><br/>
          Salon System is your all-in-one platform for effortless salon management and a seamless client experience. Book appointments, explore services, and connect with top stylists—all in one place. Discover beauty, relaxation, and convenience with Salon System.
        </p>
      </div>
    </>
  );
};

export default Footer;
