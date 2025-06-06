import axios from 'axios';
import Sidebar from 'components/sidebar/Sidebar';
import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import './OrderDetails.css';

function OrderDetails() {
    const componentPDF = useRef();
    const [showdiscounts, setshowdiscounts] = useState([]);
    const [searchkey, setsearchkey] = useState('');

    // Read data
    const getfetchdata = async () => {
        try {
            const data = await axios.get("http://localhost:5000/");
            if (data.data.success) {
                setshowdiscounts(data.data.data);
            }
        } catch (err) {
            alert(err);
        }
    };

    useEffect(() => {
        getfetchdata();
    }, []);

    // Delete data
    const handledelete = async (id) => {
        const data = await axios.delete("http://localhost:5000/delete/" + id);
        if (data.data.success) {
            getfetchdata();
            alert("Deleted Successfully!");
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
            customer && customer.name && customer.name.toLowerCase().includes(searchKey.toLowerCase())
        );
        setshowdiscounts(filteredData);
    };

    return (
        <Sidebar>
          <div className="order-details-main">
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
            <div ref={componentPDF} style={{ width: '100%' }}>
                {showdiscounts.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'blue', marginTop: '20px' }}>
                        No order details found.
                    </div>
                ) : (
                    <div className="order-details-table-container">
                      <table className="special-table">
                        <thead>
                            <tr className="special-table-header">
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Name</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Phone Numbers</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Email</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Service</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Date</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Description</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Payment Method</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showdiscounts.map((e1) => (
                                <tr key={e1._id} className="special-table-row" style={{ borderBottom: '1px solid #ddd', backgroundColor: '#f9f9f9' }}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{e1.name}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{e1.phone}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{e1.email}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{e1.service}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{e1.date}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{e1.message}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{e1.paymentMethod || '-'}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                        <a href={`/updateorder/${e1._id}`} className="action-btn edit-btn">Edit Order</a>
                                        <button onClick={() => handledelete(e1._id)} className="action-btn delete-btn">Delete Order</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                )}
            </div>
            <button onClick={generatePDF} style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px', backgroundColor: 'green', color: 'white', border: 'none' }}>Download Report</button>
          </div>
        </Sidebar>
    );
}

export default OrderDetails;
