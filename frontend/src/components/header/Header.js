import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUser, setLogout } from "../../redux/features/auth/authSlice";
import { logoutUser } from "../../services/authService";
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const logout = async () => {
    await logoutUser();
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <header className="salon-header">
      <div className="salon-header__content">
        <div className="salon-header__logo">
          <span role="img" aria-label="Salon" className="salon-header__icon">💇‍♀️</span>
          <span className="salon-header__brand">Salon Bliss</span>
        </div>
        <div className="salon-header__user">
          <span className="salon-header__welcome">Welcome,</span>
          <span className="salon-header__username">{user?.name}</span>
          <button onClick={logout} className="salon-header__logout">Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
