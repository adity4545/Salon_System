import axios from "axios";
import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaTwitter } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { toast } from "react-toastify";
import Card from "../../components/card/Card";  
import { BACKEND_URL } from "../../services/authService";
import '../Home/Home.css';
import './Contact.css';
import Header from "Header/Header";
import Footer from "components/footer/Footer";

const Contact = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const data = {
    subject,
    message,
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
      <Header />
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
                <span><FaPhoneAlt /><p>+91 8347774574</p></span>
                <span><FaEnvelope /><p>salon@gmail.com</p></span>
                <span><GoLocation /><p>Colombo</p></span>
                <span><FaTwitter /><p>@Salon</p></span>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
