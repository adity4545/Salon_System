import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setLogin } from '../../redux/features/auth/authSlice';

const GoogleSuccess = () => {
  console.log("GoogleSuccess loaded");
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const email = params.get('email');
    const role = params.get('role');
    console.log("Params:", { token, email, role });
    if (token && email && role) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ email, role }));
      dispatch(setLogin({ user: { email, role }, token }));
      setTimeout(() => {
        window.location.replace('/home');
      }, 100);
    } else {
      window.location.replace('/login');
    }
  }, [dispatch, location]);

  return <div>Logging you in with Google...</div>;
};

export default GoogleSuccess; 