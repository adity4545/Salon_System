import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/features/auth/authSlice";
import { logoutUser } from "../services/authService";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    dispatch(setLogout());
    navigate("/login");
  };

  return (
      <nav className="home-header">
        <div className="container home-header-content">
          <div className="home-logo">
            <Link to="/home">Salon<span>System</span></Link>
          </div>
          <ul className="home-nav">
            <li><Link to="/Services">Service</Link></li>
            <li><Link to="/createBooking">Booking</Link></li>
            <li><Link to="/az">Vacancy</Link></li>
            <li><Link to="/contact-us">Contact</Link></li>
            <li>
              <button
                onClick={() => navigate('/profile')}
                className="hero-btn"
                style={{marginLeft: '1rem'}}
                title="Profile"
              >
                <span role="img" aria-label="Profile" style={{ fontSize: '1.2rem', verticalAlign: 'middle' }}>👤</span>
              </button>
            </li>
            <li>
              <button onClick={handleLogout} className="hero-btn" style={{marginLeft: '1rem'}}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
  );
};

export default Header;