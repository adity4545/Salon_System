import React from "react";

export default function AdminHome() {
    return (
        <div>
            <div style={{ marginTop: '100px', marginLeft: '30px', position: 'absolute',  }}>
                <label style={{ fontSize: '70px', color: 'white' }} className="texto"><b>Hello Admin</b></label>
            </div>
            <div style={{ marginTop: '200px', marginLeft: '100px', position: 'absolute' }}>
                <label style={{ fontSize: '50px', color: 'white' }} className="texto">Welcome to</label>
            </div>
            <div style={{ marginTop: '270px', marginLeft: '-120px', position: 'absolute' }}>
                <label style={{ fontSize: '100px', color: 'white' }} className="texto"><b>Salon Suwani</b></label>
            </div>
        </div>
    )
}