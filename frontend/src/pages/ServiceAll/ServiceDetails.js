import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ServiceDetails() {
    const { id } = useParams();
    const [service, setService] = useState(null);

    useEffect(() => {
        const getdata = async () => {
            try {
                const res = await fetch(`http://localhost:5000/services/getservice/${id}`);
                const data = await res.json();
                if (res.status === 422 || !data) {
                    console.log("error");
                } else {
                    setService(data);
                    console.log("Get Data");
                }
            } catch (error) {
                console.error("Error fetching service details:", error);
            }
        };

        getdata();
    }, [id]);

    return (
        <div className="sbox1">
            <div className="sbox3">
                <h2>Service Detail</h2>
                <form >
                    <div>
                        <label htmlFor="s_name">Service Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="s_name"
                            placeholder="Service Name"
                            value={service ? service.s_name : ''}
                            readOnly
                        />
                    </div>
                    <div>
                        <label htmlFor="s_desc">Service Description:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="s_desc"
                            placeholder="Service Description"
                            value={service ? service.s_desc : ''}
                            readOnly
                        />
                    </div>
                    <div>
                        <label htmlFor="s_duration">Service Duration:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="s_duration"
                            placeholder="Service Duration"
                            value={service ? service.s_duration : ''}
                            readOnly
                        />
                    </div>
                    <div>
                        <label htmlFor="s_price">Service Price:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="s_price"
                            placeholder="Service Price"
                            value={service ? service.s_price : ''}
                            readOnly
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}
