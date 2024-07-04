import { useEffect, useState } from 'react';
import axios from 'axios';
import "../employee salary/all OT Salary/allSpecialLeave.css"; // Import the CSS file

function SpecialLeavingRepoart() {
    const [countlist, setcountlist] = useState([]);
    const [customerlist, setcustomerlist] = useState([]);

    // Read data
    const getfetchdata = async () => {
        try {
            const data = await axios.get("http://localhost:5000/special/count_special");
            const { count } = data.data;
            setcountlist(count); // Get count
            setcustomerlist(data.data.data); // Get table data
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        getfetchdata();
    }, []);

    return (
        <div className="special-table-container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h3 style={{ fontSize: '24px', color: '#333' }}>Special Leaving Count:</h3>
            {countlist !== null ? (
                <p style={{ fontSize: '18px', color: '#666' }}>Total of Special Leaving Count: {countlist}</p>
            ) : (
                <p style={{ fontSize: '18px', color: '#666' }}>Loading...</p>
            )}

            <h3 style={{ fontSize: '24px', color: '#333', marginTop: '20px' }}>Summary Special Leavings:</h3>

            <table className="special-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                <thead>
                    <tr className="special-table-header">
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>User Email</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {customerlist.map((e) => (
                        <tr key={e.s_email} className="special-table-row" style={{ borderBottom: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{e.s_name}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{e.s_email}</td>
                            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{e.s_position}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SpecialLeavingRepoart;
