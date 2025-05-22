import { useState } from "react";
// import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../../services/authService";
import './Register.css';
const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
};

const Register = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setformData] = useState(initialState);
  const { name, email, password, password2 } = formData;
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Password must be up to 6 characters");
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter Valid email");
    }
    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = {
      name,
      email,
      password,
    };

    try {
      const data = await registerUser(userData);
      if (!data) {
        toast.error("You are already a registered user. Please login.");
        return;
      }
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="login-bg">
      <div className="register-card">
        <div className="lux-logo gold-accent">💇‍♀️</div>
        <h2 className="login-title">Register</h2>
        <div className="tagline">Join Glamour Salon and experience beauty redefined.</div>
        <form className="login-form" onSubmit={register}>
          <input type="text" className="login-input" placeholder="Name" required name="name" id="name" autoComplete="name" value={name} onChange={handleInputChange} />
          <input type="email" className="login-input" placeholder="Email" required name="email" id="email" autoComplete="email" value={email} onChange={handleInputChange} />
          <div style={{ position: 'relative', width: '100%' }}>
            <input type={showPassword ? 'text' : 'password'} className="login-input" placeholder="Password" required name="password" id="password" autoComplete="new-password" value={password} onChange={handleInputChange} />
            <button type="button" className="show-hide-btn" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button>
          </div>
          <div style={{ position: 'relative', width: '100%' }}>
            <input type={showPassword2 ? 'text' : 'password'} className="login-input" placeholder="Confirm Password" required name="password2" id="password2" autoComplete="new-password" value={password2} onChange={handleInputChange} />
            <button type="button" className="show-hide-btn" onClick={() => setShowPassword2(!showPassword2)}>{showPassword2 ? 'Hide' : 'Show'}</button>
          </div>
          <button type="submit" className="login-btn">Register</button>
          <div className="login-divider">or register with</div>
          <a href="http://localhost:5000/api/users/google" className="login-google-btn">
            <span>Google</span>
          </a>
          <div className="login-register-link">
            <span>Already have an account?</span>
            <Link to="/login">Login</Link>
          </div>
        </form>
        <div className="testimonial">“Salon System is my go-to for every occasion. – Loved by 1000+ clients.”</div>
      </div>
    </div>
  );
};

export default Register;
