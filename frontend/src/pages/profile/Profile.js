import { FaEnvelope, FaPhone, FaUser } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import { selectUser } from '../../redux/features/auth/authSlice';
import './Profile.css';

const Profile = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const avatar = user?.photo || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user?.name || 'User');

  return (
    <div className="profileWrapper profile-gradient-bg">
      <Card cardClass="profileCard fade-in">
      <img src={avatar} alt="Profile" className="profile-avatar avatar-glow" />
        <h2 className="title">User Profile</h2>
        <div style={{textAlign: 'left', margin: '0 auto', maxWidth: 400}}>
          <p><FaUser style={{marginRight: '8px', color: '#b983ff'}} /><strong>Name:</strong> {user?.name || '-'}</p>
          <p><FaEnvelope style={{marginRight: '8px', color: '#b983ff'}} /><strong>Email:</strong> {user?.email || '-'}</p>
          <p><FaPhone style={{marginRight: '8px', color: '#b983ff'}} /><strong>Phone:</strong> {user?.phone || '-'}</p>
          {/* <p><strong>Bio:</strong> {user?.bio || '-'}</p> */}
          {/* <p><strong>Category:</strong> {user?.category || '-'}</p> */}
        </div>
        <button
          className="hero-btn"
          style={{marginTop: '1.5rem'}}
          onClick={() => navigate('/profile/edit')}
        >
          Edit Profile
        </button>
        <button
          className="hero-btn"
          style={{marginTop: '1.5rem'}}
          onClick={() => navigate('/home')}
        >
          Back
        </button>
      </Card>
    </div>
  );
};

export default Profile;
