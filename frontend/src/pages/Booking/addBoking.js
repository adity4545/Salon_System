import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import axios from "axios";
import Footer from 'components/footer/Footer';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from '../../components/card/Card';
import PaymentComponent from '../../components/PaymentComponent/PaymentComponent';
import Header from '../../Header/Header';
import '../Home/Home.css';
import './AddBooking.css';

function AddBooking() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const [Booking, setBooking] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [showPayment, setShowPayment] = useState(false);

  const [services, setServices] = useState([]);
  const [paymentAmount, setPaymentAmount] = useState('100.00');

  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:5000/services/getservicedata');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        setServices([]);
      }
    };
    fetchServices();
  }, []);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    let errorMessage = '';

    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));

    if (name === 'phone') {
      const e164Pattern = /^\+?[1-9]\d{9,14}$/;
      if (!e164Pattern.test(value)) {
        errorMessage = 'Phone number must be in E.164 format, e.g. +1234567890';
      }
    }

    if (name === 'email' && value !== '') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        errorMessage = 'Invalid email format';
      }
    }

    setErrors(prev => ({
      ...prev,
      [name]: errorMessage
    }));

    setBooking(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(errors).some(error => error !== '')) {
      return;
    }
    try {
      // Find the selected service's price
      const selectedService = services.find(s => s.s_name === Booking.service);
      const price = selectedService && typeof selectedService.s_price === 'number' ? selectedService.s_price : '100.00';
      setPaymentAmount(price);
      setShowPayment(true);
      await axios.post("http://localhost:5000/create", { ...Booking, paymentMethod: confirmed ? 'Pay at Store' : 'PayPal' });
    } catch (error) {
      alert("Failed to book!");
    }
  };


  return (
      <>
     <Header />
    <div className="addBookingWrapper">
      <Card cardClass="addBookingCard">
        <h2 className="title">Online Booking Form</h2>
        <form className="bookingForm" onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" onChange={handleOnChange} required />

          <label htmlFor="phone">Contact Number:</label>
          <input type="text" id="phone" name="phone" onChange={handleOnChange} />
          {errors.phone && <div className="invalidFeedback">{errors.phone}</div>}

          <label htmlFor="email">Email:</label>
          <input type="text" id="email" name="email" onChange={handleOnChange} />
          {errors.email && <div className="invalidFeedback">{errors.email}</div>}

          <label htmlFor="date">Preferred Date &amp; Time:</label>
          <input type="date" id="date" name="date" onChange={handleOnChange} />

          <label htmlFor="service">Service:</label>
          <select id="service" name="service" onChange={handleOnChange} value={Booking.service} required>
            <option value="">Select a service</option>
            {services.map((service, index) => (
              <option key={index} value={service.s_name}>
                {service.s_name} - {Number(service.s_price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </option>
            ))}
          </select>

          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" onChange={handleOnChange}></textarea>

          <button type="submit" className="bookButton">Book Now</button>
        </form>
        {showPayment && (
          <Card cardClass="paymentCard" >
            <PayPalScriptProvider options={{ 'client-id': 'Aa3sMHzBi8qhpJKGa7HUreJLMrGW7CjxqcGPZBcISgfccSnksDP7mmMJrj2uu0bFG2msENVwCD6NahuV', currency: 'USD' }}>
              <div className="paymentSection">
                <h3>Proceed to Payment</h3>
                <div style={{ margin: '18px 0', textAlign: 'center' }}>
                  <PayAtStoreButton confirmed={confirmed} setConfirmed={setConfirmed} />
                </div>
                {!confirmed && <PaymentComponent amount={paymentAmount} currency="USD" />}
                {!window.paypal && !confirmed && <div style={{color: 'red', marginTop: '12px'}}>PayPal failed to load. Please check your network or client ID.</div>}
              </div>
            </PayPalScriptProvider>
          </Card>
        )}
      </Card>
    </div>
    <Footer />
    </>
  );
}

function PayAtStoreButton({ confirmed, setConfirmed }) {
  if (confirmed) {
    return <div style={{ color: 'green', fontWeight: 600, marginTop: 12 }}>You have chosen to pay at the store. Please pay at the counter on your visit!</div>;
  }
  return (
    <button className="bookButton" style={{ background: '#ffd700', color: '#2d1e4a', padding: '15px',fontSize: '1.2rem',borderRadius: '6px'}} onClick={() => setConfirmed(true)}>
      Pay at Store
    </button>
  );
}

export default AddBooking;
