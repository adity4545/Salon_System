import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/card/Card';
import { selectUser } from '../../redux/features/auth/authSlice';
import './Profile.css';

const Profile = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  return (
    <div className="profileWrapper">
      <Card cardClass="profileCard">
        <h2 className="title">User Profile</h2>
        <div style={{textAlign: 'left', margin: '0 auto', maxWidth: 400}}>
          <p><strong>Name:</strong> {user?.name || '-'}</p>
          <p><strong>Email:</strong> {user?.email || '-'}</p>
          <p><strong>Phone:</strong> {user?.phone || '-'}</p>
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
