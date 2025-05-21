import React from "react";
import Footer from "../footer/Footer";

const Layout = ({ children }) => {
  return (
    <>
        <div style={{minHeight: "80vh"}}> 
          {children}
        </div>
      <Footer />
    </>
  );
};

export default Layout;
