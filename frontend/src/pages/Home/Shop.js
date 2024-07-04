import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import "./Home.scss";
import "./Card.scss";
import heroImg from "../../assets/inv-img.png";
import salonLogo from "../../assets/salonLogo.png";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  return (
    <div className="home">
<nav className="container --flex-between">
  {/* Logo */}
  <div className="logo --small-logo">
    <img src={salonLogo} alt="Salon Logo" />
  </div>
  {/* Additional Buttons */}
  <div className="additional-buttons">
    <ul className="home-links">
      <li>
        <button className="--btn --btn-secondary">
          Service
        </button>
      </li>
      <li>
        <button className="--btn --btn-secondary">Book Appointment</button>
            </li>
            
            <li>
        <button className="--btn --btn-secondary">Shop</button>
            </li>
            <li>
        <button className="--btn --btn-secondary">
          <Link to="/az">Job Vacancy</Link>
        </button>
      </li>
    </ul>
  </div>
  {/* Links */}
  <ul className="home-links">
    <ShowOnLogout>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <button className="--btn --btn-primary">
          <Link to="/login">Login</Link>
        </button>
      </li>
    </ShowOnLogout>
    <ShowOnLogin>
      <li>
        <button className="--btn --btn-primary">
          <Link to="/dashboard">Dashboard</Link>
        </button>
      </li>
    </ShowOnLogin>
  </ul>
</nav>

      {/* Hero Section */}
      <section className="container hero">
        {/* Hero Content */}
        <div className="hero-text">
          {/* <h2>Inventory {"&"} Stock Management Solution</h2>
          <p>
            Inventory system to control and manage products in the warehouse in
            real-time and integrated to make it easier to develop your business.
          </p> */}
          <div className="hero-buttons">
            {/* <button className="--btn --btn-secondary">
              <Link to="/dashboard">Free Trial 1 Month</Link>
            </button> */}
          </div>
          {/* <div className="--flex-start">
            <NumberText num="14K" text="Brand Owners" />
            <NumberText num="23K" text="Active Users" />
            <NumberText num="500+" text="Partners" />
          </div> */}
        </div>
        {/* Hero Image */}
        <div className="hero-image">
          {/* <img src={heroImg} alt="Inventory" /> */}
        </div>
      </section>

      {/* Product Cards */}
      <section className="container product-cards-container">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} openModal={openModal} />
        ))}
      </section>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Product Details"
        className="modal"
        overlayClassName="modal-overlay"
      >
        {selectedProduct && (
          <div className="modal-content">
            {/* Check if selectedProduct.image is defined before accessing its properties */}
            {selectedProduct.image && (
              <div className="product-image">
                <img src={selectedProduct.image.filePath} alt={selectedProduct.name} />
              </div>
            )}
            <h2>{selectedProduct.name}</h2>
            <div className="product-info">
              <div className="info-item">
                <span className="info-label">Price:</span>
                <span className="info-value">Rs.{selectedProduct.price}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Category:</span>
                <span className="info-value">{selectedProduct.category}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Description:</span>
                <span
                  className="info-value"
                  dangerouslySetInnerHTML={{ __html: selectedProduct.description }}
                />
              </div>
            </div>
            <button className="close-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  )
}

const ProductCard = ({ product, openModal }) => {
  // Check if product.image is defined before accessing its properties
  const imageUrl = product.image ? product.image.filePath : "";

  return (
    <div className="product-card" onClick={() => openModal(product)}>
      <div className="product-image">
        {/* Use imageUrl as the src for the image */}
        <img src={imageUrl} alt={product.name} />
      </div>
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>Price: Rs. {product.price}</p>
        <p>Category: {product.category}</p>
        <button className="view-details-btn">View Details</button>
      </div>
    </div>
  );
};

export default Shop
