import Card from '../../components/card/Card';
import './AdminHome.css';

export default function AdminHome() {
    return (
        <div className="adminHomeWrapper">
            <Card cardClass="adminHomeCard">
                <div className="adminHomeLogo">💇‍♀️</div>
                <h1 className="helloAdmin"><b>Welcome, Admin!</b></h1>
                <h2 className="welcome">Manage your salon with ease and style.</h2>
                <p className="adminHomeSubtitle">Access bookings, services and more from your dashboard.</p>
                {/* <a href="/dashboard" className="adminHomeBtn">Go to Dashboard</a> */}
            </Card>
        </div>
    )
}