import { useEffect, useState } from 'react';
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
// import { setLogout } from "../../redux/features/auth/authSlice";
// import { logoutUser } from "../../services/authService";
import Header from 'Header/Header';
import './Home.css';

function ServiceCard({ service }) {
  return (
    <div className="service-card">
      <h3>{service.s_name}</h3>
      <p>{service.s_desc}</p>
      <div className="service-meta">
        <span>Duration: {service.s_duration}</span>
        <span>Price: {Number(service.s_price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
      </div>
    </div>
  );
}

const Home = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
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

  return (
    <div className="home home-modern">
      <Header />
      <div className="about-section">
        <h2 className="about-title">About Our Salon</h2>
        <p className="about-description">
          Welcome to <b>Salon System</b>, your destination for beauty, relaxation, and rejuvenation. With over a decade of experience, our talented team of stylists and therapists are dedicated to providing you with the highest quality of service in a warm and inviting atmosphere. We offer a wide range of hair, skin, and spa treatments using premium products and the latest techniques. Whether you're here for a quick trim, a luxurious facial, or a complete makeover, we ensure every visit leaves you feeling pampered and confident. Discover why thousands of happy clients trust us for their beauty needs—your blissful experience starts here!
        </p>
      </div>
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button className="view-all-btn" onClick={() => navigate('/createBooking')}>Book Your Appointment Now</button>
      </div>
      <div className="services-section">
        <h2 className="services-title">Our Popular Services</h2>
        <div className="services-list">
          {services.slice(0, 4).map(service => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button className="view-all-btn" onClick={() => navigate('/services')}>View All Services</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
