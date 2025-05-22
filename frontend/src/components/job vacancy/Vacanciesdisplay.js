import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../pages/Home/Home.css';
import './Vacanciesdisplay.css'; // Updated CSS file name

import axios from 'axios';
import Header from 'Header/Header';
import Footer from 'components/footer/Footer';

const Vacanciesdisplay = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get_data');
        setData(response.data.data); // Assuming the data array is nested under 'data' key
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleApply = (position) => {
    console.log(`Applying for position: ${position}`);
  };

  const filteredData = data.filter((item) =>
    item.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="job-vacancy-display">
        <div className="photo" style={{ backgroundImage: 'url(./pic.jpg)' }}>
          <div className="container">
            <div className="our">
              <h1>Our Opportunities</h1>
            </div>
            <div className="search-container">
              <div className="input-group mb-4">
                <input
                  type="text"
                  className="form-control"
                  style={{ backgroundColor: '#edb69b52', fontSize: '17px' }}
                  placeholder="Search by position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <div className="row">
              {filteredData.map((item, index) => (
                <div key={index} className="col-md-6 mb-4"> {/* Changed to col-md-6 for wider cards */}
                  <div className="card custom-card">
                    <div className="card-body">
                      <h5 className="card-title">{item.position}</h5>
                      <p className="card-text"><strong style={{ fontSize: '17px' }}>Salary:</strong> {item.salary}</p>
                      <p className="card-text"><strong style={{ fontSize: '17px' }}>Age Criteria:</strong> {item.age_limit}</p>
                      <p className="card-text"><strong style={{ fontSize: '17px' }}>Description:</strong> {item.description}</p>
                    </div>
                    <Link to="/app">
                      <button onClick={() => handleApply(item.position)} className="mm">Apply</button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Vacanciesdisplay;
