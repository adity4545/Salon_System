import Card from 'components/card/Card';
import styles from './Profile.module.scss';

const Profile = () => {
  return (
    <div className={styles.profileWrapper}>
      <Card cardClass={styles.profileCard}>
        <h2 className={styles.title}>User Profile</h2>
        <p className={styles.description}>This is the user profile page. You can add user details and settings here.</p>
      </Card>
    </div>
  );
};

export default Profile;
