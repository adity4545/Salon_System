import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setError, setLogin } from '../../redux/features/auth/authSlice';
import './Login.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      dispatch(setLogin(res.data));
      if (res.data.user.role === 'admin') {
        navigate('/adminHome');
      } else {
        navigate('/home');
      }
    } catch (err) {
      dispatch(setError(err.response?.data?.message || 'Login failed'));
    }
  };

  return (
    <div className="login-bg">
      <div className="register-card">
        <div className="lux-logo gold-accent">💇‍♀️</div>
        <h2 className="login-title">Login</h2>
        <div className="tagline">Welcome back to Glamour Salon. Enter your details to continue.</div>
        <form className="login-form" onSubmit={handleLogin}>
          <input type="email" className="login-input" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" required placeholder="Email" />
          <div style={{ position: 'relative', width: '100%' }}>
            <input type={showPassword ? 'text' : 'password'} className="login-input" value={password} onChange={e => setPassword(e.target.value)} autoComplete="current-password" required placeholder="Password" />
            <button type="button" className="show-hide-btn" onClick={() => setShowPassword(!showPassword)}>{showPassword ? 'Hide' : 'Show'}</button>
          </div>
          <div style={{ textAlign: 'right', width: '100%', marginBottom: '10px' }}>
            <Link to="/forgot" className="forgot-link">Forgot Password?</Link>
          </div>
          <button type="submit" className="login-btn">Login</button>
          <div className="login-divider">or login with</div>
          <a href="http://localhost:5000/api/users/google" className="login-google-btn">
            <span>Google</span>
          </a>
          <div className="login-register-link">
            <span>Don't have an account?</span>
            <Link to="/register">Register</Link>
          </div>
        </form>
        <div className="testimonial">“The best salon experience I've ever had! – Trusted by 1000+ happy clients.”</div>
      </div>
    </div>
  );
};

export default Login;
