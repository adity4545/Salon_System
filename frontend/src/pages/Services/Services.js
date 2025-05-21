import React from 'react';
import './Services.css';

const salonServices = [
  { name: "Haircut", desc: "Professional haircut tailored to your style.", duration: "30 min", price: 25 },
  { name: "Hair Coloring", desc: "Full hair coloring with premium products.", duration: "90 min", price: 60 },
  { name: "Manicure", desc: "Nail shaping, cuticle care, and polish.", duration: "45 min", price: 20 },
  { name: "Pedicure", desc: "Foot soak, exfoliation, and polish.", duration: "50 min", price: 25 },
  { name: "Facial", desc: "Deep cleansing and rejuvenating facial.", duration: "60 min", price: 40 },
  { name: "Waxing", desc: "Gentle and effective hair removal.", duration: "30 min", price: 30 },
];

const Services = () => (
  <div className="servicesContainer">
    <h2 className="servicesTitle">Our Salon Services</h2>
    <div className="servicesList">
      {salonServices.map((service, idx) => (
        <div className="serviceCard" key={idx}>
          <h3 className="serviceName">{service.name}</h3>
          <p className="serviceDesc">{service.desc}</p>
          <p className="serviceDetail"><b>Duration:</b> {service.duration}</p>
          <p className="serviceDetail"><b>Price:</b> {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(service.price)}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Services; 