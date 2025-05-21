import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import { setLogout } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../services/authService";
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
  const dispatch = useDispatch();
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

  const handleLogout = async () => {
    await logoutUser();
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <div className="home home-modern">
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
      <div className="services-section">
        <h2 className="services-title">Our Popular Services</h2>
        <div className="services-list">
          {services.map(service => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
