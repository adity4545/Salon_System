import { useEffect, useState, useRef } from 'react';
import axios from "axios";
import '../employee salary/all OT Salary/allSpecialLeave.css'; // Import the same CSS file used in the AllOTSalary component
import { useReactToPrint } from "react-to-print";

function LeavingSpecialDetails() {
    const componentPDF = useRef();
    const [showdiscounts, setshowdiscounts] = useState([]);
    const [searchkey, setsearchkey] = useState('');

    //read
    const getfetchdata = async () => {
        try {
            const data = await axios.get("http://localhost:5000/special/_special");
            console.log(data.data.success);
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

    //delete
    const handledelete = async (id) => {
        const data = await axios.delete("http://localhost:5000/special/delete_special/" + id);
        if (data.data.success) {
            getfetchdata();
            console.log(data.data.message);
            alert("leave has been deleted Successfully!");
        }
    };

    //generate report
    const generatePDF = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "show services ",
        onAfterPrint: () => alert("data save in pdf")
    });

    //search
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
        <div className="special-table-container"> {/* Use the same container class */}
            <div className="special-search-container"> {/* Use the same search container class */}
                <input
                    type="text"
                    className="special-search-input"
                    placeholder="Search by Name..."
                    value={searchkey}
                    onChange={(e) => setsearchkey(e.target.value)}
                />
                <span className="special-search-icon"><i className="fa fa-search"></i></span>
                <span className="special-microphone-icon"><i className="fa fa-microphone"></i></span>
            </div>
            <div ref={componentPDF} style={{ width: '100%' }}>
                <table className="special-table"> {/* Use the same table class */}
                    <thead>
                        <tr className="special-table-header">
                            <th>Name</th>
                            <th>Email</th>
                            <th>Position</th>
                            <th>Number od Leave dates</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            showdiscounts.map((e1, index) => {
                                return (
                                    <tr className="special-table-row" key={index}>
                                        <td>{e1.s_name}</td>
                                        <td>{e1.s_email}</td>
                                        <td>{e1.s_position}</td>
                                        <td>{e1.s_number}</td>
                                        <td>
                                            <a href={`/specialdetailsupdate/${e1._id}`} style={{ textDecoration: 'none', color: 'blue', marginRight: '10px' }}>Edit</a>
                                            <button onClick={() => handledelete(e1._id)} style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '5px', marginRight: '5px' }}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
            <button onClick={generatePDF} className="special-action-button generate-pdf" style={{ backgroundColor: 'green', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '5px', marginTop: '10px' }}>Download Report</button>
        </div>
    );
}

export default LeavingSpecialDetails;
