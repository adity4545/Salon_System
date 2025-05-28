import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/features/auth/authSlice";
import { logoutUser } from "../services/authService";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutUser();
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <nav className="header-minimal">
      <div className="header-container">
        <div className="header-logo-link">
          <Link to="/home">Salon<span>System</span></Link>
        </div>
        <button
          className="header-hamburger"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          <FiMenu style={{ color: '#0ea5e9' }} size={28} />
        </button>
        <div className={`header-nav${menuOpen ? " open" : ""}`}>
          <ul className="header-nav-list">
            <li><Link className="header-link" to="/Services" onClick={() => setMenuOpen(false)}>Service</Link></li>
            <li><Link className="header-link" to="/createBooking" onClick={() => setMenuOpen(false)}>Booking</Link></li>
            <li><Link className="header-link" to="/az" onClick={() => setMenuOpen(false)}>Vacancy</Link></li>
            <li><Link className="header-link" to="/contact-us" onClick={() => setMenuOpen(false)}>Contact</Link></li>
            <li>
              <button
                onClick={() => { setMenuOpen(false); navigate('/profile'); }}
                className="header-link"
                title="Profile"
                style={{ background: 'none', border: 'none', padding: 0, margin: 0 }}
              >
                <span role="img" aria-label="Profile" style={{ fontSize: '1.2rem', verticalAlign: 'middle' }}>👤</span>
              </button>
            </li>
            <li>
              <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="header-btn-logout">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;