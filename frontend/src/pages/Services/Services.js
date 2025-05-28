import Footer from 'components/footer/Footer';
import { useEffect, useState } from 'react';
import Header from '../../Header/Header';
import './Services.css';

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

const Services = () => {
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
    <>
    <Header />
    <div className="servicesContainer">
      <h2 className="servicesTitle">Our Salon Services</h2>
      <div className="services-list">
        {services.map(service => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Services; 