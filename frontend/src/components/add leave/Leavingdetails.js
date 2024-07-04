import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './leavedetails.css';
import { useReactToPrint } from 'react-to-print';

function LeavingDetails() {
    const componentPDF = useRef();
    const [showdiscounts, setshowdiscounts] = useState([]);
    const [searchkey, setsearchkey] = useState('');

    // Read data
    const getfetchdata = async () => {
        try {
            const response = await axios.get("http://localhost:5000/leaving/");
            if (response.data.success) {
                setshowdiscounts(response.data.data);
            } else {
                console.error("Error fetching data:", response.data.message);
            }
        } catch (err) {
            alert("An error occurred while fetching data");
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        getfetchdata();
    }, []);

    // Delete data
    const handledelete = async (id) => {
        try {
            const response = await axios.delete("http://localhost:5000/leaving/delete/" + id);
            if (response.data.success) {
                getfetchdata();
                alert("Leave has been deleted successfully!");
            } else {
                console.error("Error deleting data:", response.data.message);
            }
        } catch (err) {
            alert("An error occurred while deleting data");
            console.error("Delete error:", err);
        }
    };

    // Generate PDF
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "show services",
        onAfterPrint: () => alert("Data saved in PDF")
    });

    // Search
    const handlesearch = (e) => {
        filterdata(searchkey);
    };

    const filterdata = (searchKey) => {
        const filteredData = showdiscounts.filter(customer =>
            customer.name.toLowerCase().includes(searchKey.toLowerCase())
        );
        setshowdiscounts(filteredData);
    };

    return (
        <div className="special-table-container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <div className="special-search-container">
                <input
                    type="search"
                    onChange={(e) => setsearchkey(e.target.value)}
                    placeholder="Search"
                    className="special-search-input"
                    style={{ padding: '8px', fontSize: '16px', borderRadius: '4px', marginRight: '8px' }}
                />
                <button
                    id="search-btn"
                    onClick={(e) => handlesearch(e)}
                    style={{ padding: '8px 16px', fontSize: '16px', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Search
                </button>
            </div>
            <div ref={componentPDF} style={{ width: '100%', marginTop: '20px' }}>
                <table className="special-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
                    <thead>
                        <tr className="special-table-header">
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>ID</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Leave Time</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Post</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Reason</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {showdiscounts.map((e1, index) => (
                            <tr key={index} className="special-table-row" style={{ borderBottom: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{index + 1}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{e1.name || 'N/A'}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{e1.email || 'N/A'}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{e1.leave_time || 'N/A'}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{e1.post || 'N/A'}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{e1.reason || 'N/A'}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                    <a href={`/updateleaving/${e1._id}`} style={{ marginRight: '8px' }}>Edit</a>
                                    <button onClick={() => handledelete(e1._id)} style={{ marginRight: '8px', cursor: 'pointer', padding: '8px 16px', backgroundColor: 'red', color: 'white', borderRadius: '4px', border: 'none' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <button onClick={generatePDF} style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px', backgroundColor: 'green', color: 'white', border: 'none' }}>Download Report</button>
        </div>
    );
}

export default LeavingDetails;
