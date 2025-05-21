import axios from 'axios';
import Card from 'components/card/Card';
import Sidebar from 'components/sidebar/Sidebar';
import { useEffect, useState } from 'react';
import './BookingsList.css';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('http://localhost:5000/api/bookings');
        setBookings(response.data.data || []);
      } catch (err) {
        setError('Failed to fetch bookings');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <>
      <Sidebar />
      <div className="bookingsListWrapper">
        <Card cardClass="bookingsListCard">
          <h2 className="title">All Bookings</h2>
          <div className="tableWrapper">
            <table className="bookingsTable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking.name}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.email}</td>
                    <td>{booking.date}</td>
                    <td>{booking.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
};

export default BookingsList; 