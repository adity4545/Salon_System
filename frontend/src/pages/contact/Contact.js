import axios from "axios";
import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../components/card/Card";
import { useDispatch } from "react-redux";
import { setLogout } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../services/authService";  
import { BACKEND_URL } from "../../services/authService";
import '../Home/Home.css';
import './Contact.css';

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const data = {
    subject,
    message,
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(setLogout());
    navigate("/login");
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_URL}/api/contactus`, data);
      setSubject("");
      setMessage("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <nav className="home-header">
        <div className="container home-header-content">
          <div className="home-logo">
            <Link to="/home">Salon<span>System</span></Link>
          </div>
          <ul className="home-nav">
            <li><Link to="/home">Service</Link></li>
            <li><Link to="/createBooking">Booking</Link></li>
            <li><Link to="/az">Vacancy</Link></li>
            <li><Link to="/contact-us">Contact</Link></li>
          <li>
              <button onClick={handleLogout} className="hero-btn" style={{marginLeft: '1rem'}}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <div className="contactWrapper">
        <h2 className="contactTitle">Contact Us</h2>
        <div className="contactSection">
          <form onSubmit={sendEmail} className="contactForm">
            <Card cardClass="contactCard">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                name="subject"
                id="subject"
                placeholder="Subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)} />
              <label htmlFor="message">Message</label>
              <textarea
                cols="30"
                rows="10"
                name="message"
                id="message"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
              <button className="sendButton">Send Message</button>
            </Card>
          </form>
          <div className="details">
            <Card cardClass="infoCard">
              <h3>Our Contact Information</h3>
              <p>Fill the form or contact us via other channels listed below</p>
              <div className="icons">
                <span><FaPhoneAlt /><p>071-563200023</p></span>
                <span><FaEnvelope /><p>suwanisalon@gmail.com</p></span>
                <span><GoLocation /><p>Colombo</p></span>
                <span><FaTwitter /><p>@SalonSuwani</p></span>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
